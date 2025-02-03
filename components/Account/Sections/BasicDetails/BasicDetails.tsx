"use client";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelectIcon from "@/components/Common/CustomInput/CustomSelectIcon";
import EditButton from "@/components/Common/CustomInput/EditButton";

import { UserType } from "@/redux/users/usersSlice";

import useBasicFormFields from "../../Sections/BasicDetails/useBasicDetails";

const BasicDetails = ({ user }: { user: UserType | null }) => {
  const { data, handleChange, handleImageChange, handleEdit, editField } =
    useBasicFormFields(user);

  return (
    <div className=" flex flex-col gap-7">
      <CustomSelectIcon
        image={data.image}
        handleImageChange={handleImageChange}
        disabled={editField !== "image"}
      >
        <EditButton
          title={editField === "image" ? "Save" : "Edit"}
          onClick={() => handleEdit("image")}
        />
      </CustomSelectIcon>
      <CustomInput
        label="First Name"
        placeholder="First Name"
        value={data.firstName}
        onChange={handleChange}
        name="firstName"
        disabled={editField !== "firstName"}
      >
        <EditButton
          title={editField === "firstName" ? "Save" : "Edit"}
          onClick={() => handleEdit("firstName")}
        />
      </CustomInput>
      <CustomInput
        label="Last Name"
        placeholder="Last Name"
        value={data.lastName}
        onChange={handleChange}
        name="lastName"
        disabled={editField !== "lastName"}
      >
        <EditButton
          title={editField === "lastName" ? "Save" : "Edit"}
          onClick={() => handleEdit("lastName")}
        />
      </CustomInput>
      <CustomInput
        label="Email Adress"
        placeholder="Email Adress"
        value={data.email}
        onChange={handleChange}
        name="email"
        disabled={editField !== "email"}
      >
        <EditButton
          title={editField === "email" ? "Save" : "Edit"}
          onClick={() => handleEdit("email")}
        />
      </CustomInput>
    </div>
  );
};

export default BasicDetails;
