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
        if (err instanceof HttpException) {
          const status = err.getStatus();
          const errorResponse = err.getResponse();

          const message =
            typeof errorResponse === 'string'
              ? errorResponse
              : (errorResponse as Record<string, unknown>).message ||
                'An error occurred';

          return throwError(
            () =>
              new HttpException(
                {
                  statusCode: status,
                  message,
                  data: null,
                },
                status,
              ),
          );
        } else {
          return throwError(
            () =>
              new HttpException(
                {
                  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: 'Internal server error',
                  data: null,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }
      }),
    );
  }
}
