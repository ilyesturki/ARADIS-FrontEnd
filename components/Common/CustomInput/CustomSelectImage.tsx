import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomSelectImage = ({
  label,
  image,
  handleImageChange,
}: {
  label: string;
  image: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className=" w-full flex gap-4 items-center">
      <div className="flex flex-col gap-2 w-full pt-2 pb-4 px-4 bg-grayscale-100 shadow-[0px_0px_2px] shadow-greenAccent-900  rounded-md">
        <span className=" text-[10px] font-semibold text-greenAccent-900 ">
          {label}
        </span>
        <div className="relative flex flex-col gap-4 justify-center items-center w-full aspect-1 bg-grayscale-300 bg-opacity-40 border-dashed border-[1px] border-greenAccent-900 shadow-[0px_0px_1px] shadow-greenAccent-900 rounded-sm">
          <input
            type="file"
            className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
            onChange={(e) => handleImageChange(e)}
          />
          {image ? (
            <img
              src={image}
              alt="image"
              className="w-full h-full object-cover rounded-sm"
            />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faImage}
                className="text-5xl text-greenAccent-900 opacity-50"
              />
              <p className="text-sm font-medium text-greenAccent-900 opacity-50">
                Drop your image here, or browse
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSelectImage;
