"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/users/usersThunk";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import React, { useEffect, useMemo, useState } from "react";

const BreadCrumb = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);
  const pathname = usePathname();
  const paths = useMemo(() => pathname.split("/").slice(1), [pathname]);
  const [pathList, setPathList] = useState([""]);
  useEffect(() => {
    if (user) {
      setPathList((prev) => [
        ...prev.slice(0, prev.length - 1),
        `${user.firstName} ${user.lastName}`,
      ]);
    }
  }, [user]);

  useEffect(() => {
    if (paths.length > 0) {
      if (paths[2] === "edit-user") {
        const userId = paths[3];
        if (userId) dispatch(getUser(userId));
      }
      setPathList(paths);
    }
  }, [paths, dispatch]);


  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-xs sm:text-sm">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathList.slice(0, pathList.length - 1).map((e, i) => {
          return (
            <React.Fragment key={i}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link
                  href={`/${pathList.slice(0, i + 1).join("/")}`}
                  className="text-xs sm:text-sm capitalize"
                >
                  {e.split("-").join(" ")}
                </Link>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize text-greenAccent-900">
            {pathList[pathList.length - 1]}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
