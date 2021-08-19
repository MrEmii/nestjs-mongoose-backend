import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IFlight } from 'src/ common/interfaces/flight.interface';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@UseGuards(JWTGuard)
@ApiTags('flights')
@Controller('flight')
export class FlightController {

  constructor(private readonly service: FlightService, private readonly passengers: PassengerService) { }

  @Post()
  create(@Body() flight: FlightDTO) {
    return this.service.create(flight);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() flight: FlightDTO) {
    return this.service.updateOne(id, flight);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.deleteOne(id);
  }

  @Post("/:flight/passenger/:passenger")
  async addPassenge(@Param('flight') flight: string, @Param('passenger') passengerId: string): Promise<IFlight> {
    const passenger = await this.passengers.findOne(passengerId);
    if (!passenger) throw new HttpException({ message: 'Pasajero no encontrado' }, HttpStatus.NOT_FOUND);
    return this.service.addPassenger(flight, passengerId);
  }
}