import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  textField: {
    margin: 10,
  },
  button: {
    marginTop: 20,
  },
});

const LoginForm = () => {
  const classes = useStyles();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Implementar la lógica de inicio de sesión
    console.log('Iniciando sesión...');
  };

  return (
    <form className={classes.form}>
      <TextField
        id="email"
        label="Correo electrónico"
        type="email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={classes.textField}
      />
      <TextField
        id="password"
        label="Contraseña"
        type="password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className={classes.textField}
      />
      <Button variant="contained" color="primary" onClick={handleLogin} className={classes.button}>
        Iniciar sesión
      </Button>
    </form>
  );
};

export default LoginForm;
