import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://smart-green-market-api.onrender.com/api",
  // Không đặt Content-Type mặc định:
  // - Axios tự set "application/json" cho plain object
  // - Axios tự set "multipart/form-data; boundary=..." cho FormData
  withCredentials: true,
});

// REQUEST
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Nếu body là FormData → xóa Content-Type để axios/browser
    // tự động set "multipart/form-data; boundary=..." (bắt buộc khi upload file)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE
axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "https://smart-green-market-api.onrender.com/api/refresh/",
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.access;

        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");

        localStorage.removeItem("user");

        window.location.href = "/admin/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
