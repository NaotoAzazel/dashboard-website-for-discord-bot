import { ILoginResponseDto } from "../../api/auth/dto/auth.dto";

export interface IAuthService {
  setApiToken(dto: ILoginResponseDto): void;
  getApiToken(): string | undefined;
}
