const EditButton = ({
  title,
  onClick,
  disabled,
}: {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={` py-2 px-4 text-sm font-semibold text-grayscale-100 bg-grayscale-500 rounded-sm ${
        disabled && "opacity-50"
      }`}
    >
      {title}
    </button>
  );
};

export default EditButton;
