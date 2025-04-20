import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TagDescriptionField from "./TagDescriptionField";

const TagDescription = ({
  zone,
  machine,
  equipment,
  userImage,
  fullName,
}: {
  dialogMode?: boolean;
  zone: string;
  machine: string;
  equipment: string;
  userImage?: string;
  fullName: string;
}) => {
  return (
    <div className="flex flex-col gap-3.5 py-5">
      {/* {dialogMode && (
        <>
          <TagDescriptionField title="Current Step :" value={currentStep} />
          <TagDescriptionField title="Ref :" value={ref} />
        </>
      )} */}
      <TagDescriptionField title="Zone :" value={zone} />

      <TagDescriptionField title="Machine :" value={machine} />
      <TagDescriptionField title="Equipment :" value={equipment} />
      <TagDescriptionField title="Created By :" value={fullName}>
        {userImage && (
          <Avatar className={`w-[18px] h-[18px] mr-1`}>
            <AvatarImage src={userImage} />
            <AvatarFallback className="text-xl font-medium text-grayscale-500 text-opacity-50 capitalize">
              {fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
      </TagDescriptionField>
    </div>
  );
};

export default TagDescription;
