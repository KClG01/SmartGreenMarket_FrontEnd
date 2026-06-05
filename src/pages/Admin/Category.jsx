import { useState } from "react";
import Toolbar from "../../components/Admin/UI/Toolbar";
import Filter  from "../../components/Admin/UI/Filter";
import CategoryTable      from "../../components/Admin/Category/CategoryTable";
import CategoryFormModal  from "../../components/Admin/Category/CategoryFormModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id:  1, code: "C-01", name: "Rau lá",       productCount: 24, status: "active"  },
  { id:  2, code: "C-02", name: "Rau thơm",     productCount: 12, status: "active"  },
  { id:  3, code: "C-03", name: "Rau quả",      productCount: 45, status: "active"  },
  { id:  4, code: "C-04", name: "Củ",           productCount: 30, status: "active"  },
  { id:  5, code: "C-05", name: "Dược liệu",    productCount: 18, status: "active"  },
  { id:  6, code: "C-06", name: "Rau gia vị",   productCount:  8, status: "paused"  },
  { id:  7, code: "C-07", name: "Hương liệu",   productCount:  0, status: "pending" },
  { id:  8, code: "C-08", name: "Nấm ăn",       productCount:  5, status: "active"  },
  { id:  9, code: "C-09", name: "Đậu hạt",      productCount: 11, status: "paused"  },
  { id: 10, code: "C-10", name: "Hoa ăn được",  productCount:  3, status: "pending" },
  { id: 11, code: "C-11", name: "Trái cây",     productCount: 20, status: "active"  },
  { id: 12, code: "C-12", name: "Ngũ cốc",      productCount:  7, status: "active"  },
];

let nextId = INITIAL_DATA.length + 1;

export default function CategoryPage() {
  const [data,         setData]         = useState(INITIAL_DATA);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("registered");

  // Modal states
  const [showAdd,   setShowAdd]   = useState(false);
  const [editRow,   setEditRow]   = useState(null); // row | null
  const [deleteRow, setDeleteRow] = useState(null); // row | null

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const handleAdd = ({ name, active }) => {
    const code = `C-${String(nextId).padStart(2, "0")}`;
    setData((prev) => [
      ...prev,
      { id: nextId++, code, name, productCount: 0, status: active ? "active" : "paused" },
    ]);
  };

  const handleEdit = ({ name, active }) => {
    setData((prev) =>
      prev.map((row) =>
        row.id === editRow.id
          ? { ...row, name, status: active ? "active" : "paused" }
          : row
      )
    );
  };

  const handleDelete = () => {
    setData((prev) => prev.filter((row) => row.id !== deleteRow.id));
  };

  return (
    <div className="flex flex-col gap-6 px-8 pt-6 pb-10">

      {/* Toolbar: search + filter button + add CTA */}
      <Toolbar
        search={search}
        onSearch={setSearch}
        onAdd={() => setShowAdd(true)}
        addLabel="Thêm danh mục"
        searchPlaceholder="Tìm kiếm danh mục..."
      />

      {/* Status filter chips */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide font-['Geist',sans-serif]">
          Lọc:
        </span>
        <Filter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Data table — pagination & sort built-in */}
      <CategoryTable
        data={data}
        search={search}
        statusFilter={statusFilter}
        onEdit={(row) => setEditRow(row)}
        onDelete={(row) => setDeleteRow(row)}
      />

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <CategoryFormModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={handleAdd}
        initial={null}
      />

      <CategoryFormModal
        isOpen={editRow !== null}
        onClose={() => setEditRow(null)}
        onSubmit={handleEdit}
        initial={editRow ? { name: editRow.name, active: editRow.status === "active" } : null}
      />

      {/* Dùng chung DeleteConfirmModal từ common/ thay vì Category/DeleteConfirmModal */}
      <DeleteConfirmModal
        isOpen={deleteRow !== null}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDelete}
        itemName={deleteRow?.name ?? ""}
        itemType="danh mục"
      />
    </div>
  );
}