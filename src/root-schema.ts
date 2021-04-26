import { Type } from "class-transformer";
import { IsArray, IsInstance, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import Schema, { UnionSchema } from "./schema";

export class RootSchema {
  @IsString()
  selector: string

  @Type(() => Schema)
  @IsInstance(Schema)
  @ValidateIf(parserConfig => !parserConfig.union)
  @ValidateNested()
  schema: Schema

  @Type(() => UnionSchema)
  @ValidateIf(parserConfig => !parserConfig.schema)
  @IsArray()
  @IsInstance(UnionSchema, {
    each: true
  })
  @ValidateNested()
  union: UnionSchema[]
}

export default RootSchema
