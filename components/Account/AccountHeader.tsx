import AccountNavBar from "../NavBar/AccountNavBar/AccountNavBar";

const AccountHeader = () => {
  return (
    <div className=" flex flex-col gap-2">
      <h1 className=" text-3xl font-medium text-greenAccent-900 ">Account</h1>
      <AccountNavBar />
    </div>
  );
};

export default AccountHeader;
