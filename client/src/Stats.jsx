import { Box } from "@mui/system";
import Menu from "./Menu";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import Grid from "@mui/material/Grid";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const defaultdata = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.3)",
        "rgba(54, 162, 235, 0.3)",
        "rgba(255, 206, 86, 0.3)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 2,
      hoverOffset: 4,
    },
  ],
};

const style = {
  box: {
    backgroundColor: "white",
    textAlign: "center",
    margin: "20px",
    padding: "20px",
    borderRadius: "30px",
  },
  pie: {
    height: "200px",
  },
};
const Stats = () => {
  const [dataactice, setdataactive] = useState(defaultdata);
  const [data, setdata] = useState(defaultdata);
  const [income, setincome] = useState(defaultdata);
  const [newmembers, setnewmembers] = useState(defaultdata);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getActive = async () => {
      await axios.get("http://localhost:5000/Members/actives").then((res) => {
        let result = res.data;
        setdataactive({
          labels: ["Inactive", "Active"],
          datasets: [
            {
              label: "Count",
              data: [result[0].count, result[1].count],
              backgroundColor: [
                "rgba(255, 99, 132, 0.3)",
                "rgba(54, 162, 235, 0.3)",
                "rgba(255, 206, 86, 0.3)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 2,
              hoverOffset: 4,
            },
          ],
        });
      });
    };
    const getAge = async () => {
      await axios
        .get("http://localhost:5000/Members/getagecategories")
        .then((res) => {
          const result = res.data;
          setdata({
            labels: [result[0]._id, result[1]._id, result[2]._id],
            datasets: [
              {
                label: "Count",
                data: [result[0].count, result[1].count, result[2].count],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.3)",
                  "rgba(54, 162, 235, 0.3)",
                  "rgba(255, 206, 86, 0.3)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 2,
                hoverOffset: 4,
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    const getReport = async () => {
      await axios
        .get("http://localhost:5000/report/")
        .then((res) => {
          const data = res.data;
          setincome({
            labels: [
              data[11].month,
              data[10].month,
              data[9].month,
              data[8].month,
              data[7].month,
              data[6].month,
              data[5].month,
              data[4].month,
              data[3].month,
              data[2].month,
              data[1].month,
              data[0].month,
            ],
            datasets: [
              {
                label: "Income in DH",
                data: [
                  data[11].revenu,
                  data[10].revenu,
                  data[9].revenu,
                  data[8].revenu,
                  data[7].revenu,
                  data[6].revenu,
                  data[5].revenu,
                  data[4].revenu,
                  data[3].revenu,
                  data[2].revenu,
                  data[1].revenu,
                  data[0].revenu,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.3)",
                  "rgba(54, 162, 235, 0.3)",
                  "rgba(255, 206, 86, 0.3)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 2,
                hoverOffset: 4,
              },
            ],
          });
          setnewmembers({
            labels: [
              data[11].month,
              data[10].month,
              data[9].month,
              data[8].month,
              data[7].month,
              data[6].month,
              data[5].month,
              data[4].month,
              data[3].month,
              data[2].month,
              data[1].month,
              data[0].month,
            ],
            datasets: [
              {
                label: "Count",
                data: [
                  data[11].newmembers,
                  data[10].newmembers,
                  data[9].newmembers,
                  data[8].newmembers,
                  data[7].newmembers,
                  data[6].newmembers,
                  data[5].newmembers,
                  data[4].newmembers,
                  data[3].newmembers,
                  data[2].newmembers,
                  data[1].newmembers,
                  data[0].newmembers,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.3)",
                  "rgba(54, 162, 235, 0.3)",
                  "rgba(255, 206, 86, 0.3)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 2,
                hoverOffset: 4,
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getReport();
    getAge();
    getActive();
    setloading(false);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Menu />
      <Box sx={{ flexGrow: 1, marginTop: 11 }}>
        <Grid container spacing={2} xs={{ textAlign: "center" }}>
          {loading ? (
            <>
              <Grid item xs={4}></Grid>
              <Grid item xs={3} sx={style.box}>
                <CircularProgress disableShrink />
              </Grid>
              <Grid item xs={3}></Grid>
            </>
          ) : (
            <>
              <Grid item xs={1}></Grid>
              <Grid item xs={5} sx={style.box}>
                <label>Age categories</label>
                <Pie style={style.pie} data={data} />
              </Grid>
              <Grid item xs={5} sx={style.box}>
                <label>Activity</label>
                <Doughnut style={style.pie} data={dataactice} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} sx={style.box}>
                <label>Last 12 months income</label>
                <Bar style={style.pie} data={income} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} sx={style.box}>
                <label>Last 12 months new Members</label>
                <Bar style={style.pie} data={newmembers} />
              </Grid>
            </>
          )}

          {/*  */}
        </Grid>
      </Box>
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          margin: "10px",
          marginTop: "80px",
          marginLeft: "15%",
          marginRight: "15%",
        }}>
        <Pie style={{width:"500px",height:"500px"}} data={data} />
      </Box> */}
    </Box>
  );
};

export default Stats;
