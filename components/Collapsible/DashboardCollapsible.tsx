"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CollapsibleItem {
  title: string;
  link: string;
  icon?: IconProp;
}

interface DashboardCollapsibleProps {
  icon: IconProp;
  title: string;
  link?: string;
  content?: CollapsibleItem[];
}

const DashboardCollapsible: React.FC<DashboardCollapsibleProps> = ({
  icon,
  title,
  link,
  content,
}) => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const currentPath = path.split("/").slice(0, 3).join("/");
  const isActive = content?.some((item) => item.link === currentPath);

  const baseClass =
    "group flex justify-between items-center w-full py-3 px-4 rounded-xl shadow-[0_0_2px] shadow-grayscale-400";
  const activeClass =
    "bg-greenAccent-900 text-grayscale-100 bg-opacity-70 hover:bg-opacity-80";
  const inactiveClass =
    "text-text-secondary bg-grayscale-300 bg-opacity-50 hover:bg-greenAccent-900 hover:text-grayscale-100 hover:bg-opacity-80";

  const renderTrigger = () => (
    <CollapsibleTrigger
      onClick={() => setOpen(!open)}
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
    >
      <div className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={icon}
          className={`text-xl group-hover:text-grayscale-100 ${
            isActive
              ? "text-grayscale-100"
              : "text-greenAccent-900 text-opacity-80"
          }`}
        />
        <span className="text-sm font-semibold">{title}</span>
      </div>
      {content?.length ? (
        <FontAwesomeIcon
          icon={open ? faAngleDown : faAngleRight}
          className={`w-3 h-3 text-xs group-hover:text-grayscale-100 ${
            isActive ? "text-grayscale-100" : "text-greenAccent-900"
          }`}
        />
      ) : null}
    </CollapsibleTrigger>
  );

  return (
    <Collapsible>
      {link ? <Link href={link}>{renderTrigger()}</Link> : renderTrigger()}
      <CollapsibleContent>
        {content?.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`group w-[90%] mx-auto my-2 flex gap-3 items-center py-2 px-4 rounded-xl shadow-[0_0_2px] shadow-grayscale-400
              ${path === item.link ? activeClass : inactiveClass}`}
          >
            {item.icon && (
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-4 h-4 group-hover:text-grayscale-100 ${
                  path === item.link
                    ? "text-grayscale-100"
                    : "text-greenAccent-900"
                }`}
              />
            )}
            <span className="text-sm font-semibold">{item.title}</span>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DashboardCollapsible;
