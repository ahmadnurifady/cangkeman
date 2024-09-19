import { HttpStatus } from '@nestjs/common';

export class responseApi {
  message: string;
  code: HttpStatus;
  data?: any;
}
