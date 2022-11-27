import * as React from "react";
import NormalTable from "../../../../../components/tables/normal";

function createData(name, company, accountName) {
  return {
    name,
    company,
    accountName,
  };
}

const rows = [
  createData("Nguyễn Văn A", "Công ty TNHH A", "nvA01"),
  createData("Nguyễn Văn B", "Công ty TNHH B", "nvB01"),
  createData("Nguyễn Văn C", "Công ty TNHH A", "nvC01"),
  createData("Nguyễn Mạnh C", "Công ty TNHH B", "nmC01"),
  createData("Nguyễn Văn A", "Công ty TNHH D", "nvAD01"),
];

const headCells = [
  {
    id: "name",
    label: "Họ và tên",

    sort: true,
  },
  {
    id: "company",
    label: "Công ty/Doanh nghiệp",
    sort: false,
  },
  {
    id: "accountName",
    label: "Tên tài khoản",
    sort: false,
  },
];
export default function ListAccount() {
  return (
    <>
      <NormalTable rows={rows} headCells={headCells} />
    </>
  );
}
