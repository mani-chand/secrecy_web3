import React, { useState, useEffect } from "react";
import ABI from "./../Asserts/ABI.json";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import NavBar from "../Components/Navbar";
import { Box, Button, TextField } from "@mui/material/";
export function Home(props) {
  const projectId = "2PxAxJftpMxj8bKkl8oDvZ4kII2";
  const projectSecretKey = "0b115116f44285db872c632d0ebd2672";
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
  const contractAddress = "0xe11FB0d3E16e0cd3240E14BE0E7420f0D2956276";
  const [provider, setProvider] = useState(null);
  const connectToMetaMask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", [0]);
    setProvider(provider);
  };
  const handleSubmit = async () => {
    try {
      const signer = provider.getSigner();
      if(data.file!==""){
        const added = await client.add(data.file);
        var url = `https://manichand.infura-ipfs.io/ipfs/${added.path}`;
        // console.log(url)
        setData({...data,file:url})
      }
      // const readFunction = new ethers.Contract(contractAddress,ABI,provider);
      const writeFunction = new ethers.Contract(contractAddress, ABI, signer);
      const result = await writeFunction.createNote(
        data.Tag,
        data.Description,
        data.file
      );
      console.log(result);
      setData({ Tag: "", Description: "", file: "" });
      window.location.replace("/notes");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!provider) {
      connectToMetaMask();
    }
  }, [provider]);
  return (
    <div>
      <NavBar connectToMetaMask={connectToMetaMask} />
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

        <TextField
          margin="dense"
          type="file"
          onChange={(e) => setData({ ...data, file: e.target.files[0] })}
        />
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
