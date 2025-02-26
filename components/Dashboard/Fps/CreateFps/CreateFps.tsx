"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck as solidCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ProblemTab from "./CreateFpsTabs/ProblemTab";
import ImmediateActionsTab from "./CreateFpsTabs/ImmediateActionsTab";
import CauseTab from "./CreateFpsTabs/CauseTab";
import DefensiveActionsTab from "./CreateFpsTabs/DefensiveActionsTab";
import { use } from "react";
import useCreateFps from "./useCreateFps";
// defaultValue="problem"

const tabs = [
  {
    value: "problem",
    label: "Problem",
  },
  {
    value: "immediateActions",
    label: "Immediate Actions",
  },
  {
    value: "cause",
    label: "Cause",
  },
  {
    value: "defensiveActions",
    label: "Defensive Actions",
  },
];

const CreateFps = () => {
  const { currentTab, validTabs, handleTabChange } = useCreateFps();
  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {tabs.map((e, i) => {
          return (
            <TabsTrigger
              value={e.value}
              key={i}
              className=" flex items-center gap-1.5"
            >
              {validTabs.includes(e.value) ? (
                <FontAwesomeIcon icon={solidCircleCheck} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faCircleCheck} size="lg" />
              )}
              {e.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value="problem">
        <ProblemTab />
      </TabsContent>
      <TabsContent value="immediateActions">
        <ImmediateActionsTab />
      </TabsContent>
      <TabsContent value="cause">
        <CauseTab />
      </TabsContent>
      <TabsContent value="defensiveActions">
        <DefensiveActionsTab />
      </TabsContent>
    </Tabs>
  );
};

export default CreateFps;
