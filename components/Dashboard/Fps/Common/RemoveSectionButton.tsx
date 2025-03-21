import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const RemoveSectionButton = ({
  handleDelete,
  className,
}: {
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleDelete(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center w-5 aspect-1 rounded-full bg-redAccent-900 bg-opacity-90 shadow-[0_0_3px] shadow-grayscale-500 ${className}`}
    >
      <FontAwesomeIcon
        icon={faTrash}
        className="w-3 h-3 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] text-grayscale-100"
      />
    </button>
  );
};

export default RemoveSectionButton;
