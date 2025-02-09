const CustomAuthPage = ({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}) => {
  return (
    <div className=" max-w-full px-8 py-6  rounded-lg ">
      <div className=" py-4 text-center">
        <h1 className=" text-2xl font-semibold text-greenAccent-900 text-opacity-70 ">
          {title}
        </h1>
        <p className=" text-sm font-normal text-grayscale-400 pt-3">
          {subTitle}
        </p>
      </div>
      {children}
    </div>
  );
};

export default CustomAuthPage;
