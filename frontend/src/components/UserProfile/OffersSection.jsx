import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import {
  GetOffersByReceiver,
  GetOffersBySender,
  UpdateOfferStatus,
} from "../../services/offerService";
import { getCurrentUser } from "../../services/userService";
import { GetUniqueId } from "../../services/commonServices";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function OfferSection() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openAccept, setOpenAccept] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const user = getCurrentUser();
  const [offers, setOffers] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenWithdraw = (id) => {
    setOpenWithdraw(true);
    setSelectedOffer(offers.filter((d) => d.id === id)[0]);
  };
  const handleCloseWithdraw = () => {
    if (user.role === "Seller") {
      fetchAllReceiverOffers();
    }
    if (user.role === "Farmer") {
      fetchAllSenderOffers();
    }
    setOpenWithdraw(false);
  };

  const handleOpenAccept = (id) => {
    setOpenAccept(true);
    setSelectedOffer(offers.filter((d) => d.id === id)[0]);
  };
  const handleCloseAccept = () => {
    if (user.role === "Seller") {
      fetchAllReceiverOffers();
    }
    if (user.role === "Farmer") {
      fetchAllSenderOffers();
    }
    setOpenAccept(false);
  };

  const fetchAllSenderOffers = async () => {
    await GetOffersBySender(user._id).then(({ data }) => {
      const offerRows = [];
      [...data].forEach((off) => {
        offerRows.push({
          id: off._id,
          postId: `SP-${GetUniqueId(off.postId)}`,
          sellerId:
            off.receiver.userRole === "Farmer"
              ? `F-${GetUniqueId(off.receiver._id)}`
              : off.receiver.userRole === "Seller"
              ? `S-${GetUniqueId(off.receiver._id)}`
              : off.receiver.userRole === "Deliveryman" &&
                `D-${GetUniqueId(off.receiver._id)}`,
          name: off.receiver.firstName + " " + off.receiver.lastName,
          email: off.receiver.email,
          date: format(off.createdAt, "yyyy-MM-dd"),
          note: off.note,
          status: off.status,
        });
      });
      setOffers(offerRows);
    });
  };
  const fetchAllReceiverOffers = async () => {
    await GetOffersByReceiver(user._id).then(({ data }) => {
      const offerRows = [];
      [...data].forEach((off) => {
        offerRows.push({
          pid: off.postId,
          fid:off.sender._id,
          id: off._id,
          postId: `SP-${GetUniqueId(off.postId)}`,
          senderId:
            off.sender.userRole === "Farmer"
              ? `F-${GetUniqueId(off.sender._id)}`
              : off.sender.userRole === "Seller"
              ? `S-${GetUniqueId(off.sender._id)}`
              : off.sender.userRole === "Deliveryman" &&
                `D-${GetUniqueId(off.sender._id)}`,
          name: off.sender.firstName + " " + off.sender.lastName,
          email: off.sender.email,
          date: format(off.createdAt, "yyyy-MM-dd"),
          note: off.note,
          status: off.status,
        });
      });
      setOffers(offerRows);
    });
  };

  useEffect(() => {
    if (user.role === "Seller") {
      fetchAllReceiverOffers();
    }
    if (user.role === "Farmer") {
      fetchAllSenderOffers();
    }
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleStatusChange = async (status) => {
    await UpdateOfferStatus({ id: selectedOffer.id, status: status })
      .then(({ data }) => {
        toast.success(data);
        handleCloseAccept();
      })
      .catch((error) => toast.error(error.response.data));
  };

  const columns = [
    { id: "postId", label: "Post ID" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "note", label: "Note" },
    { id: "date", label: "Date" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions", align: "center" },
  ];
  if (user.role === "Farmer") {
    columns.splice(1, 0, { id: "sellerId", label: "Seller ID" });
  }
  if (user.role === "Seller") {
    columns.splice(1, 0, { id: "senderId", label: "Sender ID" });
  }
  return (
    <Paper>
      <TableContainer sx={{ height: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b> {column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.length !== 0 ? (
              offers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "actions") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {user.role === "Farmer" &&
                                row.status === "Pending" && (
                                  <Button
                                    onClick={() => handleOpenWithdraw(row.id)}
                                    startIcon={<SettingsBackupRestoreIcon />}
                                    variant="contained"
                                    color="error"
                                    size="small"
                                  >
                                    Withdraw
                                  </Button>
                                )}
                              {user.role === "Seller" &&
                                row.status === "Pending" && (
                                  <Button
                                    onClick={() => handleOpenAccept(row.id)}
                                    startIcon={<CheckCircleOutlineIcon />}
                                    variant="contained"
                                    color="success"
                                    size="small"
                                  >
                                    Accept
                                  </Button>
                                )}
                              {user.role === "Seller" &&
                                row.status === "Accepted" && (
                                  <Button
                                    onClick={() => {
                                      window.location = `/offerPayment/${row.pid}/${row.fid}`;
                                    }}
                                    startIcon={<CheckCircleOutlineIcon />}
                                    variant="contained"
                                    color="success"
                                    size="small"
                                  >
                                    Checkout
                                  </Button>
                                )}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={offers.filter((u) => u.role !== "Admin").length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openAccept} onClose={handleCloseAccept} fullWidth>
        <DialogTitle id="alert-dialog-title">Accept Offer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to accept this offer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleCloseAccept}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="outlined"
            size="small"
            onClick={() => handleStatusChange("Accepted")}
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWithdraw}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Withdraw Offer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to withdraw this offer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleCloseWithdraw}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={() => handleStatusChange("Withdrawn")}
            autoFocus
          >
            withdraw
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
