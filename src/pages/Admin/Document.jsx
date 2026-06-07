import { useState } from "react";
import Toolbar from "../../components/Admin/UI/Toolbar";
import Filter  from "../../components/Admin/Document/DocumentFilter";
import DocumentTable from "../../components/Admin/Document/DocumentTable";
import DocumentViewModal from "../../components/Admin/Document/DocumentViewModal";

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id: 1, file_url: "../public/images/rau.jpg", document_type: "business_license",    supplier: "Nông trại Xanh", status: "pending",  image: "../public/images/rau.jpg" },
  { id: 2, file_url: "../public/images/rau.jpg", document_type: "id_card",       supplier: "Nông trại Xanh",   status: "pending", image: "../public/images/rau.jpg" },
  { id: 3, file_url: "../public/images/rau.jpg", document_type: "tax_certificate",       supplier: "Nông trại Xanh", status: "pending",  image: "../public/images/rau.jpg" },
  { id: 4, file_url: "../public/images/rau.jpg", document_type: "business_license", supplier: "VietFarm",       status: "active",  image: "../public/images/rau.jpg" },
  { id: 5, file_url: "../public/images/rau.jpg", document_type: "id_card",     supplier: "VietFarm",       status: "active",  image: "../public/images/rau.jpg" },
  { id: 6, file_url: "../public/images/rau.jpg", document_type: "tax_certificate",    supplier: "VietFarm", status: "active",  image: "../public/images/rau.jpg" },
];

export default function DocumentPage() {
  const [data,         setData]         = useState(INITIAL_DATA);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
    const [viewRow, setViewRow] = useState(null);


  // ── CRUD ──────────────────────────────────────────────────────────────────
  // ── APPROVE ───────────────────────────────────────────────────────────────
   const handleApprove = (document) => {
    setData((prev) =>
        prev.map((item) =>
            item.id === document.id
                ? {
                      ...item,
                      status: "active",
                  }
                : item
        )
    );

    setViewRow(null);
};

    // ── REJECT ────────────────────────────────────────────────────────────────
    const handleReject = (document) => {
    setData((prev) =>
        prev.map((item) =>
            item.id === document.id
                ? {
                      ...item,
                      status: "rejected",
                  }
                : item
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
        searchPlaceholder="Tìm kiếm giấy tờ..."
      />

      {/* Status filter chips */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide font-['Geist',sans-serif]">
          Lọc:
        </span>
        <Filter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Data table — pagination & sort built-in */}
      <DocumentTable
        data={data}
        search={search}
        statusFilter={statusFilter}
        onView={(row) => setViewRow(row)}
    />

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <DocumentViewModal
                isOpen={viewRow !== null}
                onClose={() => setViewRow(null)}
                document={viewRow}
                onApprove={handleApprove}
                onReject={handleReject}
            />
    </div>
  );
}