"use client";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { getFps } from "@/redux/fps/fpsThunk";
import { resetFps } from "@/redux/fps/fpsSlice";

import { useSession } from "next-auth/react";

const useCreateFps = () => {
  const searchParams = useSearchParams();

  const { data: session } = useSession({ required: true });

  const isAdminOrManager = useMemo(
    () => ["corporaite", "top-management"].includes(session?.user.userCategory ||""),
    [session?.user.userCategory]
  );

  const [currentTab, setCurrentTab] = useState("problem");
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [validTabs, setValidTabs] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      const params = new URLSearchParams(searchParams.toString());
      const fpsId = params.get("fpsId");
      if (fpsId) {
        await dispatch(getFps(fpsId));
      } else {
        await dispatch(resetFps());

        setCurrentStep(null);
        setCurrentTab("problem");
        setValidTabs([]);
      }
    };
    fetch();
  }, [dispatch, searchParams]);

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    if (fps?.currentStep === currentStep) {
      const tabsOrder = [
        "problem",
        "immediateActions",
        "cause",
        "defensiveActions",
        "validation",
      ];

      const nextTabIndex =
        currentStep === "validation"
          ? tabsOrder.indexOf(currentStep)
          : tabsOrder.indexOf(currentStep) + 1;

      handleTabChange(tabsOrder[nextTabIndex]);
    } else if (fps?.currentStep) {
      setCurrentStep(fps.currentStep);
    }
  }, [fps]);

  const fpsUpdateSuccess = useAppSelector((state) => state.fpss.updateSuccess);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const fpsId = params.get("fpsId");
    if (fpsId && fpsUpdateSuccess) {
      dispatch(getFps(fpsId));
    }
  }, [fpsUpdateSuccess]);

  useEffect(() => {
    if (currentStep) {
      const tabsOrder = [
        "problem",
        "immediateActions",
        "cause",
        "defensiveActions",
        "validation",
      ];

      const nextTabIndex =
        currentStep === "validation"
          ? tabsOrder.indexOf(currentStep)
          : tabsOrder.indexOf(currentStep) + 1;

      handleTabChange(
        isAdminOrManager ? "validation" : tabsOrder[nextTabIndex]
      );
    }
  }, [currentStep]);


  const validateTab = (tab: string = currentTab) => {
    switch (tab) {
      case "problem":
        if (currentStep) {
          return true;
        }
        setValidTabs([]);
        return false;
      case "immediateActions":
        if (
          (currentStep &&
            [
              "immediateActions",
              "cause",
              "defensiveActions",
              "validation",
            ].includes(currentStep)) ||
          isAdminOrManager
        ) {
          return true;
        }
        setValidTabs(["problem"]);
        return false;

      case "cause":
        if (
          (currentStep &&
            ["cause", "defensiveActions", "validation"].includes(
              currentStep
            )) ||
          isAdminOrManager
        ) {
          return true;
        }
        setValidTabs(["problem", "immediateActions"]);
        return false;

      case "defensiveActions":
        if (
          (currentStep &&
            ["defensiveActions", "validation"].includes(currentStep)) ||
          isAdminOrManager
        ) {
          return true;
        }
        setValidTabs(["problem", "immediateActions", "cause"]);
        return false;

      case "validation":
        if (
          (currentStep && ["validation"].includes(currentStep)) ||
          isAdminOrManager
        ) {
          return true;
        }
        setValidTabs([
          "problem",
          "immediateActions",
          "cause",
          "defensiveActions",
        ]);
        return false;
      default:
        return false;
    }
  };

  const handleTabChange = (value: string) => {
    const tabsOrder = [
      "problem",
      "immediateActions",
      "cause",
      "defensiveActions",
      "validation",
    ];
    const currentIndex = tabsOrder.indexOf(currentTab);
    const targetIndex = tabsOrder.indexOf(value);

    if ((currentIndex === 0 || currentIndex === 4) && targetIndex === 2) {
      if (validateTab()) {
        if (validateTab("immediateActions")) {
          setValidTabs(["problem", "immediateActions"]);
          setCurrentTab("cause");
        } else {
          setValidTabs(["problem"]);
          setCurrentTab("immediateActions");
        }
      } else {
        setValidTabs([]);
        setCurrentTab("problem");
      }
    } else if (
      (currentIndex === 0 || currentIndex === 4) &&
      targetIndex === 3
    ) {
      if (validateTab()) {
        if (validateTab("immediateActions")) {
          if (validateTab("cause")) {
            setValidTabs(["problem", "immediateActions", "cause"]);
            setCurrentTab("defensiveActions");
          } else {
            setValidTabs(["problem", "immediateActions"]);
            setCurrentTab("cause");
          }
        } else {
          setValidTabs(["problem"]);
          setCurrentTab("immediateActions");
        }
      } else {
        setValidTabs([]);
        setCurrentTab("problem");
      }
    } else if (currentIndex === 1 && targetIndex === 3) {
      if (validateTab()) {
        if (validateTab("immediateActions")) {
          if (validateTab("cause")) {
            setValidTabs(["problem", "immediateActions", "cause"]);
            setCurrentTab("defensiveActions");
          } else {
            setValidTabs(["problem", "immediateActions"]);
            setCurrentTab("cause");
          }
        } else {
          setValidTabs(["problem"]);
          setCurrentTab("immediateActions");
        }
      }
    } else if (currentIndex === 4 && targetIndex === 1) {
      if (validateTab()) {
        setValidTabs(["problem"]);
        setCurrentTab("immediateActions");
      } else {
        setValidTabs([]);
        setCurrentTab("problem");
      }
    } else if (targetIndex === currentIndex + 1 && targetIndex !== 4) {
      if (validateTab()) {
        setValidTabs([...validTabs, currentTab]);
        setCurrentTab(value);
      }
    } else if (currentIndex === 0 && targetIndex === 4) {
      if (validateTab()) {
        setCurrentTab("validation");
      } else {
        setValidTabs([]);
        setCurrentTab("problem");
      }
    } else {
      setCurrentTab(value);
    }
  };

  return {
    currentStep,
    currentTab,
    validTabs,
    handleTabChange,
  };
};

export default useCreateFps;
