import React, { useState } from "react";

import {
  Button,
  Typography,
  CardContent,
  Grid,
  Card,
  Checkbox
} from "@material-ui/core";
import "./styles.css";

const arr1 = [
  {
    name: "sudhi",
    status: false
  },
  {
    name: "ankitha",
    status: false
  },
  {
    name: "shashank",
    status: false
  },
  {
    name: "reddy",
    status: false
  }
];

export default function App() {
  const [data, setData] = useState(arr1);
  const [selectedData, selectData] = useState([]);
  const [values, setValues] = useState({});

  const handleChange = (val, id, type) => {
    if (type === "right") {
      let copyData = [...selectedData];
      copyData[id] = val;
      selectData(copyData);
    } else {
      let copyData = [...data];
      copyData[id] = val;
      console.log("update", copyData);
      setData(copyData);
    }
  };

  const copyingData = (type) => {
    if (type === "right") {
      selectData(selectedData.filter((f) => !f.status));
      setData([
        ...data,
        ...selectedData
          .filter((f) => f.status)
          .map((f) => {
            return {
              ...f,
              status: false
            };
          })
      ]);
    } else {
      setData(data.filter((f) => !f.status));
      selectData([
        ...selectedData,
        ...data
          .filter((f) => f.status)
          .map((f) => {
            return {
              ...f,
              status: false
            };
          })
      ]);
    }
  };

  console.log(selectedData);
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={4} alignItems="center">
          <Card>
            <CardContent>
              {data.map((item, index) => (
                <div key={item.name + index} style={{ display: "flex" }}>
                  <Checkbox
                    checked={item.status}
                    onChange={(e) => {
                      handleChange(
                        {
                          ...item,
                          status: e.target.checked
                        },
                        index
                      );
                    }}
                  />
                  <Typography>{item.name}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Button size="small" onClick={copyingData}>
            {"-->"}
          </Button>
          <Button size="small" onClick={() => copyingData("right")}>
            {"<--"}
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              {selectedData.map((item, index) => (
                <div key={item.name + index} style={{ display: "flex" }}>
                  <Checkbox
                    checked={item.status}
                    onChange={(e) => {
                      handleChange(
                        {
                          ...item,
                          status: e.target.checked
                        },
                        index,
                        "right"
                      );
                    }}
                  />
                  <Typography>{item.name}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
