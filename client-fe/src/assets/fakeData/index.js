const createCompany = (name, website, address, contactName, mail, number) => {
  return {
    name,
    website,
    address,
    contact: contactName + "-" + mail + "-" + number,
  };
};

export const listCompany = [
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createCompany(
    "Dịch vụ viễn thông A",
    "Acompany.vn",
    "Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
];

export const listCompanyHeadNormal = [
  {
    id: "name",
    label: "Công ty/ Doanh nghiệp",
    sort: true,
    width: "20%",
  },
  {
    id: "website",
    label: "Website",
    width: "15%",
    link: true,
    external: true,
  },
  {
    id: "address",
    label: "Địa chỉ",
    width: "25%",
  },
  {
    id: "contact",
    label: "Thông tin liên hệ",
    with: "40%",
  },
];

export const listCompanyHeadCheck = [];
