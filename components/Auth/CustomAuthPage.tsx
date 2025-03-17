

const CustomAuthPage = ({
  title,
  children,
}: {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}) => {

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setInputValues((prev) => ({ ...prev, [name]: value }));
  // };

  return (
    <>
      <h2 className="text-2xl font-bold text-grayscale-500 uppercase mt-4">
        {title}
      </h2>
      {children}
    </>
  );
};

export default CustomAuthPage;

{
  /* <div className=" max-w-full px-8 py-6  rounded-lg ">
      <div className=" py-4 text-center">
        <h1 className=" text-2xl font-semibold text-greenAccent-900 text-opacity-70 ">
          {title}
        </h1>
        <p className=" text-sm font-normal text-grayscale-400 pt-3">
          {subTitle}
        </p>
      </div>
      {children}
    </div> */
}
