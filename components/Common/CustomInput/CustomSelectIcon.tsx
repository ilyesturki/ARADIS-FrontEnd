import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditButton from "./EditButton";

const CustomSelectIcon = ({
  image,
  handleImageChange,
  children,
  disabled,
}: {
  image: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <div className=" flex gap-4 items-center">
      <Avatar className=" relative w-24 h-24 border-[3px] outline-2 outline-dotted outline-greenAccent-900">
        <input
          type="file"
          className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
          onChange={(e) => handleImageChange(e)}
          disabled={disabled}
        />
        <AvatarImage src={image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {children}
    </div>
  );
};

export default CustomSelectIcon;
