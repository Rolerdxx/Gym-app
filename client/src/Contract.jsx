import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

const Contract = () => {
  const { id } = useParams();
  const [contract, setcontract] = useState([{ Member: {} }]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setvalue] = useState("1");
  let [update, setupdate] = useState(0);
  const [loading, setloading] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  useEffect(() => {
    const getContract = async () => {
      await axios
        .get(`http://localhost:5000/contract/getcontract/${id}`)
        .then((res) => {
          setcontract([res.data]);
          setloading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getContract();
  }, [update]);

  const exportpdf = () => {
    window.open(`/Contractpdf/${id}`, "_blank", "noreferrer");
    //navigate(`/Contractpdf/${id}`);
  };

  const Renew = async () => {
    const date = dayjs();
    const date2 = date.add(Number(value), "month");
    await axios
      .put(`http://localhost:5000/contract/updatecontract/${contract[0].id}`, {
        startdate: date,
        enddate: date2,
        duration: value,
        monthsremaining: Number(value),
      })
      .then((res) => {
        setupdate((update += 1));
      })
      .catch((err) => {
        console.log(err.message);
      });
    setOpen(false);
  };
  const date1 = dayjs(contract[0].enddate);
  const date2 = dayjs();
  let days = date1.diff(date2, "days");

  return (
    <Box sx={{ display: "flex" }}>
      <Menu />
      <Box
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
        }}
      >
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          contract.map((p) => {
            return (
              <div key={p.id} style={{ fontSize: "30px" }}>
                <h1
                  style={{
                    fontStyle: "italic",
                    fontSize: "60px",
                    textAlign: "center",
                  }}
                >
                  Contract Details
                </h1>
                First Name: {p.Member.firstname} <br />
                Last Name: {p.Member.lastname} <br />
                CIN: {p.Member.cin}
                <br />
                Birth Date: {dayjs(p.Member.birthdate).format("DD MMMM YYYY")}
                <br />
                Adresse: {p.Member.adresse}
                <br />
                Contract Duration: {p.duration} Months
                <br />
                Contract Status:{" "}
                {days < 0 ? (
                  <span style={{ color: "#E84855" }}>Expired</span>
                ) : (
                  <span style={{ color: "#9FD356" }}>Active</span>
                )}
                <br />
                Expiring Date: {date1.format("DD MMMM YYYY")} <br />
                Start Date: {dayjs(p.startdate).format("DD MMMM YYYY")} <br />
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Renew Contract</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Whats the Contract Duration
                    </DialogContentText>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Time
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="A Month"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3 Months"
                        />
                        <FormControlLabel
                          value="12"
                          control={<Radio />}
                          label="A Year"
                        />
                      </RadioGroup>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={Renew}>Renew</Button>
                  </DialogActions>
                </Dialog>
                {days < 0 ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: "10px", m: 1 }}
                  >
                    Renew Contract
                  </Button>
                ) : (
                  <></>
                )}
                <Button
                  variant="contained"
                  color="success"
                  onClick={exportpdf}
                  sx={{ marginBottom: "10px", m: 1 }}
                >
                  Export PDF
                </Button>
              </div>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default Contract;
