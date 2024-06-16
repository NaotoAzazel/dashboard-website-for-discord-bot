import { ApiAuthButton } from "./_components/api-auth-button";
import { GetTicketButton } from "./_components/get-tickets-button";

import { TicketsHolder } from "./_components/tickets-holder";

export default async function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col gap-6 p-12">
        <TicketsHolder />
        <div className="flex items-center gap-2">
          <ApiAuthButton />
          <GetTicketButton />
        </div>
      </div>
    </div>
  );
}
