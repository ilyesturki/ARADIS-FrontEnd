import RemoveSectionButton from "./RemoveSectionButton";

const CustomSectionHeader = ({
  title,
  i,
  handleDeleteSection,
  disabled,
}: {
  title: string;
  i?: number;
  handleDeleteSection?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between px-1">
      <span className="text-sm font-bold capitalize text-grayscale-500">
        {title} {i !== undefined ? `N°${i + 1}` : ""}
      </span>
      {!disabled && handleDeleteSection && (
        <RemoveSectionButton handleDelete={() => handleDeleteSection()} />
      )}
    </div>
  );
};

export default CustomSectionHeader;
