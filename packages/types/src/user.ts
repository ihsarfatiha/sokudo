import { UserRole, UserStatus } from './enums.js';
import { IAddress } from './address.js';

/**
 * Core User entity interface.
 */
export interface IUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  emailVerifiedAt?: string | Date | null;
  phoneVerifiedAt?: string | Date | null;
  addresses?: IAddress[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Public User profile (safe for public exposure).
 */
export interface IUserPublicProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string | Date;
}

/**
 * DTO for User registration.
 */
export interface RegisterDto {
  email: string;
  name: string;
  password?: string;
  phone?: string;
  role?: UserRole;
}

/**
 * DTO for User login.
 */
export interface LoginDto {
  email: string;
  password?: string;
  otp?: string;
}

/**
 * DTO for OTP verification.
 */
export interface VerifyOtpDto {
  email: string;
  otp: string;
}

/**
 * Authentication response containing tokens and user session data.
 */
export interface AuthResponseDto {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  user: IUser;
}

/**
 * DTO for updating user profile.
 */
export interface UpdateUserDto {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}

/**
 * DTO for updating user password.
 */
export interface ChangePasswordDto {
  currentPassword?: string;
  newPassword: string;
}
