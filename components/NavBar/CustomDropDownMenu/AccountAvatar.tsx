import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const AccountAvatar = ({ image }: { image?: string }) => {
  return (
    <Avatar className="w-11 h-11 rounded-full border-[3px] outline-2 outline-dotted outline-greenAccent-600 cursor-pointer">
      <AvatarImage
        src={image || "https://github.com/shadcn.png"}
        className="rounded-full"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AccountAvatar;
