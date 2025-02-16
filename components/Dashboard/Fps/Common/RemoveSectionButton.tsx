import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const RemoveSectionButton = ({
  removeDefensiveAction,
}: {
  removeDefensiveAction: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeDefensiveAction();
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center w-5 aspect-1 rounded-full bg-greenAccent-900 opacity-80 shadow-[0_0_5px] shadow-greenAccent-900"
    >
      <FontAwesomeIcon
        icon={faTrash}
        className="w-4 h-4 text-[10px] text-grayscale-100"
      />
    </button>
  );
};

export default RemoveSectionButton;
