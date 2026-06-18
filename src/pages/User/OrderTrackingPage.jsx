// src/pages/OrderTrackingPage.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { ClipboardList } from "lucide-react";

import OrderStatusFilterTabs from "../../components/User/OrderTracking/OrderStatusFilterTabs";
import OrderTrackingCard from "../../components/User/OrderTracking/OrderTrackingCard";
import OrderListLoading from "../../components/User/OrderTracking/OrderListLoading";
import OrderListError from "../../components/User/OrderTracking/OrderListError";
import OrderListEmpty from "../../components/User/OrderTracking/OrderListEmpty";

/**
 * =========================================================================
 * PAGE: OrderTrackingPage
 * =========================================================================
 * Trang theo dõi đơn hàng. Trang này CHỈ làm 3 việc:
 * 1. Gọi API lấy danh sách đơn hàng (xem khối "FETCH API" bên dưới).
 * 2. Quản lý state: orders, loading, error, filter đang chọn.
 * 3. Ghép các component con lại để hiển thị.
 *
 * Toàn bộ UI hiển thị (badge, timeline, card, tabs...) đã tách riêng
 * trong thư mục src/components — sửa UI thì vào đó, không sửa ở đây.
 * =========================================================================
 */
 
const FILTER_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "preparing", label: "Đang xử lý" },
  { key: "shipping", label: "Đang giao" },
  { key: "completed", label: "Hoàn thành" },
  { key: "cancelled", label: "Đã hủy" },
];
 
// =========================================================================
// 🧪 MOCK DATA — DỮ LIỆU GIẢ ĐỂ DỰNG UI KHI CHƯA CÓ API THẬT
// =========================================================================
// Đặt USE_MOCK_DATA = false khi đã sẵn sàng gọi API thật (xem fetchOrders).
// Format object PHẢI khớp với response thật mà BE sẽ trả về, để khi đổi
// sang API thật chỉ cần đổi flag, không cần sửa lại UI.
// =========================================================================
const USE_MOCK_DATA = true;
 
const MOCK_ORDERS = [
  {
    id: "order-1",
    code: "ORD-2024-089",
    storeName: "CKC Fresh Mart",
    orderedAt: "24/5/2024 • 15:30",
    expectedDeliveryAt: "25/5/2024",
    confirmedAt: "24/5/2024 • 15:31",
    deliveredAt: null,
    status: "preparing",
    currentStep: 2,
    items: [
      { id: "i1", name: "rau cải thìa", unit: "kg", quantity: 2, price: 45000 },
      { id: "i2", name: "ngò", unit: "bó", quantity: 3, price: 15000 },
      { id: "i3", name: "xà lách lô lô", unit: "kg", quantity: 1, price: 25000 },
    ],
    total: 160000,
  },
  {
    id: "order-2",
    code: "ORD-2024-076",
    storeName: "Công ty TNHH Minh Nhựa",
    orderedAt: "16/6/2026 • 20:31",
    expectedDeliveryAt: "25/6/2026",
    confirmedAt: "16/6/2026 • 20:31",
    deliveredAt: "16/6/2026 • 20:34",
    status: "shipping",
    currentStep: 3,
    items: [
      { id: "i4", name: "ống nhựa PVC", unit: "cây", quantity: 10, price: 35000 },
      { id: "i5", name: "keo dán ống nhựa", unit: "hộp", quantity: 2, price: 60000 },
    ],
    total: 470000,
  },
  {
    id: "order-3",
    code: "ORD-2024-052",
    storeName: "CKC Fresh Mart",
    orderedAt: "10/5/2024 • 09:12",
    expectedDeliveryAt: "11/5/2024",
    confirmedAt: "10/5/2024 • 09:15",
    deliveredAt: "11/5/2024 • 14:02",
    status: "completed",
    currentStep: 4,
    items: [
      { id: "i6", name: "cà chua", unit: "kg", quantity: 1, price: 30000 },
      { id: "i7", name: "dưa leo", unit: "kg", quantity: 2, price: 20000 },
    ],
    total: 70000,
  },
  {
    id: "order-4",
    code: "ORD-2024-041",
    storeName: "CKC Fresh Mart",
    orderedAt: "2/5/2024 • 11:00",
    expectedDeliveryAt: "3/5/2024",
    confirmedAt: null,
    deliveredAt: null,
    status: "cancelled",
    currentStep: 1,
    items: [{ id: "i8", name: "bắp cải", unit: "kg", quantity: 1, price: 18000 }],
    total: 18000,
  },
];
 
export default function OrderTrackingPage() {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // =======================================================================
  // 🔌 FETCH API — LẤY DANH SÁCH ĐƠN HÀNG
  // =======================================================================
  // Đây là nơi DUY NHẤT page này gọi API. Hàm getOrders() được định nghĩa
  // trong src/api/orders.js (đã dùng axios, có sẵn baseURL + chỗ gắn token).
  //
  // Nếu muốn lọc theo trạng thái ngay từ BE (đỡ tải dữ liệu thừa), có thể
  // truyền activeFilter vào params, ví dụ:
  //   getOrders({ status: activeFilter === "all" ? undefined : activeFilter })
  // và bỏ phần filter ở client (useMemo filteredOrders bên dưới).
  //
  // Hiện tại đang lọc ở client để đổi tab không cần gọi lại API.
  // =======================================================================
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data;
      if (USE_MOCK_DATA) {
        // Giả lập độ trễ network 1 chút để thấy được trạng thái loading
        await new Promise((resolve) => setTimeout(resolve, 300));
        data = MOCK_ORDERS;
      } else {
        data = await getOrders(); // <-- GỌI API THẬT Ở ĐÂY (khi USE_MOCK_DATA = false)
      }
      setOrders(data);
    } catch (err) {
      setError("Không tải được danh sách đơn hàng. Vui lòng thử lại.");
      // TODO: log lỗi lên hệ thống monitoring nếu cần (Sentry, LogRocket, ...)
      console.error("[OrderTrackingPage] fetchOrders error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);
 
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
 
  // Lọc đơn hàng theo tab đang chọn (lọc phía client)
  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") return orders;
    return orders.filter((order) => order.status === activeFilter);
  }, [orders, activeFilter]);
 
  // Tính số lượng đơn hàng cho mỗi tab
  const tabsWithCount = useMemo(
    () =>
      FILTER_TABS.map((tab) => ({
        ...tab,
        count: tab.key === "all" ? orders.length : orders.filter((o) => o.status === tab.key).length,
      })),
    [orders]
  );
 
  // =======================================================================
  // 🔌 ĐIỀU HƯỚNG SANG TRANG CHI TIẾT ĐƠN HÀNG
  // =======================================================================
  // Khi bấm "Xem chi tiết" trên card, nên điều hướng sang route chi tiết,
  // ví dụ dùng react-router: navigate(`/orders/${orderId}`)
  // Trang chi tiết đó sẽ tự gọi getOrderDetail(orderId) trong api/orders.js.
  // =======================================================================
  const handleViewDetail = (orderId) => {
    // TODO: thay alert bằng navigate(`/orders/${orderId}`) khi tích hợp router
    alert(`Xem chi tiết đơn hàng: ${orderId} (demo)`);
  };
 
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <ClipboardList size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Theo dõi đơn hàng</h1>
            <p className="text-sm text-slate-400">Danh sách tất cả đơn hàng của bạn</p>
          </div>
        </div>
 
        <OrderStatusFilterTabs tabs={tabsWithCount} activeKey={activeFilter} onChange={setActiveFilter} />
 
        {isLoading ? (
          <OrderListLoading />
        ) : error ? (
          <OrderListError message={error} onRetry={fetchOrders} />
        ) : filteredOrders.length === 0 ? (
          <OrderListEmpty />
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderTrackingCard key={order.id} order={order} onViewDetail={handleViewDetail} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}