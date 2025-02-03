"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import useEditUser from "./useEditUser";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

const EditUser = ({ id }: { id: string }) => {
  const {
    roleData,

    userData,

    handleChange,
    handleImageChange,
    handleRoleChange,

    handleSubmit,
    handleReset,
  } = useEditUser(id);
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomInput
          value={userData.firstName}
          onChange={handleChange}
          label="User First Name"
          placeholder="Enter User First Name"
          name="firstName"
        />
        <CustomInput
          value={userData.lastName}
          onChange={handleChange}
          label="User Last Name"
          placeholder="Enter User Last Name"
          name="lastName"
        />
        <CustomInput
          value={userData.mat}
          onChange={handleChange}
          label="User Matricule"
          placeholder="Enter User Matricule"
          name="mat"
        />
        <CustomInput
          value={userData.phone}
          onChange={handleChange}
          label="User Phone"
          placeholder="Enter User phone"
          name="phone"
        />
        <CustomSelect<"user" | "admin">
          label="Role"
          value={userData.role}
          onChange={handleRoleChange}
          data={roleData}
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
