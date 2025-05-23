import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveImageButton from "./RemoveImageButton";

const CustomSelectImage = ({
  label,
  imagePlaceholder,
  image,
  handleImageChange,
  handleDelete,
  disabled,
}: {
  label: string;
  imagePlaceholder?: string;
  image: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete?: (i?: number) => void;
  disabled?: boolean;
}) => {
  return (
    <div className=" w-full flex gap-4 items-center">
      <div
        className={`flex flex-col gap-2 w-full pt-2 pb-4 px-4 bg-grayscale-100 dark:bg-gray-900 dark:border-gray-700 border rounded-md  ${
          disabled && "bg-opacity-50"
        }`}
      >
        <span className=" text-[10px] font-semibold text-greenAccent-900  dark:text-gray-300">
          {label}
        </span>
        <div className="relative flex flex-col gap-4 justify-center items-center w-full aspect-1 bg-neutral-100 bg-opacity-40 dark:bg-gray-800 border-dashed border border-neutral-400 rounded-md">
          <input
            type="file"
            className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
            onChange={(e) => handleImageChange(e)}
          />
          {image ? (
            <>
              <img
                src={image}
                alt="image"
                className="w-full h-full object-cover rounded-sm"
              />
              {handleDelete && (
                <RemoveImageButton handleDelete={handleDelete} />
              )}
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faImage}
                className="text-5xl text-neutral-400"
              />
              <p className="text-sm md:text-xs lg:text-sm font-medium text-neutral-400">
                {imagePlaceholder}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSelectImage;
