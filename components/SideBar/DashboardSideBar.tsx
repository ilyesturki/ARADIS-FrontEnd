import {
  faBox,
  faBoxesStacked,
  faGears,
  faLayerGroup,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import DashboardCollapsible from "../Collapsible/DashboardCollapsible";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import WebSiteLogo from "../Common/WebSiteLogo";

const links = [
  {
    icon: faBox,
    title: "Orders",
  },
  {
    icon: faBoxesStacked,
    title: "Users",
    content: [
      {
        title: "Users Panel",
        link: "/dashboard/users",
        icon: faGears,
      },
      {
        title: "Add User",
        link: "/dashboard/users/create-user",
        icon: faSquarePlus,
      },
    ],
  },
  {
    icon: faUsersGear,
    title: "Customers",
    content: [
      {
        title: "Customers Panel",
        link: "/dashboard/customers",
        icon: faGears,
      },
      {
        title: "Add Customer",
        link: "/dashboard/customers/create-customer",
        icon: faSquarePlus,
      },
    ],
  },
  {
    icon: faLayerGroup,
    title: "Categories",
    content: [
      {
        title: "Categories Panel",
        link: "/dashboard/categories",
        icon: faGears,
      },
      {
        title: "Add Category",
        link: "/dashboard/categories/create-category",
        icon: faSquarePlus,
      },
    ],
  },
];
const DashboardSideBar = () => {
  return (
    <div className=" sticky top-0 hidden lg:flex lg:flex-col lg:gap-12 w-[250px] h-full pr-6 py-6">
      <WebSiteLogo />
      <div className=" h-full w-full flex flex-col gap-4 pl-6 ">
        {links.map((e, i) => {
          return (
            <DashboardCollapsible
              key={i}
              icon={e.icon}
              title={e.title}
              content={e.content}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSideBar;
