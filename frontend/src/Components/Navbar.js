import {Grid,Button,Typography} from '@mui/material/';
import React from 'react'
export default function Navbar() {
  return (
    <Grid direction="row" container spacing={2}>
        <Grid item xs={8}>
            <Typography variant="h3">
                secrecy
            </Typography>
        </Grid>
        <Grid item xs={4}>
            <Button>Connect</Button>
        </Grid>
    </Grid>
  )
}
