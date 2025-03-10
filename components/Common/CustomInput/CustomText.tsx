const CustomText = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className="w-full px-4 py-3 bg-redAccent-900 bg-opacity-10 shadow-[0px_0px_2px] shadow-redAccent-900  rounded-md flex justify-center items-center">
      <h2 className="text-center text-sm font-bold text-redAccent-900">
        {title}
      </h2>
    </div>
  );
};

export default CustomText;
