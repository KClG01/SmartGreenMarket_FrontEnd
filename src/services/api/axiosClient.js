import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7012/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const { response, config } = error;

    if (response?.status === 403 || response?.status === 401) {
      // Thêm 401 nếu cần
      const noRedirectUrls = [
        "/",
        "/login",
        "/register",
        "/refresh",
        "/change-password",
      ];

      const isNoRedirect = noRedirectUrls.some(
        (url) =>
          config.url.includes(url) || config.url === url || config.url === "", // trường hợp url rỗng
      );

      if (!isNoRedirect) {
        console.warn("Phiên hết hạn → đăng xuất và redirect về trang login");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      // Không reject tiếp ở đây nếu là refresh-token → để catch block xử lý
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
