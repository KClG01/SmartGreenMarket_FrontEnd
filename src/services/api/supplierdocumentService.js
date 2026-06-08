import axiosClient from "./axiosClient";

export const supplierDocumentService = {
  upload: (files) => {
    // files = { business_license: File, id_card: File, tax_certificate: File }
    const formData = new FormData();

    if (files.business_license)
      formData.append("business_license", files.business_license);
    if (files.id_card)
      formData.append("id_card", files.id_card);
    if (files.tax_certificate)
      formData.append("tax_certificate", files.tax_certificate);

    return axiosClient
      .post("/supplier-documents/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },
};