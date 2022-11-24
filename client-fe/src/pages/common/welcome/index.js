import React, { useState } from "react";
import Header from "../../../components/header";
import style from "./style.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Welcome() {
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <>
      <Header />
      <div className={style.head}>
        <div className={style.head__text}>
          <h3>Hệ thống quản lý checkin sự kiện iCheckin</h3>
        </div>
      </div>
      <div className={style.body__row}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          direction={matches ? "row" : "column"}
        >
          <Grid container item xs={4} alignItems="center" justify="center">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                sx={{ height: 300 }}
                image={require("../../../assets/welcome_item_01.jpg")}
                alt="Welcome"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Linh hoạt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hỗ trợ quản lý nhiều sự kiện với quy mô nhỏ và vừa
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container item xs={4} alignItems="center" justify="center">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image={require("../../../assets/welcome_item_02.jpg")}
                alt="Welcome"
                sx={{ height: 300 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tiện lợi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cấu hình đơn giản, dễ dàng sử dụng tại quầy hàng
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container item xs={4} alignItems="center" justify="center">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                sx={{ height: 300 }}
                image={require("../../../assets/welcome_item_03.png")}
                alt="Welcome"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tin cậy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thống kê thông tin checkin, tiếp cận khách hàng hiệu quả
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <div className={style.body__col}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          direction="column"
        >
          <Grid container item xs={8} alignItems="center" justify="center">
            <Card sx={{ width: 345 }}>
              <CardMedia
                component="img"
                height="300"
                image={require("../../../assets/welcome_item_01.jpg")}
                alt="Welcome"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Linh hoạt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hỗ trợ quản lý nhiều sự kiện với quy mô nhỏ và vừa
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container item xs={8} alignItems="center" justify="center">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="300"
                image={require("../../../assets/welcome_item_02.jpg")}
                alt="Welcome"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tiện lợi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cấu hình đơn giản, dễ dàng sử dụng tại quầy hàng
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container item xs={8} alignItems="center" justify="center">
            <Card sx={{ width: 345 }}>
              <CardMedia
                component="img"
                height="300"
                image={require("../../../assets/welcome_item_03.png")}
                alt="Welcome"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tin cậy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thống kê thông tin checkin, tiếp cận khách hàng hiệu quả
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
