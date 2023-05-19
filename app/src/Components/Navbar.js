import { Grid, Button, Typography } from "@mui/material/";
const NavBar = ({ connectToMetaMask }) => {
  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>
            Secreacy{" "}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            style={{ margin: "10px" }}
            href="/"
            size="medium"
            variant="text"
          >
            Home
          </Button>
          <Button
            style={{ margin: "10px" }}
            size="medium"
            href="/notes"
            variant="text"
          >
            Notes
          </Button>
          <Button
            style={{ margin: "10px" }}
            onClick={connectToMetaMask}
            size="medium"
            variant="contained"
          >
            connect to metamask
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default NavBar;
