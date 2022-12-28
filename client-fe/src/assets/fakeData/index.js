export const listCompanyHeadNormal = [
  {
    id: "name",
    label: "Công ty/ Doanh nghiệp",
    sort: true,
    width: "20%",
    link: "/admin/tenant/detail",
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
