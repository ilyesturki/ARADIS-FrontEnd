import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FpsDescriptionField from "./FpsDescriptionField";

const FpsDescription = ({
  dialogMode,
  currentStep,
  ref,
  where,
  when,
  userImage,
  fullName,
  clientRisk,
}: {
  dialogMode?: boolean;
  currentStep: string;
  ref: string;
  where: string;
  when: string;
  userImage?: string;
  fullName: string;
  clientRisk: string;
}) => {
  return (
    <div className="flex flex-col gap-3.5 py-5">
      {dialogMode && (
        <>
          <FpsDescriptionField title="Current Step :" value={currentStep} />
          <FpsDescriptionField title="Ref :" value={ref} />
        </>
      )}
      <FpsDescriptionField title="Client Risk :" value={clientRisk} />

      <FpsDescriptionField title="Where :" value={where} />
      <FpsDescriptionField title="When :" value={when} />
      <FpsDescriptionField title="Created By :" value={fullName}>
        {userImage && (
          <Avatar className={`w-[18px] h-[18px] mr-1`}>
            <AvatarImage src={userImage} />
            <AvatarFallback className="text-xl font-medium text-grayscale-500 text-opacity-50 capitalize">
              {fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
      </FpsDescriptionField>
    </div>
  );
};

export default FpsDescription;
