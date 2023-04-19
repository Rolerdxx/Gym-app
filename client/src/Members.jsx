import { Box } from "@mui/system";
import Menu from "./Menu";
import { useState, forwardRef, useEffect } from "react";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import { Navigate, useNavigate } from "react-router-dom";

const columns = [
  { field: "cin", headerName: "CIN", width: 100 },
  { field: "firstname", headerName: "First name", width: 130 },
  { field: "lastname", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    width: 130,
    valueGetter: (params) => {
      const date1 = dayjs(params.row.birthdate);
      const date2 = dayjs();
      let age = date2.diff(date1, "years");
      return age;
    },
  },
  // { field: "birthdate", headerName: "Date of birth", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "adresse", headerName: "Adresse", width: 130 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstname || ""} ${params.row.lastname || ""}`,
  },
  {
    field: "active",
    headerName: "Active",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => {
      if (params.row.isactive) {
        return "Active";
      } else {
        return "Inactive";
      }
    },
  },
];

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Members = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs("2022-04-07"));
  const [Rvalue, setRValue] = useState("female");
  const [fn, setfn] = useState("");
  const [ln, setln] = useState("");
  const [email, setemail] = useState("");
  const [cin, setcin] = useState("");
  const [adresse, setadresse] = useState("");
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [rows, setrows] = useState([]);
  let [update, setupdate] = useState(0);
  const [selected, setselected] = useState({ id: "", name: "" });
  const [deleteopen, deletesetOpen] = useState(false);
  const navigate = useNavigate();

  const deletehandleClickOpen = () => {
    deletesetOpen(true);
  };

  const deletehandleClose = () => {
    deletesetOpen(false);
  };

  const showSuccess = () => {
    setsuccess(true);

    setTimeout(() => {
      setsuccess(false);
    }, 3000);
  };

  const showError = () => {
    seterror(true);

    setTimeout(() => {
      seterror(false);
    }, 3000);
  };

  useEffect(() => {
    const getMembers = async () => {
      await axios
        .get("http://localhost:5000/members/Members")
        .then((res) => {
          setrows(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getMembers();
  }, [update]);

  const handlefn = (e) => {
    setfn(e.target.value);
  };

  const handlels = (e) => {
    setln(e.target.value);
  };

  const handlecin = (e) => {
    setcin(e.target.value);
  };

  const handleemail = (e) => {
    setemail(e.target.value);
  };

  const handleadresse = (e) => {
    setadresse(e.target.value);
  };

  const handleChange = (event) => {
    setRValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addMember = () => {
    if (fn !== "" && ln !== "") {
      axios
        .post("http://localhost:5000/members/addMember", {
          firstname: fn,
          lastname: ln,
          cin: cin,
          gender: Rvalue,
          birthdate: value,
          email: email,
          adresse: adresse,
        })
        .then((res) => {
          showSuccess();
          setupdate((update += 1));
          setfn("");
          setln("");
          setemail("");
          setcin("");
          setadresse("");
        })
        .catch((err) => {
          showError();
          console.log(err.message);
        });
    } else {
      showError();
    }
    setOpen(false);
  };

  const deleteMember = () => {
    if (selected.id !== "") {
      axios
        .delete("http://localhost:5000/members/deleteMember/" + selected.id)
        .then((res) => {
          if (res.data.success === true) {
            showSuccess();
            setupdate((update += 1));
            setselected({ id: "", name: "" });
          }
        })
        .catch((err) => {
          showError();
          console.log(err.message);
        });
    }
    deletesetOpen(false);
  };

  const handleContract = () =>{
    if(selected.id!==""){
      navigate(`/Contract/${selected.id}`)
    }
  }

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
          marginLeft: "5%",
          marginRight: "5%",
        }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleClickOpen}
          sx={{ marginBottom: "10px", m: 1 }}>
          Add member
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={deletehandleClickOpen}
          sx={{ marginBottom: "10px", m: 1 }}>
          Delete member
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleContract}
          sx={{ marginBottom: "10px", m: 1 }}>
          Manage Contract
        </Button>
        {selected.name !== "" && <>Selected Member :{selected.name}</>}
        <Dialog
          open={deleteopen}
          onClose={deletehandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Deleting Member"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {selected.name === "" ? (
                <>You have to select the member</>
              ) : (
                <>Are you sure u want to delete {selected.name}?</>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deletehandleClose}>Cancel</Button>
            <Button onClick={deleteMember} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Member</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="firstname"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handlefn}
            />
            <TextField
              autoFocus
              margin="normal"
              id="lastname"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handlels}
            />
            <TextField
              autoFocus
              margin="normal"
              id="cin"
              label="Cin"
              type="text"
              fullWidth
              variant="standard"
              onChange={handlecin}
            />
            <TextField
              autoFocus
              margin="normal"
              id="email"
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleemail}
            />
            <TextField
              autoFocus
              margin="normal"
              id="adresse"
              label="Adresse"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleadresse}
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={Rvalue}
                onChange={handleChange}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                label="Date of birth"
                openTo="year"
                margin="normal"
                views={["year", "month", "day"]}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addMember}>Add Member</Button>
          </DialogActions>
        </Dialog>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ m: 1 }}
            pageSize={7}
            rowsPerPageOptions={[5]}
            onRowClick={(params) => {
              setselected({
                id: params.row.id,
                name: `${params.row.firstname || ""} ${
                  params.row.lastname || ""
                }`,
              });
            }}
            rowSelection
          />
        </div>
        {success && (
          <Alert variant="filled" severity="success">
            Success!
          </Alert>
        )}
        {error && (
          <Alert variant="filled" severity="error">
            There has been an error!
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Members;
