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
    // <span
    //   className={`
    // block px-1.5 py-1  bg-opacity-10 text-[11px] font-semibold ${
    //   status === "Securite"
    //     ? "bg-redAccent-800 text-redAccent-800 border-redAccent-800"
    //     : "bg-greenAccent-800 text-greenAccent-800 border-greenAccent-800"
    // } border  rounded-md
    // `}
    // >
    //   {status}
    // </span>
  );
};

export default FpsStatus;
