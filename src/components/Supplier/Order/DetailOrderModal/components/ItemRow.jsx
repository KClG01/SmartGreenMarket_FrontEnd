import { fmtPrice } from "../utils";

export default function ItemRow({ item, canEdit, onApprove, onReject, onReset }) {
  return (
    <div className={`px-5 py-4 ${
      item.item_status === "rejected" ? "bg-red-50/40" :
      item.item_status === "approved" ? "bg-emerald-50/20" : "bg-white"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">

        {/* Nút Duyệt / Từ chối */}
        {canEdit ? (
          <div className="flex gap-3 shrink-0">
            <button
              type="button"
              onClick={item.item_status === "approved" ? onReset : onApprove}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                item.item_status === "approved"
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-emerald-500 hover:text-emerald-700"
              }`}
            >
              {item.item_status === "approved" ? "✓ Đã duyệt" : "Duyệt"}
            </button>
            <button
              type="button"
              onClick={item.item_status === "rejected" ? onReset : onReject}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                item.item_status === "rejected"
                  ? "bg-red-500 border-red-500 text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-red-400 hover:text-red-600"
              }`}
            >
              {item.item_status === "rejected" ? "✗ Từ chối" : "Từ chối"}
            </button>
          </div>
        ) : (
          <span className={`text-xs font-bold shrink-0 ${
            item.item_status === "approved" ? "text-emerald-600" :
            item.item_status === "rejected" ? "text-red-500" : "text-neutral-400"
          }`}>
            {item.item_status === "approved" ? "✓ Đã duyệt" :
             item.item_status === "rejected" ? "✗ Từ chối" : "· Chờ duyệt"}
          </span>
        )}

        {/* Thông tin sản phẩm */}
        <div className="flex gap-3 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 overflow-hidden">
            {item.product_thumbnail_url ? (
              <img src={item.product_thumbnail_url} alt={item.product_name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl">🥬</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">{item.product_name}</p>
            <p className="text-xs text-neutral-500 mt-0.5">
              {item.quantity} {item.product_unit} × {fmtPrice(item.unit_price)}
            </p>
            {item.note && <p className="text-xs text-neutral-400 italic mt-1">{item.note}</p>}
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] text-neutral-400">Thành tiền</p>
            <p className="text-sm font-bold text-gray-900">{fmtPrice(item.subtotal)}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
