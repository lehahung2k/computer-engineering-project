import React, { useState } from "react";
import Header from "../../../components/header";
import style from "./style.module.css";

export default function Welcome() {
  return (
    <>
      <Header />
      <div className={style.head}>
        <div className={style.head__text}>
          <h3>Hệ thống quản lý checkin sự kiện iCheckin</h3>
        </div>
      </div>

      <div className={style.body}>
        <div className={style.body__item}>
          <div className={style.body__item__left}>
            <img
              src={require("../../../assets/welcome_item_01.jpg")}
              alt="Welcome item"
              style={{ width: "400px" }}
            />
          </div>
        </div>
        <div className={style.body__item}>
          <div className={style.body__item__right}>
            <h3>Linh hoạt </h3>
            Hỗ trợ quản lý nhiều sự kiện với quy mô nhỏ và vừa
          </div>
        </div>

        <div className={style.body__item}>
          <div className={style.body__item__left}>
            <h3>Tiện lợi</h3>
            Cấu hình đơn giản, dễ dàng sử dụng tại quầy hàng
          </div>
        </div>
        <div className={style.body__item}>
          <div className={style.body__item__right}>
            <img
              src={require("../../../assets/welcome_item_02.jpg")}
              alt="Welcome item"
            />
          </div>
        </div>

        <div className={style.body__item}>
          <div className={style.body__item__left}>
            <img
              src={require("../../../assets/welcome_item_03.png")}
              alt="Welcome item"
            />
          </div>
        </div>
        <div className={style.body__item}>
          <div className={style.body__item__right}>
            <h3>Tin cậy</h3>
            Thống kê thông tin checkin, tiếp cận khách hàng hiệu quả
          </div>
        </div>
      </div>
      {/* <img src="/image/welcome_01.jpg" alt="Welcome" /> */}
    </>
  );
}
