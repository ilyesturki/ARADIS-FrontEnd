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
    icon: User, // Using Lucide User icon
    link: "/account/",
  },
  {
    title: "Address",
    icon: Mail, // Using Lucide Mail icon (you might want to find a more suitable one)
    link: "/account/address",
  },
  {
    title: "Notifications",
    icon: MessageSquare, // Using Lucide MessageSquare icon
    link: "/account/notifications",
  },
  {
    title: "Security",
    icon: Settings, // Using Lucide Settings icon
    link: "/account/security",
  },
];

const secondaryAccountMenuContent = [
  {
    title: "Orders",
    icon: CreditCard, // Using Lucide CreditCard icon (you might want to find a more suitable one)
    link: "/account/orders",
  },
  {
    title: "Wishlist",
    icon: LifeBuoy, // Using Lucide LifeBuoy icon (you might want to find a more suitable one)
    link: "/account/wishlist",
  },
  {
    title: "Basket",
    icon: ShoppingBasket, // Using Lucide CreditCard icon (you might want to find a more suitable one)
    link: "/basket",
  },
];

const dashboardSubMenuContent = [
  {
    title: "Customers",
    icon: Users, // Using Lucide Users icon
    content: [
      {
        title: "Customers Panel",
        icon: Settings, // Using Lucide Settings icon
        link: "/dashboard/customers",
      },
      {
        title: "Create Customer",
        icon: UserPlus, // Using Lucide UserPlus icon
        link: "/dashboard/customers/create-customer",
      },
    ],
  },
  {
    title: "Products",
    icon: PackageSearch, // Using Lucide Cloud icon (you might want to find a more suitable one)
    content: [
      {
        title: "Products Panel",
        icon: Settings, // Using Lucide Settings icon
        link: "/dashboard/products",
      },
      {
        title: "Create Product",
        icon: PlusCircle, // Using Lucide PlusCircle icon
        link: "/dashboard/products/create-product",
      },
    ],
  },
  {
    title: "Categories",
    icon: Shapes, // Using Lucide Keyboard icon (you might want to find a more suitable one)
    content: [
      {
        title: "Categories Panel",
        icon: Settings, // Using Lucide Settings icon
        link: "/dashboard/categories",
      },
      {
        title: "Create Category",
        icon: PlusCircle, // Using Lucide PlusCircle icon
        link: "/dashboard/categories/create-category",
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart, // Using Lucide Github icon (you might want to find a more suitable one)
    content: [
      {
        title: "Orders Panel",
        icon: Settings, // Using Lucide Settings icon
        link: "/dashboard/orders",
      },
    ],
  },
];

const MenuContent = ({ role }: { role?: string }) => {
  // absolute -right-5 top-2
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
