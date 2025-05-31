import { Badge } from "@/components/ui/badge";

const FpsStatus = ({ status }: { status: string }) => {
  return (
    <Badge
      variant={status === "Securite" ? "destructive" : "default"}
      className={`block px-1.5 py-1  ${
        status === "Securite" ? "bg-redAccent-800" : "bg-greenAccent-800"
      } `}
    >
      {status}
    </Badge>

  );
};

export default FpsStatus;
