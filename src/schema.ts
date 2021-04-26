import { Type } from "class-transformer"
import { IsArray, IsInstance, IsOptional, IsString, ValidateNested } from "class-validator"
import SchemaField from "./schema-field"
import UnionTypeDetectorOpts from "./union-type-detector-opts"

export class Schema<T = any> {
  @IsString()
  @IsOptional()
  description: string = null

  @Type(() => SchemaField)
  @IsArray()
  @IsInstance(SchemaField, {
    each: true
  })
  @ValidateNested()
  fields: SchemaField[]
}

export class UnionSchema {
  @IsString()
  typeName: string

  @Type(() => Schema)
  @IsInstance(Schema)
  @ValidateNested()
  schema: Schema

  @Type(() => UnionTypeDetectorOpts)
  @IsInstance(UnionTypeDetectorOpts)
  @ValidateNested()
  detector: UnionTypeDetectorOpts
}

export default Schema
