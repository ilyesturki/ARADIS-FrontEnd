import axios from "@/utils/axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchFpss = async (options: string = "") => {
  console.log(apiBaseUrl);
  const response = await axios.get(`${apiBaseUrl}/fps${options}`);
  return response.data.data;
};
