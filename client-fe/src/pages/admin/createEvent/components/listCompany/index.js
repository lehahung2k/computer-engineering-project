import * as React from "react";
import CheckTable from "../../../../../components/tables/check";

function createData(name, address) {
  return {
    name,
    address,
  };
}

const rows = [
  createData("Công ty TNHH A", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH B", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH c", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH d", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH e", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH g", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH f", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH h", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH k", "Cầu Giấy, Hà Nội, Việt Nam"),
  createData("Công ty TNHH l", "Cầu Giấy, Hà Nội, Việt Nam"),
];

const headCells = [
  {
    id: "name",
    label: "Công ty/Doanh nghiệp",

    sort: true,
  },
  {
    id: "address",
    label: "Địa chỉ",
    sort: false,
  },
];
export default function AddingListCompany() {
  return (
    <>
      <CheckTable rows={rows} headCells={headCells} />
    </>
  );
}
