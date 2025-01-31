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
        value={data.name}
        onChange={handleChange}
        name="name"
        disabled={editField !== "name"}
      >
        <EditButton
          title={editField === "name" ? "Save" : "Edit"}
          onClick={() => handleEdit("name")}
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
          disabled={!!user?.provider && !!user?.providerId}
        />
      </CustomInput>
    </div>
  );
};

export default BasicDetails;
