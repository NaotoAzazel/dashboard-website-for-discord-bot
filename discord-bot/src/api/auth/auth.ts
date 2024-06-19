import axios from "../../core/axios";
import { ILoginFormDto, ILoginResponseDto } from "./dto/auth.dto";

import {
  handleAxiosError,
  handleUnexpectedError,
} from "../../libs/error-handler";

export const login = async (
  values: ILoginFormDto,
): Promise<ILoginResponseDto | null> => {
  try {
    const { data } = await axios.post("/auth/login", values);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error))
      handleAxiosError(error, "authorize api token");
    else handleUnexpectedError(error, "authorize api token");

    return null;
  }
};
