import axios from "../../core/axios";
import { CreateTicketFormDto, Ticket } from "./dto/tickets.dto";

import { logError } from "../../libs/console-logger";

export const createTicket = async (
  values: CreateTicketFormDto,
  token: string = "",
): Promise<Ticket | null> => {
  try {
    const createdTicket = await axios.post("/tickets", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return createdTicket.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        logError("Server responded with error:", error.response.statusText);
      } else if (error.request) {
        logError("No response received from the server:", error);
      } else {
        logError("Error in setting up the request:", error.message);
      }
    } else {
      logError("Unexpected error when trying to create ticket:", error);
    }

    return null;
  }
};
