const FpsDescriptionField = ({
  title,
  value,
  children,
}: {
  title: string;
  value: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-wrap items-center">
      <span className="mr-2 text-sm font-semibold text-greenAccent-900 text-opacity-80">
        {title}
      </span>
      {children && children}
      <span className="text-sm font-medium text-neutral-500">{value}</span>
    </div>
  );
};

export default FpsDescriptionField;
