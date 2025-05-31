import axios from "@/utils/axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMyFpss = async (options: string = "") => {
  const response = await axios.get(`${apiBaseUrl}/fps/me${options}`);
  return response.data.data;
};

export const fetchFpss = async (options: string = "") => {
  const response = await axios.get(`${apiBaseUrl}/fps${options}`); 
  return response.data;
};

export const fetchMyHelperFpss = async (options: string = "") => {
  const response = await axios.get(`${apiBaseUrl}/fps/helper/me${options}`);
  return response.data.data;
};

export const fetchNotifications = async (userId: string) => {
  const response = await axios.get(`${apiBaseUrl}/notifications/${userId}`);
  return response.data;
};

export const fetchNotificationsUnreadCount = async (userId: string) => {
  const response = await axios.get(
    `${apiBaseUrl}/notifications/${userId}/unread-count`
  );
  return response.data;
};

export const markNotificationAsRead = async (userId: string) => {
  const response = await axios.put(
    `${apiBaseUrl}/notifications/${userId}/read`
  );
  return response.data;
};
