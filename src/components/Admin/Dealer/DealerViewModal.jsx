import { useState } from "react";
import {
    X,
    Store,
    User,
    FileText,
    Package,
    ExternalLink,
} from "lucide-react";

import ConfirmModal from "../../common/ConfirmModal";
import RejectModal from "../../common/RejectModal";
import DateField from "../../common/DateField";
import InfoField from "../../common/InfoField";
import StatusBadge from "../../common/StatusBadge";

const DOCUMENT_STATUS = {
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
};

const PRODUCT_STATUS = {
    pending: "Chờ duyệt",
    active: "Đang bán",
    inactive: "Tạm ngưng",
    rejected: "Từ chối",
};

function Section({ title, icon: Icon, children }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                <Icon size={16} className="text-emerald-700" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-800">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
}

export default function DealerViewModal({
    isOpen,
    onClose,
    dealer,
    onApprove,
    onReject,
    onLock,
    onUnlock,
    onBan,
    loading,
}) {
    const [confirmConfig, setConfirmConfig] = useState(null);
    const [rejectConfig, setRejectConfig] = useState(null);

    if (!isOpen || !dealer) return null;

    const account = dealer.account || {};
    const documents = dealer.documents || [];
    const products = dealer.products || [];

    const isPending = dealer.status === "pending";
    const isRejected = dealer.status === "rejected";
    const isActiveProfile = dealer.status === "active";
    const isAccountActive = account.status === "active";
    const isAccountInactive = account.status === "inactive";
    const isAccountBanned = account.status === "banned";

    const displayName = account.full_name || dealer.store_name || "đại lý";

    const openReject = ({ title, message, action, reasonLabel, reasonPlaceholder }) => {
        setRejectConfig({ title, message, action, reasonLabel, reasonPlaceholder });
    };

    const handleRejectConfirm = async (reason) => {
        if (rejectConfig?.action) {
            await rejectConfig.action(reason);
        }
        setRejectConfig(null);
        onClose();
    };

    const openConfirm = ({ title, message, confirmText, variant, action }) => {
        setConfirmConfig({ title, message, confirmText, variant, action });
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
                    <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-6 py-4">
                        <div>
                            <h2 className="text-lg font-bold text-neutral-900">
                                Chi tiết đại lý
                            </h2>
                            <p className="text-sm text-neutral-500">
                                {dealer.store_name || "—"}
                            </p>
                        </div>
                        <button
                            type="button"
                            disabled={loading}
                            onClick={onClose}
                            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-neutral-100 disabled:opacity-50"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
                        <div className="flex flex-col gap-8 p-6">
                            <Section title="Tài khoản" icon={User}>
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                                    <img
                                        src={
                                            account.avatar_url ||
                                            "https://placehold.co/96x96"
                                        }
                                        alt=""
                                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                                    />
                                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                                        <InfoField
                                            label="Họ và tên"
                                            value={account.full_name}
                                        />
                                        <InfoField
                                            label="Tên đăng nhập"
                                            value={account.username}
                                        />
                                        <InfoField label="Email" value={account.email} />
                                        <InfoField
                                            label="Số điện thoại"
                                            value={account.phone}
                                        />
                                        <InfoField label="Vai trò" value={account.role} />
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                                Trạng thái tài khoản
                                            </label>
                                            <div className="px-1 py-2">
                                                <StatusBadge
                                                    status={account.status || "pending"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            <Section title="Cửa hàng" icon={Store}>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <InfoField
                                        label="Tên cửa hàng"
                                        value={dealer.store_name}
                                    />
                                    <InfoField
                                        label="Địa chỉ cửa hàng"
                                        value={dealer.store_address}
                                    />
                                    <div className="sm:col-span-2">
                                        <InfoField
                                            label="Mô tả"
                                            value={dealer.description}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                            Trạng thái hồ sơ
                                        </label>
                                        <div className="px-1 py-2">
                                            <StatusBadge status={dealer.status || "pending"} />
                                        </div>
                                    </div>
                                    <InfoField
                                        label="Người duyệt"
                                        value={dealer.verified_by}
                                    />
                                    <DateField
                                        label="Ngày đăng ký"
                                        value={dealer.created_at}
                                    />
                                    <DateField
                                        label="Ngày duyệt"
                                        value={dealer.verified_at}
                                    />
                                </div>

                                {dealer.rejection_reason ? (
                                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                                        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-rose-700">
                                            Lý do từ chối
                                        </p>
                                        <p className="text-sm text-rose-700">
                                            {dealer.rejection_reason}
                                        </p>
                                    </div>
                                ) : null}
                            </Section>

                            <Section title={`Giấy tờ (${documents.length})`} icon={FileText}>
                                {documents.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        {documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="rounded-xl border border-neutral-200 bg-stone-50 p-4"
                                            >
                                                <div className="mb-3 flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-neutral-900">
                                                            {doc.document_type_label ||
                                                                doc.document_type}
                                                        </p>
                                                        <p className="text-xs text-neutral-500">
                                                            {DOCUMENT_STATUS[doc.status] ||
                                                                doc.status}
                                                        </p>
                                                    </div>
                                                    {doc.file_url ? (
                                                        <a
                                                            href={doc.file_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                                                        >
                                                            Xem file
                                                            <ExternalLink size={12} />
                                                        </a>
                                                    ) : null}
                                                </div>
                                                {doc.file_url ? (
                                                    <img
                                                        src={doc.file_url}
                                                        alt=""
                                                        className="max-h-40 w-full rounded-lg border border-neutral-200 object-contain bg-white"
                                                    />
                                                ) : null}
                                                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-neutral-600">
                                                    <span>
                                                        Duyệt bởi:{" "}
                                                        {doc.verified_by_username || "—"}
                                                    </span>
                                                    <span>
                                                        Ngày tạo:{" "}
                                                        {doc.created_at
                                                            ? new Date(
                                                                  doc.created_at,
                                                              ).toLocaleDateString("vi-VN")
                                                            : "—"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-neutral-500">
                                        Chưa có giấy tờ đính kèm.
                                    </p>
                                )}
                            </Section>

                            <Section title={`Sản phẩm (${products.length})`} icon={Package}>
                                {products.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {products.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex gap-3 rounded-xl border border-neutral-200 bg-stone-50 p-3"
                                            >
                                                <img
                                                    src={
                                                        product.thumbnail ||
                                                        product.images?.[0]?.image_url ||
                                                        "https://placehold.co/80x80"
                                                    }
                                                    alt=""
                                                    className="h-20 w-20 shrink-0 rounded-lg border border-neutral-200 object-cover bg-white"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold text-neutral-900">
                                                        {product.title ||
                                                            product.supplier_product_name}
                                                    </p>
                                                    <p className="text-xs text-neutral-500">
                                                        {product.supplier_product_name}
                                                        {product.supplier_product_unit
                                                            ? ` · ${product.supplier_product_unit}`
                                                            : ""}
                                                    </p>
                                                    <p className="mt-1 text-sm font-bold text-emerald-800">
                                                        {Number(
                                                            product.retail_price || 0,
                                                        ).toLocaleString("vi-VN")}{" "}
                                                        VNĐ
                                                    </p>
                                                    <p className="text-xs text-neutral-500">
                                                        {PRODUCT_STATUS[product.status] ||
                                                            product.status}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-neutral-500">
                                        Chưa có sản phẩm nào.
                                    </p>
                                )}
                            </Section>
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap justify-center gap-3 border-t border-neutral-200 bg-white px-6 py-4">
                        {isPending ? (
                            <>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        openConfirm({
                                            title: "Duyệt đại lý",
                                            message: `Bạn có chắc chắn muốn duyệt "${displayName}"?`,
                                            confirmText: "Duyệt",
                                            variant: "success",
                                            action: () => onApprove(dealer),
                                        })
                                    }
                                    className="cursor-pointer rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
                                >
                                    Duyệt
                                </button>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        openReject({
                                            title: "Từ chối đại lý",
                                            message: `Bạn có chắc chắn muốn từ chối "${displayName}"?`,
                                            action: (reason) => onReject(dealer, reason),
                                        })
                                    }
                                    className="cursor-pointer rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
                                >
                                    Từ chối
                                </button>
                            </>
                        ) : null}

                        {isRejected ? (
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    openConfirm({
                                        title: "Duyệt lại đại lý",
                                        message: `Duyệt lại hồ sơ "${displayName}"?`,
                                        confirmText: "Duyệt",
                                        variant: "success",
                                        action: () => onApprove(dealer),
                                    })
                                }
                                className="cursor-pointer rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
                            >
                                Duyệt lại
                            </button>
                        ) : null}

                        {isActiveProfile && isAccountActive ? (
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    openConfirm({
                                        title: "Tạm khóa tài khoản",
                                        message: `Tạm khóa tài khoản của "${displayName}"?`,
                                        confirmText: "Tạm khóa",
                                        variant: "warning",
                                        action: () => onLock(dealer),
                                    })
                                }
                                className="cursor-pointer rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
                            >
                                Tạm khóa
                            </button>
                        ) : null}

                        {isActiveProfile && isAccountInactive ? (
                            <>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        openConfirm({
                                            title: "Mở khóa tài khoản",
                                            message: `Mở khóa tài khoản của "${displayName}"?`,
                                            confirmText: "Mở khóa",
                                            variant: "success",
                                            action: () => onUnlock(dealer),
                                        })
                                    }
                                    className="cursor-pointer rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                                >
                                    Mở khóa
                                </button>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        openReject({
                                            title: "Vô hiệu hóa tài khoản",
                                            message: `Vô hiệu hóa tài khoản của "${displayName}"?`,
                                            reasonLabel: "Lý do vô hiệu hóa",
                                            reasonPlaceholder:
                                                "Nhập lý do vô hiệu hóa tài khoản...",
                                            action: (reason) => onBan(dealer, reason),
                                        })
                                    }
                                    className="cursor-pointer rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                                >
                                    Vô hiệu hóa
                                </button>
                            </>
                        ) : null}

                        {isActiveProfile && isAccountBanned ? (
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    openConfirm({
                                        title: "Khôi phục tài khoản",
                                        message: `Khôi phục tài khoản của "${displayName}"?`,
                                        confirmText: "Khôi phục",
                                        variant: "success",
                                        action: () => onUnlock(dealer),
                                    })
                                }
                                className="cursor-pointer rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                            >
                                Khôi phục
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={confirmConfig !== null}
                onClose={() => setConfirmConfig(null)}
                onConfirm={handleConfirm}
                title={confirmConfig?.title}
                message={confirmConfig?.message}
                confirmText={confirmConfig?.confirmText}
                cancelText="Hủy"
                variant={confirmConfig?.variant}
                loading={loading}
            />

            <RejectModal
                isOpen={rejectConfig !== null}
                onClose={() => setRejectConfig(null)}
                onConfirm={handleRejectConfirm}
                title={rejectConfig?.title}
                message={rejectConfig?.message}
                reasonLabel={rejectConfig?.reasonLabel}
                reasonPlaceholder={rejectConfig?.reasonPlaceholder}
                loading={loading}
            />
        </>
    );
}
