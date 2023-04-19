import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const cnstyle = {
  backgroundColor: "RGBA(46, 109, 146,0.5)",
  padding: "20px",
  border: "3px solid black",
  borderRadius: "20px",
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    const check = cookies.Email;
    console.log(check);
    if (check === undefined) {
    } else {
      navigate("/Members");
    }
  }, []);

  const handle = () => {
    setCookie("Email", email, { path: "/" });
  };

  const emailHandler = (e) => {
    setemail(e.target.value);
  };

  const passHandler = (e) => {
    setpass(e.target.value);
  };

  const LoginCheck = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login/logincheck", {
        email: email,
        password: pass,
      })
      .then((res) => {
        if (res.data.length > 0) {
          handle();
          navigate("/Members");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "110px", marginBottom: "60px" }}>GYM APP</h1>
      <Grid container spacing={2} sx={cnstyle}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <h1>LOGIN</h1>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            sx={{ width: "90%" }}
            onChange={emailHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: "90%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Mot de passe
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mot de passe"
              sx={{ width: "100%" }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <form onSubmit={LoginCheck}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
