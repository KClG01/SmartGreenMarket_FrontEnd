import { useState } from "react";
import { X } from "lucide-react";

import ConfirmModal from "../../common/ConfirmModal";

export default function SupplierViewModal({
isOpen,
onClose,
supplier,
onApprove,
}) {
const [openConfirm, setOpenConfirm] =
useState(false);

if (!isOpen || !supplier) return null;

const isRegistered =
    supplier.status === "registered";

const handleApprove = async () => {
    await onApprove(supplier);

    onClose();
};

return (
    <>
        {/* Overlay */}
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4">

            {/* Modal */}
            <div className="w-full max-w-[512px] bg-stone-50 rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 bg-stone-100 border-b border-neutral-200 flex items-center justify-between">

                    <h2 className="text-xl font-semibold text-emerald-950">
                        Thông tin nhà cung cấp
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 text-neutral-700" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-4">

                    <InfoField
                        label="Tên nhà cung cấp"
                        value={supplier.name}
                    />

                    <InfoField
                        label="Địa chỉ"
                        value={supplier.address}
                    />

                    <InfoField
                        label="Số điện thoại"
                        value={supplier.phone}
                    />

                    <InfoField
                        label="Mã số thuế hoặc CCCD"
                        value={supplier.taxCode}
                    />
                </div>

                {/* Footer */}
                {isRegistered && (
                    <div className="px-6 py-4 bg-stone-100 border-t border-neutral-200 flex justify-center">

                        <button
                            onClick={() =>
                                setOpenConfirm(true)
                            }
                            className="px-8 py-2.5 bg-amber-500 hover:bg-amber-400 text-yellow-900 text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                            Duyệt
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Confirm Modal */}
        <ConfirmModal
            isOpen={openConfirm}
            onClose={() =>
                setOpenConfirm(false)
            }
            onConfirm={handleApprove}
            title="Duyệt nhà cung cấp"
            message={`Bạn có chắc chắn muốn duyệt nhà cung cấp "${supplier.name}" không?`}
            confirmText="Duyệt"
            cancelText="Hủy"
            variant="warning"
        />
    </>
);

}

function InfoField({ label, value }) {
return ( <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
            {label}
        </label>

        <div className="px-4 py-3 bg-stone-100 rounded-lg border border-stone-300 text-sm text-gray-600">
            {value || "-"}
        </div>
    </div>
);

}
