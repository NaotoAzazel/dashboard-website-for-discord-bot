import axios from "../../core/axios";
import { CreateTicketFormDto, Ticket } from "./dto/tickets.dto";

import {
  handleAxiosError,
  handleUnexpectedError,
} from "../../libs/error-handler";

export const createTicket = async (
  values: CreateTicketFormDto,
  token: string,
): Promise<Ticket | null> => {
  try {
    const createdTicket = await axios.post("/tickets", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return createdTicket.data;
  } catch (error) {
    if (axios.isAxiosError(error)) handleAxiosError(error, "create ticket");
    else handleUnexpectedError(error, "create ticket");

    return null;
  }
};
