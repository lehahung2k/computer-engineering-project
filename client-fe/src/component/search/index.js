import * as React from "react";
import Grid from "@mui/material/Grid";
import "./index.css";
import SideBar from "../navigation";
import Button from "@mui/material/Button";
import eventApi from "../../api/eventAPI";

export default function SearchEvent() {
  const [listEventSearch, setListEventSearch] = React.useState([]);
  const [search, setSearch] = React.useState(false);

  const handleSearchEvent = () => {
    const eventCode = document.querySelector("#search-event-code").value;
    if (!eventCode) return alert("Hãy nhập thông tin mã sự kiện");
    const response = eventApi.searchByCode({ event_code: eventCode });
    response
      .then((response) => {
        const tmpListEvent = response.data;
        const newListEvent = [];

        tmpListEvent.map((event) => {
          const tmpEvent = {};
          tmpEvent['event_name'] = event['event_name'];

          const startDate = new Date(event['start_date'])
          const endDate = new Date(event['end_date'])

          const startDateFormatted =
          startDate.getDate().toString().padStart(2, "0") + '/' + 
          (startDate.getMonth() + 1).toString().padStart(2, "0") + '/' +
          startDate.getFullYear().toString();
        const endDateFormatted =
          endDate.getDate().toString().padStart(2, "0") + '/' +
          (endDate.getMonth() + 1).toString().padStart(2, "0") + '/' +
          endDate.getFullYear().toString();

          tmpEvent['start_date'] = startDateFormatted;
          tmpEvent['end_date'] = endDateFormatted;

          newListEvent.push(tmpEvent);
        })
        setListEventSearch(newListEvent);
        setSearch(true);
        alert("Đã tìm kiếm thành công");
      })
      .catch((error) => {
        console.error(error);
      });
  };



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
                  <button>
                    <a href="/login">Đăng nhập</a>
                  </button>
                  <button>
                    <a href="/register">Đăng ký</a>
                  </button>
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
                        id="search-event-code"
                        name="search-event-code"
                      ></input>
                    </form>
                    <Button
                      id="search-input-submit"
                      onClick={handleSearchEvent}
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid xs={6} id="search-result">
              <div id="search-result-box">
                <div id="search-result-box-1">
                  <div id="search-result-box-1-1">
                    <div id="search-result-box-1-1-1">
                      {!search ? (
                        <p>Hãy nhập mã sự kiện để tìm kiếm</p>
                      ) : listEventSearch.length === 0 ? (
                        <p>Không có sự kiện tương ứng với mã đã tìm</p>
                      ) : (
                        listEventSearch.map((event) => (
                          <div>
                            <h4>{event["event_name"]}</h4>
                            <p>
                              Thời gian bắt đầu sự kiện: {event["start_date"]}
                            </p>
                            <p>
                              Thời gian kết thúc sự kiện: {event["end_date"]}
                            </p>
                          </div>
                        ))
                      )}
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
