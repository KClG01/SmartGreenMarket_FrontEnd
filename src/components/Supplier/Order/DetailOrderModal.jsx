import { useState, useEffect } from "react";
import {
  X, CheckCheck, Truck, PackageCheck, Clock, CheckCircle2,
  MapPin, Phone, User, Store, CreditCard,
  Ban, AlertTriangle, Calendar, CalendarClock, Package,
} from "lucide-react";
// ─── MOCK DATA — map đúng theo schema API ──────────────────────────────────
const MOCK_ORDER = {
  id: 1,
  order_code: "ORD-2026-001245",
  supplier: 3,
  supplier_name: "HTX Tác Xã Xanh",
  supplier_bank: {
    bank_name: "Vietcombank",
    bank_bin: "970436",
    account_number: "1234567890",
    account_name: "HTX TAC XA XANH",
    company_name: "HTX Tác Xã Xanh",
  },
  dealer: 7,
  dealer_name: "Nguyễn Việt A",
  status: "pending_supplier_confirmation",
  delivery_address: "103 Đường Song Hành, Phường An Phú, TP. Thủ Đức, TP. Hồ Chí Minh",
  requested_delivery_time: "2026-06-20T08:00:00.000Z",
  receiver_name: "Nguyễn Việt A",
  receiver_phone: "0801****053",
  note: "Giao hàng buổi sáng trước 10h, gọi trước 30 phút.",
  rejection_reason: "",
  total_amount: "1250000",
  deposit_percent: "30",
  deposit_amount: "375000",
  paid_amount: "375000",
  debt_amount: "875000",
  confirmed_at: null,
  delivered_at: null,
  completed_at: null,
  created_at: "2026-06-12T04:30:00.000Z",
  updated_at: "2026-06-12T04:30:00.000Z",
  items: [
    {
      id: 1,
      supplier_product_id: 11,
      product_name: "Súp lơ xanh hữu cơ Đà Lạt",
      product_unit: "gói 900g",
      product_thumbnail_url: "",
      product_images: [],
      daily_production_capacity: "50",
      quantity: "2",
      unit_price: "45000",
      subtotal: "90000",
      note: "",
      // UI state — không có trong API, thêm client-side
      item_status: "pending",
      reject_reason: "",
    },
    {
      id: 2,
      supplier_product_id: 12,
      product_name: "Cà rốt hữu cơ VietGAP",
      product_unit: "kg",
      product_thumbnail_url: "",
      product_images: [],
      daily_production_capacity: "100",
      quantity: "1",
      unit_price: "35000",
      subtotal: "35000",
      note: "",
      item_status: "pending",
      reject_reason: "",
    },
    {
      id: 3,
      supplier_product_id: 13,
      product_name: "Bầu tây giống Mỹ hạng A",
      product_unit: "hộp 200g",
      product_thumbnail_url: "",
      product_images: [],
      daily_production_capacity: "200",
      quantity: "10",
      unit_price: "100000",
      subtotal: "1000000",
      note: "",
      item_status: "pending",
      reject_reason: "",
    },
  ],
  payments: [
    {
      id: 1,
      payment_method: "bank_transfer",
      payment_provider: "Vietcombank",
      transaction_code: "VCB20260612093500",
      amount: "375000",
      payment_type: "deposit",
      status: "verified",
      receipt_file: "",
      verified_by: 1,
      verified_by_username: "admin",
      verified_at: "2026-06-12T09:35:00.000Z",
      rejection_reason: "",
      note: "",
      paid_at: "2026-06-12T09:30:00.000Z",
      created_at: "2026-06-12T09:30:00.000Z",
    },
  ],
  status_histories: [
    { id: 1, old_status: "", new_status: "pending_supplier_confirmation", note: "Đơn hàng được tạo", changed_by: 7, changed_by_username: "dealer_a", created_at: "2026-06-12T04:30:00.000Z" },
  ],
};

// ─── STATUS CONFIG ──────────────────────────────────────────────────────────
const ORDER_STEPS = [
  { key: "pending_supplier_confirmation", label: "Chờ xác nhận", icon: Clock },
  { key: "confirmed",                     label: "Đã xác nhận",  icon: CheckCircle2 },
  { key: "shipping",                      label: "Đang giao",    icon: Truck },
  { key: "completed",                     label: "Hoàn thành",   icon: PackageCheck },
];
const STEP_INDEX = {
  pending_supplier_confirmation: 0,
  confirmed: 1,
  shipping: 2,
  completed: 3,
};

const PAYMENT_STATUS = {
  pending:  { label: "Chờ xác minh", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  verified: { label: "Đã xác minh",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "Từ chối",      cls: "bg-red-50 text-red-600 border-red-200" },
};

const PAYMENT_TYPE = { deposit: "Đặt cọc", full: "Thanh toán đủ", final: "Thanh toán còn lại" };
const PAYMENT_METHOD = { bank_transfer: "Chuyển khoản", cash: "Tiền mặt", momo: "MoMo" };

// ─── HELPERS ────────────────────────────────────────────────────────────────
const fmtPrice = (n) => {
  const num = typeof n === "string" ? parseFloat(n) : n;
  return isNaN(num) ? "—" : num.toLocaleString("vi-VN") + "₫";
};
const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
};
const fmtDateShort = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
};

function normalizeOrder(order) {
  if (!order) return null;
  return {
    ...order,
    items: (order.items ?? []).map((item) => ({
      ...item,
      item_status: item.item_status ?? "pending",
      reject_reason: item.reject_reason ?? "",
    })),
    payments: order.payments ?? [],
  };
}

// ─── MAIN MODAL ─────────────────────────────────────────────────────────────
export default function DetailOrderModal({ isOpen, onClose, order: initialOrder }) {
  const [order, setOrder] = useState(() => normalizeOrder(initialOrder ?? MOCK_ORDER));
  const [rejectModal, setRejectModal] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOrder(normalizeOrder(initialOrder ?? MOCK_ORDER));
      setRejectModal(null);
      setConfirmModal(false);
    }
  }, [isOpen, initialOrder]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !rejectModal && !confirmModal) onClose?.();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, rejectModal, confirmModal]);

  if (!isOpen || !order) return null;

  const items = order.items ?? [];
  const total     = items.length;
  const approved  = items.filter(i => i.item_status === "approved").length;
  const rejected  = items.filter(i => i.item_status === "rejected").length;
  const processed = approved + rejected;
  const allDone   = processed === total;
  const isPending = order.status === "pending_supplier_confirmation";
  const canConfirm = isPending && allDone && approved > 0;

  // ── Item actions ──────────────────────────────────────
  const setItemStatus = (id, status, reason = "") =>
    setOrder(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === id ? { ...i, item_status: status, reject_reason: reason } : i),
    }));

  const approveAll = () =>
    setOrder(prev => ({ ...prev, items: prev.items.map(i => ({ ...i, item_status: "approved", reject_reason: "" })) }));

  // ── Confirm order ──────────────────────────────────────
  const confirmOrder = async () => {
    setLoading(true);
    try {
      // TODO: await orderService.confirm(order.id)
      await new Promise(r => setTimeout(r, 800));
      setOrder(prev => ({ ...prev, status: "confirmed", confirmed_at: new Date().toISOString() }));
      setConfirmModal(false);
    } finally {
      setLoading(false);
    }
  };

  const stepIdx = STEP_INDEX[order.status] ?? 0;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-detail-title"
      >
        <div
          className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          onClick={onClose}
        />

        <div
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: "92vh" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-neutral-200 shrink-0">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-neutral-400 leading-none mb-1">Chi tiết đơn hàng</p>
                <h2
                  id="order-detail-title"
                  className="text-lg font-bold text-gray-900 truncate"
                >
                  #{order.order_code}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5 truncate">
                  {order.dealer_name || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-1">
                {ORDER_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const done = idx < stepIdx;
                  const active = idx === stepIdx;
                  return (
                    <div key={step.key} className="flex items-center gap-1">
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          active
                            ? "bg-emerald-800 text-white"
                            : done
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-neutral-100 text-neutral-400"
                        }`}
                      >
                        <Icon size={10} />
                        {step.label}
                      </div>
                      {idx < ORDER_STEPS.length - 1 && (
                        <div className={`w-3 h-px ${done ? "bg-emerald-300" : "bg-neutral-200"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-4">

        {/* Confirmed banner */}
        {order.status !== "pending_supplier_confirmation" && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-800 text-sm font-semibold">
            <CheckCircle2 size={16} /> Đơn hàng đã được xác nhận vào {fmtDate(order.confirmed_at)}
          </div>
        )}

        {/* ── Thông tin chung (ngày đặt + ngày giao) ───── */}
        <div className="bg-white rounded-2xl border border-neutral-200 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetaItem icon={<Calendar size={14} className="text-emerald-700" />} label="Ngày đặt hàng">
            {fmtDate(order.created_at)}
          </MetaItem>
          <MetaItem icon={<CalendarClock size={14} className="text-emerald-700" />} label="Ngày giao dự kiến">
            <span className="text-emerald-700 font-bold">{fmtDateShort(order.requested_delivery_time)}</span>
          </MetaItem>
          <MetaItem icon={<CheckCircle2 size={14} className="text-emerald-700" />} label="Xác nhận lúc">
            {fmtDate(order.confirmed_at)}
          </MetaItem>
          <MetaItem icon={<Truck size={14} className="text-emerald-700" />} label="Giao hàng lúc">
            {fmtDate(order.delivered_at)}
          </MetaItem>
        </div>

        {/* ── Buyer + Supplier ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InfoCard icon={<User size={15} className="text-emerald-700" />} title="Thông tin người mua">
            <InfoRow label="Người nhận">{order.receiver_name}</InfoRow>
            <InfoRow label="Điện thoại">
              <span className="flex items-center gap-1"><Phone size={12} />{order.receiver_phone}</span>
            </InfoRow>
            <InfoRow label="Địa chỉ giao">
              <span className="flex items-start gap-1"><MapPin size={12} className="mt-0.5 shrink-0" />{order.delivery_address}</span>
            </InfoRow>
            {order.note && <InfoRow label="Ghi chú">{order.note}</InfoRow>}
          </InfoCard>

          <InfoCard icon={<Store size={15} className="text-emerald-700" />} title="Thông tin người bán">
            <InfoRow label="Nhà cung cấp"><span className="font-bold text-gray-900">{order.supplier_name}</span></InfoRow>
            {order.supplier_bank && (
              <>
                <InfoRow label="Ngân hàng">{order.supplier_bank.bank_name}</InfoRow>
                <InfoRow label="Số tài khoản">{order.supplier_bank.account_number}</InfoRow>
                <InfoRow label="Chủ tài khoản">{order.supplier_bank.account_name}</InfoRow>
              </>
            )}
          </InfoCard>
        </div>

        {/* ── Danh sách sản phẩm ───────────────────────── */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Danh sách sản phẩm</h2>
              <p className="text-xs text-neutral-400 mt-0.5">{total} sản phẩm</p>
            </div>
            {isPending && (
              <button
                onClick={approveAll}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <CheckCheck size={13} /> Duyệt tất cả
              </button>
            )}
          </div>
          {/* Rows */}
          {items.map((item, idx) => (
            <ItemRow
              key={item.id}
              item={item}
              isLast={idx === items.length - 1}
              canEdit={isPending}
              onApprove={() => setItemStatus(item.id, "approved")}
              onReject={() => setRejectModal(item)}
              onReset={() => setItemStatus(item.id, "pending")}
            />
          ))}

          {/* Progress footer */}
          {isPending && (
            <div className={`px-5 py-3 border-t border-neutral-100 flex items-center gap-4 ${
              allDone ? "bg-emerald-50" : "bg-amber-50"
            }`}>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={allDone ? "text-emerald-800" : "text-amber-800"}>
                    {allDone
                      ? "Tất cả sản phẩm đã được xử lý"
                      : `Đã xử lý ${processed}/${total} — cần duyệt hoặc từ chối tất cả sản phẩm`}
                  </span>
                  <span className={allDone ? "text-emerald-700" : "text-amber-700"}>
                    {approved > 0 && <span className="text-emerald-700 mr-2">✓ {approved} duyệt</span>}
                    {rejected > 0 && <span className="text-red-500">✗ {rejected} từ chối</span>}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${allDone ? "bg-emerald-500" : "bg-amber-400"}`}
                    style={{ width: `${total ? Math.round((processed / total) * 100) : 0}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Thanh toán ───────────────────────────────── */}
        {order.payments?.length > 0 && (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center gap-2">
              <CreditCard size={15} className="text-emerald-700" />
              <h2 className="font-bold text-gray-900 text-sm">Lịch sử thanh toán</h2>
            </div>
            <div className="divide-y divide-neutral-100">
              {order.payments.map(p => {
                const ps = PAYMENT_STATUS[p.status] ?? PAYMENT_STATUS.pending;
                return (
                  <div key={p.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <span>{PAYMENT_METHOD[p.payment_method] ?? p.payment_method}</span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-neutral-500 font-normal text-xs">{PAYMENT_TYPE[p.payment_type] ?? p.payment_type}</span>
                      </div>
                      {p.transaction_code && (
                        <p className="text-xs text-neutral-400">Mã GD: {p.transaction_code}</p>
                      )}
                      <p className="text-xs text-neutral-400">{fmtDate(p.paid_at)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-bold text-gray-900">{fmtPrice(p.amount)}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${ps.cls}`}>{ps.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Tổng kết ─────────────────────────────────── */}
        <div className="bg-neutral-50 rounded-xl border border-neutral-200 px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <PackageCheck size={15} className="text-emerald-700" />
            <h2 className="font-bold text-gray-900 text-sm">Tổng kết đơn hàng</h2>
          </div>
          <div className="flex flex-col gap-2 text-sm max-w-sm ml-auto">
            <SummaryRow label={`Tạm tính (${total} sản phẩm)`} value={fmtPrice(order.total_amount)} />
            {order.deposit_percent && (
              <SummaryRow label={`Tiền cọc (${order.deposit_percent}%)`} value={fmtPrice(order.deposit_amount)} />
            )}
            <SummaryRow label="Đã thanh toán" value={fmtPrice(order.paid_amount)} className="text-emerald-700" />
            <SummaryRow label="Còn lại" value={fmtPrice(order.debt_amount)} className="text-red-500" />
            <div className="border-t border-neutral-200 pt-3 flex justify-between items-end mt-1">
              <span className="text-neutral-500">Tổng thanh toán</span>
              <span className="text-xl font-extrabold text-emerald-800">{fmtPrice(order.total_amount)}</span>
            </div>
          </div>
        </div>

          </div>

          {/* Footer */}
          {isPending && (
            <div
              className={`shrink-0 border-t px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 ${
                canConfirm ? "bg-emerald-50 border-emerald-100" : "bg-neutral-50 border-neutral-200"
              }`}
            >
              <div>
                <p className={`text-sm font-bold ${canConfirm ? "text-emerald-900" : "text-neutral-500"}`}>
                  {canConfirm ? "Sẵn sàng xác nhận đơn hàng" : "Chưa thể xác nhận đơn hàng"}
                </p>
                <p className={`text-xs mt-0.5 ${canConfirm ? "text-emerald-700" : "text-neutral-400"}`}>
                  {canConfirm
                    ? `${approved} sản phẩm được duyệt${rejected > 0 ? `, ${rejected} bị từ chối` : ""} — nhấn xác nhận để hoàn tất`
                    : "Cần duyệt hoặc từ chối tất cả sản phẩm trước khi xác nhận"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setConfirmModal(true)}
                disabled={!canConfirm}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  canConfirm
                    ? "bg-emerald-800 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                <CheckCheck size={16} /> Xác nhận đơn hàng
              </button>
            </div>
          )}
        </div>
      </div>

      {rejectModal && (
        <RejectModal
          item={rejectModal}
          onClose={() => setRejectModal(null)}
          onConfirm={(reason) => {
            setItemStatus(rejectModal.id, "rejected", reason);
            setRejectModal(null);
          }}
        />
      )}
      {confirmModal && (
        <ConfirmOrderModal
          approved={approved}
          rejected={rejected}
          total={total}
          loading={loading}
          onClose={() => setConfirmModal(false)}
          onConfirm={confirmOrder}
        />
      )}
    </>
  );
}

// ─── ITEM ROW ───────────────────────────────────────────────────────────────
function ItemRow({ item, isLast, canEdit, onApprove, onReject, onReset }) {
  return (
    <div
      className={`${!isLast ? "border-b border-neutral-100" : ""} ${
        item.item_status === "rejected"
          ? "bg-red-50/40"
          : item.item_status === "approved"
            ? "bg-emerald-50/20"
            : ""
      }`}
    >
      <div className="flex items-center gap-4 px-5 py-4">

        {/* ── Checkboxes với label ── */}
        {canEdit ? (
          <div className="flex flex-col gap-2 shrink-0">
            <button onClick={item.item_status === "approved" ? onReset : onApprove} className="flex items-center gap-2 group">
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                item.item_status === "approved"
                  ? "bg-emerald-600 border-emerald-600"
                  : "border-neutral-400 bg-white group-hover:border-emerald-500"
              }`}>
                {item.item_status === "approved" && (
                  <svg viewBox="0 0 10 8" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1,4 4,7 9,1" />
                  </svg>
                )}
              </span>
              <span className={`text-xs font-medium select-none transition-colors ${
                item.item_status === "approved" ? "text-emerald-700" : "text-neutral-500 group-hover:text-emerald-600"
              }`}>Duyệt</span>
            </button>
            <button onClick={item.item_status === "rejected" ? onReset : onReject} className="flex items-center gap-2 group">
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                item.item_status === "rejected"
                  ? "bg-red-500 border-red-500"
                  : "border-neutral-400 bg-white group-hover:border-red-400"
              }`}>
                {item.item_status === "rejected" && (
                  <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="2" y1="2" x2="8" y2="8" /><line x1="8" y1="2" x2="2" y2="8" />
                  </svg>
                )}
              </span>
              <span className={`text-xs font-medium select-none transition-colors ${
                item.item_status === "rejected" ? "text-red-500" : "text-neutral-500 group-hover:text-red-500"
              }`}>Từ chối</span>
            </button>
          </div>
        ) : (
          <span className={`text-xs font-bold shrink-0 w-[80px] ${
            item.item_status === "approved" ? "text-emerald-600" :
            item.item_status === "rejected" ? "text-red-500" : "text-neutral-400"
          }`}>
            {item.item_status === "approved" ? "✓ Đã duyệt" :
             item.item_status === "rejected" ? "✗ Từ chối" : "· Chờ duyệt"}
          </span>
        )}

        {/* Divider */}
        <div className="w-px self-stretch bg-neutral-100 shrink-0" />

        {/* Product info + price inline */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Thumbnail */}
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 overflow-hidden">
            {item.product_thumbnail_url
              ? <img src={item.product_thumbnail_url} alt={item.product_name} className="w-full h-full object-cover" />
              : <span className="text-xl">🥬</span>
            }
          </div>

          {/* Name + unit + note */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{item.product_name}</p>
            <p className="text-xs text-neutral-400">{item.product_unit}</p>
            {item.note && <p className="text-xs text-neutral-400 italic mt-0.5">{item.note}</p>}
          </div>

          {/* Đơn giá */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[11px] text-neutral-400">Đơn giá</span>
            <span className="text-sm text-neutral-700 font-medium">{fmtPrice(item.unit_price)}</span>
          </div>

          {/* Số lượng */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[11px] text-neutral-400">Số lượng</span>
            <span className="text-sm font-semibold text-neutral-800">{item.quantity}</span>
          </div>

          {/* Thành tiền */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[11px] text-neutral-400">Thành tiền</span>
            <span className="text-sm font-bold text-gray-900">{fmtPrice(item.subtotal)}</span>
          </div>
        </div>
      </div>

      {/* Reject reason */}
      {item.item_status === "rejected" && item.reject_reason && (
        <div className="px-5 pb-3 flex items-start gap-1.5 text-xs text-red-500 ml-4">
          <AlertTriangle size={11} className="mt-0.5 shrink-0" />
          Lý do: <b className="ml-0.5">{item.reject_reason}</b>
        </div>
      )}
    </div>
  );
}

// ─── REJECT MODAL ───────────────────────────────────────────────────────────
function RejectModal({ item, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [err, setErr]       = useState("");

  return (
    <Overlay onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Ban size={15} className="text-red-500" />
            <h2 className="font-bold text-gray-900">Từ chối sản phẩm</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400">✕</button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-red-50 rounded-xl p-3 border border-red-100">
            <span className="text-2xl">🥬</span>
            <div>
              <p className="text-sm font-bold text-gray-900">{item.product_name}</p>
              <p className="text-xs text-neutral-400">{item.product_unit}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-neutral-700">
              Lý do từ chối <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={e => { setReason(e.target.value); setErr(""); }}
              placeholder="VD: Sản phẩm hết hàng, không đủ số lượng trong kho..."
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none resize-none transition-colors ${
                err ? "border-red-400" : "border-neutral-200 focus:border-emerald-600"
              }`}
            />
            {err && <span className="text-xs text-red-500">{err}</span>}
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-neutral-100">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50">Huỷ</button>
          <button
            onClick={() => { if (!reason.trim()) { setErr("Vui lòng nhập lý do"); return; } onConfirm(reason.trim()); }}
            className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-500"
          >
            Xác nhận từ chối
          </button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── CONFIRM ORDER MODAL ────────────────────────────────────────────────────
function ConfirmOrderModal({ approved, rejected, total, loading, onClose, onConfirm }) {
  return (
    <Overlay onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4">
        <div className="px-6 py-6 flex flex-col gap-4 items-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCheck size={26} className="text-emerald-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Xác nhận đơn hàng?</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Bạn đã xử lý <b>{total}</b> sản phẩm:
              <span className="text-emerald-700 font-bold"> {approved} duyệt</span>
              {rejected > 0 && <span className="text-red-500 font-bold">, {rejected} từ chối</span>}.
            </p>
            {rejected > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
                Sản phẩm bị từ chối sẽ được thông báo đến người mua.
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">Quay lại</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-emerald-800 text-white text-sm font-bold hover:bg-emerald-700 disabled:opacity-60">
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── SHARED COMPONENTS ──────────────────────────────────────────────────────
function Overlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">{icon}<h2 className="font-bold text-gray-900 text-sm">{title}</h2></div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">{label}</span>
      <span className="text-sm font-medium text-gray-800">{children}</span>
    </div>
  );
}

function MetaItem({ icon, label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-medium uppercase tracking-wide">{icon}{label}</div>
      <p className="text-sm font-semibold text-gray-800">{children}</p>
    </div>
  );
}

function SummaryRow({ label, value, className = "" }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className={`font-medium text-gray-800 ${className}`}>{value}</span>
    </div>
  );
}