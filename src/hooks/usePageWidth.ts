import { useTheme } from "@mui/material/styles";

export const useResponsiveWidth = () => {
  const theme = useTheme();
  const pageWidth = {
    [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "80vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: 800,
    },
  };

  const appBarWidth = {
    [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "70vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: 600,
    },
  };

  const dialogWidth = {
    [theme.breakpoints.down("md")]: {
      maxWidth: "100vw",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "70vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 600,
    },
  };

  return { pageWidth, appBarWidth, dialogWidth };
};
