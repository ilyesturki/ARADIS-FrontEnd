import { Row } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "../UsersColumn";

const IconAndNameColumn = ({ row }: { row: Row<Users> }) => {
  const image = row.original.image as string;
  const title = row.getValue("firstName") as string;
  return (
    <div className=" flex items-center gap-6 pl-4">
      <Avatar className=" w-14 h-14 border-4 outline-2 outline-dotted outline-greenAccent-900">
        <AvatarImage src={image} />
        <AvatarFallback className=" text-xl font-medium text-greenAccent-900 text-opacity-50 capitalize">
          {title?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="flex text-sm font-medium text-grayscale-600 capitalize">
        {title}
      </span>
    </div>
  );
};

export default IconAndNameColumn;
