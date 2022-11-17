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
    link: "/admin/company/detail",
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

function createEvent(name, start, end, note, checkin) {
  return {
    name,
    start,
    end,
    note,
    checkin,
  };
}

export const ListEvent = [
  createEvent(
    "JobFair",
    "2022-12-12T09:30:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "Inovation Day",
    "2022-12-12T08:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội đổi mới sáng tạo 2022",
    "Xem"
  ),
  createEvent(
    "Đây là tên sự kiện dài để kiểm thử chức năng hiển thị",
    "2022-12-12T07:30:00",
    "2022-12-12T09:00:00",
    "Đây là note dài để kiểm thử chức năng hiển thị. Nếu note được xuống dòng tức chức năng đã ổn định. Đây là note dài để kiểm thử chức năng hiển thị. Nếu note được xuống dòng tức chức năng đã ổn định",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-21T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-01T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createEvent(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
];

export const ListEventHeadNormal = [
  {
    id: "name",
    label: "Tên sự kiện",
    sort: true,
    width: "25%",
    button: true,
    link: "/admin/event/detail",
    time: false,
  },
  {
    id: "start",
    label: "Thời gian bắt đầu",
    sort: true,
    width: "15%",
    button: false,
    link: "#",
    time: true,
  },
  {
    id: "end",
    label: "Thời gian kết thúc",
    sort: false,
    width: "15%",
    button: false,
    link: "#",
    time: false,
  },
  {
    id: "note",
    label: "Ghi chú",
    sort: true,
    with: "35%",
    button: false,
    link: "#",
    time: false,
  },
  {
    id: "checkin",
    label: "Thông tin check-in",
    sort: false,
    width: "10%",
    button: true,
    link: "/admin/event/detail",
    time: false,
  },
];
