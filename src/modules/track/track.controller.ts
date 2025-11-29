import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
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
  getTrackById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Put('/:id')
  updateTrackInfo(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return this.trackService.updateTrackInfo(id, dto);
  }

  @Delete('/:id')
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
