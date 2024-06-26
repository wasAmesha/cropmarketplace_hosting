import React, { useEffect, useState } from "react";

import "./UserPosts.css";
import PostCard from "../Posts/PostCard";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import NewPostDialog from "../Posts/NewPostDialog";
import { GetPostsByUser } from "../../services/postService";
import { getCurrentUser } from "../../services/userService";
import { toast } from "react-toastify";

export default function UserPosts({ setPostCount }) {
  const [Posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);

  const fetchFarmerOrders = async () => {
    await GetPostsByUser(getCurrentUser()._id)
      .then(({ data }) => {
        setPosts(data);
        setPostCount(data.length);
      })
      .catch((err) => toast.error(err.response.data));
  };

  useEffect(() => {
    fetchFarmerOrders();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchFarmerOrders();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          Add new Post
        </Button>
      </div>
      <div className="items-list">
        {Posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Add New Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <NewPostDialog onClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
