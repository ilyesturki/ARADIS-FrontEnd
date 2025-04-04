import { Row } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "../UsersColumn";
import { FpsSelectedUsersColumn } from "../FpsSelectedUsersColumn";

const IconAndNameColumn = ({
  row,
  className,
}: {
  row: Row<Users | FpsSelectedUsersColumn>;
  className?: string;
}) => {
  const image = row.original.image as string;
  const title = row.getValue("firstName") as string;
  return (
    <div className=" flex items-center gap-4 pl-4">
      <Avatar
        className={`w-12 h-12 border-4 outline-2 outline-dotted outline-grayscale-500 ${className}`}
      >
        <AvatarImage src={image} />
        <AvatarFallback className="text-xl font-medium text-grayscale-500 text-opacity-50 capitalize">
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
