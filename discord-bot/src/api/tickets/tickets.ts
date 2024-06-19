import axios from "../../core/axios";
import {
  CreateTicketFormDto,
  Ticket,
  UpdateTicketFormDto,
} from "./dto/tickets.dto";

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

export const updateTicketById = async (
  id: string,
  values: UpdateTicketFormDto,
  token: string,
): Promise<Ticket | null> => {
  try {
    const updatedTicket = await axios.put(`/tickets/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return updatedTicket.data;
  } catch (error) {
    if (axios.isAxiosError(error)) handleAxiosError(error, "update ticket");
    else handleUnexpectedError(error, "update ticket");

    return null;
  }
};

export const getTicketById = async (
  id: string,
  token: string,
): Promise<Ticket | null> => {
  try {
    const ticket = await axios.get(`/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return ticket.data;
  } catch (error) {
    if (axios.isAxiosError(error)) handleAxiosError(error, "get ticket by id");
    else handleUnexpectedError(error, "get ticket by id");

    return null;
  }
};
