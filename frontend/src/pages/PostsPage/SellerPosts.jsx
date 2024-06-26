import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import { GetAllPosts } from "../../services/postService";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PostCard from "../../components/Posts/PostCard";
import PostFilter from "../../components/Posts/PostFilter";

export default function SellerPosts() {
  const [sellerPosts, setSellerPosts] = useState([]);
  const [filteredSellerPosts, setFilteredSellerPosts] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user._id) return (window.location = "/login");

    const fetchAllPosts = async () => {
      await GetAllPosts()
        .then(({ data }) => {
          setSellerPosts([...data].filter((post) => post.type === "Seller"));
          setFilteredSellerPosts(
            [...data].filter((post) => post.type === "Seller")
          );
        })
        .catch((err) => toast.error(err.response.data));
    };
    fetchAllPosts();
  }, []);

  const handleFilter = (filters) => {
     if ([...filters].length !== 0) {
      const filteredItems = sellerPosts.filter((i) =>
        [...filters].includes(i.product._id)
      );
      if (filteredItems.length === 0) {
        setFilteredSellerPosts([]);
      } else {
        setFilteredSellerPosts(filteredItems);
      }
     }
    
  };

  return (
    <div style={{ margin: "2rem", marginTop: "15vh", display: "flex" }}>
      <PostFilter
        onFilter={handleFilter}
        onReset={() => setFilteredSellerPosts(sellerPosts)}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 10, md: 16 }}
        >
          {filteredSellerPosts.length !== 0 ? (
            filteredSellerPosts.map((post, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <PostCard post={post} />
              </Grid>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "50vh",
                marginTop: "35vh",
                fontSize: "20px",
              }}
            >
              No Items Found
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
}
