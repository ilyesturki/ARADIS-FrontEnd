const FpsDescriptionField = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-greenAccent-900">{title}</span>
      <span className="text-sm font-medium text-neutral-500">{value}</span>
    </div>
  );
};

export default FpsDescriptionField;
