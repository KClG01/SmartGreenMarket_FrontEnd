import DataTable from "react-data-table-component";
import {
    tableStyles,
    paginationVi,
} from "../../common/tableStyles";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    active: {
        label: "ĐANG HOẠT ĐỘNG",
        bg: "bg-green-200",
        text: "text-green-800",
    },

    locked: {
        label: "TẠM KHÓA",
        bg: "bg-orange-200",
        text: "text-orange-700",
    },

    banned: {
        label: "VÔ HIỆU HÓA",
        bg: "bg-red-200",
        text: "text-red-700",
    },

    registered: {
        label: "ĐĂNG KÝ",
        bg: "bg-blue-200",
        text: "text-blue-700",
    },
};

// ── Column definitions ────────────────────────────────────────────────────────
const buildColumns = (onView) => [
    {
        name: "Mã nhà cung cấp",
        selector: (row) => row.code,
        sortable: true,
        width: "200px",

        cell: (row) => (
            <span className="text-emerald-800 text-xs font-semibold font-mono">
                {row.code}
            </span>
        ),
    },

    {
        name: "Tên nhà cung cấp",
        selector: (row) => row.name,
        sortable: true,
        grow: 2,

        cell: (row) => (
            <span className="text-emerald-950 text-sm font-semibold font-['Geist',sans-serif]">
                {row.name}
            </span>
        ),
    },

    {
        name: "Trạng thái",
        selector: (row) => row.status,
        sortable: true,
        width: "200px",

        cell: (row) => {
            const st =
                STATUS_CONFIG[row.status] ??
                STATUS_CONFIG.registered;

            return (
                <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${st.bg} ${st.text}`}
                >
                    {st.label}
                </span>
            );
        },
    },

    {
        name: "Thao tác",
        width: "250px",
        center: true,

        cell: (row) => (
            <div className="flex items-center gap-2">

                <button
                    onClick={() => onView(row)}
                    title="Xem chi tiết"
                    className="px-3 py-1.5 rounded-lg font-bold bg-blue-200 text-blue-700 hover:bg-blue-300 transition-colors cursor-pointer"
                >
                    Xem chi tiết
                </button>

                {/* {row.status === "registered" && (
                    <button
                        onClick={() => onDelete(row)}
                        title="Xóa"
                        className="px-3 py-1.5 rounded-lg font-bold bg-red-200 text-red-700 hover:bg-red-300 transition-colors cursor-pointer"
                    >
                        Xóa
                    </button>
                )} */}
            </div>
        ),

        ignoreRowClick: true,
    },
];

export default function SupplierTable({
    data,
    search,
    statusFilter,
    onView,
    onDelete,
}) {
    const filtered = data.filter((row) => {
        const matchName = row.name
            .toLowerCase()
            .includes((search ?? "").toLowerCase());

        const matchStatus = statusFilter
            ? row.status === statusFilter
            : true;

        return matchName && matchStatus;
    });

    return (
        <DataTable
            columns={buildColumns(onView, onDelete)}
            data={filtered}
            pagination
            paginationPerPage={6}
            paginationRowsPerPageOptions={[6, 12, 20]}
            paginationComponentOptions={paginationVi}
            customStyles={tableStyles}
            noDataComponent={
                <div className="py-6 text-sm text-neutral-500">
                    Không tìm thấy nhà cung cấp.
                </div>
            }
            defaultSortFieldId={1}
            highlightOnHover
            responsive
        />
    );
}
