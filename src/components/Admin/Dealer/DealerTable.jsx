import DataTable from "react-data-table-component";
import { tableStyles, paginationVi } from "../../common/tableStyles";
import { formatDateTime } from "../../common/formatDateTime";
import { getDealerDisplayStatus } from "./DealerFilter";

const STATUS_CONFIG = {
    active: { label: "ĐANG HOẠT ĐỘNG", bg: "bg-green-200", text: "text-green-800" },
    inactive: { label: "TẠM KHÓA", bg: "bg-gray-200", text: "text-gray-800" },
    banned: { label: "VÔ HIỆU HÓA", bg: "bg-red-200", text: "text-red-800" },
    pending: { label: "CHỜ DUYỆT", bg: "bg-amber-200", text: "text-amber-800" },
    rejected: { label: "TỪ CHỐI", bg: "bg-rose-200", text: "text-rose-800" },
};

const buildColumns = (onView) => [
    {
        id: 1,
        name: "CỬA HÀNG",
        selector: (row) => row.store_name,
        sortable: true,
        grow: 2,
        cell: (row) => (
            <div className="flex flex-col py-1">
                <span className="text-sm font-semibold font-['Geist',sans-serif]">
                    {row.store_name || "—"}
                </span>
                <span className="text-xs text-neutral-500">{row.owner_name || "—"}</span>
            </div>
        ),
    },
    {
        name: "ĐỊA CHỈ",
        selector: (row) => row.store_address,
        sortable: true,
        grow: 2,
        cell: (row) => (
            <span className="text-sm font-semibold font-['Geist',sans-serif]">
                {row.store_address || "—"}
            </span>
        ),
    },
    {
        name: "LIÊN HỆ",
        selector: (row) => row.phone,
        sortable: true,
        grow: 1,
        cell: (row) => (
            <div className="flex flex-col py-1">
                <span className="text-sm font-semibold font-['Geist',sans-serif]">
                    {row.phone || "—"}
                </span>
                <span className="text-xs text-neutral-500">{row.email || "—"}</span>
            </div>
        ),
    },
    {
        name: "THỜI GIAN",
        selector: (row) => row.created_at,
        sortable: true,
        center: true,
        width: "150px",
        cell: (row) => (
            <span className="text-sm font-semibold font-['Geist',sans-serif]">
                {formatDateTime(row.created_at)}
            </span>
        ),
    },
    {
        name: "TRẠNG THÁI",
        selector: (row) => getDealerDisplayStatus(row),
        sortable: true,
        center: true,
        width: "180px",
        cell: (row) => {
            const displayStatus = getDealerDisplayStatus(row);
            const st = STATUS_CONFIG[displayStatus] ?? STATUS_CONFIG.pending;

            return (
                <span
                    className={`rounded-full px-2.5 py-1 text-sm font-semibold uppercase tracking-wide font-['Geist',sans-serif] ${st.bg} ${st.text}`}
                >
                    {st.label}
                </span>
            );
        },
    },
    {
        name: "THAO TÁC",
        width: "150px",
        center: true,
        cell: (row) => (
            <button
                type="button"
                onClick={() => onView(row)}
                title="Xem chi tiết"
                className="cursor-pointer rounded-lg bg-blue-200 px-3 py-1.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-300 font-['Geist',sans-serif]"
            >
                Xem chi tiết
            </button>
        ),
        ignoreRowClick: true,
    },
];

export default function DealerTable({ data, loading, onView }) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200">
            <DataTable
                columns={buildColumns(onView)}
                data={data}
                progressPending={loading}
                pagination
                paginationPerPage={10}
                paginationComponentOptions={paginationVi}
                customStyles={tableStyles}
                noDataComponent={
                    <div className="py-6 text-sm text-neutral-500">
                        Không tìm thấy đại lý.
                    </div>
                }
                defaultSortFieldId={1}
                highlightOnHover
                responsive
            />
        </div>
    );
}
