import { IsOptional, IsString } from "class-validator";

export class Selector {
  @IsString()
  selector: string

  @IsString()
  @IsOptional()
  attribute: string = null
}

export default Selector;
