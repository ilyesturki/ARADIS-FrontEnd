import AccountDropDownMenu from "@/components/NavBar/CustomDropDownMenu/AccountDropDownMenu";
import WebSiteLogo from "../Common/WebSiteLogo";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 w-full h-[90px] bg-grayscale-100 shadow-[0_0_2px] shadow-grayscale-400 border-b-[1px] border-grayscale-300">
      <div className="container flex h-full justify-between items-center px-8 ">
        <WebSiteLogo />
        <AccountDropDownMenu />
      </div>
    </div>
  );
};

export default Header;
