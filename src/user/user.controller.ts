import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JWTGuard)
@ApiTags('users')
@Controller('user')
export class UserController {

  constructor(private readonly services: UserService) { }

  @Post()
  create(@Body() userDTO: UserDTO) {
    return this.services.create(userDTO);
  }

  @Get()
  findAll() {
    return this.services.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.services.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() user: UserDTO) {
    return this.services.updateOne(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.services.deleteOne(id);
  }
}