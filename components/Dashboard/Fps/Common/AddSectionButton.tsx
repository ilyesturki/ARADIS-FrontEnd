import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddSectionButton = ({
  addNewDefensiveAction,
}: {
  addNewDefensiveAction: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addNewDefensiveAction();
  };

  return (
    <div className="flex items-center justify-between py-1">
      <hr className="w-5/12 border-greenAccent-900 opacity-60" />
      <button
        onClick={handleClick}
        className="flex justify-center items-center w-7 aspect-1 rounded-full bg-greenAccent-900 opacity-80 shadow-[0_0_5px] shadow-greenAccent-900"
      >
        <FontAwesomeIcon icon={faPlus} className="text-sm text-grayscale-100" />
      </button>

      <hr className=" w-5/12 border-greenAccent-900 opacity-60" />
    </div>
  );
};

export default AddSectionButton;
