import React, { useState,useEffect } from "react";
import ABI from './../Asserts/ABI.json'
//import Navbar from "../Components/Navbar";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import FileBase from "react-file-base64";
import { Box, Button, TextField } from "@mui/material/";
export function Home(props) {
  const projectId = "2PxAxJftpMxj8bKkl8oDvZ4kII2"
  const projectSecretKey = "0b115116f44285db872c632d0ebd2672"
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: { authorization },
});

  const [data, setData] = useState({
    Tag: "",
    Description: "",
    file: "",
  });
  const contractAddress = "0x524ACa1080e9D29d73ddB21c7cAE66f0dBff73DF"
  const [provider,setProvider] = useState(null)
  const connectToMetaMask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [0]);
    setProvider(provider)
  };
  const handleSubmit = async()=>{
    try {
      const signer = provider.getSigner()
      const added = await client.add(data.file);
      const url = `https://manichand.infura-ipfs.io/ipfs/${added.path}`;
      console.log(url)
      // const readFunction = new ethers.Contract(contractAddress,ABI,provider);
      const writeFunction = new ethers.Contract(contractAddress,ABI,signer);
      const result = await writeFunction.createNote(data.Tag,data.Description,url)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(!provider){
      connectToMetaMask()
    }
  },[provider])
  return (
    <div>

      <Button
          style={{ marginTop: "10px" }}
          onClick={connectToMetaMask}
          fullWidth={true}
          size="medium"
          variant="contained"
        >
          connect to metamask
        </Button>
      <Box m={5}>
        <TextField
          fullWidth
          id="outlined-basic"
          onChange={(e) => {
            setData({ ...data, Tag: e.target.value });
          }}
          margin="dense"
          label="tag"
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="dense"
          id="outlined-basic"
          onChange={(e) => {
            setData({ ...data, Description: e.target.value });
          }}
          label="enter the data"
          variant="outlined"
        />
       
        <input type="file" onChange={(e) => setData({...data,file:e.target.files[0]})} />
        <Button
          style={{ marginTop: "10px" }}
          onClick={handleSubmit}
          fullWidth={true}
          size="medium"
          variant="contained"
        >
          submit
        </Button>
      </Box>
    </div>
  );
}
export default Home;
