import { useState } from "react";
import Toolbar from "../../components/Admin/UI/Toolbar";
import Filter  from "../../components/Admin/Certification/CertificationFilter";
import CerificationTable from "../../components/Admin/Certification/CertificationTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import CertificationViewModal from "../../components/Admin/Certification/CertificationViewModal";

// const response = await axios.get("/certifications");

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id: 1, code: "CER-01", name: "VietGAP",issuedBy: "Trung tâm Chứng nhận Hữu cơ", issueDate: "2026-06-06", expiryDate: "2027-06-06",   supplier: "Nhà cung cấp A", status: "active",},
  { id: 2, code: "CER-02", name: "Hữu Cơ",issuedBy: "Trung tâm Chứng nhận Hữu cơ",  issueDate: "2026-06-06", expiryDate: "2027-06-06",     supplier: "Nhà cung cấp A",   status: "pending"},
  { id: 3, code: "CER-03", name: "VietGAP",issuedBy: "Trung tâm Chứng nhận Hữu cơ", issueDate: "2026-06-06", expiryDate: "2027-06-06",   supplier: "Nhà cung cấp B", status: "rejected"},
  { id: 4, code: "CER-04", name: "VietGAP",issuedBy: "Trung tâm Chứng nhận Hữu cơ", issueDate: "2026-06-06", expiryDate: "2027-06-06",   supplier: "Nhà cung cấp C",       status: "active" },
  { id: 5, code: "CER-05", name: "VietGAP",issuedBy: "Trung tâm Chứng nhận Hữu cơ", issueDate: "2026-06-06", expiryDate: "2027-06-06",   supplier: "Nhà cung cấp D",       status: "active"},
  { id: 6, code: "CER-06", name: "VietGAP",issuedBy: "Trung tâm Chứng nhận Hữu cơ", issueDate: "2026-06-06", expiryDate: "2027-06-06",   supplier: "Nhà cung cấp E", status: "active" },
  { id: 7, code: "CER-07", name: "Hữu Cơ",issuedBy: "Trung tâm Chứng nhận Hữu cơ", issueDate: "2026-06-06", expiryDate: "2027-06-06",   supplier: "Nhà cung cấp C",   status: "pending"},
];

export default function CertificationPage() {
  const [data,         setData]         = useState(INITIAL_DATA);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [viewRow, setViewRow] = useState(null);
  
  // setData(response.data);
  // Modal states
  const [deleteRow, setDeleteRow] = useState(null); // row | null

  // ── DELETE ─────────────────────────────────────────────────────
  const handleDelete = () => {
      setData((prev) =>
          prev.filter(
              (row) =>
                  row.id !== deleteRow.id
          )
      );

      setDeleteRow(null);
  };

  // ── APPROVE ────────────────────────────────────────────────────
  const handleApprove = (
      certification
  ) => {
      setData((prev) =>
          prev.map((item) =>
              item.id ===
              certification.id
                  ? {
                        ...item,
                        status: "active",
                    }
                  : item
          )
      );

      setViewRow(null);
  };

  // ── REJECT ─────────────────────────────────────────────────────
  const handleReject = (
      certification
  ) => {
      setData((prev) =>
          prev.map((item) =>
              item.id ===
              certification.id
                  ? {
                        ...item,
                        status:
                            "pending",
                    }
                  : item
          )
      );

      setViewRow(null);
  };

  // ── REMOVE PENDING CERTIFICATION ───────────────────────────
  const handleDeleteCertification = (
      certification
  ) => {
      setData((prev) =>
          prev.filter(
              (item) =>
                  item.id !==
                  certification.id
          )
      );

      setViewRow(null);
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
        onView={(row) => setViewRow(row)}
        onDelete={(row) => setDeleteRow(row)}
      />

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <ConfirmModal
        isOpen={deleteRow !== null}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDelete}
        title="Xóa chứng chỉ"
        message={`Bạn có chắc chắn muốn xóa chứng chỉ "${deleteRow?.name}" không?`}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="danger"
      />
      <CertificationViewModal
          isOpen={viewRow !== null}
          onClose={() => setViewRow(null)}
          certification={viewRow}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={
              handleDeleteCertification
          }
      />
    </div>
  );
}