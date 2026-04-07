import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
const theme = createTheme();

export default function Authentication() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formstate, setFormstate] = useState(0);
  const [open, setOpen] = useState(false);//open snackbar when user register successfully and show message in snackbar

  const { handleRegister, handleLogin } = useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formstate === 0) {
        let result=await handleLogin(username,password)
        console.log(result)
         

      }
      if (formstate === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result)
        setMessage(result);
        setOpen(true)
        setError("");
        setFormstate(0);
        setPassword("");
      }
    }
    catch (err) {
      let message = (err.response.data.message);
      setError(message);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* LEFT SIDE */}
        <Grid
          size={{ xs: 0, sm: 4, md: 7 }} // ✅ FIXED
          sx={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* RIGHT SIDE */}
        <Grid
          size={{ xs: 12, sm: 8, md: 5 }} // ✅ FIXED
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <div>
              <Button variant={formstate === 0 ? "contained" : ""} onClick={() => setFormstate(0)}>
                Sign in
              </Button>
              <Button variant={formstate === 1 ? "contained" : ""} onClick={() => setFormstate(1)}>
                Sign up
              </Button>
            </div>


            <Box component="form" noValidate sx={{ mt: 1 }}>

              {formstate === 1 ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="FullName"
                  label="Full Name"
                  name="fullName"
                  value={name}
                  autoFocus
                  onChange={(e) => { setName(e.target.value) }}
                />
              ) : <></>}

              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                value={username}
                autoFocus
                onChange={(e) => { setUsername(e.target.value) }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />

              <p style={{ color: 'red' }}>{error}</p>

              <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formstate === 0 ? "Sign in" : "Register"} Sign In
              </Button>



            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open}
        autoHideDuration={4000} message={message}>

      </Snackbar>
    </ThemeProvider>
  );
}