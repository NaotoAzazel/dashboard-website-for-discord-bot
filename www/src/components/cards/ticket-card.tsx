import { Ticket } from "@/lib/api/tickets/dto/tickets.dto";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="border rounded min-w-min">
      <div className="p-4 space-y-4">
        <h1 className="font-heading font-semibold text-lg">
          Тикет, id: {ticket._id}
        </h1>

        <div>
          <div className="gap-4 flex flex-row">
            <TicketAttribute heading="Тип" text={ticket.type} />
            <TicketAttribute
              heading="Айди автора"
              text={ticket.ticketOwnerId}
            />
            <TicketAttribute heading="Айди канала" text={ticket.channelId} />
          </div>
          <TicketAttribute heading="Описание" text={ticket.description} />
        </div>

        <div className="flex flex-row gap-2 justify-between">
          <Button size="sm" className="w-full">
            Закрыть тикет
          </Button>
          <Button size="sm" variant="destructive" className="w-10">
            <Icons.trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface TicketAttributeProps {
  text: string;
  heading: string;
}

function TicketAttribute({ text, heading }: TicketAttributeProps) {
  return (
    <div>
      <span className="text-muted-foreground">{heading}</span>
      <p>{text}</p>
    </div>
  );
}
