const CustomTabCard = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return <div className="py-4">{children}</div>;
};

export default CustomTabCard;
