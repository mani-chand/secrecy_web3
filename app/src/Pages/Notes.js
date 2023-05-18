import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import ABI from "./../Asserts/ABI.json";
import { ethers } from "ethers";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material/";
export default function Notes() {
  const contractAddress = "0x524ACa1080e9D29d73ddB21c7cAE66f0dBff73DF";
  const [data, setData] = useState([]);
  const [provider,setProvider] = useState("")
  useEffect(() => {
      const fetchData = async () => {
          try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider)
        const signer = provider.getSigner();
        const readFunction = new ethers.Contract(contractAddress, ABI, signer);
        const result = await readFunction.get();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data, provider]);
  return (
    <>
      <NavBar />
      <Grid container mt={1} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data.map((item) => {
          return (
            <>
              <Grid xs={4}>
                <Card sx={{ maxWidth: 345 }} style={{marginLeft:"40px"}}>
                  <CardActionArea>
                    {(item.file !=="")?
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.file}
                      alt="green iguana"
                    />:""}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.tag}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}
