import { useCallback, useEffect, useState } from "react";
import SearchBar from "../../components/Admin/UI/SearchBar";
import Filter from "../../components/Admin/Suppiler/SuppilerFilter";
import SupplierTable from "../../components/Admin/Suppiler/SuppilerTable";
import SupplierViewModal from "../../components/Admin/Suppiler/SupplierViewModal";
import { supplierService, handleApiError} from "../../services/api/suppilerService";

export default function SupplierPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("pending");
    const [viewRow, setViewRow] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    // ── FETCH ALL SUPPLIERS ───────────────────────────────
    const fetchSuppliers = useCallback(
        async () => {
            try {
                setLoading(true);

                const response =
                    await supplierService.getAll();

                // API trả về array
                // normalize dữ liệu cho table + modal
                const formattedData =
                    response.map(
                        (supplier) => ({
                            id: supplier.id,

                            name:
                                supplier.company_name,

                            address:
                                supplier.address,

                            phone:
                                supplier.phone,

                            taxCode:
                                supplier.tax_code,

                            description:
                                supplier.description,

                            verification_status:
                                supplier.verification_status,

                            created_at:
                                supplier.created_at,

                            updated_at:
                                supplier.updated_at,
                        })
                    );

                setData(formattedData);
            } catch (error) {
                const message =
                    handleApiError(
                        error,
                        "Không thể tải danh sách nhà cung cấp"
                    );

                setError(message);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // ── FETCH DETAIL SUPPLIER ────────────────────────────
    const handleViewSupplier =
        useCallback(async (row) => {
            try {
                setLoading(true);

                const detail =
                    await supplierService.getById(
                        row.id
                    );

                // normalize data cho modal
                const formattedDetail = {
                    id: detail.id,

                    company_name:
                        detail.company_name,

                    address:
                        detail.address,

                    phone:
                        detail.phone,

                    tax_code:
                        detail.tax_code,

                    description:
                        detail.description,

                    verification_status:
                        detail.verification_status,

                    created_at:
                        detail.created_at,

                    updated_at:
                        detail.updated_at,

                    // account
                    first_name:
                        detail.account
                            ?.first_name,

                    last_name:
                        detail.account
                            ?.last_name,

                    full_name:
                        detail.account
                            ?.full_name,

                    email:
                        detail.account
                            ?.email,

                    avatar:
                        detail.account
                            ?.avatar,

                    documents:
                        detail.documents ||
                        [],

                    certifications:
                        detail.certifications ||
                        [],

                    products:
                        detail.products || [],
                };

                setViewRow(
                    formattedDetail
                );
            } catch (error) {
                handleApiError(
                    error,
                    "Không thể tải chi tiết nhà cung cấp"
                );
            } finally {
                setLoading(false);
            }
        }, []);

    // ── INITIAL FETCH ────────────────────────────────────
    useEffect(() => { fetchSuppliers(); }, [fetchSuppliers]);

    // ── APPROVE ──────────────────────────────────────────
    const handleApprove = async (supplier) => {
        try {
            setActionLoading(true);

            await supplierService.verify(
                supplier.id,
                {
                    status: "active",
                }
            );

            setViewRow(null);
            await fetchSuppliers();
        } catch (error) {
            console.error(
                handleApiError(
                    error,
                    "Không thể duyệt nhà cung cấp"
                )
            );
        } finally {
            setActionLoading(false);
        }
    };

    // ── REJECT ───────────────────────────────────────────
    const handleReject = async (supplier) => {
        try {
            setActionLoading(true);

            await supplierService.verify(
                supplier.id,
                {
                    status: "rejected",
                }
            );

            setViewRow(null);
            await fetchSuppliers();
        } catch (error) {
            console.error(
                handleApiError(
                    error,
                    "Không thể từ chối nhà cung cấp"
                )
            );
        } finally {
            setActionLoading(false);
        }
    };

    // ── LOCK ─────────────────────────────────────────────
    const handleLock = async (supplier) => {
        try {
            setActionLoading(true);

            await supplierService.status(
                supplier.id,
                {
                    status: "inactive",
                    reason: "Tạm khóa bởi admin",
                }
            );
            setViewRow(null);
            await fetchSuppliers();
        } catch (error) {
            console.error(
                handleApiError(
                    error,
                    "Không thể khóa nhà cung cấp"
                )
            );
        } finally {
            setActionLoading(false);
        }
    };

    // ── ACTIVE ───────────────────────────────────────────
    const handleUnlock = async (supplier) => {
        try {
            setActionLoading(true);

            await supplierService.status(
                supplier.id,
                {
                    status: "active",
                    reason: "Mở khóa",
                }
            );
            setViewRow(null);
            await fetchSuppliers();
        } catch (error) {
            console.error(
                handleApiError(
                    error,
                    "Không thể mở khóa nhà cung cấp"
                )
            );
        } finally {
            setActionLoading(false);
        }
    };

    // ── BAN ──────────────────────────────────────────────
    const handleBan = async (supplier) => {
        try {
            setActionLoading(true);

            await supplierService.status(
                supplier.id,
                {
                    status: "banned",
                    reason: "Vi phạm chính sách",
                }
            );

            setViewRow(null);
            await fetchSuppliers();
        } catch (error) {
            console.error(
                handleApiError(
                    error,
                    "Không thể vô hiệu hóa nhà cung cấp"
                )
            );
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 px-8 pt-6 pb-10">

            {/* SEARCH */}
            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Tìm kiếm nhà cung cấp..."
            />

            {/* FILTER */}
            <div className="flex items-center gap-3">

                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    Lọc:
                </span>

                <Filter
                    value={statusFilter}
                    onChange={
                        setStatusFilter
                    }
                />
            </div>

            {/* ERROR */}
            {error && (
                <div className="px-4 py-3 rounded-xl bg-red-100 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* TABLE */}
            <SupplierTable
                data={data}
                loading={loading}
                search={search}
                statusFilter={statusFilter}
                onView={handleViewSupplier}
            />

            {/* VIEW MODAL */}
            <SupplierViewModal
                isOpen={viewRow !== null}
                onClose={() =>setViewRow(null)}
                supplier={viewRow}
                onApprove={handleApprove}
                onReject={handleReject}
                onLock={handleLock}
                onUnlock={handleUnlock}
                onBan={handleBan}
                loading={actionLoading}
            />
        </div>
    );
}