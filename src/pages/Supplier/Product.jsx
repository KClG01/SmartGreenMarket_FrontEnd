import { useState } from "react";
import Toolbar from "../../components/Admin/UI/Toolbar";
import Filter  from "../../components/Admin/UI/Filter";
import ProductTable from "../../components/Supplier/Product/ProductTable";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import CreateProductModal from "../../components/Supplier/Product/CreateProductModal";

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id: 1, code: "#GM-P-01", name: "Rau cải thìa",   price: 15000, unit: "kg", inventory: 100, status: "active",  image: "../public/images/rau.jpg" },
  { id: 2, code: "#GM-P-02", name: "Cà chua bi",       price: 20000, unit: "kg", inventory: 50, status: "pending", image: "../public/images/rau.jpg" },
  { id: 3, code: "#GM-P-03", name: "Táo hữu cơ",       price: 30000, unit: "kg", inventory: 75, status: "paused",  image: "../public/images/rau.jpg" },
  { id: 4, code: "#GM-P-04", name: "Khoai tây Đà Lạt", price: 12000, unit: "kg", inventory: 120, status: "active",  image: "../public/images/rau.jpg" },
  { id: 5, code: "#GM-P-05", name: "Dưa leo sạch",     price: 18000, unit: "kg", inventory: 80, status: "active",  image: "../public/images/rau.jpg" },
  { id: 6, code: "#GM-P-06", name: "Bí đỏ hữu cơ",    price: 25000, unit: "kg", inventory: 60, status: "active",  image: "../public/images/rau.jpg" },
  { id: 7, code: "#GM-P-07", name: "Ớt chuông đỏ",    price: 22000, unit: "kg", inventory: 90, status: "pending", image: "../public/images/rau.jpg" },
];

export default function ProductSupplierPage() {
  const [data,         setData]         = useState(INITIAL_DATA);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Modal states
  const [deleteRow, setDeleteRow] = useState(null); // row | null
  const [createRow, setCreateRow] = useState(null); // row | null

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const handleDelete = () => {
    setData((prev) => prev.filter((row) => row.id !== deleteRow.id));
  };
  const handleCreate = () => {
    if (!createRow) return;
    const newItem = {
      id: Date.now(), // simple unique ID
      code: `#GM-P-${String(data.length + 1).padStart(2, "0")}`,
      name: createRow.name,
      price: createRow.price,
      unit: createRow.unit,
      inventory: createRow.inventory,
      status: "pending",
      image: createRow.image,
    };
    setData((prev) => [newItem, ...prev]);
  }
  return (
    <div className="flex flex-col gap-6 px-8 pt-6 pb-10">

      {/* Toolbar: search + filter button + add CTA */}
      <Toolbar
        search={search}
        onSearch={setSearch}
        onAdd={() => setCreateRow({})}
        addLabel="Thêm lô hàng"
        searchPlaceholder="Tìm kiếm lô hàng..."
      />

      {/* Status filter chips */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide font-['Geist',sans-serif]">
          Lọc:
        </span>
        <Filter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Data table — pagination & sort built-in */}
      <ProductTable
        data={data}
        search={search}
        statusFilter={statusFilter}
        onView={(row) => {/* mở ProductDetailModal nếu có */}}
        onDelete={(row) => setDeleteRow(row)}
      />

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <DeleteConfirmModal
        isOpen={deleteRow !== null}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDelete}
        itemName={deleteRow?.name ?? ""}
        itemType="sản phẩm"
      />
      <CreateProductModal
        isOpen={createRow !== null}
        onClose={() => setCreateRow(null)}
        onConfirm={handleCreate}
        itemName={createRow?.name ?? ""}
        itemType="sản phẩm"
      />
    </div>
  );
}