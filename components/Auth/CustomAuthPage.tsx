const CustomAuthPage = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-grayscale-500 uppercase mt-4">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </>
  );
};

export default CustomAuthPage;
