import { IsIn, IsString } from "class-validator";

export class UnionTypeDetectorOpts {
  @IsString()
  selector: string

  @IsIn(['MATCHES', 'NOT_MATCHES'])
  type: 'MATCHES' | 'NOT_MATCHES'
}

export default UnionTypeDetectorOpts
