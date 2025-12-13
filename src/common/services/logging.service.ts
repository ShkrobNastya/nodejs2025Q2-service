import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { promises as fs } from 'fs';
import { createWriteStream, WriteStream } from 'fs';
import * as path from 'path';
import { LoggingLevel } from '../helpers/enums';

@Injectable()
export class LoggingService implements OnModuleInit, OnModuleDestroy {
  private readonly MAX_SIZE = Number(process.env.LOG_MAX_SIZE_KB ?? 500) * 1024;

  private readonly LOG_LEVEL = Number(process.env.LOG_LEVEL ?? 2);

  private readonly logDir = path.resolve('logs');
  private readonly errorLogDir = path.resolve('logs/errors');

  private stream!: WriteStream;
  private errorStream!: WriteStream;

  private currentSize = 0;
  private currentErrorSize = 0;

  priorityMap: Record<LoggingLevel, number> = {
    [LoggingLevel.ERROR]: 0,
    [LoggingLevel.WARN]: 1,
    [LoggingLevel.LOG]: 2,
    [LoggingLevel.DEBUG]: 3,
    [LoggingLevel.VERBOSE]: 4,
  };

  async onModuleInit() {
    await fs.mkdir(this.logDir, { recursive: true });
    await fs.mkdir(this.errorLogDir, { recursive: true });

    await this.createNewStream();
    await this.createNewErrorStream();
  }

  private async createNewStream() {
    if (this.stream) {
      await new Promise<void>((resolve) => this.stream.end(resolve));
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    const filePath = path.join(this.logDir, `app-${timestamp}.log`);

    this.stream = createWriteStream(filePath, {
      flags: 'a',
    });

    this.currentSize = 0;
  }

  private async createNewErrorStream() {
    if (this.errorStream) {
      await new Promise<void>((resolve) => this.errorStream.end(resolve));
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    const filePath = path.join(this.errorLogDir, `app-${timestamp}.log`);

    this.errorStream = createWriteStream(filePath, {
      flags: 'a',
    });

    this.currentErrorSize = 0;
  }

  async logMessage(level: LoggingLevel, line: string) {
    const priority = this.priorityMap[level];
    if (priority > this.LOG_LEVEL) return;

    const buffer = Buffer.from(`${level}  ` + line + '\n');

    if (this.currentSize + buffer.length > this.MAX_SIZE) {
      await this.createNewStream();
    }

    this.currentSize += buffer.length;

    this.stream.write(buffer);
    process.stdout.write(buffer);

    if (level === LoggingLevel.ERROR) {
      await this.writeError(buffer);
    }
  }

  private async writeError(buffer: Buffer) {
    if (this.currentErrorSize + buffer.length > this.MAX_SIZE) {
      await this.createNewErrorStream();
    }
    this.currentErrorSize += buffer.length;
    this.errorStream.write(buffer);
  }

  async onModuleDestroy() {
    await Promise.all([
      this.stream && new Promise<void>((r) => this.stream.end(r)),
      this.errorStream && new Promise<void>((r) => this.errorStream.end(r)),
    ]);
  }
}
