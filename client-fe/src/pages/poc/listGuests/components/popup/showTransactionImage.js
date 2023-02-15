import { CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function ShowTransactionImage({
  open,
  image1,
  image2,
  setOpen = (f) => f,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                p: 1,
                m: 1,
                display: "flex",
                flexDirection: "row",
                borderRadius: 1,
                justifyContent: "space-evenly",
              }}
            >
              {" "}
              <Card sx={{ width: 200, m: 1 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Ảnh chụp 1
                  </Typography>
                  {image1 === "" ? "Không có ảnh chụp" : <img src={image1} />}
                </CardContent>
              </Card>
              <Card sx={{ width: 200, m: 1 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Ảnh chụp 2
                  </Typography>
                  {image2 === "" ? "Không có ảnh chụp" : <img src={image2} />}
                </CardContent>
              </Card>
            </Box>

            {/* <Grid container spacing={3}>
              <Grid sx={6}>
                {image1 === "" ? "Không có ảnh chụp" : <img src={image1} />}
              </Grid>

              <Grid sx={6}>
                {image2 === "" ? "Không có ảnh chụp" : <img src={image2} />}
              </Grid>
            </Grid> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
