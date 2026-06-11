import axiosClient from "./axiosClient";

export const dealerService = {
  getAll: () => axiosClient.get("/dealers/").then((res) => res.data.result),
  // "results": [
  //       {
  //         "id": 0,
  //         "account": {
  //           "id": 0,
  //           "username": "",
  //           "email": "user@example.com",
  //           "first_name": "string",
  //           "last_name": "string",
  //           "full_name": "string",
  //           "phone": "string",
  //           "avatar_url": "string",
  //           "role": "admin",
  //           "status": "active",
  //           "created_at": "2026-06-11T03:15:03.329Z",
  //           "updated_at": "2026-06-11T03:15:03.329Z"
  //         },
  //         "store_name": "string",
  //         "store_address": "string",
  //         "description": "string",
  //         "status": "pending",
  //         "verified_by": 0,
  //         "verified_by_username": "string",
  //         "verified_at": "2026-06-11T03:15:03.329Z",
  //         "rejection_reason": "string",
  //         "created_at": "2026-06-11T03:15:03.329Z",
  //         "updated_at": "2026-06-11T03:15:03.329Z"
  //       }
  //     ]
  getById: (id) => axiosClient.get(`/dealers/${id}/`).then((res) => res.data),
  // {
  //   "id": 0,
  //   "account": {
  //     "id": 0,
  //     "username": "wk0027_ClHf0keADloD7Vu6vo3AYgM_kNWHUGeLdyElT2tZvALD-BTsu",
  //     "email": "user@example.com",
  //     "first_name": "string",
  //     "last_name": "string",
  //     "full_name": "string",
  //     "phone": "string",
  //     "avatar_url": "string",
  //     "role": "admin",
  //     "status": "active",
  //     "created_at": "2026-06-11T03:15:47.393Z",
  //     "updated_at": "2026-06-11T03:15:47.393Z"
  //   },
  //   "store_name": "string",
  //   "store_address": "string",
  //   "description": "string",
  //   "status": "pending",
  //   "verified_by": 0,
  //   "verified_by_username": "string",
  //   "verified_at": "2026-06-11T03:15:47.393Z",
  //   "rejection_reason": "string",
  //   "created_at": "2026-06-11T03:15:47.393Z",
  //   "updated_at": "2026-06-11T03:15:47.393Z",
  //   "documents": [
  //     {
  //       "id": 0,
  //       "document_type": "business_license",
  //       "document_type_label": "string",
  //       "file_url": "string",
  //       "status": "pending",
  //       "verified_by": 0,
  //       "verified_by_username": "string",
  //       "verified_at": "2026-06-11T03:15:47.393Z",
  //       "created_at": "2026-06-11T03:15:47.393Z"
  //     }
  //   ],
  //   "products": [
  //     {
  //       "id": 0,
  //       "dealer_profile": 0,
  //       "supplier_product": 0,
  //       "supplier_product_name": "string",
  //       "supplier_product_unit": "string",
  //       "title": "string",
  //       "description": "string",
  //       "retail_price": "211",
  //       "thumbnail": "string",
  //       "status": "pending",
  //       "created_at": "2026-06-11T03:15:47.393Z",
  //       "updated_at": "2026-06-11T03:15:47.393Z",
  //       "images": [
  //         {
  //           "id": 0,
  //           "dealer_product": 0,
  //           "image_url": "string",
  //           "is_thumbnail": true,
  //           "sort_order": 2147483647,
  //           "created_at": "2026-06-11T03:15:47.393Z"
  //         }
  //       ]
  //     }
  //   ]
  // }
  
  verify: (id, data) =>
    axiosClient.post(`/dealers/${id}/verify/`, data).then((res) => res.data),
};

// Xử lý bug
export const handleApiError = (error, defaultMessage = "Có lỗi xảy ra") => {
  const message =
    error.response?.data?.message || error.message || defaultMessage;
  console.error("API Error:", error);
  return message;
};
