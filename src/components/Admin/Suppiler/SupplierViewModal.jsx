import { useState } from "react";
import { X } from "lucide-react";

import ConfirmModal from "../../common/ConfirmModal";

export default function SupplierViewModal({
    isOpen,
    onClose,
    supplier,
    onApprove,
    onReject,
    onLock,
    onUnlock,
    onBan,
}) {
    const [confirmConfig, setConfirmConfig] = useState(null);

    if (!isOpen || !supplier) return null;

    const isRegistered = supplier.status === "registered";
    const isActive = supplier.status === "active";
    const isLocked = supplier.status === "locked";
    const isBanned = supplier.status === "banned";

    const openConfirm = ({
        title,
        message,
        confirmText,
        variant,
        action,
    }) => {
        setConfirmConfig({
            title,
            message,
            confirmText,
            variant,
            action,
        });
    };

    const handleConfirm = async () => {
        if (confirmConfig?.action) {
            await confirmConfig.action();
        }

        setConfirmConfig(null);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

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

                        <InfoField
                            label="Trạng thái"
                            value={supplier.status}
                        />
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-stone-100 border-t border-neutral-200 flex justify-center gap-3 flex-wrap">

                        {/* REGISTERED */}
                        {isRegistered && (
                            <>
                                <button
                                    onClick={() =>
                                        openConfirm({
                                            title: "Duyệt nhà cung cấp",
                                            message: `Bạn có chắc chắn muốn duyệt nhà cung cấp "${supplier.name}" không?`,
                                            confirmText: "Duyệt",
                                            variant: "warning",
                                            action: () => onApprove(supplier),
                                        })
                                    }
                                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-yellow-900 text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
                                >
                                    Duyệt
                                </button>

                                <button
                                    onClick={() =>
                                        openConfirm({
                                            title: "Từ chối nhà cung cấp",
                                            message: `Bạn có chắc chắn muốn từ chối nhà cung cấp "${supplier.name}" không?`,
                                            confirmText: "Từ chối",
                                            variant: "danger",
                                            action: () => onReject(supplier),
                                        })
                                    }
                                    className="px-6 py-2.5 bg-red-500 hover:bg-red-400 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
                                >
                                    Từ chối
                                </button>
                            </>
                        )}

                        {/* ACTIVE */}
                        {isActive && (
                            <button
                                onClick={() =>
                                    openConfirm({
                                        title: "Tạm khóa nhà cung cấp",
                                        message: `Bạn có chắc chắn muốn tạm khóa nhà cung cấp "${supplier.name}" không?`,
                                        confirmText: "Tạm khóa",
                                        variant: "warning",
                                        action: () => onLock(supplier),
                                    })
                                }
                                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
                            >
                                Tạm khóa
                            </button>
                        )}

                        {/* LOCKED */}
                        {isLocked && (
                            <>
                                <button
                                    onClick={() =>
                                        openConfirm({
                                            title: "Mở khóa nhà cung cấp",
                                            message: `Bạn có chắc chắn muốn mở khóa nhà cung cấp "${supplier.name}" không?`,
                                            confirmText: "Mở khóa",
                                            variant: "success",
                                            action: () => onUnlock(supplier),
                                        })
                                    }
                                    className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
                                >
                                    Mở khóa
                                </button>

                                <button
                                    onClick={() =>
                                        openConfirm({
                                            title: "Vô hiệu hóa nhà cung cấp",
                                            message: `Bạn có chắc chắn muốn vô hiệu hóa nhà cung cấp "${supplier.name}" không?`,
                                            confirmText: "Vô hiệu hóa",
                                            variant: "danger",
                                            action: () => onBan(supplier),
                                        })
                                    }
                                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
                                >
                                    Vô hiệu hóa
                                </button>
                            </>
                        )}
                        {/* BANNED */}
                        {isBanned && (
                            <>
                                <button
                                    onClick={() =>
                                        openConfirm({
                                            title: "Mở khóa nhà cung cấp",
                                            message: `Bạn có chắc chắn muốn mở khóa nhà cung cấp "${supplier.name}" không?`,
                                            confirmText: "Mở khóa",
                                            variant: "success",
                                            action: () => onUnlock(supplier),
                                        })
                                    }
                                    className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
                                >
                                    Mở khóa
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={confirmConfig !== null}
                onClose={() => setConfirmConfig(null)}
                onConfirm={handleConfirm}
                title={confirmConfig?.title}
                message={confirmConfig?.message}
                confirmText={confirmConfig?.confirmText}
                cancelText="Hủy"
                variant={confirmConfig?.variant}
            />
        </>
    );
}

function InfoField({ label, value }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                {label}
            </span>

            <div className="px-4 py-3 bg-stone-100 rounded-lg border border-stone-300 text-sm text-gray-600">
                {value || "-"}
            </div>
        </div>
    );
}
