import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { promises as fs } from 'fs';
import { createWriteStream, WriteStream } from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements OnModuleInit, OnModuleDestroy {
  private readonly MAX_SIZE = 500 * 1024;
  private readonly logDir = path.resolve('logs');

  private stream!: WriteStream;
  private currentSize = 0;

  async onModuleInit() {
    await fs.mkdir(this.logDir, { recursive: true });
    await this.createNewStream();
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

  async log(line: string) {
    const buffer = Buffer.from(line);

    if (this.currentSize + buffer.length > this.MAX_SIZE) {
      await this.createNewStream();
    }

    this.currentSize += buffer.length;

    this.stream.write(buffer);
    process.stdout.write(buffer);
  }

  async onModuleDestroy() {
    if (!this.stream) return;

    await new Promise<void>((resolve) => this.stream.end(resolve));
  }
}
