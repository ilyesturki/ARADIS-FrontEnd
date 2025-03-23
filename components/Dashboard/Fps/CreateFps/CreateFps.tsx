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
import ValidationTab from "./CreateFpsTabs/ValidationTab";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/Common/PageTitle";
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
  {
    value: "validation",
    label: "Validation",
  },
];

const CreateFps = () => {
  const t = useTranslations("CreateFps");
  const { currentStep, currentTab, validTabs, handleTabChange } =
    useCreateFps();
  return (
    <>
      <PageTitle title={t("pageTitle")} />
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full h-auto flex flex-wrap">
          {tabs.map((e, i) => {
            const tabsOrder = [
              "problem",
              "immediateActions",
              "cause",
              "defensiveActions",
              "validation",
            ];
            return (
              <TabsTrigger
                value={e.value}
                key={i}
                className="flex-1 flex items-center gap-1.5 "
              >
                {tabsOrder.indexOf(currentStep || "") >= i ? (
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
        <TabsContent value="validation">
          <ValidationTab />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CreateFps;
