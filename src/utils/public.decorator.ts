import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Pastikan PUBLIC_KEY diambil dengan menggunakan ConfigService
export const Public = () => {
  const configService = new ConfigService();
  const IS_PUBLIC_KEY = configService.get<string>('PUBLIC_KEY');
  return SetMetadata(IS_PUBLIC_KEY, true);
};
