import { useState } from "react";
import Toolbar from "../../components/Admin/UI/Toolbar";
import Filter  from "../../components/Admin/Certification/CertificationFilter";
import CerificationTable from "../../components/Admin/Certification/CertificationTable";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id: 1, code: "CER-01", name: "VietGAP",    supplier: "Nhà cung cấp A", status: "active",},
  { id: 2, code: "CER-02", name: "Hữu Cơ",       supplier: "Nhà cung cấp A",   status: "registered"},
  { id: 3, code: "CER-03", name: "VietGAP",       supplier: "Nhà cung cấp B", status: "rejected"},
  { id: 4, code: "CER-04", name: "VietGAP", supplier: "Nhà cung cấp C",       status: "active" },
  { id: 5, code: "CER-05", name: "VietGAP",     supplier: "Nhà cung cấp D",       status: "active"},
  { id: 6, code: "CER-06", name: "VietGAP",    supplier: "Nhà cung cấp E", status: "active" },
  { id: 7, code: "CER-07", name: "Hữu Cơ",    supplier: "Nhà cung cấp C",   status: "registered"},
];

export default function CertificationPage() {
  const [data,         setData]         = useState(INITIAL_DATA);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("registered");

  // Modal states
  const [deleteRow, setDeleteRow] = useState(null); // row | null

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const handleDelete = () => {
    setData((prev) => prev.filter((row) => row.id !== deleteRow.id));
  };

  return (
    <div className="flex flex-col gap-6 px-8 pt-6 pb-10">

      {/* Toolbar: search + filter button + add CTA */}
      <Toolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Tìm kiếm chứng chỉ..."
      />

      {/* Status filter chips */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide font-['Geist',sans-serif]">
          Lọc:
        </span>
        <Filter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Data table — pagination & sort built-in */}
      <CerificationTable
        data={data}
        search={search}
        statusFilter={statusFilter}
        // onView={(row) => 
        onDelete={(row) => setDeleteRow(row)}
      />

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <DeleteConfirmModal
        isOpen={deleteRow !== null}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDelete}
        itemName={deleteRow?.name ?? ""}
        itemType="chứng chỉ"
      />
    </div>
  );
}