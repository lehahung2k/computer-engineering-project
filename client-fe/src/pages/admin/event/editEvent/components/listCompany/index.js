import * as React from "react";
import CheckTable from "../../../../../../components/tables/check";

function createData(name, address, id) {
  return {
    name,
    address,
    id,
  };
}

const rows = [
  createData("Công ty TNHH A", "Cầu Giấy, Hà Nội, Việt Nam", "1"),
  createData("Công ty TNHH B", "Cầu Giấy, Hà Nội, Việt Nam", "2"),
  createData("Công ty TNHH c", "Cầu Giấy, Hà Nội, Việt Nam", "3"),
  createData("Công ty TNHH d", "Cầu Giấy, Hà Nội, Việt Nam", "4"),
  createData("Công ty TNHH e", "Cầu Giấy, Hà Nội, Việt Nam", "5"),
  createData("Công ty TNHH g", "Cầu Giấy, Hà Nội, Việt Nam", "6"),
  createData("Công ty TNHH f", "Cầu Giấy, Hà Nội, Việt Nam", "7"),
  createData("Công ty TNHH h", "Cầu Giấy, Hà Nội, Việt Nam", "8"),
  createData("Công ty TNHH k", "Cầu Giấy, Hà Nội, Việt Nam", "9"),
  createData("Công ty TNHH l", "Cầu Giấy, Hà Nội, Việt Nam", "10"),
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
  { id: "id" },
];
export default function AddingListCompany({ setSelectedItem = (f) => f }) {
  return (
    <>
      <CheckTable
        rows={rows}
        headCells={headCells}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
}
