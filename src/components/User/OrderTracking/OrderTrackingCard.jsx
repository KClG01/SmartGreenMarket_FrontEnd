// src/components/OrderTrackingCard.jsx
import OrderStatusBadge from "./OrderStatusBadge";
import TrackingOrderItemsSummary from "./TrackingOrderItemsSummary";
import OrderTimeline from "./OrderTimeline";

/**
 * Card hiển thị đầy đủ thông tin 1 đơn hàng: mã đơn, cửa hàng, trạng thái,
 * danh sách sản phẩm, timeline tiến trình, và nút xem chi tiết.
 *
 * Props:
 * - order: object đơn hàng (xem cấu trúc trong api/orders.js)
 * - onViewDetail: (orderId) => void — gọi khi bấm "Xem chi tiết"
 */
export default function OrderTrackingCard({ order, onViewDetail }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{order.code}</p>
          <h3 className="text-xl font-bold text-slate-800">{order.storeName}</h3>
          <p className="text-sm text-slate-400">Ngày đặt: {order.orderedAt}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mb-6">
        <TrackingOrderItemsSummary items={order.items} total={order.total} />
      </div>

      <div className="mb-2">
        <OrderTimeline
          currentStep={order.currentStep}
          orderedAt={order.orderedAt}
          confirmedAt={order.confirmedAt}
          expectedDeliveryAt={order.expectedDeliveryAt}
          deliveredAt={order.deliveredAt}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => onViewDetail?.(order.id)}
          className="rounded-xl bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
