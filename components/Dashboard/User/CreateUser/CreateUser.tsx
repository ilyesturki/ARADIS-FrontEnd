"use client";
import CustomButtons from "@/components/Common/CustomInput/CustomButtons";
import CustomInput from "@/components/Common/CustomInput/CustomInput";
import CustomSelect from "@/components/Common/CustomInput/CustomSelect";
import useCreateUser from "./useCreateUser";
import CustomSelectImage from "@/components/Common/CustomInput/CustomSelectImage";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/Common/PageTitle";
const CreateUser = () => {
  const t = useTranslations("CreateUserPage");
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
    handleReset,isLoading
  } = useCreateUser();
  return (
    <>
      <PageTitle title={t("pageTitle")} />
      <div className=" w-full grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-10 ">
        <div className=" flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
            <CustomInput
              value={userData.firstName}
              onChange={handleChange}
              label={t("firstNameLabel")}
              placeholder={t("firstNamePlaceholder")}
              name="firstName"
            />
            <CustomInput
              value={userData.lastName}
              onChange={handleChange}
              label={t("lastNameLabel")}
              placeholder={t("lastNamePlaceholder")}
              name="lastName"
            />
          </div>
          <CustomInput
            value={userData.email}
            onChange={handleChange}
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            name="email"
          />
          <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
            <CustomInput
              value={userData.mat}
              onChange={handleChange}
              label={t("matriculeLabel")}
              placeholder={t("matriculePlaceholder")}
              name="mat"
            />
            <CustomInput
              value={userData.phone}
              onChange={handleChange}
              label={t("phoneLabel")}
              placeholder={t("phonePlaceholder")}
              name="phone"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 grid-rows-1 items-start">
            <CustomSelect
              label={t("departmentLabel")}
              value={userData.userService}
              onChange={customHandleChangeSelect}
              data={serviceData}
              name="userService"
            />
            <CustomSelect
              label={t("categoryLabel")}
              value={userData.userCategory}
              onChange={customHandleChangeSelect}
              data={categoryData}
              name="userCategory"
            />
          </div>
          <CustomSelect
            label={t("roleLabel")}
            value={userData.role}
            onChange={handleRoleChange}
            data={roleData}
          />
        </div>
        <div className=" flex flex-col gap-10">
          <div className=" flex flex-col gap-6">
            <CustomSelectImage
              label={t("imageLabel")}
              imagePlaceholder={t("imagePlaceholder")}
              image={userData.image || ""}
              handleImageChange={handleImageChange}
            />
          </div>
          <CustomButtons
            mainButtonOnCLick={handleSubmit}
            secondaryButtonOnCLick={handleReset}
            mainButtonText={t("mainButton")}
            secondaryButtonText={t("secondaryButton")}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default CreateUser;
