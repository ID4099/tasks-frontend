import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { HttpRequests } from '../tools/Http-request';
import { MyTaskContext } from '../contexts/Task-context';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function NewTask() {
    const navigate = useNavigate();
    const httpRequests = new HttpRequests;
    const { setAllTasksx } = MyTaskContext();

    const handleSubmit = async(event: any) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const task = {
              name: data.get('taskName'),
              description: data.get('description'),
            };
            await httpRequests.post('new', task);
            
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
            marginTop: 45,
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
                Enter your new task
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
                    label="Task Name"
                    name="taskName"
                    autoComplete="taskName"
                    autoFocus
                    // onChange={handleChange}
                />
                <br />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    name='description'
                    label="Description"
                    multiline
                    rows={5}
                />
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    color='primary'
                    size='large'
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                >
                    Create Task
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

export default NewTask;

