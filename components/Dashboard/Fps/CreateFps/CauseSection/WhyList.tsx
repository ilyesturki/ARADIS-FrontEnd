"use client";

import SectionsSeperator from "../../Common/SectionsSeperator";
import AddSectionButton from "../../Common/AddSectionButton";
import { fpsCauseType, fpsDefensiveActionsType } from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../Common/RemoveSectionButton";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSectionHeader from "../../Common/CustomSectionHeader";

interface Props {
  whyList: fpsCauseType["whyList"];
  handleChangeWhyList: (
    value: any,
    index: number
  ) => void;
  addNewWhy: () => void;
  removeWhy: (index: number) => void;
}

const WhyList = ({
  whyList,
  handleChangeWhyList,
  addNewWhy,
  removeWhy,
}: Props) => {
  return (
    <>
      {whyList.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2" key={i}>
            <CustomSectionHeader
              title="why"
              i={i}
              removeDefensiveAction={() => removeWhy(i)}
            />
            <CustomTextArea
              value={e}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChangeWhyList( e.target.value, i)
              }
              label="procedure"
              placeholder="Mesures finales que nous avons prises"
              name="procedure"
            />
            {whyList.length - 1 !== i ? (
              <SectionsSeperator />
            ) : (
              <AddSectionButton addNewSection={addNewWhy} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default WhyList;
