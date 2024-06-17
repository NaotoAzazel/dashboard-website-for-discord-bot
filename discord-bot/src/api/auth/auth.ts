import axios from "../../core/axios";
import { ILoginFormDto, ILoginResponseDto } from "./dto/auth.dto";

import { logError } from "../../libs/console-logger";

export const login = async (
  values: ILoginFormDto,
): Promise<ILoginResponseDto | null> => {
  try {
    const { data } = await axios.post("/auth/login", values);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        logError(
          "Server responded with error, probably wrong password. Error:",
          error.response.statusText,
        );
      } else if (error.request) {
        logError("No response received from the server:", error.code);
      } else {
        logError("Error in setting up the request:", error.message);
      }
    } else {
      logError("Unexpected error when trying to login in api:", error);
    }

    return null;
  }
};
