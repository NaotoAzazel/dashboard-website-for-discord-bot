"use client";

import { Button } from "@/components/ui/button";

import * as Api from "@/lib/api";

export function GetTicketButton() {
  const onClick = async () => {
    try {
      const tickets = await Api.tickets.getAll();
      console.log(tickets);
    } catch (error) {
      console.warn("Error while fetching tickets", error);
    }
  };

  return <Button onClick={onClick}>Get tickets</Button>;
}
