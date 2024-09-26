import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from 'express';

export interface ResponseGlobal<T> {
  statusCode: HttpStatus;
  message: string;
  data: T | null;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseGlobal<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseGlobal<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode,
        message: 'Request successfully processed',
        data,
      })),
      catchError((err) => {
        let statusCode: HttpStatus;
        let message: string;

        if (err instanceof HttpException) {
          statusCode = err.getStatus();
          const errorResponse = err.getResponse();

          // Pengecekan tipe dan gabungkan message dengan detail error jika ada
          if (typeof errorResponse === 'string') {
            message = errorResponse;
          } else if (
            typeof errorResponse === 'object' &&
            'message' in errorResponse
          ) {
            message = (errorResponse as Record<string, any>).message as string;
          } else {
            message = 'An error occurred';
          }
        } else {
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `${err.message || 'Internal server error'}`.trim(); // Gabungkan message dengan stack trace jika ada
        }

        // Mengirimkan response error dengan message yang digabungkan
        return throwError(
          () =>
            new HttpException(
              {
                statusCode,
                message,
                data: null,
              },
              statusCode,
            ),
        );
      }),
    );
  }
}
