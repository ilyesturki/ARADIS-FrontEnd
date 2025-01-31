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
    <div className=" max-w-full mx-auto px-8 py-6 bg-grayscale-200 rounded-xl shadow-[0_0_3px] shadow-greenAccent-900 ">
      <div className=" py-4 text-center">
        <h1 className=" text-3xl font-semibold text-greenAccent-900 text-opacity-70 ">
          {title}
        </h1>
        <p className=" text-sm font-normal text-grayscale-500 pt-3">
          {subTitle}
        </p>
      </div>
      {children}
    </div>
  );
};

export default CustomAuthPage;
