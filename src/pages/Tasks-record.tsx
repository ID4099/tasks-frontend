import TaskTable from "../components/Tasktable";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useNavigate } from "react-router-dom";
import { MyTaskContext } from "../contexts/Task-context";
import { useState } from "react";

const defaultTheme = createTheme();

export default function TasksRecord() {

  const { allTasks } = MyTaskContext()

  const [ rows, _setRows ] = useState(allTasks);
  
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate('/new/task')
  }
  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Button variant="contained" sx={{marginBottom: 4}} onClick={handleClick} >New Task <NewspaperIcon sx={{marginLeft:2}}/></Button>
        < TaskTable xrows={rows}/>
    </ThemeProvider>
  );
}