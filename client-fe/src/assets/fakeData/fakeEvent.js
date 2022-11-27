function createData(id, tenant, name, code, start, end, note, map, checkin) {
  return {
    id,
    tenant,
    name,
    code,
    start,
    end,
    note,
    map,
    checkin,
  };
}

export const listFakeEvents = [
  createData(
    1,
    "Đại học Bách Khoa Hà Nội",
    "Ngày hội việc làm JobFair 2022",
    "6j8U",
    "2022-12-12T09:30:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022, sự kiện toàn trường",
    "",
    "Xem"
  ),
  createData(
    2,
    "Trường Đại học kinh tế Quốc dân",
    "Ngày hội tuyển sinh 2022",
    "a5nL",
    "2022-12-21T08:00:00",
    "2022-12-21T11:30:00",
    "Ngày hội tuyển sinh khối các trường kinh tế",
    "",
    "Xem"
  ),
];

export const headCellsListFakeEvents = [
  {
    id: "name",
    label: "Tên sự kiện",
    sort: true,
    width: "20%",
    button: true,
    link: "/admin/event/detail",
    time: false,
  },
  {
    id: "tenant",
    label: "Ban tổ chức",
    sort: true,
    width: "20%",
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
    with: "20%",
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
