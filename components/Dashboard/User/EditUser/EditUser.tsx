"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import useEditUser from "./useEditUser";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

const EditUser = ({ id }: { id: string }) => {
  const {
    statusData,

    userData,

    handleChange,
    handleImageChange,
    handleStatusChange,

    handleSubmit,
    handleReset,
  } = useEditUser(id);
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomInput
          value={userData.name}
          onChange={handleChange}
          label="User Name"
          placeholder="Enter User name"
          name="name"
        />

        <CustomInput
          value={userData.phone}
          onChange={handleChange}
          label="User Phone"
          placeholder="Enter User phone"
          name="phone"
        />
        <CustomSelect<"active" | "inactive">
          label="Status"
          value={userData.status}
          onChange={handleStatusChange}
          data={statusData}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <div className=" flex flex-col gap-6">
          <CustomSelectImage
            label="User Image"
            image={userData.image || ""}
            handleImageChange={handleImageChange}
          />
          <CustomInput
            value={userData.email}
            onChange={handleChange}
            label="User Email"
            placeholder="Enter User email"
            name="email"
          />
          <CustomInput
            value={userData.password}
            onChange={handleChange}
            label="User Password"
            placeholder="Enter User Password"
            name="password"
          />
        </div>
        <CustomButtons
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default EditUser;
