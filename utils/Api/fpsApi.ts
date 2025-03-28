import axios from "@/utils/axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMyFpss = async (options: string = "") => {
  console.log(apiBaseUrl);
  console.log(`${apiBaseUrl}/fps/me${options}`);
  const response = await axios.get(`${apiBaseUrl}/fps/me${options}`);
  return response.data.data;
};

export const fetchFpss = async (options: string = "") => {
  console.log(apiBaseUrl);
  const response = await axios.get(`${apiBaseUrl}/fps${options}`);
  return response.data.data;
};

export const fetchMyHelperFpss = async (options: string = "") => {
  console.log(apiBaseUrl);
  console.log(`${apiBaseUrl}/fps/helper/me${options}`);
  const response = await axios.get(`${apiBaseUrl}/fps/helper/me${options}`);
  return response.data.data;
};

export const fetchNotifications = async (userId: string) => {
  console.log(apiBaseUrl);
  console.log(`${apiBaseUrl}/notifications/${userId}`);
  const response = await axios.get(`${apiBaseUrl}/notifications/${userId}`);
  console.log(response.data);
  return response.data;
};

export const fetchNotificationsUnreadCount = async (userId: string) => {
  console.log(apiBaseUrl);
  console.log(`${apiBaseUrl}/notifications/${userId}`);
  const response = await axios.get(
    `${apiBaseUrl}/notifications/${userId}/unread-count`
  );
  console.log(response.data);
  return response.data;
};

export const markNotificationAsRead = async (userId: string) => {
  console.log(apiBaseUrl);
  console.log(`${apiBaseUrl}/notifications/${userId}`);
  const response = await axios.put(
    `${apiBaseUrl}/notifications/${userId}/read`
  );
  console.log(response.data);
  return response.data;
};
