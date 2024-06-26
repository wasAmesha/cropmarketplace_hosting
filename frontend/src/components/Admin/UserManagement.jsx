/* eslint-disable react/prop-types */
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetAllUsers, deleteUser, updateUserState } from "../../services/userService";
import { GetUniqueId } from "../../services/commonServices";
import { toast } from "react-toastify";
// import { DeactivateUser, DeleteUser } from "../../services/userService";

// import { GetUniqueId } from "../../services/commonServices";

export default function UsersTable() {
  const [rows, setRows] = useState([]);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchAllUsers = async () => {
    await GetAllUsers()
      .then(({ data }) => {
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseDelete = () => {
    setSelectedUser(null)
    setOpenDelete(false);
    fetchAllUsers();
  };

  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
    fetchAllUsers();
  };

  const handleDeleteUser = async () => {
    await deleteUser(selectedUser)
      .then(({data}) => {
        toast.success(data);
        handleCloseDelete();
      })
      .catch((er) => toast.error(JSON.stringify(er)));
  };

  const handleDeactivateUser = async () => {
    const user = [...rows].filter((u) => u._id === selectedUser)[0];
    await updateUserState(selectedUser)
      .then(() => {
        toast.success(
          `User ${
            user.isActive === true ? "Deactivated" : "Activated"
          } Successfully`
        );
        handleCloseDeactivate();
      })
      .catch((er) => toast.error(JSON.stringify(er)));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "User_ID",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `${row.userRole === "Farmer"
                  ? "F-"
                  : row.userRole === "Seller"
                  ? "S-"
                  : row.userRole === "Deliveryman" && "D-"}${GetUniqueId(row._id)}`,
    },
    {
      field: "username",
      headerName: "Full Name",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "email", headerName: "Email Address", flex: 1, minWidth: 250 },
    {
      field: "userRole",
      headerName: "Usr Role",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      minWidth: 50,
      valueGetter:(value, row)=> row.isActive === true ? "Active User":"Deactivated"
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      minWidth: 250,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row._id}
          disableTouchRipple
          icon={
            <div>
              <Button
                onClick={() => {
                  setSelectedUser(params.row._id);
                  setOpenDeactivate(true);
                }}
                variant="contained"
                size="small"
                sx={{ marginRight: "1rem" }}
              >
                {params.row.isActive === true
                  ? "Deactivate"
                  : "Activate"}
              </Button>
              <Button
                onClick={() => {
                  setSelectedUser(params.row._id);
                  setOpenDelete(true);
                }}
                variant="contained"
                size="small"
                sx={{ marginRight: "1rem" }}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </div>
          }
        />,
      ],
    },
  ];

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <div style={{ marginBottom: "5rem", marginTop: "1rem" }}>
        <h3>
          <b>User Management</b>
        </h3>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        columnBuffer={20}
        disableRowSelectionOnClick
      />
      <Dialog open={openDelete} onClose={handleCloseDelete} fullWidth>
        <DialogTitle>Remove User</DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            Are you sure you want to remove this user?
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={handleDeleteUser}>Remove</Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeactivate} onClose={handleCloseDeactivate} fullWidth>
        <DialogTitle>
          {selectedUser !== null
            ? [...rows].filter((u) => u._id === selectedUser)[0].isActive ===
             true
              ? "Deactivate User Account"
              : "Activate User Account"
            : ""}
        </DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            {selectedUser !== null
              ? [...rows].filter((u) => u._id === selectedUser)[0].isActive ===
               true
                ? "Are you sure you want to Deactivate?"
                : "Are you sure you want to Activate?"
              : ""}
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseDeactivate}>Cancel</Button>
            <Button onClick={handleDeactivateUser}>
              {selectedUser !== null
                ? [...rows].filter((u) => u._id === selectedUser)[0].isActive ===
                  true
                  ? "Deactivate"
                  : "Activate"
                : ""}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
