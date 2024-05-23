import React, { useState }            from 'react';
import Avatar                         from '@mui/material/Avatar';
import Button                         from '@mui/material/Button';
import CssBaseline                    from '@mui/material/CssBaseline';
import TextField                      from '@mui/material/TextField';
import Box                            from '@mui/material/Box';
import LockOutlinedIcon               from '@mui/icons-material/LockOutlined';
import Typography                     from '@mui/material/Typography';
import Container                      from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card                           from '@mui/material/Card';
import CardContent                    from '@mui/material/CardContent';
import Snackbar                       from '@mui/material/Snackbar';
import Alert                          from '@mui/material/Alert';


const theme = createTheme();

export default function Login({ onLoginSuccess }) {

  //Variable para el estado de username
  const [username, setUsername] = useState('');
  //Variable para el estado de la contraseña
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false); // Estado para controlar la visibilidad de la notificación
  const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar el mensaje de error

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (data.token) {
        onLoginSuccess(data.token); // Llamar a la función de éxito con el token
      } else {
        setErrorMessage('Credenciales incorrectas'); // Establecer el mensaje de error
        setOpen(true); // Abrir la notificación
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error al iniciar sesión'); // Establecer el mensaje de error
      setOpen(true); // Abrir la notificación
    }
  };

  // Función para cerrar la notificación
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="100%"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'rgba(27, 30, 54, 1)', // Color de fondo difuminado
            backdropFilter: 'blur(5px)', // Efecto de desenfoque
            justifyContent: 'center',
            padding: '20px', // Añadir un espacio alrededor del contenido
          }}
      >
        <CssBaseline />
        <Card sx={{ color:'#ffffff',
                    background: '#3b3d74',
                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 1)',
                    borderRadius: 3,
                    width:'400px',
                    height:'400px' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#c9a237', color:'#ffffff' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{color:'#ffffff'}}>
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  
                  InputProps={{ sx: { color: 'black' } }} // Cambia el color del texto del placeholder
                  InputLabelProps={{ sx: { color: 'black' } }} // Cambia el color del label del placeholder
                  sx={{ backgroundColor: 'white' }} // Agregar esta línea
                  


                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{ sx: { color: 'black' } }} // Cambia el color del texto del placeholder
                  InputLabelProps={{ sx: { color: 'black' } }} // Cambia el color del label del placeholder
                  sx={{ backgroundColor: 'white' }} // Agregar esta línea

                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 3,
                    mb: 2,
                    color:'#ffffff',
                    bgcolor:'#c9a237',
                    '&: hover':{
                        bgcolor: '#d3bb4c'
                    },
                }}

                >
                  Login
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        {/* Notificación de error */}
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ backgroundColor:'#fd6c6c', color:'#ffffff'}}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
