import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PostMoreDetails from "./PostMoreDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { format } from "date-fns";
import { getCurrentUser } from "../../services/userService";
import { GetUniqueId } from "../../services/commonServices";
import EditPostForm from "./EditPostForm";
import { DialogActions } from "@mui/material";
import { toast } from "react-toastify";
import { DeletePostById } from "../../services/postService";

export default function PostCard({
  post,
  clickEnable = false,
  selected = null,
  setSelected,
}) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    if (selected !== post._id) {
      setShow(false);
    }
  }, [selected]);

  const handleDelete = async () => {
    await DeletePostById(post._id)
      .then(({ data }) => {
        toast.success(data);
        setOpenDelete(false);
        window.location.reload();
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div
      onClick={() => {
        if (clickEnable) {
          if (selected === post._id) {
            setShow(false);
            setSelected("");
          } else {
            setSelected(post._id);
            setShow(true);
          }
        }
      }}
    >
      <Card
        sx={
          clickEnable
            ? {
                maxWidth: 250,
                minWidth: 250,
                position: "relative",
                cursor: "pointer",
              }
            : { maxWidth: 250, minWidth: 250, position: "relative" }
        }
      >
        {show && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "green",
              opacity: 0.2,
              zIndex: 1,
            }}
          ></div>
        )}

        <div style={{ zIndex: 2 }}>
          <CardMedia
            component="img"
            alt={
              post.type === "Delivery"
                ? post.vehicleModelName
                : post.product.productName
            }
            height="200"
            image={
              post.type === "Delivery"
                ? post.vehicleImage
                : post.product.productImage
            }
          />
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ marginBottom: "0rem" }}
            >
              {post.type === "Delivery"
                ? post.vehicleModelName
                : post.product.productName}
            </Typography>
            <Typography gutterBottom>
              {post.price.toLocaleString("en-US", {
                style: "currency",
                currency: "LKR",
              })}
              <span style={{ fontSize: "13px" }}>
                {post.type === "Delivery" ? " (per km)" : " (per kg)"}
              </span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.type !== "Delivery" ? (
                <tr>
                  <td>
                    <b>Quantity</b>
                  </td>
                  <td>{post.quantity} KG</td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <b>Max Capacity</b>
                  </td>
                  <td>{post.vehicleCapacity} KG</td>
                </tr>
              )}
              <tr>
                <td>
                  <b>District</b>
                </td>
                <td>
                  {post.district.charAt(0).toUpperCase() +
                    post.district.slice(1)}
                </td>
              </tr>
              <tr>
                <td style={{ width: "6.5rem" }}>
                  <b>Posted Date</b>
                </td>
                <td>{format(post.postedDate, "yyyy-MM-dd")}</td>
              </tr>
              <tr>
                <td>
                  <b>Expires Date</b>
                </td>
                <td>{post.expireDate}</td>
              </tr>
              <span>
                <b>Post ID: </b>{" "}
                {post.type === "Farmer"
                  ? "FP-"
                  : post.type === "Seller"
                  ? "SP-"
                  : post.type === "Delivery" && "DP-"}
                {GetUniqueId(post._id)}
              </span>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="success"
              onClick={handleClickOpen}
            >
              More Details
            </Button>
          </CardActions>
          <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {post.type === "Delivery"
                ? post.vehicleModelName
                : post.product.productName}
              {getCurrentUser()._id === post.userId && (
                <div>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    sx={{ marginRight: "1rem" }}
                    startIcon={<EditIcon />}
                    onClick={() => setOpenEdit(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => setOpenDelete(true)}
                    startIcon={<DeleteForeverIcon />}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <PostMoreDetails post={post} onClose={handleClose} />
              </DialogContentText>
            </DialogContent>
          </Dialog>

          <Dialog fullWidth open={openEdit} onClose={handleEditClose}>
            <DialogTitle
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              Edit Post
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <EditPostForm post={post} onClose={handleClose} />
              </DialogContentText>
            </DialogContent>
          </Dialog>

          <Dialog open={openDelete} onClose={handleDeleteClose} fullWidth>
            <DialogTitle id="alert-dialog-title">Delete Post</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDeleteClose}
              >
                Cancel
              </Button>
              <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={handleDelete}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}
