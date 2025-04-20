// import { useTranslations } from "next-intl";
import React from "react";

const ActionsList = ({
  headers,
  children,
}: {
  headers?: string[];
  children?: React.ReactNode;
}) => {
  // const t = useTranslations("TagsPanelPage.TagActionsSection.tagActions");
  // console.log(children);
  console.log(children);
  // console.log(children);
  return (
    // <div className="grid grid-rows-[auto_1fr] gap-1">
    // {/* <CustomSectionHeader title={t("title")} /> */}
    <div className="flex flex-col gap-1 px-2 py-2 bg-sidebar border rounded-md">
      {children ? (
        <>
          {headers && headers.length > 0 && (
            <div className="flex justify-between items-center px-3 py-1 rounded-sm">
              <div className="flex-1 grid grid-cols-3 items-center">
                {headers.slice(0, headers.length - 1).map((e, i) => {
                  return (
                    <span
                      key={i}
                      className="text-[10px] font-bold text-grayscale-500"
                    >
                      {e}
                    </span>
                  );
                })}
              </div>
              <span className="text-[10px] font-bold text-grayscale-500">
                {headers[headers.length - 1]}
              </span>
            </div>
          )}

          {children}
        </>
      ) : (
        <span className="w-full h-full flex justify-center items-center text-xl font-medium text-grayscale-500 text-opacity-20">
          No actions yet !
        </span>
      )}
    </div>
    // </div>
  );
};

export default ActionsList;
