import {
  Info,
  Tag,
  ToggleLeft,
  Image as ImageIcon,
  Upload,
  Bell,
  RefreshCw,
} from "lucide-react";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F4]">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-500">Sản phẩm</span>
            <span className="text-zinc-400">›</span>
            <span className="text-green-700 font-semibold">Thêm mới</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-8 py-3 border border-green-700 rounded-2xl text-green-700 font-semibold">
              Hủy
            </button>

            <button className="px-8 py-3 bg-green-700 text-white rounded-2xl font-semibold">
              Lưu sản phẩm
            </button>

            <div className="w-px h-8 bg-zinc-200" />

            <Bell className="w-6 h-6 text-zinc-600" />

            <img
              src="https://i.pravatar.cc/150"
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-5xl font-bold text-zinc-900">
          Thêm Nông Sản Mới
        </h1>

        <p className="mt-3 text-zinc-500 font-medium">
          Vui lòng điền đầy đủ các thông tin bắt buộc để niêm yết sản phẩm lên hệ
          thống.
        </p>

        <div className="grid grid-cols-12 gap-6 mt-8">
          {/* LEFT */}
          <div className="col-span-8 space-y-6">
            {/* THÔNG TIN CƠ BẢN */}
            <div className="bg-white rounded-3xl border border-zinc-200 p-8">
              <div className="flex items-center gap-3">
                <Info className="text-green-700" />
                <h2 className="text-2xl font-bold">Thông tin cơ bản</h2>
              </div>

              <div className="border-t mt-6 pt-6">
                <div>
                  <label className="block mb-2 font-medium">
                    Tên rau (*)
                  </label>

                  <input
                    type="text"
                    placeholder="Nhập tên sản phẩm (VD: Xà lách lụa)"
                    className="w-full h-14 rounded-2xl border border-zinc-300 px-5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5 mt-6">
                  <div>
                    <label className="block mb-2 font-medium">
                      Nhóm rau (*)
                    </label>

                    <select className="w-full h-14 rounded-2xl border border-zinc-300 px-4">
                      <option>Chọn nhóm rau</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      SKU (Mã sản phẩm)
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        value="AG-12345-LEAF"
                        readOnly
                        className="w-full h-14 rounded-2xl border border-zinc-300 px-5"
                      />

                      <RefreshCw className="absolute right-4 top-4 w-6 h-6 text-zinc-500" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block mb-2 font-medium">
                    Mô tả chi tiết
                  </label>

                  <textarea
                    rows="5"
                    placeholder="Thông tin về đặc điểm, công dụng, cách bảo quản..."
                    className="w-full rounded-2xl border border-zinc-300 px-5 py-4 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* PHÂN LOẠI & GIÁ */}
            <div className="bg-white rounded-3xl border border-zinc-200 p-8">
              <div className="flex items-center gap-3">
                <Tag className="text-green-700" />
                <h2 className="text-2xl font-bold">
                  Phân loại & Giá
                </h2>
              </div>

              <div className="border-t mt-6 pt-6">
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <label className="block mb-2 font-medium">
                      Chứng nhận/Quy trình
                    </label>

                    <select className="w-full h-14 rounded-2xl border border-zinc-300 px-4">
                      <option>VietGAP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Đơn vị tính (*)
                    </label>

                    <select className="w-full h-14 rounded-2xl border border-zinc-300 px-4">
                      <option>kg</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Thời hạn bảo quản
                    </label>

                    <input
                      type="number"
                      placeholder="Số ngày"
                      className="w-full h-14 rounded-2xl border border-zinc-300 px-4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-6">
                  <div>
                    <label className="block mb-2 font-medium">
                      Giá sỉ (*)
                    </label>

                    <input
                      type="number"
                      className="w-full h-14 rounded-2xl border border-zinc-300 px-4"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Giá bán lẻ
                    </label>

                    <input
                      type="number"
                      className="w-full h-14 rounded-2xl border border-zinc-300 px-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-4 space-y-6">
            {/* TRẠNG THÁI */}
            <div className="bg-white rounded-3xl border border-zinc-200 p-8">
              <div className="flex items-center gap-3">
                <ToggleLeft className="text-green-700" />
                <h2 className="text-2xl font-bold">Trạng thái</h2>
              </div>

              <div className="border-t mt-6 pt-6 space-y-4">
                <div className="border-2 border-green-700 rounded-2xl p-5 bg-green-50">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-700" />

                    <div>
                      <h4 className="font-bold">Đang kinh doanh</h4>
                      <p className="text-zinc-500">
                        Sản phẩm sẽ hiển thị trên hệ thống
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-2xl p-5">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full border border-zinc-400" />

                    <div>
                      <h4 className="font-bold">Tạm ngừng</h4>
                      <p className="text-zinc-500">
                        Tạm thời ẩn khỏi danh sách bán
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HÌNH ẢNH */}
            <div className="bg-white rounded-3xl border border-zinc-200 p-8">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <ImageIcon className="text-green-700" />
                  <h2 className="text-2xl font-bold">Hình ảnh</h2>
                </div>

                <span className="text-green-700 font-semibold">
                  Tối đa 3 ảnh
                </span>
              </div>

              <div className="border-t mt-6 pt-6">
                <div className="border-2 border-dashed border-zinc-300 rounded-3xl p-10 text-center">
                  <Upload className="mx-auto text-zinc-500" size={40} />

                  <p className="mt-4 font-semibold">
                    Kéo thả hoặc Click để tải lên
                  </p>

                  <p className="text-zinc-500 mt-2">
                    PNG, JPG tối đa 2MB
                  </p>
                </div>

                <div className="flex gap-3 mt-5">
                  <img
                    src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c"
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <img
                    src="https://images.unsplash.com/photo-1518977676601-b53f82aba655"
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <button className="w-20 h-20 rounded-2xl border-2 border-dashed border-zinc-300 flex items-center justify-center text-3xl text-zinc-400">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* GỢI Ý */}
            <div className="bg-green-700 text-white rounded-3xl p-6">
              <h4 className="font-bold mb-2">Mẹo tối ưu</h4>

              <p className="text-green-100">
                Sản phẩm có ảnh nền trắng và đầy đủ chứng nhận VietGAP thường có
                tỉ lệ chốt đơn cao hơn đáng kể.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}