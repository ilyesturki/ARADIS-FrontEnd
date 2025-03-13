import { Row } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "../UsersColumn";

const IconAndNameColumn = ({
  row,
  className,
}: {
  row: Row<Users>;
  className?: string;
}) => {
  const image = row.original.image as string;
  const title = row.getValue("firstName") as string;
  return (
    <div className=" flex items-center gap-6 pl-4">
      <Avatar
        className={`border-4 outline-2 outline-dotted outline-grayscale-500 w-14 h-14 ${className}`}
      >
        <AvatarImage src={image} />
        <AvatarFallback className=" text-xl font-medium text-grayscale-500 text-opacity-50 capitalize">
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
