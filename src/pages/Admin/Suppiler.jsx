import { useState } from "react";
import SearchBar from "../../components/Admin/UI/SearchBar";
import Filter  from "../../components/Admin/Suppiler/SuppilerFilter";
import SupplierTable from "../../components/Admin/Suppiler/SuppilerTable";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id:  1, code: "C-01", name: "Nhà cung cấp A", status: "active"  },
  { id:  2, code: "C-02", name: "Nhà cung cấp B", status: "active"  },
  { id:  3, code: "C-03", name: "Nhà cung cấp C", status: "active"  },
  { id:  4, code: "C-04", name: "Nhà cung cấp D", status: "active"  },
  { id:  5, code: "C-05", name: "Nhà cung cấp E", status: "active"  },
  { id:  6, code: "C-06", name: "Nhà cung cấp F", status: "locked"  },
  { id:  7, code: "C-07", name: "Nhà cung cấp G", status: "banned" },
  { id:  8, code: "C-08", name: "Nhà cung cấp H", status: "active"  },
  { id:  9, code: "C-09", name: "Nhà cung cấp K", status: "locked"  },
  { id: 10, code: "C-10", name: "Nhà cung cấp L", status: "banned" },
  { id: 11, code: "C-11", name: "Nhà cung cấp I", status: "active"  },
  { id: 12, code: "C-12", name: "Nhà cung cấp E", status: "active"  },
];

export default function SupplierPage() {
  const [data,         setData]         = useState(INITIAL_DATA);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Modal states
  const [deleteRow, setDeleteRow] = useState(null); // row | null

  const handleDelete = () => {
    setData((prev) => prev.filter((row) => row.id !== deleteRow.id));
  };

  return (
    <div className="flex flex-col gap-6 px-8 pt-6 pb-10">

      <SearchBar
                          value={search}
                          onChange={setSearch}
                          placeholder={"Tìm kiếm nhà cung cấp..."}
                      />

      {/* Status filter chips */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide font-['Geist',sans-serif]">
          Lọc:
        </span>
        <Filter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Data table — pagination & sort built-in */}
      <SupplierTable
        data={data}
        search={search}
        statusFilter={statusFilter}
        //onView={(row) => setViewRow(row)}
        onDelete={(row) => setDeleteRow(row)}
      />

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <DeleteConfirmModal
        isOpen={deleteRow !== null}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDelete}
        itemName={deleteRow?.name ?? ""}
        itemType="nhà cung cấp"
      />
    </div>
  );
}