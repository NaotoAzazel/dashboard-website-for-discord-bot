import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError, action: string) => {
  if (error.response) {
    console.error(
      `Server responded with error while trying to ${action}`,
      error.response.statusText,
    );
  } else if (error.request) {
    console.error(
      `No response received from the server while trying to ${action}`,
      "",
    );
  } else {
    console.error(
      `Error in setting up the request while trying to ${action}`,
      error.message,
    );
  }
};

export const handleUnexpectedError = (error: unknown, action: string) => {
  console.error(`Unexpected error while trying to ${action}`, error);
};
