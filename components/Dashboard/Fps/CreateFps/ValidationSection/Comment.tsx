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
  i,
  handleDeleteSection,
  customRatingChange,
  editRating,
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
  i: number;
  handleDeleteSection?: () => void;
  customRatingChange: (rating: number) => void;
  editRating?: boolean;
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
    <div className=" flex flex-col items-end gap-2 py-4">
      <div className="relative w-full pl-4 pr-2 bg-grayscale-100 border-[1px] border-grayscale-400 shadow-[0px_0px_4px] shadow-grayscale-400 rounded-lg">
        <div className="py-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-greenAccent-900">
              <span className="capitalize">{userName}</span>'s comment
            </span>

            {handleDeleteSection && (
              <RemoveSectionButton
                handleDelete={() => handleDeleteSection()}
                className="!w-[18px]"
              />
            )}
          </div>
          <span className="text-[10px] font-semibold capitalize text-grayscale-500 text-opacity-60">
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
          className=" w-full h-16 min-h-12 py-2 text-sm font-normal placeholder-grayscale-500 placeholder-opacity-70 bg-transparent outline-none"
        ></textarea>

        <Avatar className="absolute -right-5 -top-5 h-16 w-16 rounded-full border-[2px] border-grayscale-400 shadow-[0px_0px_4px] shadow-grayscale-400">
          <AvatarImage src={image} alt="user image" />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </div>
      {!disabled && <EditButton title="Save" onClick={() => {}} />}
    </div>
  );
};

export default Comment;
