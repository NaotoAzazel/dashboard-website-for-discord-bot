import { cn } from "@/lib/utils";

interface TicketsContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TicketsContainer({
  className,
  children,
  ...props
}: TicketsContainerProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
