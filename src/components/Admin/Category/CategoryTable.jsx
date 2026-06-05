import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    active:  { label: "ĐANG HOẠT ĐỘNG", bg: "bg-teal-800/10",   text: "text-teal-800"  },
    paused:  { label: "TẠM NGƯNG",      bg: "bg-red-700/10",    text: "text-red-700"   },
    pending: { label: "ĐĂNG KÝ",        bg: "bg-amber-500/10",  text: "text-amber-500" },
};

// ── Custom DataTable styles ───────────────────────────────────────────────────
const customStyles = {
    tableWrapper: { style: { borderRadius: "0.75rem", overflow: "hidden" } },
    headRow: {
        style: {
            backgroundColor: "#f8f7f5",       // stone-100
            borderBottom: "1px solid #e5e5e5",
            minHeight: "48px",
        },
    },
    headCells: {
        style: {
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            color: "#525252",                 // neutral-600
            fontFamily: "'Geist', sans-serif",
            paddingLeft: "24px",
            paddingRight: "24px",
        },
    },
    rows: {
        style: {
            minHeight: "60px",
            borderBottom: "1px solid #e5e5e5",
            fontFamily: "'Geist', sans-serif",
            "&:hover": { backgroundColor: "#fafaf9" },
        },
    },
    cells: {
        style: { paddingLeft: "24px", paddingRight: "24px" },
    },
    pagination: {
        style: {
            backgroundColor: "#f8f7f5",
            borderTop: "1px solid #e5e5e5",
            fontFamily: "'Geist', sans-serif",
            fontSize: "13px",
            color: "#525252",
            borderBottomLeftRadius: "0.75rem",
            borderBottomRightRadius: "0.75rem",
        },
        pageButtonsStyle: {
            borderRadius: "6px",
            height: "32px",
            width: "32px",
            color: "#404040",
            fill: "#404040",
            "&:hover:not(:disabled)": { backgroundColor: "#e7f3ef" },
            "&:focus": { outline: "none", backgroundColor: "#e7f3ef" },
        },
    },
    noData: {
        style: { padding: "48px", color: "#a3a3a3", fontFamily: "'Geist', sans-serif" },
    },
};

// ── Pagination text (Vietnamese) ──────────────────────────────────────────────
const paginationComponentOptions = {
    rowsPerPageText: "Hiển thị:",
    rangeSeparatorText: "trong",
    selectAllRowsItem: false,
};

// ── Column definitions ────────────────────────────────────────────────────────
const buildColumns = (onEdit, onDelete) => [
    {
        name: "Mã danh mục",
        selector: (row) => row.code,
        sortable: true,
        width: "160px",
        cell: (row) => (
            <span className="text-emerald-800 text-xs font-semibold font-mono">{row.code}</span>
        ),
    },
    {
        name: "Tên danh mục",
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
        name: "Số lượng SP",
        selector: (row) => row.productCount,
        sortable: true,
        right: true,
        width: "160px",
        cell: (row) => (
            <span className="text-zinc-800 text-xs font-mono">{row.productCount}</span>
        ),
    },
    {
        name: "Trạng thái",
        selector: (row) => row.status,
        sortable: true,
        width: "200px",
        cell: (row) => {
            const st = STATUS_CONFIG[row.status] ?? STATUS_CONFIG.pending;
            return (
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${st.bg} ${st.text}`}>
                    {st.label}
                </span>
            );
        },
    },
    {
        name: "Thao tác",
        width: "120px",
        center: true,
        cell: (row) => (
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onEdit(row)}
                    title="Chỉnh sửa"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                    <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={() => onDelete(row)}
                    title="Xóa"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        ),
        ignoreRowClick: true,
    },
];

/**
 * CategoryTable — uses react-data-table-component
 * Props:
 *   data         : Category[]
 *   search       : string        — filter by name
 *   statusFilter : string        — "" | "active" | "paused" | "pending"
 *   onEdit       : (row) => void
 *   onDelete     : (row) => void
 */
export default function CategoryTable({ data, search, statusFilter, onEdit, onDelete }) {
    // Client-side filter (search + status)
    const filtered = data.filter((row) => {
        const matchName   = row.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter ? row.status === statusFilter : true;
        return matchName && matchStatus;
    });

    const columns = buildColumns(onEdit, onDelete);

    return (
        <div className="w-full rounded-xl border border-neutral-200 overflow-hidden">
            <DataTable
                columns={columns}
                data={filtered}
                pagination
                paginationPerPage={7}
                paginationRowsPerPageOptions={[7, 14, 20]}
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
                noDataComponent={
                    <div className="py-16 text-sm text-neutral-400 font-['Geist',sans-serif]">
                        Không tìm thấy danh mục phù hợp.
                    </div>
                }
                defaultSortFieldId={1}
                highlightOnHover
                responsive
            />
        </div>
    );
}