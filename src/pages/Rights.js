import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Navbar from "../components/Navbar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./Rights.css";
function Rights() {
     const getRights = async () => {
       await fetch("http://localhost:2000/api/rights")
         .then((res) => res.json())
         .then((data) => {
           setRights(data);
         });
     };
  const [rights, setRights] = useState([]);


const edit=(e,id,value)=>{
    

   e.preventDefault();
  axios
    .put("http://localhost:2000/api/rights/" + id, { access:  value===1?0:1 })
    .then((response) => {
        console.log(response);
        getRights();
    })
    .catch((error) => {
      console.error("Something went wrong!", error);
    });
         
 
  
};
const remove = (e, id) => {
  e.preventDefault();
  axios
    .delete("http://localhost:2000/api/rights/" + id,)
    .then((response) => {
      console.log(response);
      getRights();
    })
    .catch((error) => {
      console.error("Something went wrong!", error);
    });
};
  useEffect(() => {
   

    getRights();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="top">
        {rights.map((right) => (
          <div className="cardHolder">
            <Card
              className="card"
              key={right.user_ID}
              sx={{ height: 120, width: 1000 }}
            >
              <CardContent>
                <Typography className="text-xs" variant="body1" component="h2">
                  ID: {right.user_ID}
                </Typography>
                <Typography className="text-xs" variant="body1" component="h2">
                  RFID Tag: {right.rfid}
                </Typography>
                <Typography className="text-xs" variant="body1" component="h2">
                  Hat Zutritt: {right.access === 1 ? "Ja" : "Nein"}
                </Typography>
                <Button onClick={(e) => edit(e, right.user_ID, right.access)}>
                  {right.access === 1 ? "Sperren" : "Zulassen"}
                </Button>
                <Button onClick={(e) => remove(e, right.user_ID)}>
                  Löschen
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rights;
