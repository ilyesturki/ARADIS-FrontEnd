"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useCreateUser from "./useCreateUser";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

const CreateUser = () => {
  const {
    roleData,

    userData,

    handleChange,
    handleImageChange,
    handleRoleChange,
    categoryData,
    serviceData,
    customHandleChangeSelect,

    handleSubmit,
    handleReset,
  } = useCreateUser();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
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
        </div>
        <CustomInput
          value={userData.email}
          onChange={handleChange}
          label="User Email"
          placeholder="Enter User email"
          name="email"
        />
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
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
        </div>
        <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
          <CustomSelect
            label="departement"
            value={userData.userService}
            onChange={customHandleChangeSelect}
            data={serviceData}
            name="userService"
          />
          <CustomSelect
            label="categorie"
            value={userData.userCategory}
            onChange={customHandleChangeSelect}
            data={categoryData}
            name="userCategory"
          />
        </div>
        <CustomSelect
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
        </div>
        <CustomButtons
          mainButtonOnCLick={handleSubmit}
          secondaryButtonOnCLick={handleReset}
        />
      </div>
    </div>
  );
};

export default CreateUser;
