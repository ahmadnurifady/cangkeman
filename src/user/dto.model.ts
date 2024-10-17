export class CreateUserDto {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  totalCoin: number;
  city: string;
}

export class UpdateUserDto {
  userName?: string;
  email?: string;
  role?: string;
  totalCoin?: number;
  city?: string;
  coinThisYear?: number;
  totalPost?: number;
}
