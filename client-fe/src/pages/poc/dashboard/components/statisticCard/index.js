import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import Iconify from "../../../../../components/iconify";
import Grid from "@mui/material/Grid";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  // marginBottom: theme.spacing(2),
}));

// ----------------------------------------------------------------------

StatisticCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function StatisticCard({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  return (
    // <Grid
    //   container
    //   justifyContent="center"
    //   alignItems="center"
    //   // sx={{
    //   //   py: 4,
    //   //   boxShadow: 0,
    //   //   textAlign: "center",
    //   //   justifyContent: "center",
    //   //   minWidth: "100%",
    //   //   ...sx,
    //   // }}
    //   // {...other}
    // >
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={3}>
        <StyledIcon
          sx={{
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette[color].dark,
                0
              )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </StyledIcon>
      </Grid>
      <Grid item xs={3} align="right">
        <Typography variant="h4">{total}</Typography>
      </Grid>
      <Grid item xs={6} align="left">
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </Grid>
    </Grid>
    // </Grid>
  );
}
