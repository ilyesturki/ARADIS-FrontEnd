import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuContent from "./MenuContent";
import AccountAvatar from "./AccountAvatar";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/NextAuth/authOptions";

const AccountDropDownMenu = async () => {
  const session = await getServerSession(authOptions);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AccountAvatar image={session?.user?.image} />
      </DropdownMenuTrigger>

      <MenuContent role="admin" />
      {/* role={session?.user?.role} */}
    </DropdownMenu>
  );
};

export default AccountDropDownMenu;
