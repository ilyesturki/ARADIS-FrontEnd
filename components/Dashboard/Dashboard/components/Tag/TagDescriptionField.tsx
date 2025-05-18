const TagDescriptionField = ({
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
      <span className="mr-2 text-sm font-semibold text-greenAccent-900  dark:text-grayscale-400 text-opacity-80">
        {title}
      </span>
      {children && children}
      <span className="text-sm font-medium text-neutral-500  dark:text-grayscale-300">{value}</span>
    </div>
  );
};

export default TagDescriptionField;
