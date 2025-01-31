import AccountDropDownMenu from "@/components/NavBar/CustomDropDownMenu/AccountDropDownMenu";

const DashboardHeader = () => {
  return (
    <div className="flex justify-end items-center px-2 py-6">
      <AccountDropDownMenu />
    </div>
  );
};

export default DashboardHeader;
