"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import CustomTextArea from "@/components/Common/CustomInput/CustomTextArea";
import useCreateQrap from "./useCreateQrap";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";

const CreateQrap = () => {
  const {
    roleData,

    qrapData,

    handleChange,
    handleImageChange,
    handleRoleChange,

    handleSubmit,
    handleReset,
  } = useCreateQrap();
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
      <div className=" flex flex-col gap-6">
        <CustomInput
          value={qrapData.firstName}
          onChange={handleChange}
          label="Qrap First Name"
          placeholder="Enter Qrap First Name"
          name="firstName"
        />
        <CustomInput
          value={qrapData.lastName}
          onChange={handleChange}
          label="Qrap Last Name"
          placeholder="Enter Qrap Last Name"
          name="lastName"
        />
        <CustomInput
          value={qrapData.mat}
          onChange={handleChange}
          label="Qrap Matricule"
          placeholder="Enter Qrap Matricule"
          name="mat"
        />
        <CustomInput
          value={qrapData.phone}
          onChange={handleChange}
          label="Qrap Phone"
          placeholder="Enter Qrap phone"
          name="phone"
        />
        <CustomSelect<"qrap" | "admin">
          label="Role"
          value={qrapData.role}
          onChange={handleRoleChange}
          data={roleData}
        />
      </div>
      <div className=" flex flex-col gap-10">
        <div className=" flex flex-col gap-6">
          <CustomSelectImage
            label="Qrap Image"
            image={qrapData.image || ""}
            handleImageChange={handleImageChange}
          />
          <CustomInput
            value={qrapData.email}
            onChange={handleChange}
            label="Qrap Email"
            placeholder="Enter Qrap email"
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

export default CreateQrap;
