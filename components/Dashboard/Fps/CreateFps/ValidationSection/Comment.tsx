"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RemoveSectionButton from "../../Common/RemoveSectionButton";
import RatingStars from "./RatingStars";
import EditButton from "@/components/Common/CustomInput/EditButton";

const Comment = ({
  userName,
  userRole,
  image,
  rating,
  value,
  onChange,
  placeholder,
  date,
  disabled,
  handleDeleteSection,
  customRatingChange,
  editRating,
  handleSaveComment,
  buttonTitle,
}: {
  userName: string;
  userRole: string;
  image?: string;
  rating: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  date?: string;
  disabled?: boolean;
  handleDeleteSection?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  customRatingChange: (rating: number) => void;
  editRating?: boolean;
  handleSaveComment?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonTitle?: string;
}) => {
  const formattedDate = date
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(date))
    : "";
  return (
    <div className=" flex flex-col items-end gap-1 py-4">
      <div className="relative w-full pl-3 sm:pl-4 pr-2 bg-grayscale-100 border-[1px]   border-grayscale-400 shadow-[0px_0px_3px] shadow-grayscale-400 rounded-lg">
        <div className="py-2 sm:py-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-[8px] sm:text-xs font-semibold text-greenAccent-900">
              <span className="capitalize">{userName}</span>&apos;s comment
            </span>

            {handleDeleteSection && (
              <RemoveSectionButton
                handleDelete={(e) => handleDeleteSection(e)}
                className="!w-[16px] sm:!w-[18px]"
              />
            )}
          </div>
          <span className="text-[7px] sm:text-[10px] font-semibold capitalize text-grayscale-500 text-opacity-60">
            {userRole} - {formattedDate && `( ${formattedDate} )`}
          </span>
          <RatingStars
            rating={rating}
            customRatingChange={customRatingChange}
            isEdit={editRating}
          />
        </div>
        <textarea
          id=""
          value={value}
          onChange={onChange}
          placeholder={placeholder && placeholder}
          disabled={disabled}
          className=" w-full h-12 sm:h-16 min-h-12 py-2 text-xs sm:text-sm font-normal placeholder-grayscale-500 placeholder-opacity-70 bg-transparent outline-none"
        ></textarea>

        <Avatar className="absolute -right-5 -top-5 h-14 w-14 sm:h-16 sm:w-16 rounded-full border-[2px] border-grayscale-400 shadow-[0px_0px_4px] shadow-grayscale-400">
          <AvatarImage src={image} alt="user image" />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </div>
      {!disabled && (
        <EditButton title={buttonTitle || "Save"} onClick={handleSaveComment} />
      )}
    </div>
  );
};

export default Comment;
