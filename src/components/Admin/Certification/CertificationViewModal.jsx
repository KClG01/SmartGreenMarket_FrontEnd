import { useState } from "react";
import { X, CalendarDays } from "lucide-react";

import ConfirmModal from "../../common/ConfirmModal";

export default function CertificationViewModal({
    isOpen,
    onClose,
    certification,
    onApprove,
    onReject,
}) {
    const [confirmType, setConfirmType] =
        useState(null);

    if (!isOpen || !certification)
        return null;

    const isRegistered =
        certification.status ===
        "registered";

    const handleApprove =
        async () => {
            await onApprove(
                certification
            );

            onClose();
        };

    const handleReject =
        async () => {
            await onReject(
                certification
            );

            onClose();
        };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">

                {/* Modal */}
                <div className="w-full max-w-[896px] max-h-[90vh] bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden flex flex-col">

                    {/* Header */}
                    <div className="px-8 py-4 border-b border-neutral-200 flex items-center justify-between shrink-0">

                        <h2 className="text-xl font-semibold text-zinc-900">
                            Chi tiết chứng chỉ
                        </h2>

                        <button
                            onClick={onClose}
                            className="cursor-pointer p-2 rounded-full hover:bg-neutral-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-zinc-900" />
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto px-8 pt-8 pb-7 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">

                        <div className="grid grid-cols-2 gap-6">

                            <InfoField
                                label="Certificate ID"
                                value={
                                    certification.code
                                }
                                mono
                            />

                            <InfoField
                                label="Supplier ID"
                                value={
                                    certification.supplier
                                }
                                mono
                            />
                        </div>

                        <InfoField
                            label="Tên chứng chỉ"
                            value={
                                certification.name
                            }
                            serif
                        />

                        <div className="grid grid-cols-2 gap-6">

                            <InfoField
                                label="Mã số chứng chỉ"
                                value={
                                    certification.code
                                }
                                mono
                            />

                            <InfoField
                                label="Cơ quan cấp"
                                value={
                                    certification.issuedBy
                                }
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">

                            <DateField
                                label="Ngày cấp"
                                value={
                                    certification.issueDate
                                }
                            />

                            <DateField
                                label="Ngày hết hạn"
                                value={
                                    certification.expiryDate
                                }
                                danger
                            />
                        </div>

                        <TextAreaField
                            label="Mô tả chi tiết"
                            value={
                                certification.description
                            }
                        />

                        {/* Demo content để test scrollbar */}
                        <TextAreaField
                            label="Ghi chú"
                            value={`
Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet.
                            `}
                        />
                    </div>

                    {/* Footer */}
                    {isRegistered && (
                        <div className="px-8 py-6 border-t border-neutral-200 flex justify-end gap-4 shrink-0 bg-white">

                            <button
                                onClick={() =>
                                    setConfirmType(
                                        "reject"
                                    )
                                }
                                className="cursor-pointer px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white text-base font-bold rounded-lg transition-colors"
                            >
                                Từ chối
                            </button>

                            <button
                                onClick={() =>
                                    setConfirmType(
                                        "approve"
                                    )
                                }
                                className="cursor-pointer px-8 py-2.5 bg-green-700 hover:bg-green-600 text-white text-base font-bold rounded-lg transition-colors shadow-sm"
                            >
                                Duyệt
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Approve Confirm */}
            <ConfirmModal
                isOpen={
                    confirmType ===
                    "approve"
                }
                onClose={() =>
                    setConfirmType(null)
                }
                onConfirm={
                    handleApprove
                }
                title="Duyệt chứng chỉ"
                message={`Bạn có chắc chắn muốn duyệt chứng chỉ "${certification.name}" không?`}
                confirmText="Duyệt"
                cancelText="Hủy"
                variant="warning"
            />

            {/* Reject Confirm */}
            <ConfirmModal
                isOpen={
                    confirmType ===
                    "reject"
                }
                onClose={() =>
                    setConfirmType(null)
                }
                onConfirm={
                    handleReject
                }
                title="Từ chối chứng chỉ"
                message={`Bạn có chắc chắn muốn từ chối chứng chỉ "${certification.name}" không?`}
                confirmText="Từ chối"
                cancelText="Hủy"
                variant="danger"
            />
        </>
    );
}

function InfoField({
    label,
    value,
    mono,
    serif,
}) {
    return (
        <div className="flex flex-col gap-1">

            <label className="text-neutral-700 text-base">
                {label}
            </label>

            <div className="px-4 py-2.5 rounded-lg border border-neutral-200 bg-stone-100">

                <span
                    className={`
                        text-zinc-900 text-base
                        ${
                            mono
                                ? "font-mono"
                                : ""
                        }
                        ${
                            serif
                                ? "font-serif"
                                : ""
                        }
                    `}
                >
                    {value || "-"}
                </span>
            </div>
        </div>
    );
}

function DateField({
    label,
    value,
    danger,
}) {
    return (
        <div className="flex flex-col gap-1">

            <label className="text-neutral-700 text-base">
                {label}
            </label>

            <div className="px-4 py-2.5 rounded-lg border border-neutral-200 flex items-center gap-2">

                <CalendarDays
                    className={`w-4 h-4 ${
                        danger
                            ? "text-red-700"
                            : "text-neutral-700"
                    }`}
                />

                <span
                    className={`text-base ${
                        danger
                            ? "text-red-700 font-bold"
                            : "text-zinc-900"
                    }`}
                >
                    {value}
                </span>
            </div>
        </div>
    );
}

function TextAreaField({
    label,
    value,
}) {
    return (
        <div className="flex flex-col gap-1">

            <label className="text-neutral-700 text-base">
                {label}
            </label>

            <div className="min-h-24 px-4 py-3 rounded-lg border border-neutral-200">

                <p className="text-zinc-900 text-base whitespace-pre-line">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
}