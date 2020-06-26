import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";

function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="textSecondary">
        {"Copyright © "}
        <Link color="inherit" href="https://ammar-alkhooly.herokuapp.com/">
          <u>Ammar Alkhooly</u>
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <p>
        Email:{" "}
        <a href="mailto:ammaralkhooly1@gmail.com"> ammaralkhooly1@gmail.com</a>
      </p>
      Phone: <a href="tel:+962780623701">+962780623701</a>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "15vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const StickyFooter = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            <Link color="inherit" href="https://github.com/AmmarAlkhooly98">
              <GitHubIcon fontSize="small" />
              <text is="x3d" style={{ position: "relative", bottom: "4px" }}>
                &nbsp;&nbsp; A M M R &nbsp; A L K H O O L Y
              </text>
            </Link>
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

export default StickyFooter;
