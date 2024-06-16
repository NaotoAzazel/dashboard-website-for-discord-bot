"use client";

import { TicketCard } from "@/components/cards/ticket-card";
import { TicketsContainer } from "./tickets-container";

import * as Api from "@/lib/api";
import { Ticket } from "@/lib/api/tickets/dto/tickets.dto";
import { useEffect, useState } from "react";

export function TicketsHolder() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    try {
      const allTickets = await Api.tickets.getAll();
      setTickets(allTickets);
    } catch (error) {
      console.warn("Error while fetching tickets", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <TicketsContainer>
      {tickets.length ? (
        <>
          {tickets.map((ticket, i) => (
            <TicketCard ticket={ticket} key={i} />
          ))}
        </>
      ) : (
        <h1>Тикетов не найдено</h1>
      )}
    </TicketsContainer>
  );
}
