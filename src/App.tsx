import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NewTask from './pages/New-Task'
import EditTask from './pages/Edit-Task'
import TaskTable from './pages/Tasks-record'
import { TaskContextProvider } from './contexts/Task-context'
import DeleteTask from './pages/Delete-Task'

function App() {
  return (<>
  <TaskContextProvider>
    <BrowserRouter>
        <Routes>
          <Route path="tasks" element={ <TaskTable /> } />
          <Route path='new/task' element={ <NewTask/> } />
          <Route path='edit/task' element={ <EditTask/> } />
          <Route path='delete/task' element={ <DeleteTask/> } />
        </Routes>
      </BrowserRouter>
  </TaskContextProvider>
  </>)
}

export default App
