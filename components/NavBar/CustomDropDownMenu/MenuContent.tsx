import {
  CreditCard,
  LifeBuoy,
  Mail,
  MessageSquare,
  PackageSearch,
  PlusCircle,
  Settings,
  Shapes,
  ShoppingBasket,
  ShoppingCart,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import SignOutButton from "../../SideBar/SignOutButton";
const mainAccountMenuContent = [
  {
    title: "Profile",
    icon: User, 
    link: "/account/",
  },
  {
    title: "Address",
    icon: Mail, 
    link: "/account/address",
  },
  {
    title: "Notifications",
    icon: MessageSquare, 
    link: "/account/notifications",
  },
  {
    title: "Security",
    icon: Settings, 
    link: "/account/security",
  },
];

const secondaryAccountMenuContent = [
  {
    title: "Orders",
    icon: CreditCard, 
    link: "/account/orders",
  },
  {
    title: "Wishlist",
    icon: LifeBuoy, 
    link: "/account/wishlist",
  },
  {
    title: "Basket",
    icon: ShoppingBasket, 
    link: "/basket",
  },
];

const dashboardSubMenuContent = [
  {
    title: "Customers",
    icon: Users, 
    content: [
      {
        title: "Customers Panel",
        icon: Settings, 
        link: "/dashboard/customers",
      },
      {
        title: "Create Customer",
        icon: UserPlus, 
        link: "/dashboard/customers/create-customer",
      },
    ],
  },
  {
    title: "Products",
    icon: PackageSearch, 
    content: [
      {
        title: "Products Panel",
        icon: Settings, 
        link: "/dashboard/products",
      },
      {
        title: "Create Product",
        icon: PlusCircle, 
        link: "/dashboard/products/create-product",
      },
    ],
  },
  {
    title: "Categories",
    icon: Shapes, 
    content: [
      {
        title: "Categories Panel",
        icon: Settings, 
        link: "/dashboard/categories",
      },
      {
        title: "Create Category",
        icon: PlusCircle, 
        link: "/dashboard/categories/create-category",
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart, 
    content: [
      {
        title: "Orders Panel",
        icon: Settings, 
        link: "/dashboard/orders",
      },
    ],
  },
];

const MenuContent = ({ role }: { role?: string }) => {
  return (
    <DropdownMenuContent className="w-56 bg-grayscale-100 absolute top-1 -right-8 ">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {mainAccountMenuContent.map((e, i) => {
          return (
            <Link href={e.link} key={i}>
              <DropdownMenuItem>
                <e.icon className="mr-2 h-4 w-4 text-greenAccent-900" />
                <span>{e.title}</span>
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {secondaryAccountMenuContent.map((e, i) => {
          return (
            <Link href={e.link} key={i}>
              <DropdownMenuItem>
                <e.icon className="mr-2 h-4 w-4 text-greenAccent-900" />
                <span>{e.title}</span>
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      {role === "admin" && (
        <>
          <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {dashboardSubMenuContent.map((e, i) => (
              <DropdownMenuSub key={i}>
                <DropdownMenuSubTrigger>
                  <e.icon className="mr-2 h-4 w-4 text-greenAccent-900" />
                  <span>{e.title}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {e.content.map((e, i) => (
                      <Link href={e.link} key={i}>
                        <DropdownMenuItem>
                          <e.icon className="mr-2 h-4 w-4 text-greenAccent-900" />
                          <span>{e.title}</span>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </>
      )}
      <DropdownMenuItem>
        <SignOutButton />
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default MenuContent;
