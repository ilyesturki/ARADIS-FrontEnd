import { LayoutGrid } from "lucide-react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <LayoutGrid className="w-6 h-6 text-gray-600" />
      <h1 className="text-[26px] leading-none font-medium text-gray-600">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
