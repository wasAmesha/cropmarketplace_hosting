import React, { useState, useEffect } from "react";
import "./UserHomePage.css";
import TypeWriter from "../../components/AutoWritingText/TypeWriter";
import { getCurrentUser } from "../../services/userService";
import { GetAllPosts } from "../../services/postService";
import { toast } from "react-toastify";
import PostCard from "../../components/Posts/PostCard";
import { Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const farmerBanner =
  "https://www.abers-tourisme.com/assets/uploads/sites/8/2022/12/vente-legumes.jpg";
const sellerBanner =
  "https://static.vecteezy.com/system/resources/previews/027/186/276/large_2x/latin-man-in-an-apron-in-a-greengrocer-s-shop-looking-at-the-camera-free-photo.jpg";
const deliveryBanner =
  "https://imgnew.outlookindia.com/public/uploads/articles/2019/1/31/amazon.jpg";

function UserHomePage({ getCartCount }) {
  const [sellerPosts, setSellerPosts] = useState([]);
  const [farmerPosts, setFarmerPosts] = useState([]);
  const [deliveryPosts, setDeliveryPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (!user._id) return (window.location = "/login");
    getCartCount()
    const fetchAllPosts = async () => {
      await GetAllPosts()
        .then(({ data }) => {
          setSellerPosts([...data].filter((post) => post.type === "Seller"));
          setFarmerPosts([...data].filter((post) => post.type === "Farmer"));
          setDeliveryPosts(
            [...data].filter((post) => post.type === "Delivery")
          );
        })
        .catch((err) => toast.error(err.response.data));
    };
    fetchAllPosts();
  }, []);

  return (
    <div>
      <div className="nothing"></div>
      <div className="crop-container">
        <img
          src={
            currentUser.role === "Farmer"
              ? farmerBanner
              : currentUser.role === "Seller"
              ? sellerBanner
              : currentUser.role === "Deliveryman" && deliveryBanner
          }
          alt=""
          className="crop-image"
        />
      </div>

      <div className="type-writer-container">
        <TypeWriter
          text={`Welcome ${
            currentUser.role === "Farmer"
              ? "Farmers"
              : currentUser.role === "Seller"
              ? "Sellers"
              : currentUser.role === "Deliveryman" && "Deliverymens"
          }!`}
          loop={false}
          className="writer"
          textStyle={{
            fontFamily: "Gill Sans",
            fontSize: "60px",
          }}
        />
      </div>
      <div className="nothing2"></div>
      <div className="topic">
        <p>Seller's Posts</p>
      </div>

      <div
        style={{ margin: "3rem", marginRight: "6.5rem", marginLeft: "6.5rem" }}
      >
        <div style={{ display: "flex", overflowX: "auto", gap: "10px" }}>
          {sellerPosts.slice(0, 4).map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        {sellerPosts.length > 4 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              endIcon={<KeyboardDoubleArrowRightIcon />}
              onClick={() => (window.location = "/sellerPosts")}
            >
              View more
            </Button>
          </div>
        )}
      </div>

      <div className="nothing2"></div>
      <div className="topic">
        <p>Farmer's Posts</p>
      </div>

      <div
        style={{ margin: "3rem", marginRight: "6.5rem", marginLeft: "6.5rem" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {farmerPosts.slice(0, 5).map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        {farmerPosts.length > 4 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              endIcon={<KeyboardDoubleArrowRightIcon />}
              onClick={() => (window.location = "/farmerPosts")}
            >
              View more
            </Button>
          </div>
        )}
      </div>

      <div className="topic">
        <p>Delivery Services</p>
      </div>

      <div
        style={{ margin: "3rem", marginRight: "6.5rem", marginLeft: "6.5rem" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {deliveryPosts.slice(0, 5).map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        {deliveryPosts.length > 4 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              endIcon={<KeyboardDoubleArrowRightIcon />}
              onClick={() => (window.location = "/deliveryPosts")}
            >
              View more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHomePage;
