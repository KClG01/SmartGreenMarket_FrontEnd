import { useState, useEffect } from "react";
import Modal from "../common/Modal";

/**
 * CategoryFormModal — Add / Edit category
 * Props:
 *   isOpen   : boolean
 *   onClose  : () => void
 *   onSubmit : (data: { name: string; active: boolean }) => void
 *   initial  : { name?: string; active?: boolean } | null   — null = Add mode
 */
export default function CategoryFormModal({ isOpen, onClose, onSubmit, initial = null }) {
    const isEdit = initial !== null;

    const [name,   setName]   = useState("");
    const [active, setActive] = useState(true);
    const [error,  setError]  = useState("");

    useEffect(() => {
        if (isOpen) {
            setName(initial?.name ?? "");
            setActive(initial?.active ?? true);
            setError("");
        }
    }, [isOpen, initial]);

    const handleSubmit = () => {
        if (!name.trim()) { setError("Vui lòng nhập tên danh mục."); return; }
        onSubmit({ name: name.trim(), active });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
            size="md"
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-semibold text-neutral-600 hover:text-neutral-800 transition-colors font-['Geist',sans-serif]"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors font-['Geist',sans-serif]"
                    >
                        {isEdit ? "Lưu thay đổi" : "Thêm danh mục"}
                    </button>
                </>
            }
        >
            <div className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide font-['Geist',sans-serif]">
                        Tên danh mục
                    </label>
                    <input
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(""); }}
                        placeholder="VD: Rau lá, Củ quả..."
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm text-zinc-800 bg-white outline-none transition-all font-['Geist',sans-serif]
                            focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400
                            ${error ? "border-red-400" : "border-neutral-200"}`}
                    />
                    {error && <span className="text-xs text-red-500">{error}</span>}
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-neutral-700 font-['Geist',sans-serif]">
                        Trạng thái kinh doanh
                    </span>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={active}
                        onClick={() => setActive((a) => !a)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200
                            ${active ? "bg-emerald-600" : "bg-neutral-300"}`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
                                ${active ? "translate-x-6" : "translate-x-0"}`}
                        />
                    </button>
                </div>
            </div>
        </Modal>
    );
}