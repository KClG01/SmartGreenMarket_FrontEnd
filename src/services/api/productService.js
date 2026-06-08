import axiosClient from "./axiosClient";

export const productService = {
  // USER
  usergetAll: (params) =>
    axiosClient.get("/products", { params: params }).then((res) => {
      return res.data;
    }),

  usergetId: (id) => axiosClient.get(`/products/${id}`).then((res) => res.data),

  usergetNewest: (soLuong) =>
    axiosClient
      .get(`/products/newest?soLuong=${soLuong}`)
      .then((res) => res.data),

  usergetBestSelling: (soLuong) =>
    axiosClient
      .get(`/products/best-selling?soLuong=${soLuong}`)
      .then((res) => res.data),

  usergetByCategory: (maDanhMuc, soLuong) =>
    axiosClient
      .get(`/products/category/${maDanhMuc}?soLuong=${soLuong}`)
      .then((res) => res.data),

  usergetBySlug: (slug) =>
    axiosClient.get(`/products/slug/${slug}`).then((res) => res.data),

  usergetRelated: (id) =>
    axiosClient.get(`/products/${id}/related`).then((res) => res.data),

  // ADMIN
  getAdminList: async () => {
    const res = await axiosClient.get("/admin/products");
    return res.data; // API trả mảng
  },
  getDetailProduct: async (id) => {
    const res = await axiosClient.get(`/admin/products/${id}`);
    return res.data;
  },

  // SUPPLIER
  getAll: async (formData) => {
    const res = await axiosClient.get(`/supplier-products`);
    return res.data;
  },
  addProduct: async (formData) => {
    // Sửa lại thành:
    const res = await axiosClient.post("/supplier-products/", formData); 
    // Đã xóa bỏ { headers: { "Content-Type": "multipart/form-data" } }
    return res.data;
  },
  addImageProduct: async (formData) =>{
    const res = await axiosClient.post("/supplier-product-images/",formData)
    return res.data;
  },
  updateProduct: async (id, payload) => {
    const res = await axiosClient.patch(`/supplier-products/${id}/`, payload);
    return res.data;
  },
  
  deleteProduct: async (id) => {
    const res = await axiosClient.delete(`/supplier-products/${id}`);
    return res.data;
  },

  delete: (id) =>
    axiosClient
      .delete(`/admin/products/${id}`)
      .then((res) => res.data.danhSach),
};

// Xử lý bug
export const handleApiError = (error, defaultMessage = "Có lỗi xảy ra") => {
  const message =
    error.response?.data?.message || error.message || defaultMessage;
  console.error("API Error:", error);
  return message;
};
