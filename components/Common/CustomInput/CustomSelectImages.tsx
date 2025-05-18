"use client";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveImageButton from "./RemoveImageButton";

const CustomSelectImages = ({
  label,
  imageCover,
  images,
  handleImageChange,
  handleDeleteImages,
  disabled,
  viewOnly,
}: {
  label: string;
  imageCover: string;
  images: string[];
  handleImageChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
  handleDeleteImages?: (i?: number) => void;
  disabled?: boolean;
  viewOnly?: boolean;
}) => {
  return (
    <div className="w-full flex gap-4 items-center">
      <div
        className={`flex flex-col gap-2 w-full pt-2 pb-4 px-4 bg-grayscale-100   dark:bg-gray-900  dark:border-gray-700  border rounded-md ${
          disabled && "bg-opacity-50"
        }`}
      >
        <span className="text-[10px] font-semibold text-greenAccent-900  dark:text-gray-300">
          {label}
        </span>

        <div className="w-full grid gap-3">
          <div
            className={`relative flex flex-col gap-4 justify-center items-center w-full aspect-1 bg-grayscale-300  dark:text-gray-300  bg-opacity-40 ${
              viewOnly
                ? "border"
                : "border-dashed border-[1px] border-grayscale-500 shadow-[0px_0px_1px] shadow-grayscale-500  dark:text-gray-300 "
            } rounded-sm`}
          >
            <input
              type="file"
              className={`absolute w-full h-full z-10 opacity-0 ${
                disabled && !viewOnly ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onChange={(e) => handleImageChange?.(e)}
              disabled={disabled}
            />
            {imageCover ? (
              <>
                <img
                  src={imageCover}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-sm"
                />
                {handleDeleteImages && !disabled && (
                  <RemoveImageButton handleDelete={handleDeleteImages} />
                )}
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-5xl text-grayscale-500  dark:text-gray-300  opacity-50"
                />
                {!viewOnly && (
                  <p className="text-sm font-medium text-grayscale-500  dark:text-gray-300  opacity-50">
                    Drop your image here, or browse
                  </p>
                )}
              </>
            )}
          </div>
          <div className="w-full grid grid-cols-5 gap-3">
            {new Array(5).fill("").map((_, i) => (
              <div
                key={i}
                className={`relative flex justify-center items-center w-full aspect-1 bg-grayscale-300 bg-opacity-40 ${
                  viewOnly
                    ? "border"
                    : "border-dashed border-[1px] border-grayscale-500  shadow-[0px_0px_1px] shadow-grayscale-500"
                } rounded-sm`}
              >
                <input
                  type="file"
                  className={`absolute w-full h-full z-10 opacity-0 ${
                    disabled && !viewOnly
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onChange={(e) => handleImageChange?.(e, i)}
                  disabled={disabled}
                />
                {images[i] ? (
                  <>
                    <img
                      src={images[i]}
                      alt={`Image ${i}`}
                      className="w-full h-full object-cover rounded-sm"
                    />
                    {handleDeleteImages && !disabled && (
                      <RemoveImageButton
                        handleDelete={() => handleDeleteImages(i)}
                        className="!top-0.5 !right-0.5 !w-4 !h-4"
                        fontClassName=" !text-[8px]"
                      />
                    )}
                  </>
                ) : (
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-xl text-grayscale-500  dark:text-gray-300  opacity-50"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSelectImages;
