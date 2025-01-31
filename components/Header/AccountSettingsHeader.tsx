import AccountDropDownMenu from "@/components/NavBar/CustomDropDownMenu/AccountDropDownMenu";
import WebSiteLogo from "../Common/WebSiteLogo";

const AccountSettingsHeader = () => {
  return (
    <div className="w-full bg-grayscale-100 shadow-[0_0_2px] shadow-grayscale-400 border-b-[1px] border-grayscale-300">
      <div className="container flex justify-between items-center px-8 py-6">
        <WebSiteLogo />
        <AccountDropDownMenu />
      </div>
    </div>
  );
};

export default AccountSettingsHeader;
