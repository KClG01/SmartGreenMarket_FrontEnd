// common/ConfirmModal.jsx
import { X, AlertTriangle, Info } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  variant = "warning", // warning, info, danger
}) {
  if (!isOpen) return null;

  const variantStyles = {
    warning: {
      icon: <AlertTriangle size={24} className="text-amber-500" />,
      confirmBtn: "bg-amber-500 hover:bg-amber-600",
    },
    info: {
      icon: <Info size={24} className="text-blue-500" />,
      confirmBtn: "bg-blue-500 hover:bg-blue-600",
    },
    danger: {
      icon: <AlertTriangle size={24} className="text-red-500" />,
      confirmBtn: "bg-red-500 hover:bg-red-600",
    },
  };

  const style = variantStyles[variant] || variantStyles.warning;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {style.icon}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${style.confirmBtn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}