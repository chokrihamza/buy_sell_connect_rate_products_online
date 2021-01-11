import React from "react";
import { createMuiTheme,  makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import "./Error.css"
import {useHistory} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
function Error() {
    const classes = useStyles();
    const history=useHistory()
  return (
    <div className="error-design">
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin} onClick={()=>history.push("/Dashboard")}>
          Back to the Dashboard
        </Button>
      </ThemeProvider>
      <img
        src="https://www.setauffes.com/wp-content/uploads/2019/03/erreur-page-404.png"
        style={{ width: "60%" }}
        alt="error404"
      />
    </div>
  );
}

export default Error;
