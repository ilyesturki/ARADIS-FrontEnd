import {
  faBox,
  faBoxesStacked,
  faGears,
  faLayerGroup,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import DashboardCollapsible from "../Collapsible/DashboardCollapsible";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import WebSiteLogo from "../Common/WebSiteLogo";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface CollapsibleItem {
  title: string;
  link: string;
  icon?: IconProp;
}

interface DashboardCollapsibleProps {
  icon: IconProp;
  title: string;
  link?: string;
  content?: CollapsibleItem[];
}

const links: DashboardCollapsibleProps[] = [
  {
    title: "Fps",
    icon: faLayerGroup,
    content: [
      {
        title: "Fps Panel",
        link: "/dashboard/fps",
        icon: faGears,
      },
      {
        title: "Add Fps",
        link: "/dashboard/fps/create-fps",
        icon: faSquarePlus,
      },
    ],
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
    <div className=" sticky top-[90px] hidden lg:flex w-[250px] h-[calc(100vh-90px)] pr-5 py-6 border-r-[2px] border-grayscale-300 ">
      <div className=" h-full w-full flex flex-col gap-4 pl-6 ">
        {links.map((e, i) => {
          return (
            <DashboardCollapsible
              key={i}
              icon={e.icon}
              link={e.link}
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
