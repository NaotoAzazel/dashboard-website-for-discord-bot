import { ILoginResponseDto } from "../../api/auth/dto/auth.dto";

export interface IAuthService {
  ckeckTokenAndRefreshIfNeeded(): Promise<void>;
  isApiAuth(): boolean;

  setApiToken(dto: ILoginResponseDto): void;
  getApiToken(): string | undefined;
}
