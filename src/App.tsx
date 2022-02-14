import { MainPage } from "@/pages";
import { theme } from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecoilRoot>
          <MainPage />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

export default App;
