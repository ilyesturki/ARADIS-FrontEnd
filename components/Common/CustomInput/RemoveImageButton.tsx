import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const RemoveImageButton = ({
  handleDelete,
  className,
  fontClassName,
}: {
  handleDelete: () => void;
  className?: string;
  fontClassName?: string;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleDelete();
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-2 right-2 z-10 flex justify-center items-center w-5 h-5 rounded-full bg-error shadow-[0_0_5px] shadow-greenAccent-900 ${className}`}
    >
      <FontAwesomeIcon
        icon={faTrash}
        className={`text-[10px] text-grayscale-100 ${fontClassName}`}
      />
    </button>
  );
};

export default RemoveImageButton;
