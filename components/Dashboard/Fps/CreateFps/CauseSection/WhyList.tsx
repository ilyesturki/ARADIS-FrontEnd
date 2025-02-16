"use client";

import SectionsSeperator from "../../Common/SectionsSeperator";
import AddSectionButton from "../../Common/AddSectionButton";
import { fpsCauseType, fpsDefensiveActionsType } from "@/redux/fps/fpsSlice";
import RemoveSectionButton from "../../Common/RemoveSectionButton";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import CustomSectionHeader from "../../Common/CustomSectionHeader";

interface Props {
  whyList: fpsCauseType["whyList"];
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  addNewWhy: () => void;
  removeWhy: (index: number) => void;
}

const WhyList = ({ whyList, handleChange, addNewWhy, removeWhy }: Props) => {
  return (
    <>
      {whyList.map((e, i) => {
        return (
          <div className=" flex flex-col gap-2">
            <CustomSectionHeader
              title="why"
              i={i}
              removeDefensiveAction={() => removeWhy(i)}
            />
            <CustomTextArea
              value={e}
              onChange={handleChange}
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
