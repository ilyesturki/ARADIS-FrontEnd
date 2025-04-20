"use client";

import SectionsSeperator from "../../Common/SectionsSeperator";
import AddSectionButton from "../../Common/AddSectionButton";
import { fpsCauseType } from "@/redux/fps/fpsSlice";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSectionHeader from "../../Common/CustomSectionHeader";
import { useTranslations } from "next-intl";

interface Props {
  whyList: fpsCauseType["whyList"];
  handleChangeWhyList: (value: any, index: number) => void;
  addNewWhy: () => void;
  removeWhy: (index: number) => void;
  disabled: boolean;
}

const WhyList = ({
  whyList,
  handleChangeWhyList,
  addNewWhy,
  removeWhy,
  disabled,
}: Props) => {
  const t = useTranslations("CreateFps.cause.whyList");
  return (
    <>
      {whyList.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2" key={i}>
            <CustomSectionHeader
              title={t("title")}
              i={i}
              handleDeleteSection={() => removeWhy(i)}
              disabled={disabled}
            />
            <CustomTextArea
              value={e}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChangeWhyList(e.target.value, i)
              }
              label={t("procedure.label")}
              placeholder={t("procedure.placeholder")}
              name="procedure"
              disabled={disabled}
            />
            {whyList.length - 1 !== i ? (
              <SectionsSeperator />
            ) : (
              !disabled && (
                <AddSectionButton
                  addNewSection={addNewWhy}
                  disabled={disabled}
                />
              )
            )}
          </div>
        );
      })}
    </>
  );
};

export default WhyList;
