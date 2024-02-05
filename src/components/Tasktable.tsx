import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { TaskInterface } from '../Interfaces/Task-interface';
import { useNavigate } from 'react-router-dom';
import { MyTaskContext } from '../contexts/Task-context';

type Order = 'asc' | 'desc';

function EnhancedTableToolbar() {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {(
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tasks Record
        </Typography>
      )}

    </Toolbar>
  );
}
export default function TaskTable({ xrows }: { xrows: TaskInterface[] }) {
  const [rows, setRows] = React.useState(xrows);

  useEffect(() =>{
    setRows(xrows)
  }, []);


  const [order, _setOrder] = React.useState<Order>('asc');
  const [orderBy, _setOrderBy] = React.useState<keyof TaskInterface>('id');
  const [page, setPage] = React.useState(0);
  const [dense, _setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ _tuple, setTuple ] = React.useState({});
  const { setSelectedTask, setTaskId } = MyTaskContext();
  const navigate = useNavigate();


  const handleSendModal = (id: number) => {
    setTaskId(id);
    return navigate('/delete/task');
  }


  const handleEdit = (row: TaskInterface) => {
    setTuple(row);
    setSelectedTask(row);
    return navigate('/edit/task');
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
     rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 1 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 1000 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>ID</strong></TableCell>
              <TableCell align="center"><strong>Task name</strong></TableCell>
              <TableCell align="center"><strong>Description</strong></TableCell>
              <TableCell align="center"><strong>Active</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

            <TableBody>
              {visibleRows.map((row, _index) => {

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.isActive? 'true' : 'false'}</TableCell>
                    <TableCell align="center">

                      <Tooltip title="Edit">
                        <IconButton aria-label='delete' color='success' onClick={()=>handleEdit(row)}>
                          <EditRoundedIcon/>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton aria-label='delete' color='error' onClick={()=>handleSendModal(row.id)}>
                          <DeleteIcon/>
                        </IconButton>
                      </Tooltip>

                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}