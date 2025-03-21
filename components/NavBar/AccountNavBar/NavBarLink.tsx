"use client";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";

const NavBarLink = ({ href, name }: { href: string; name: string }) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={` flex py-3 px-2 text-sm font-medium text-greenAccent-900 ${
        path === href &&
        "text-greenAccent-600 font-semibold border-b-2 border-greenAccent-600 "
      } `}
    >
      {name}
    </Link>
  );
};

export default NavBarLink;
