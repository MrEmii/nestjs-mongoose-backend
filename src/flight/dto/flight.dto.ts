import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class FlightDTO {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly pilot: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly airplain: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destination: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type()
  @IsDate()
  readonly date: Date;
}