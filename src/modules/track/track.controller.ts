import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  NotFoundException,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  createTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Put('/:id')
  updateTrackInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    const result = this.trackService.updateTrackInfo(id, dto);
    if (!result) {
      throw new NotFoundException('Artist not found');
    }
    return result;
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.deleteTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
  }
}
