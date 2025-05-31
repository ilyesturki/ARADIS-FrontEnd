import { Badge } from "@/components/ui/badge";

const FpsStatus = ({ type }: { type: string }) => {
  return (
    <Badge
      variant={type === "Securite" ? "destructive" : "default"}
      className={`block px-1.5 py-1  ${
        type === "Securite" ? "bg-redAccent-800" : "bg-greenAccent-800"
      } `}
    >
      {type}
    </Badge>
   
  );
};

export default FpsStatus;
