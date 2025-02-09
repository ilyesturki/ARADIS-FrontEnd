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

const DashboardCollapsible = ({
  icon,
  title,
  content,
}: {
  icon: IconProp;
  title: string;
  content?: { title: string; link: string; icon?: IconProp }[];
}) => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <Collapsible>
      <CollapsibleTrigger
        onClick={() => setOpen(!open)}
        className={`group flex justify-between items-center w-full py-3 px-4 rounded-xl hover:bg-greenAccent-900 hover:text-grayscale-100 hover:bg-opacity-80 shadow-[0_0_2px] shadow-grayscale-400
        ${
          content?.some((e) => {
            return e.link === path.split("/").slice(0,3).join("/");
          })
            ? " bg-greenAccent-900 text-grayscale-100 bg-opacity-70 hover:bg-opacity-80 "
            : " text-text-secondary bg-grayscale-300 bg-opacity-50"
        }
        `}
      >
        <div className="flex items-center gap-4 ">
          <FontAwesomeIcon
            icon={icon}
            className={` text-xl group-hover:text-grayscale-100 ${
              content?.some((e) => {
                return e.link === path.split("/").slice(0,3).join("/");
              })
                ? "text-grayscale-100"
                : "text-greenAccent-900 text-opacity-80 "
            }`}
          />
          <span className=" text-sm font-semibold ">{title}</span>
        </div>

        {content?.length ? (
          open ? (
            <FontAwesomeIcon
              icon={faAngleDown}
              className={` w-3 h-3 group-hover:text-grayscale-100 ${
                content?.some((e) => {
                  return e.link === path.split("/").slice(0,3).join("/");
                })
                  ? "text-grayscale-100"
                  : "text-greenAccent-900"
              }`}
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleRight}
              className={` w-2 h-2 group-hover:text-grayscale-100 ${
                content?.some((e) => {
                  return e.link === path.split("/").slice(0,3).join("/");
                })
                  ? "text-grayscale-100"
                  : "text-greenAccent-900"
              }`}
            />
          )
        ) : null}
      </CollapsibleTrigger>
      <CollapsibleContent>
        {content?.map((e, i) => {
          return (
            <Link
              href={e.link}
              key={i}
              className={`group w-[90%] mx-auto my-2 flex gap-3 items-center py-2 px-4 rounded-xl  hover:bg-greenAccent-900 hover:text-grayscale-100 hover:bg-opacity-80 shadow-[0_0_2px] shadow-grayscale-400
              ${
                path === e.link
                  ? " bg-greenAccent-900  text-grayscale-100 bg-opacity-70"
                  : " text-text-secondary bg-grayscale-300 bg-opacity-50 "
              } `}
            >
              {e.icon && (
                <FontAwesomeIcon
                  icon={e.icon}
                  className={` w-4 h-4 group-hover:text-grayscale-100 ${
                    path === e.link
                      ? "text-grayscale-100"
                      : "text-greenAccent-900"
                  }  `}
                />
              )}
              <span className={` text-sm font-semibold  `}>{e.title}</span>
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DashboardCollapsible;
