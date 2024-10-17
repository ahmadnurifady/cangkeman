export class CreateUserDto {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: string;
  totalCoin: number;
  city: string;
}

export class UpdateUserDto {
  username?: string;
  ullname?: string;
  email?: string;
  role?: string;
  totalCoin?: number;
  city?: string;
  coinThisYear?: number;
  totalPost?: number;
}
