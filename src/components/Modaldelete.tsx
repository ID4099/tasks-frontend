import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { HttpRequests } from '../tools/Http-request';
import { MyTaskContext } from '../contexts/Task-context';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Modaldelete({ isInitOpen, id  }: { isInitOpen: boolean, id?: number }) {

  const navigate = useNavigate();
  const httpRequests = new HttpRequests;
  const {setAllTasksx, allTasks } = MyTaskContext();
  const handleDelete = async () => {
    try {
      await httpRequests.delete(`${id}`);
      console.log(allTasks)
      setAllTasksx(await httpRequests.get('bring/all'));
      return navigate('/tasks');
    } catch (error) {
      console.error(error);
    }
  };

  const externalHandleClose = () => {
    return navigate('/tasks');
  }
  return (
    <div>
      <Modal
        open={isInitOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Alert message
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure to delete the task #{id}?
          </Typography>
          <Box sx={{marginTop: 3}}>
            <Button variant='contained' color='error' sx={{ marginRight: 2 }} onClick={handleDelete}>Ok, Delete</Button>
            <Button variant='contained' color='primary' onClick={externalHandleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}