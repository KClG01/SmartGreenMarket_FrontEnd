import { AlertTriangle } from "lucide-react";
import Modal from "../common/Modal";

/**
 * DeleteConfirmModal — reusable delete confirmation
 * Props:
 *   isOpen      : boolean
 *   onClose     : () => void
 *   onConfirm   : () => void
 *   itemName    : string
 *   description : string   — optional
 */
export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName = "", description }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Xác nhận xóa"
            size="sm"
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-semibold text-neutral-600 hover:text-neutral-800 transition-colors font-['Geist',sans-serif]"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-colors font-['Geist',sans-serif]"
                    >
                        Xóa
                    </button>
                </>
            }
        >
            <div className="flex flex-col items-center gap-4 text-center py-2">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-neutral-700 font-['Geist',sans-serif]">
                        Bạn có chắc muốn xóa danh mục{" "}
                        <span className="font-bold text-zinc-900">"{itemName}"</span>?
                    </p>
                    <p className="text-xs text-neutral-400 font-['Geist',sans-serif]">
                        {description ?? "Hành động này không thể hoàn tác."}
                    </p>
                </div>
            </div>
        </Modal>
    );
}