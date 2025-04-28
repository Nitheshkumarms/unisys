
import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "error" | "info" | "neutral";

interface StatusBadgeProps {
  status: StatusType;
  text: string;
  pulsing?: boolean;
}

const statusColors = {
  success: "bg-uiscm-success text-white",
  warning: "bg-uiscm-warning text-white",
  error: "bg-uiscm-error text-white",
  info: "bg-uiscm-info text-white",
  neutral: "bg-gray-200 text-gray-800",
};

export const StatusBadge = ({ status, text, pulsing = false }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusColors[status],
        pulsing && "animate-pulse-opacity"
      )}
    >
      {pulsing && (
        <span className="mr-1.5 h-2 w-2 rounded-full bg-white" />
      )}
      {text}
    </span>
  );
};
