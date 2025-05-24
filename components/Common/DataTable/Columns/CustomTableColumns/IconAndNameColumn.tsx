import { Row } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "../UsersColumn";
import { FpsSelectedUsersColumn } from "../FpsSelectedUsersColumn";

const IconAndNameColumn = ({
  row,
  className,
}: {
  row: Row<Users> | Row<FpsSelectedUsersColumn>;
  className?: string;
}) => {
  const image = row.original.image as string;
  const firstName = row.getValue("firstName") as string;
  const lastName = row.original.lastName as string;
  return (
    <div className=" flex items-center gap-4 pl-4">
      <Avatar
        className={`w-12 h-12 border-4 outline-2 outline-dotted outline-grayscale-500 dark:border dark:outline-grayscale-100 ${className}`}
      >
        <AvatarImage src={image} />
        <AvatarFallback className="text-xl font-medium text-grayscale-500 text-opacity-50 capitalize dark:text-grayscale-100 dark:bg-grayscale-500 dark:bg-opacity-50 dark:text-opacity-80">
          {firstName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="flex text-sm font-medium text-grayscale-600 dark:text-grayscale-100 dark:text-opacity-80 capitalize">
        {`${firstName} ${lastName}`}
      </span>
    </div>
  );
};

export default IconAndNameColumn;
