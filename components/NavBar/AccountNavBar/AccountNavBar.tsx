import NavBarLink from "./NavBarLink";

const links = [
  {
    name: "General",
    href: "/account",
  },
  {
    name: "Address",
    href: "/account/address",
  },
  {
    name: "Notifications",
    href: "/account/notifications",
  },
  {
    name: "Security",
    href: "/account/security",
  },
  {
    name: "WishList",
    href: "/account/wish-list",
  },
  {
    name: "Orders",
    href: "/account/orders",
  },
];

const AccountNavBar = () => {
  return (
    <ul className=" flex max-sm:hidden  gap-5 border-b-[1px] border-grayscale-400 ">
      {links.map((e, i) => {
        return (
          <li key={i} className=" relative">
            <NavBarLink href={e.href} name={e.name} />
          </li>
        );
      })}
    </ul>
  );
};

export default AccountNavBar;
