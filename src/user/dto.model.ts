export class CreateUserDto {
  id: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  totalCoin: number;
}

export class UpdateUserDto {
  userName?: string;
  email?: string;
  role?: string;
  totalCoin?: number;
}
