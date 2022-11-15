import React, { useState } from "react";
import arr from "./data.json";
import {
  Typography,
  CardContent,
  Grid,
  Card,
  Checkbox,
  FormControlLabel,
  CardHeader,
} from "@material-ui/core";
import "./styles.css";

export default function App() {
  const [data, setData] = useState(arr);
  const [selectedData, selectData] = useState([]);

  const handleChange = (val, id, type) => {
    if (type === "right") {
      let copyData = [...selectedData];
      copyData[id] = val;
      selectData(copyData);
    } else {
      let copyData = [...data];
      copyData[id] = val;
      setData(copyData);
    }
  };

  const copyingData = (type) => {
    if (type === "right") {
      setData(data.filter((f) => !f.status));
      selectData([
        ...selectedData,
        ...data
          .filter((f) => f.status)
          .map((f) => {
            return {
              ...f,
              status: false,
            };
          }),
      ]);
    } else {
      selectData(selectedData.filter((f) => !f.status));
      setData([
        ...data,
        ...selectedData
          .filter((f) => f.status)
          .map((f) => {
            return {
              ...f,
              status: false,
            };
          }),
      ]);
    }
  };

  console.log(selectedData);
  return (
    <div class="main-container">
      <h1> Left Right List </h1>
      <Grid container>
        <Grid item xs={4} alignItems="center">
          <ListCompo handleChange={handleChange} data={data} type="left" />
        </Grid>
        <Grid item xs={4}>
          <div
            className="btn-container-one"
          >
            <ButtonCompo type="left" copyingData={copyingData} />
            <ButtonCompo type="right" copyingData={copyingData} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <ListCompo
            handleChange={handleChange}
            data={selectedData}
            type="right"
          />
        </Grid>
      </Grid>
    </div>
  );
}

const ButtonCompo = ({ type, copyingData }) => {
  return (
    <div>
      {type === "left" ? (
        <button onClick={copyingData}>&#x2190;</button>
      ) : (
        <button onClick={() => copyingData(type)}>&#8594;</button>
      )}
    </div>
  );
};

const ListCompo = ({ handleChange, data, type }) => {
  return (
    <Card>
      <CardContent>
        {data.map((item, index) => (
          <div key={item.name + index} style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.status}
                  onChange={(e) => {
                    handleChange(
                      {
                        ...item,
                        status: e.target.checked,
                      },
                      index,
                      type
                    );
                  }}
                />
              }
              label={item.name}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
