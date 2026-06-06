import { useState } from "react";
import SearchBar from "../../components/Admin/UI/SearchBar";
import Filter  from "../../components/Admin/Suppiler/SuppilerFilter";
import SupplierTable from "../../components/Admin/Suppiler/SuppilerTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import SupplierViewModal from "../../components/Admin/Suppiler/SupplierViewModal";

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id:  1, code: "S-01", name: "Nhà cung cấp A", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993001",status: "active"  },
  { id:  2, code: "S-02", name: "Nhà cung cấp B", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993002",status: "active"  },
  { id:  3, code: "S-03", name: "Nhà cung cấp C", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993003",status: "active"  },
  { id:  4, code: "S-04", name: "Nhà cung cấp D", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993004", status: "registered"  },
  { id:  5, code: "S-05", name: "Nhà cung cấp E", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993005", status: "active"  },
  { id:  6, code: "S-06", name: "Nhà cung cấp F", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993006", status: "locked"  },
  { id:  7, code: "S-07", name: "Nhà cung cấp G", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993007",status: "banned" },
  { id:  8, code: "S-08", name: "Nhà cung cấp H", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993008",status: "active"  },
  { id:  9, code: "S-09", name: "Nhà cung cấp K", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993009",status: "locked"  },
  { id: 10, code: "S-10", name: "Nhà cung cấp L", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993010",status: "banned" },
  { id: 11, code: "S-11", name: "Nhà cung cấp I", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993011",status: "active"  },
  { id: 12, code: "S-12", name: "Nhà cung cấp J", address: "123 Hàm Nghi, Quận 1, TP.HCM", phone: "0123 456 789",taxCode: "03339993012",status: "active"  },
];
// const response = await axios.get("/suppliers");

export default function SupplierPage() {
  const [data,         setData]         = useState(INITIAL_DATA);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("registered");
  const [viewRow, setViewRow] = useState(null);


  // Modal states
  const [deleteRow, setDeleteRow] = useState(null); // row | null
  
  // setData(response.data);

  const handleDelete = () => {
    setData((prev) => prev.filter((row) => row.id !== deleteRow.id));
  };

  const handleApprove = (supplier) => {
    setData((prev) => prev.map((item) => item.id === supplier.id ? {...item, status: "active",} : item));

    setViewRow(null);

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
        onView={(row) => setViewRow(row)}
        onDelete={(row) => setDeleteRow(row)}
      />

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <ConfirmModal
        isOpen={deleteRow !== null}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDelete}
        title="Xóa nhà cung cấp"
        message={`Bạn có chắc chắn muốn xóa nhà cung cấp "${deleteRow?.name}" không?`}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="danger"
      />
      <SupplierViewModal
        isOpen={viewRow !== null}
        onClose={() => setViewRow(null)}
        supplier={viewRow}
        onApprove={handleApprove}
      />

    </div>
  );
}