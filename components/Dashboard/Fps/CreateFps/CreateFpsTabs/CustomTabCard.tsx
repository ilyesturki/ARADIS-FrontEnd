const CustomTabCard = ({
    title,
    children,
  }: {
    title: string;
    children?: React.ReactNode;
  }) => {
    return (
      <div className=" bg-[#F1F5F9] rounded-sm ">
        <div className=" px-4 py-2 border-b-[1px] border-grayscale-500 ">
          <h2 className=" text-xs text-grayscale-800 font-medium">{title}</h2>
        </div>
        <div className=" px-6 py-4">{children}</div>
      </div>
    );
  };
  
  export default CustomTabCard;
  