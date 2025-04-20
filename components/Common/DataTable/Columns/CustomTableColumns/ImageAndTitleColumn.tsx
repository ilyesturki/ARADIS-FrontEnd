import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ImageAndTitleColumn = ({ data }: { data: any }) => {
  const image = data.image as string;
  const title = data.type as string;
  return (
    <div className=" flex items-center gap-6 pl-4">
      <Avatar className="w-12 h-12 border-4 outline-2 outline-dotted outline-grayscale-500">
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

export default ImageAndTitleColumn;
