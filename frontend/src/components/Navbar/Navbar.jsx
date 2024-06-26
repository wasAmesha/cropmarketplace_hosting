import React from "react";
import "./Navbar.css";
import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { GetUniqueId } from "../../services/commonServices";
function Navbar({ user, cartCount }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href={user ? "/home" : "/"}>
          <img
            src={process.env.PUBLIC_URL + "/Navbar/icon.png"}
            alt=""
            className="navbar-icon"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="home">
              <a
                className="nav-link active"
                aria-current="page"
                href={user ? "/home" : "/"}
              >
                Home
              </a>
            </li>

            {user && (
              <>
                <li className="home">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/farmerPosts"
                  >
                    Farmer Posts
                  </a>
                </li>

                <li className="home">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/sellerPosts"
                  >
                    Seller Posts
                  </a>
                </li>

                <li className="home">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/deliveryPosts"
                  >
                    Deliver Posts
                  </a>
                </li>
              </>
            )}

            <li className="about">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <li className="nav-item">
                  <a className="profile" href="/profile">
                    <FontAwesomeIcon icon={faUser} />
                  </a>
                </li> */}
                <div
                  onClick={() => {
                    window.location = "/cart";
                  }}
                  style={{ marginRight: "5rem" }}
                >
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon
                      sx={{
                        fontSize: "2.5rem",

                        cursor: "pointer",
                      }}
                    />
                  </Badge>
                </div>
                {/* <div
                  onClick={() => {
                    window.location = "/profile";
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      user.role === "Farmer"
                        ? "/Profile/farmer.png"
                        : user.role === "Seller"
                        ? "/Profile/seller.png"
                        : user.role === "Deliveryman" && "/Profile/delivery.png"
                    }
                    sx={{
                      width: 50,
                      height: 50,
                      marginRight: "2rem",
                      cursor: "pointer",
                    }}
                  />
                </div> */}

                <Box sx={{ marginRight: "2rem" }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          user.role === "Farmer"
                            ? "/Profile/farmer.png"
                            : user.role === "Seller"
                            ? "/Profile/seller.png"
                            : user.role === "Deliveryman" &&
                              "/Profile/delivery.png"
                        }
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Typography
                      textAlign="center"
                      color={"black"}
                      sx={{ marginX: "1rem" }}
                    >
                      <b>{user.name}</b>
                    </Typography>
                    <Typography
                      textAlign="center"
                      color={"black"}
                      fontSize={"14px"}
                      sx={{
                        marginX: "1rem",
                        marginBottom: "2rem",
                        borderBottom: "1px solid black",
                      }}
                    >
                      {user.role === "Farmer"
                        ? "F-"
                        : user.role === "Seller"
                        ? "S-"
                        : user.role === "Deliveryman" && "D-"}
                      {GetUniqueId(user._id)}
                    </Typography>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        window.location = "/profile";
                      }}
                    >
                      <Typography textAlign="center" color={"black"}>
                        Your Profile
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        localStorage.clear();
                        window.location = "/";
                      }}
                    >
                      <Typography textAlign="center" color={"black"}>
                        <LogoutIcon /> Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </div>
            ) : (
              <li className="nav-item">
                <a className="login" href="/login">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
