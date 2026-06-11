import axiosClient from "./axiosClient";

/**
 * GET /api/purchase-orders/
 * Supplier: danh sách phiếu nhập gửi tới NCC đang đăng nhập.
 */
export function parseOrderList(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response;

  const topResults = response.results ?? [];
  if (topResults.length === 0) return [];

  if (topResults[0]?.order_code != null) return topResults;

  if (Array.isArray(topResults[0]?.results)) {
    return topResults.flatMap((page) => page.results ?? []);
  }

  return topResults;
}

export const orderService = {
  getAll: async (params = {}) => {
    const res = await axiosClient.get("/purchase-orders/", { params });
    return res.data;
  },

  getById: async (id) => {
    const res = await axiosClient.get(`/purchase-orders/${id}/`);
    return res.data;
  },
};
