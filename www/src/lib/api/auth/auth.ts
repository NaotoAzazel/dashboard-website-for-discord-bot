import axios from "@/core/axios";
import { ILoginFormDto, ILoginResponseDto } from "./dto/auth.dto";

export const login = async (
  values: ILoginFormDto,
): Promise<ILoginResponseDto> => {
  const { data } = await axios.post("/auth/login", values);
  return data;
};
