import { fetchMe } from "@/utils/Api/userApi";
import SectionBox from "../SectionBox";
import BasicDetails from "../Sections/BasicDetails/BasicDetails";
// import DeleteAccount from "../Sections/DeleteAccount/DeleteAccount";

const General = async () => {
  const user = await fetchMe();
  return (
    <div className=" flex flex-col gap-8">
      <SectionBox title="Basic details">
        <BasicDetails user={user} />
      </SectionBox>
      {/* <SectionBox title="Delete Account">
        <DeleteAccount user={user} />
      </SectionBox> */}
    </div>
  );
};

export default General;
