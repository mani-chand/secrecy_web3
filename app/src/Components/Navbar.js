import {Grid,Button,Typography} from '@mui/material/';
const NavBar = ({connectToMetaMask}) => {
    return ( 
    <>
    <Grid container direction="row" spacing={2}>
  <Grid item xs={10}>
  <Typography variant="h4" gutterBottom>Secreacy </Typography>
  </Grid>
  <Grid item xs={2}>
  <Button
          style={{ marginTop: "10px" }}
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
}
export default NavBar;