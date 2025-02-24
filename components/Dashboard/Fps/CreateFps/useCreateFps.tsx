"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { getFps } from "@/redux/fps/fpsThunk";

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
      dispatch(getFps(fpsId));
    }
  }, [dispatch]);

  const fps = useAppSelector((state) => state.fpss.fps);

  // Update currentStep when fps changes
  useEffect(() => {
    if (fps?.currentStep) {
      setCurrentStep(fps.currentStep);
      console.log(fps);
    }
  }, [fps]);

  // Handle tab change after currentStep is updated
  useEffect(() => {
    if (currentStep) {
      console.log(currentStep);
      const tabsOrder = [
        "problem",
        "immediateActions",
        "cause",
        "defensiveActions",
      ];

      const nextTabIndex =
        currentStep === "defensiveActions"
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
          ["immediateActions", "cause", "defensiveActions"].includes(
            currentStep
          )
        ) {
          return true;
        }
        setValidTabs(["problem"]);
        return false;

      case "cause":
        if (
          currentStep &&
          ["cause", "defensiveActions"].includes(currentStep)
        ) {
          return true;
        }
        setValidTabs(["problem", "immediateActions"]);
        return false;

      case "defensiveActions":
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
            setValidTabs(["problem", "immediateActions"]);
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
    } else if (currentIndex === 1 && targetIndex === 3) {
      if (validateTab()) {
        if (validateTab("immediateActions")) {
          setValidTabs(["problem", "immediateActions"]);
          setCurrentTab("cause");
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
