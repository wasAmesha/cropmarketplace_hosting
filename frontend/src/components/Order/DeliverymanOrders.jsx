import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import {
  GetAllOrdersByDeliveryman,
} from "../../services/paymentService";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { GetUniqueId } from "../../services/commonServices";
import { format } from "date-fns";
import DeliveryDetails from "./DeliveryDetails";

export default function DeliverymanOrders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const user = getCurrentUser();
  const [orders, setOrders] = useState([]);
  const [openViewOrder, setOpenViewOrder] = useState(false);
  const [selectedOder, setSelectedOder] = useState(null);

  const handleOpenViewOrder = (id) => {
    setOpenViewOrder(true);
    setSelectedOder(orders.filter((d) => d.orderId === id)[0]);
  };
  const handleCloseViewOrder = () => {
    fetchAllOrders();
    setOpenViewOrder(false);
  };

  const fetchAllOrders = async () => {
    await GetAllOrdersByDeliveryman(user._id)
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((err) => toast.error(err.response.data));
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "orderId", label: "Order ID" },
    { id: "product", label: "Product" },
    { id: "qty", label: "Weight" },
    { id: "fromLocation", label: "From Location" },
    { id: "toLocation", label: "To Location" },
    { id: "distance", label: "Distance" },
    { id: "status", label: "Status" },
    { id: "date", label: "Order Date" },
    { id: "actions", label: "Actions" },
  ];

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
            {orders.length !== 0 ? (
              orders
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
                        if (column.id === "orderId") {
                          return (
                            <TableCell>
                              {`ORD-${GetUniqueId(row.orderId)}`}
                            </TableCell>
                          );
                        }
                        if (column.id === "product") {
                          return (
                            <TableCell>
                              <img
                                src={row.product.productImage}
                                alt="row.product.productName"
                                style={{ width: "50px", marginRight: "1rem" }}
                              />
                              {row.product.productName}{" "}
                            </TableCell>
                          );
                        }
                        if (column.id === "status") {
                          return (
                            <TableCell>
                              {
                                row.deliveryStatus[
                                  row.deliveryStatus.length - 1
                                ].status
                              }
                            </TableCell>
                          );
                        }
                        if (column.id === "distance") {
                          return (
                            <TableCell>
                              {row.deliveryDetails.distance} KM
                            </TableCell>
                          );
                        }
                        if (column.id === "fromLocation") {
                          return (
                            <TableCell>
                              {row.deliveryDetails.fromLocation}
                            </TableCell>
                          );
                        }
                        if (column.id === "toLocation") {
                          return (
                            <TableCell>
                              {row.deliveryDetails.toLocation}
                            </TableCell>
                          );
                        }
                        if (column.id === "date") {
                          return (
                            <TableCell>
                              {format(
                                row.deliveryStatus[
                                  row.deliveryStatus.length - 1
                                ].date,
                                "yyyy-MM-dd"
                              )}
                            </TableCell>
                          );
                        }

                        if (column.id === "actions") {
                          return (
                            <TableCell>
                              <Button
                                onClick={() => handleOpenViewOrder(row.orderId)}
                                // startIcon={<CheckCircleOutlineIcon />}
                                variant="contained"
                                color="success"
                                size="small"
                              >
                                Update Status
                              </Button>
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
        rowsPerPageOptions={[8, 15, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openViewOrder} onClose={handleCloseViewOrder} fullWidth>
        <DialogTitle id="alert-dialog-title">Delivery Details</DialogTitle>
        <DialogContent>
          <DeliveryDetails
            delivery={selectedOder}
            fetchAllOrders={fetchAllOrders}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
