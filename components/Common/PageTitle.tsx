"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/users/usersThunk";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const PageTitle = () => {
  const user = useAppSelector((state) => state.users.user);
  const pathname = usePathname();
  const paths = useMemo(() => pathname.split("/").slice(1), [pathname]);
  const [pathName, setPathName] = useState(
    paths[paths.length - 1]?.split("-").join(" ") || ""
  );

  useEffect(() => {
    if (paths[0] === "dashboard" && paths[1] === "panel") {
      setPathName(paths[2].split("-").join(" "));
    } else if (
      paths[0] === "dashboard" &&
      paths[1] === "users" &&
      paths[2] === "edit-user"
    ) {
      if (user) {
        setPathName(`${user.firstName} ${user.lastName}`);
      }
    }
  }, [paths]);

  // useEffect(() => {
  //   if (user) {
  //     setPathName(`${user.firstName} ${user.lastName}`);
  //   }
  // }, [user]);

  return (
    <h1 className=" capitalize text-3xl font-semibold text-greenAccent-900">
      {pathName}
    </h1>
  );
};

export default PageTitle;
