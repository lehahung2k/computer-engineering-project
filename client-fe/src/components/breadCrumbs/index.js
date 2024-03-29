import * as React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import style from "./style.module.css";
import { Link } from "react-router-dom";
export default function BreadCrumbs({ breadcrumbs }) {
  return (
    <div className={style.breadcrumb}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ display: "block" }}
      >
        {breadcrumbs.map((item, index) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            key={index}
            to={item.link}
          >
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
