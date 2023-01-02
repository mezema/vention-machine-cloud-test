import * as React from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CreateOneUserRequestDto, useCreateOneUserMutation } from "../../redux/endpoints/users-endpoints"
import AddIcon from '@mui/icons-material/Add';
import { User } from '@ventionMachineCloudTest/models';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
  },
  textField: {
    marginBottom: '16px',
  },
  button: {
    marginTop: '16px',
  },
});

export const CreateUserForm: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [createUser, { isLoading, error }] = useCreateOneUserMutation();
  const classes = useStyles();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = {
      username,
      password,
      firstName,
      lastName,
      email,
    } as CreateOneUserRequestDto;

    const response = await createUser(user);
    
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className={classes.textField}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={classes.textField}
          required
        />
        <TextField
          label="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className={classes.textField}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className={classes.textField}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Create User
        </Button>
      </form>
      {error && <div>An error occurred while creating the user</div>}
    </div>
  );
};

export default CreateUserForm;

