import React, { useRef, useState } from "react";

const DOC_TYPES = [
  {
    key: "cccd",
    name: "CCCD / Hộ chiếu",
    desc: "Căn cước công dân hoặc hộ chiếu còn hạn",
    icon: "🪪",
    document_type: "identity",
  },
  {
    key: "business_license",
    name: "Giấy phép kinh doanh",
    desc: "Đăng ký doanh nghiệp / hộ kinh doanh",
    icon: "📋",
    document_type: "business_license",
  },
  {
    key: "certificate",
    name: "Chứng nhận sản phẩm",
    desc: "VietGAP, GlobalGAP, hữu cơ hoặc tương đương",
    icon: "🏅",
    document_type: "product_certificate",
  },
];

export default function Step3({ onNext, onBack }) {
  const [uploaded, setUploaded] = useState({});
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file, docKey) => {
    if (!file) return;
    // TODO: POST /documents/upload with FormData { file, document_type }
    console.log("Upload doc:", docKey, file.name);
    setUploaded((prev) => ({
      ...prev,
      [docKey]: { status: "pending", name: file.name },
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file, "business_license"); // fallback: assign to first unuploaded
  };

  const handleSubmit = () => {
    // TODO: finalize registration
    console.log("All uploaded docs:", uploaded);
    onNext();
  };

  return (
    <div className="animate-[fadeSlide_0.28s_ease]">
      <h2 className="text-[28px] font-extrabold text-[#141b2b] tracking-tight mb-1">
        Tải lên giấy tờ
      </h2>
      <p className="text-[13.5px] text-[#5a6a5e] leading-relaxed mb-6">
        Vui lòng cung cấp các giấy tờ xác minh. Hồ sơ sẽ được duyệt trong{" "}
        <strong className="text-[#141b2b]">1–3 ngày làm việc</strong>.
      </p>

      {/* Drop zone */}
      {/* <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all mb-5
          ${dragging
            ? "border-[#006c49] bg-[#e6f4ec]"
            : "border-[#b0d4be] bg-[#f6fbf8] hover:border-[#006c49] hover:bg-[#eef8f2]"
          }`}
      >
        <div className="text-4xl mb-2">📁</div>
        <div className="text-[14px] font-bold text-[#141b2b] mb-1">
          Kéo thả tệp hoặc nhấn để chọn
        </div>
        <div className="text-[12px] text-[#7a8f7e]">
          Hỗ trợ JPG, PNG, PDF — tối đa 10MB/file
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0], "business_license")}
        />
      </div> */}

      {/* Document type list */}
      <div className="flex flex-col gap-2.5 mb-6">
        {DOC_TYPES.map((doc) => {
          const isUploaded = !!uploaded[doc.key];
          return (
            <DocCard
              key={doc.key}
              doc={doc}
              isUploaded={isUploaded}
              uploadedName={uploaded[doc.key]?.name}
              onUpload={(file) => handleFile(file, doc.key)}
            />
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-5 py-3 bg-white text-[#006c49] border border-[#d1e5d9] rounded-xl text-[14px] font-semibold hover:border-[#006c49] hover:bg-[#f0faf4] transition-all"
        >
          ← Quay lại
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-3 bg-[#006c49] hover:bg-[#005038] text-white rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
        >
          Hoàn tất đăng ký ✓
        </button>
      </div>

      <p className="text-[12px] text-gray-400 text-center mt-4">
        Bạn có thể bổ sung giấy tờ sau khi đăng ký thành công.
      </p>
    </div>
  );
}

function DocCard({ doc, isUploaded, uploadedName, onUpload }) {
  const inputRef = useRef(null);

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all
        ${isUploaded
          ? "border-emerald-400 bg-[#f0fdf8]"
          : "border-[#d1e5d9] bg-white"
        }`}
    >
      <span className="text-2xl flex-shrink-0">{doc.icon}</span>

      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold text-[#141b2b]">{doc.name}</div>
        <div className="text-[11.5px] text-[#7a8f7e] truncate">
          {isUploaded ? uploadedName : doc.desc}
        </div>
      </div>

      {isUploaded ? (
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600 whitespace-nowrap">
          ✓ Đã tải
        </span>
      ) : (
        <>
          <button
            onClick={() => inputRef.current?.click()}
            className="px-3 py-1.5 bg-[#f1f5f2] border border-[#d1e5d9] rounded-lg text-[12px] font-semibold text-[#006c49] hover:bg-[#006c49] hover:text-white hover:border-[#006c49] transition-all whitespace-nowrap"
          >
            Tải lên
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={(e) => onUpload(e.target.files?.[0])}
          />
        </>
      )}
    </div>
  );
}
