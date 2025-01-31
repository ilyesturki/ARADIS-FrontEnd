"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumb = () => {
  const paths = usePathname().split("/").slice(1);

  return (
    <div className=" flex flex-col gap-3">
      <h1 className=" capitalize text-3xl font-medium text-greenAccent-900">
        {paths[paths.length - 1].split("-").join(" ")}
      </h1>
      <Breadcrumb>
        <BreadcrumbList className=" capitalize text-xs font-medium text-greenAccent-900 ">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">home</BreadcrumbLink>
          </BreadcrumbItem>
          {paths.map((e, i) => {
            return (
              <React.Fragment key={i}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href={`/${paths.slice(0, i + 1).join("/")}`}>
                    {e.split("-").join(" ")}
                  </Link>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
