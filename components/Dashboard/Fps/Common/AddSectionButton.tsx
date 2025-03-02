import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddSectionButton = ({ addNewSection }: { addNewSection: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addNewSection();
  };

  return (
    <div className="flex items-center justify-between py-1">
      <hr className="w-5/12 border-grayscale-500 opacity-60" />
      <button
        onClick={handleClick}
        className="flex justify-center items-center w-7 aspect-1 rounded-full bg-grayscale-500 opacity-80 shadow-[0_0_5px] shadow-grayscale-500"
      >
        <FontAwesomeIcon icon={faPlus} className="text-sm text-grayscale-100" />
      </button>

      <hr className=" w-5/12 border-grayscale-500 opacity-60" />
    </div>
  );
};

export default AddSectionButton;
