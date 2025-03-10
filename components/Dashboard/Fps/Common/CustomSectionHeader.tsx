import RemoveSectionButton from "./RemoveSectionButton";

const CustomSectionHeader = ({
  title,
  i,
  handleDeleteSection,
  disabled,
}: {
  title: string;
  i: number;
  handleDeleteSection: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between px-2">
      <span className="text-sm font-bold capitalize text-grayscale-500">
        {title} N°{i + 1}
      </span>
      {!disabled && (
        <RemoveSectionButton handleDelete={() => handleDeleteSection()} />
      )}
    </div>
  );
};

export default CustomSectionHeader;
