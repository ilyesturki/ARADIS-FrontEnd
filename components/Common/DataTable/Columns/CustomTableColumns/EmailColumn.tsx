import { Row } from "@tanstack/react-table";
import { FpsSelectedUsersColumn } from "../FpsSelectedUsersColumn";
import { Users } from "../UsersColumn";

const EmailColumn = ({
  row,
}: {
  row: Row<Users | FpsSelectedUsersColumn>;
}) => {
  const email = row.getValue("email") as string;
  return (
    <div className="">
      <span className="flex text-sm font-medium text-grayscale-500">
        {email}
      </span>
    </div>
  );
};

export default EmailColumn;
