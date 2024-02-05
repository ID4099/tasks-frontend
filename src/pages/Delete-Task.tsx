import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modaldelete from '../components/Modaldelete';
import { MyTaskContext } from '../contexts/Task-context';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function DeleteTask() {
    const { taskID } = MyTaskContext();

    console.log(taskID)

    return (
        <ThemeProvider theme={defaultTheme}>
            <Modaldelete isInitOpen={true} id={taskID}/>
            <Container component="main" maxWidth="xs">

            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
            </Box>
            </Container>
        </ThemeProvider>
    );
}

export default DeleteTask;

