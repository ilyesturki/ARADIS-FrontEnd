import { LayoutGrid } from "lucide-react";

const PageTitle = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="max-sm:pl-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LayoutGrid className="w-6 h-6 text-gray-600  dark:text-gray-300" />
        <h1 className="text-[26px] leading-none font-medium text-gray-600  dark:text-gray-300">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
};

export default PageTitle;
