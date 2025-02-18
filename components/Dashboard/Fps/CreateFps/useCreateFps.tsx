"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const useCreateFps = () => {
  //   const router = useRouter();
  const [currentTab, setCurrentTab] = useState("problem");
  const [validTabs, setValidTabs] = useState<string[]>([]);

  //   const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     dispatch(getUser());
  //   }, [dispatch]);

  //   const user = useAppSelector((state) => state.users.user);
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
        if (
          false
          //   !user?.address?.details ||
          //   !user?.address?.governorate ||
          //   !user?.address?.city ||
          //   !user?.address?.postalCode
        ) {
          setValidTabs([]);
          return false;
        }
        return true;
      case "immediateActions":
        if (false) {
          setValidTabs(["problem"]);
          return false;
        }
        return true;
      case "cause":
        if (false) {
          setValidTabs(["problem", "immediateActions"]);
          return false;
        }
        return true;
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
