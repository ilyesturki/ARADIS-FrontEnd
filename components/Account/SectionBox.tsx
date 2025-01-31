const SectionBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className=" grid grid-cols-[1fr,2fr] py-8 px-5 bg-grayscale-200 rounded-xl shadow-[0_0_3px] shadow-grayscale-400">
      <div className="">
        <h3 className=" text-base font-semibold text-greenAccent-900">
          {title}
        </h3>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default SectionBox;
