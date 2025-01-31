import axios from "@/utils/axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUsers = async (options: string = "") => {
  console.log(apiBaseUrl);
  const response = await axios.get(`${apiBaseUrl}/users${options}`);
  return response.data.data;
};

export const fetchUser = async (id: string) => {
  const response = await axios.get(`${apiBaseUrl}/users/${id}`);
  return response.data.data;
};

export const fetchMe = async () => {
  const response = await axios.get(`${apiBaseUrl}/users/me`);
  return response.data.data;
};
