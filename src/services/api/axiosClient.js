import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://smart-green-market-api.onrender.com/api",
  // Không đặt Content-Type mặc định:
  // - Axios tự set "application/json" cho plain object
  // - Axios tự set "multipart/form-data; boundary=..." cho FormData
  withCredentials: true,
});

const AUTH_URLS_SKIP_REFRESH = ["/login/", "/register/", "/refresh/"];

const PUBLIC_PATH_PREFIXES = [
  "/dang-ky-dai-ly",
  "/dang-ky-nha-cung-cap",
  "/admin/login",
  "/nha-cung-cap/login",
  "/dai-ly/login",
  "/trang-chu",
  "/gio-hang",
  "/dat-hang",
];

function shouldSkipAuthRefresh(config) {
  const url = config?.url || "";
  return AUTH_URLS_SKIP_REFRESH.some((path) => url.includes(path));
}

function shouldStayOnCurrentPage() {
  const path = window.location.pathname;
  return (
    path === "/" ||
    PUBLIC_PATH_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`),
    )
  );
}

function redirectToLoginForCurrentArea() {
  const path = window.location.pathname;

  if (path.startsWith("/quan-tri")) {
    window.location.href = "/admin/login";
    return;
  }

  if (path.startsWith("/nha-cung-cap")) {
    window.location.href = "/nha-cung-cap/login";
    return;
  }

  if (path.startsWith("/dai-ly")) {
    window.location.href = "/dai-ly/login";
  }
}

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

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipAuthRefresh(originalRequest)
    ) {
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

        if (!shouldStayOnCurrentPage()) {
          redirectToLoginForCurrentArea();
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
