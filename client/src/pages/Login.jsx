import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignInSide() {
  const [userInfo, setUserInfo] = useState(null);
  let navigate = useNavigate();
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/user/login", userInfo)
      .then(async (response) => {
        if (response.data.success) {
          navigate("/home", { state: response.data.user });
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://source.unsplash.com/random?night')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            lg={4}
            component={Paper}
            elevation={6}
            square
            sx={{ borderRadius: "15px", backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="room_id"
                  label="Room Id"
                  name="room_id"
                  autoComplete="room_id"
                  autoFocus
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, height: 60 }}
                >
                  Login In
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link to={"/"}>
                      {"Don't have an account? Register"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

