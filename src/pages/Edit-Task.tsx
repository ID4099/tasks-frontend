import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { MyTaskContext } from '../contexts/Task-context';
import { useNavigate } from 'react-router-dom';
import { HttpRequests } from '../tools/Http-request';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function EditTask() {
  const [ taskId, setTaskId ] = useState(0);
  const [ taskName, setTaskName ] = useState('');
  const [ taskDescription, setTaskDescription ] = useState('');
  const [ taskIsActive, setTaskIsActive ] = useState(false);

  const navigate = useNavigate();

  const { setAllTasksx, currentTask } = MyTaskContext();

  useEffect(() =>{
      if(!currentTask || currentTask === undefined || !currentTask.name) {
        return navigate('/tasks');
      }
      setTaskId(currentTask.id);
      setTaskName(currentTask.name);
      setTaskDescription(currentTask.description);
      setTaskIsActive(currentTask.isActive);
  }, []);

  const httpRequests = new HttpRequests;

  const handleTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(event.target.value);
  };

  const handleTaskIsActive = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskIsActive(event.target.checked);
  };

  const handleSubmit = async(event: any) => {
    try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const task = {
          name: data.get('taskName'),
          description: data.get('description'),
          isActive: taskIsActive
        };

        await httpRequests.patch(`${taskId}`, task);
        setAllTasksx(await httpRequests.get('bring/all'));
        return navigate('/tasks');
    } catch (error) {
        console.log(error);
    }
}

  const handleCancel = () => {
    return navigate('/tasks');
  }

  return (

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <div style={{
        marginTop: 36,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      >
      </div>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Make changes to the task ID {taskId}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate sx={{ mt: 1 }}
          >
            <TextField
                margin="normal"
                required
                fullWidth
                id="taskName"
                label="Task name"
                name="taskName"
                autoComplete="taskName"
                value={taskName}
                autoFocus
                onChange={handleTaskName}
            />
            <br />
            <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={taskDescription}
                multiline
                rows={5}
                onChange={handleTaskDescription}
            />

            <Switch {...label} id='taskIsActive' name='taskIsActive' checked={taskIsActive} onChange={handleTaskIsActive} /> Is active

            <Button
              color='secondary'
              size='large'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Update
            </Button>

            <Button
                    color='error'
                    size='large'
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 3 }}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditTask;

