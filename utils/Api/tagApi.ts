import axios from "@/utils/axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMyTags = async (options: string = "") => {
  console.log(apiBaseUrl);
  console.log(`${apiBaseUrl}/tag/me${options}`);
  const response = await axios.get(`${apiBaseUrl}/tag/me${options}`);
  return response.data.data;
};

export const fetchTags = async (options: string = "") => {
  console.log(apiBaseUrl);
  const response = await axios.get(`${apiBaseUrl}/tag${options}`);
  return response.data;
};

export const fetchMyHelperTags = async (options: string = "") => {
  console.log(apiBaseUrl);
  console.log(`${apiBaseUrl}/tag/helper/me${options}`);
  const response = await axios.get(`${apiBaseUrl}/tag/helper/me${options}`);
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
