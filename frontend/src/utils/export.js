const xlsx = require("xlsx");

const exportToExcel = (data, nameWorkshet) => {
  const processedData = data.map((item) => ({
    ...item,
    avatar_public_id: item.avatar.public_id,
    avatar_url: item.avatar.url,
    // Bỏ trường avatar
    avatar: undefined,
  }));
  // Tạo một workbook mới
  const workbook = xlsx.utils.book_new();

  // Chuyển đổi dữ liệu thành định dạng sheet
  const worksheet = xlsx.utils.json_to_sheet(processedData);

  // Thêm sheet vào workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, nameWorkshet);

  // Xuất workbook ra file Excel
  xlsx.writeFile(workbook, nameWorkshet + ".xlsx");
  alert.success("Excel file saved successfully");
};

exports.module = {
  exportToExcel,
};
