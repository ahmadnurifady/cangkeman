export class CreateUserDto {
    readonly id: string;
    readonly userName: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly totalCoin: number;
}

export class UpdateUserDto {
    readonly userName?: string;
    readonly email?: string;
    readonly password?: string;
    readonly role?: string;
    readonly totalCoin?: number;
}
  