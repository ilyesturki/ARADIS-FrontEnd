"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { getFps } from "@/redux/fps/fpsThunk";
import { resetFps } from "@/redux/fps/fpsSlice";

const useCreateFps = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  //   const router = useRouter();
  const [currentTab, setCurrentTab] = useState("problem");
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [validTabs, setValidTabs] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fpsId = params.get("fpsId");
    if (fpsId) {
      console.log("disp1111111111111111111111111111");
      dispatch(getFps(fpsId));
    } else {
      console.log("disp1111111111111111111111111112");
      dispatch(resetFps());
      // setCurrentStep("problem");
      handleTabChange("problem");
    }
  }, [dispatch, searchParams]);

  const fps = useAppSelector((state) => state.fpss.fps);

  // Update currentStep when fps changes
  useEffect(() => {
    if (fps?.currentStep === currentStep) {
      console.log("fps11111111111111111");
      console.log(currentStep);
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
      console.log("fps11111111111111112");
      setCurrentStep(fps.currentStep);
      console.log(fps);
    }
  }, [fps]);

  const fpsUpdateSuccess = useAppSelector((state) => state.fpss.updateSuccess);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fpsId = params.get("fpsId");
    if (fpsId && fpsUpdateSuccess) {
      console.log("fpsUpdateSuccess11111111111111111111");
      dispatch(getFps(fpsId));
    }
  }, [fpsUpdateSuccess]);

  // Handle tab change after currentStep is updated
  useEffect(() => {
    if (currentStep) {
      console.log("currentStep1111111111111111111");
      console.log(currentStep);
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
    }
  }, [currentStep]);

  //   const basketItems = useAppSelector((state) => state.basket.basket?.items);

  //   const [isLoading, executeCreateOrder] = useApiCallWithToast({
  //     apiCallFunction: () => dispatch(createOrder({ paymentType: "onDelivery" })),
  //     handleSuccess: () => {
  //       router.push("/account/orders");
  //     },
  //     messages: {
  //       loading: "Creating order...",
  //       success: "Order created successfully!",
  //       error: "Could not create order.",
  //     },
  //   });

  const validateTab = (tab: string = currentTab) => {
    switch (tab) {
      case "problem":
        console.log("valid problem");
        if (currentStep) {
          return true;
        }
        setValidTabs([]);
        return false;
      case "immediateActions":
        if (
          currentStep &&
          [
            "immediateActions",
            "cause",
            "defensiveActions",
            "validation",
          ].includes(currentStep)
        ) {
          return true;
        }
        setValidTabs(["problem"]);
        return false;

      case "cause":
        if (
          currentStep &&
          ["cause", "defensiveActions", "validation"].includes(currentStep)
        ) {
          return true;
        }
        setValidTabs(["problem", "immediateActions"]);
        return false;

      case "defensiveActions":
        if (
          currentStep &&
          ["defensiveActions", "validation"].includes(currentStep)
        ) {
          return true;
        }
        setValidTabs(["problem", "immediateActions", "cause"]);
        return false;

      case "validation":
        return true;
      default:
        return false;
    }
  };

  //   const handleNext = () => {
  //     if (validateTab()) {
  //       setValidTabs([...validTabs, currentTab]);
  //       switch (currentTab) {
  //         case "clientAddress":
  //           setCurrentTab("shippingDetails");
  //           break;
  //         case "shippingDetails":
  //           setCurrentTab("paymentDetails");
  //           break;
  //         case "paymentDetails":
  //           executeCreateOrder();

  //           break;
  //         default:
  //           setCurrentTab("clientAddress");
  //       }
  //     }
  //   };

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

    if (currentIndex === 0 && targetIndex === 2) {
      if (validateTab()) {
        if (validateTab("immediateActions")) {
          setValidTabs(["problem", "immediateActions"]);
          setCurrentTab("cause");
        } else {
          setValidTabs(["problem"]);
          setCurrentTab("immediateActions");
        }
      }
    } else if (currentIndex === 0 && targetIndex === 3) {
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
    } else if (currentIndex === 0 && targetIndex === 4) {
      if (validateTab()) {
        if (validateTab("immediateActions")) {
          if (validateTab("cause")) {
            if (validateTab("defensiveActions")) {
              setValidTabs([
                "problem",
                "immediateActions",
                "cause",
                "defensiveActions",
              ]);
              setCurrentTab("validation");
            } else {
              setValidTabs(["problem", "immediateActions", "cause"]);
              setCurrentTab("defensiveActions");
            }
          } else {
            setValidTabs(["problem", "immediateActions"]);
            setCurrentTab("cause");
          }
        } else {
          setValidTabs(["problem"]);
          setCurrentTab("immediateActions");
        }
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
    } else if (currentIndex === 1 && targetIndex === 4) {
      if (validateTab()) {
        if (validateTab("immediateActions")) {
          if (validateTab("cause")) {
            if (validateTab("defensiveActions")) {
              setValidTabs([
                "problem",
                "immediateActions",
                "cause",
                "defensiveActions",
              ]);
              setCurrentTab("validation");
            } else {
              setValidTabs(["problem", "immediateActions", "cause"]);
              setCurrentTab("defensiveActions");
            }
          } else {
            setValidTabs(["problem", "immediateActions"]);
            setCurrentTab("cause");
          }
        } else {
          setValidTabs(["problem"]);
          setCurrentTab("immediateActions");
        }
      }
    } else if (currentIndex === 2 && targetIndex === 4) {
      if (validateTab()) {
        if (validateTab("immediateActions")) {
          if (validateTab("cause")) {
            if (validateTab("defensiveActions")) {
              setValidTabs([
                "problem",
                "immediateActions",
                "cause",
                "defensiveActions",
              ]);
              setCurrentTab("validation");
            } else {
              setValidTabs(["problem", "immediateActions", "cause"]);
              setCurrentTab("defensiveActions");
            }
          } else {
            setValidTabs(["problem", "immediateActions"]);
            setCurrentTab("cause");
          }
        } else {
          setValidTabs(["problem"]);
          setCurrentTab("immediateActions");
        }
      }
    } else if (targetIndex === currentIndex + 1) {
      if (validateTab()) {
        setValidTabs([...validTabs, currentTab]);
        setCurrentTab(value);
      }
    } else {
      setCurrentTab(value);
    }
  };

  return {
    currentTab,
    validTabs,
    handleTabChange,
  };
};

export default useCreateFps;
