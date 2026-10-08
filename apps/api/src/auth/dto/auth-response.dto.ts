import { Role } from '../enums/role.enum';

export class UserPayloadDto {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string | null;
  avatar?: string | null;
  isVerified?: boolean;
}

export class AuthResponseDto {
  accessToken: string;
  user: UserPayloadDto;
}
