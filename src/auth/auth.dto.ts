import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { LoginRequest, RegisterRequest } from '../../proto/auth.pb';
import * as i18next from 'i18next';

export class RegisterDto implements RegisterRequest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'username' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'username' }) })
  public readonly username: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'nickname' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'nickname' }) })
  public readonly nickname: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'password' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'password' }) })
  public readonly password: string;

  @IsEmail({ allow_ip_domain: false }, { message: () => i18next.t('validation.INVALID_EMAIL') })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'email' }) })
  public readonly email: string;
}

export class LoginDto implements LoginRequest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'email' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'email' }) })
  public readonly email: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'password' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'password' }) })
  public readonly password: string;

  @IsBoolean({ message: () => i18next.t('validation.INVALID_BOOLEAN', { field: 'remember' }) })
  public readonly remember: boolean;
}
