import React, { useState, useEffect } from "react";
import NavBar from "../Components/Navbar";
import { create } from "ipfs-http-client";
import ABI from "./../Asserts/ABI.json";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ethers } from "ethers";
import {
  TextField,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material/";
//import {ModeEditOutlineIcon} from '@mui/icons-material/';
export default function Notes() {
  const projectId = "";
  const projectSecretKey = "";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
  const client = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: { authorization },
  });

  const contractAddress = "0xe11FB0d3E16e0cd3240E14BE0E7420f0D2956276";
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState({
    Tag: "",
    Description: "",
    file: "",
  });
  const [provider, setProvider] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);
  const handleEdit = async () => {
    console.log(indexEdit, cardData.Tag, cardData.Description, cardData.file);
    if (cardData.file) {
      const added = await client.add(cardData.file);
      var url = `https://manichand.infura-ipfs.io/ipfs/${added.path}`;
      setCardData({ ...data, file: url });
      const signer = provider.getSigner();
      const readFunction = new ethers.Contract(contractAddress, ABI, signer);
      const result = await readFunction.updateNote(
        indexEdit,
        cardData.Tag,
        cardData.Description,
        cardData.file
      );
      console.log(result);
    } else {
      const signer = provider.getSigner();
      const readFunction = new ethers.Contract(contractAddress, ABI, signer);
      const result = await readFunction.updateNote(
        indexEdit,
        cardData.Tag,
        cardData.Description,
        ""
      );
      console.log(result);
    }
  };
  const handleDelete = async (index) => {
    const signer = provider.getSigner();
    const readFunction = new ethers.Contract(contractAddress, ABI, signer);
    const result = await readFunction.deleteNote(index);
    console.log(result);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner();
        const readFunction = new ethers.Contract(contractAddress, ABI, signer);
        const result = await readFunction.get();
        setData(result);
        //console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data]);
  return (
    <>
      <NavBar />
      <Grid
        container
        mt={1}
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {isEdit ? (
          <Box m={5}>
            <TextField
              fullWidth
              id="outlined-basic"
              onChange={(e) => {
                setCardData({ ...cardData, Tag: e.target.value });
              }}
              value={cardData.Tag}
              margin="dense"
              label="tag"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="dense"
              id="outlined-basic"
              onChange={(e) => {
                setCardData({ ...cardData, Description: e.target.value });
              }}
              value={cardData.Description}
              label="enter the data"
              variant="outlined"
            />

            <TextField
              margin="dense"
              type="file"
              onChange={(e) =>
                setCardData({ ...cardData, file: e.target.files[0] })
              }
            />
            <Button
              style={{ marginTop: "10px" }}
              onClick={handleEdit}
              fullWidth={true}
              size="medium"
              variant="contained"
            >
              Update
            </Button>
          </Box>
        ) : (
          <>
            {data.map((item, index) => {
              return (
                <>
                  {item.tag !== "" ||
                  item.description !== "" ||
                  item.file !== "" ? (
                    <Grid xs={4} key={item.tag}>
                      <Card
                        sx={{ maxWidth: 345 }}
                        style={{ marginLeft: "40px" }}
                      >
                        <CardActionArea>
                          {item.file !== "" ? (
                            <CardMedia
                              component="img"
                              height="140"
                              image={item.file}
                              alt="green iguana"
                            />
                          ) : (
                            ""
                          )}
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {item.tag}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          </CardContent>
                          <CardContent
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              onClick={() => {
                                setCardData({
                                  Tag: data[index].tag,
                                  Description: data[index].description,
                                });
                                setEdit(!isEdit);
                                setIndexEdit(index);
                              }}
                            >
                              <AiFillEdit size={30} />
                            </Button>
                            <Button onClick={() => handleDelete(index)}>
                              <AiFillDelete size={30} />
                            </Button>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </>
        )}
      </Grid>
    </>
  );
}
