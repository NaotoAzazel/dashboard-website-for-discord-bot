import axios from "@/core/axios";
import { Ticket } from "./dto/tickets.dto";

export const getAll = async (): Promise<Ticket[]> => {
  // TODO: добавить обработчик событий на ошибку в ответе от сервера
  const tickets = await axios.get("/tickets");
  return tickets.data;
};
