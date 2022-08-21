import * as React from "react";
import Grid from "@mui/material/Grid";
import "./index.css";
import SideBar from "../navigation";

export default function SearchEvent() {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid xs="auto">
          <div>
            <SideBar id="1" />
          </div>
        </Grid>
        <Grid xs>
          <div id="header">
            <h3>Trang quản lý sự kiện</h3>
            {!sessionStorage.getItem("accessToken") && (
              <>
                <div>
                  <button><a href='/login'>Đăng nhập</a></button>
                  <button><a href="/register">Đăng ký</a></button>
                </div>
              </>
            )}
          </div>
          <Grid container spacing="0" id="container">
            <Grid xs={6} id="search-input">
              <div id="search-input-box">
                <div id="search-input-box-1">
                  <div id="search-input-box-1-1">
                    <form id="search-event-form">
                      <label>Vui lòng nhập mã sự kiện</label>
                      <br />
                      <input
                        type="text"
                        id="search-event-id"
                        name="search-event-id"
                      ></input>
                    </form>
                    <button
                      type="submit"
                      id="search-input-submit"
                      form="search-event-form"
                      value="submit"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid xs={6} id="search-result">
              <div id="search-result-box">
                <div id="search-result-box-1">
                  <div id="search-result-box-1-1">
                    <div id="search-result-box-1-1-1">
                      Hiển thị kết quả tìm kiếm
                      <a href="#">Đi đến trang quản lý</a>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
