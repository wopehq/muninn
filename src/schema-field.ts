import { Type } from "class-transformer"
import { IsArray, IsInstance, IsOptional, IsString, ValidateNested } from "class-validator"
import { UnionSchema } from "./schema"
import Selector from "./selector"

export class SchemaField {
  @IsString()
  name: string

  @Type(() => Selector)
  @IsInstance(Selector)
  @ValidateNested()
  selector: Selector

  @Type(() => UnionSchema)
  @IsOptional()
  @IsArray()
  @IsInstance(UnionSchema, {
    each: true
  })
  @ValidateNested()
  union: UnionSchema[]
}

export default SchemaField
