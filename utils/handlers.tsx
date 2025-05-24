export const customHandleChange = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  setState: (prevState: any) => any
) => {
  const { name, value } = e.target;
  setState((prevData: any) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleChangeSelect = (
  setState: (prevState: any) => any,
  value: string,
  name: string
) => {
  setState((prevData: any) => ({
    ...prevData,
    [name]: value,
  }));
};

export const customHandleAddressChange = (
  field: string,
  setData: (prevState: any) => any,
  value: string
) => {
  setData((prevData: any) => ({
    ...prevData,
    address: prevData.address
      ? {
          ...prevData.address,
          [field]: value,
        }
      : {
          details: "",
          governorate: "",
          postalCode: "",
          city: "",
          [field]: value,
        },
  }));
};

interface FileFields {
  [key: string]: File | File[] | null;
}

interface StringFields {
  [key: string]: string | undefined;
}

export const customHandleSubmit = (
  e: React.MouseEvent<HTMLButtonElement>,
  fileFields: FileFields = {},
  stringFields: StringFields = {},
  dispatchAction: (formData: FormData) => void,
  resetHandler?: (e?: React.MouseEvent<HTMLButtonElement>) => void
) => {
  e.preventDefault();

  const formData = new FormData();

  // Append string fields to formData
  for (const key in stringFields) {
    if (stringFields[key] !== undefined) {
      formData.append(key, stringFields[key]!);
    }
  }

  // Append file fields to formData
  for (const key in fileFields) {
    const fileOrFiles = fileFields[key];
    if (fileOrFiles) {
      if (Array.isArray(fileOrFiles)) {
        fileOrFiles.forEach((file, index) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, fileOrFiles);
      }
    }
  }
  // Dispatch the action with the form data
  dispatchAction(formData);

  // Call the reset handler
  resetHandler && resetHandler(e);
};


export const customHandleForTostSubmit = (
  fileFields: FileFields = {},
  stringFields: StringFields = {},
  dispatchAction: (formData: FormData) => void,
) => {

  const formData = new FormData();

  // Append string fields to formData
  for (const key in stringFields) {
    if (stringFields[key] !== undefined) {
      formData.append(key, stringFields[key]!);
    }
  }

  // Append file fields to formData
  for (const key in fileFields) {
    const fileOrFiles = fileFields[key];
    if (fileOrFiles) {
      if (Array.isArray(fileOrFiles)) {
        fileOrFiles.forEach((file, index) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, fileOrFiles);
      }
    }
  }
  // Dispatch the action with the form data
  dispatchAction(formData);

};

export const customImagesChange = <
  T extends { images?: string[]; imageCover?: string; image?: string }
>(
  e: React.ChangeEvent<HTMLInputElement>,
  setData: React.Dispatch<React.SetStateAction<T>>,
  fieldName: string,
  setImageCoverFile?: React.Dispatch<React.SetStateAction<File | null>>,
  setImagesFiles?: React.Dispatch<React.SetStateAction<File[]>>,
  index?: number
) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        const result = reader.result as string;
        if (index !== undefined && setImagesFiles) {
          setImagesFiles((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index] = file;
            return updatedImages;
          });
          setData((prevData) => {
            const updatedImages = [...(prevData.images || [])];
            updatedImages[index] = result;
            return {
              ...prevData,
              images: updatedImages,
            };
          });
        } else if (setImageCoverFile) {
          setImageCoverFile(file);
          setData((prevData) => ({
            ...prevData,
            [fieldName]: result,
          }));
        }
      }
    };

    reader.readAsDataURL(file);
  }
};

export const customHandleSizeChange = (
  data: string,
  setProductData: (prevState: any) => any,
  i?: number
) => {
  setProductData((prevData: any) => {
    const users = [...(prevData.users || [])] as string[];
    if (i !== undefined) {
      if (data === "" || users.some((e, k) => e === data && k !== i)) {
        users.splice(i, 1);
      } else {
        users[i] = data;
      }
    } else {
      if (data === "") {
        return prevData;
      }
      users.push(data);
    }
    return {
      ...prevData,
      users,
    };
  });
};

export const customHandleCauseChange = (
  data: string,
  setProductData: (prevState: any) => any,
  i?: number
) => {
  setProductData((prevData: any) => {
    const causeList = [...(prevData.causeList || [])] as string[];
    if (i !== undefined) {
      if (data === "" || causeList.some((e, k) => e === data && k !== i)) {
        causeList.splice(i, 1);
      } else {
        causeList[i] = data;
      }
    } else {
      if (data === "") {
        return prevData;
      }
      causeList.push(data);
    }
    return {
      ...prevData,
      causeList,
    };
  });
};


export const handleChangeInArray = (
  setState: (updater: (prevState: any) => any) => void,
  value: any,
  name: string,
  index: number
) => {
  setState((prevData: any[]) => {
    const newData = [...prevData];
    if (newData[index]) {
      newData[index] = {
        ...newData[index],
        [name]: value,
      };
    }
    return newData;
  });
};

export const handleChangeInArrayObject = (
  setState: (updater: (prevState: any) => any) => void,
  value: any,
  arrayName: string,
  name: string,
  index: number
) => {
  setState((prevData: any) => {
    const newData = { ...prevData };
    if (newData[arrayName])
      newData[arrayName][index] = {
        ...newData[arrayName][index],
        [name]: value,
      };
    return newData;
  });
};
