import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import { GetAllPosts } from "../../services/postService";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PostCard from "../../components/Posts/PostCard";

export default function DeliveryPosts() {
  const [deliveryPosts, setDeliveryPosts] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user._id) return (window.location = "/login");

    const fetchAllPosts = async () => {
      await GetAllPosts()
        .then(({ data }) => {
          setDeliveryPosts([...data].filter((post) => post.type === "Delivery"));
        })
        .catch((err) => toast.error(err.response.data));
    };
    fetchAllPosts();
  }, []);

  return (
    <div style={{ margin: "2rem", marginTop: "15vh", display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 10, md: 16 }}
        >
          {deliveryPosts.map((post, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
