import { SetMetadata } from '@nestjs/common';

// Pastikan PUBLIC_KEY diambil dengan menggunakan ConfigService
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
