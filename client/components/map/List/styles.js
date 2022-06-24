import { createTheme } from '@mui/material/styles';



const theme = createTheme({
  formControl: {
    margin: "16px",
    minWidth: 120,
    marginBottom: "30px",
  },
  selectEmpty: {
    marginTop: "32px",
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    height: "70vh",
    overflow: "auto",
  },
});

export default theme
