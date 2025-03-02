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
  //   const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);
  const pathname = usePathname();
  const paths = useMemo(() => pathname.split("/").slice(1), [pathname]);
  //   const [pathList, setPathList] = useState([""]);
  const [pathName, setPathName] = useState(
    paths[paths.length - 1]?.split("-").join(" ") || ""
  );

  useEffect(() => {
    if (user) {
      setPathName(`${user.firstName} ${user.lastName}`);
      //   setPathList((prev) => [
      //     ...prev.slice(0, prev.length - 1),
      //     `${user.firstName} ${user.lastName}`,
      //   ]);
    }
  }, [user]);

  //   useEffect(() => {
  //     if (paths.length > 0) {
  //       if (paths[2] === "edit-user") {
  //         const userId = paths[3];
  //         if (userId) dispatch(getUser(userId));
  //       }
  //       setPathList(paths);
  //     }
  //   }, [paths, dispatch]);

  return (
    <h1 className=" capitalize text-3xl font-medium text-greenAccent-900">
      {pathName}
    </h1>
  );
};

export default PageTitle;
