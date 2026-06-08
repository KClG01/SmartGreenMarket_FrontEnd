import Modal from "./Modal";

/**
 * DeleteConfirmModal — wraps base Modal for delete confirmation
 * Props:
 *   isOpen    : boolean
 *   onClose   : () => void
 *   onConfirm : () => void  (async — tự đóng modal sau khi xong)
 *   itemName  : string
 *   itemType  : string  — e.g. "sản phẩm" | "danh mục"
 *   loading   : boolean — disable nút khi đang gọi API
 */
export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName, itemType = "mục", loading = false }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="justify-center">
          Xác nhận xóa
        </span>
      }
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-zinc-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {loading ? "Đang xóa..." : "Xóa"}
          </button>
        </>
      }
    >
      <p className="text-sm text-neutral-600 leading-relaxed">
        Bạn có chắc muốn xóa {itemType}{" "}
        {itemName && (
          <span className="font-semibold text-emerald-950">"{itemName}"</span>
        )}
       ? Hành động này không thể hoàn tác.
      </p>
    </Modal>
  );
}