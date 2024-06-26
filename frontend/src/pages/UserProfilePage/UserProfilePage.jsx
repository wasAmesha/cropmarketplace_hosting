import React, { useEffect, useState } from "react";
import "./UserProfilePage.css";
import Navbar from "../../components/Navbar/Navbar";
import { getCurrentUser } from "../../services/userService";
import FooterNew from "../../components/Footer/FooterNew";
import OtherSections from "../../components/UserProfile/OtherSections";
import { GetUniqueId } from "../../services/commonServices";
export default function UserProfilePage() {
    const user = getCurrentUser();
    const [postCount, setPostCount] = useState(0)
  return (
    <div>
      <div className="profile-container">
        <div className="profile-userDetails">
          {user.role === "Farmer" ? (
            <img
              src={"/Profile/farmer.png"}
              alt=""
              className="profile-img-user"
            />
          ) : user.role === "Seller" ? (
            <img
              src={"/Profile/seller.png"}
              alt=""
              className="profile-img-user"
            />
          ) : (
            user.role === "Deliveryman" && (
              <img
                src={"/Profile/delivery.png"}
                alt=""
                className="profile-img-user"
              />
            )
          )}
          <div className="user-info">
            <h3 style={{ color: "rgb(121, 172, 120)", marginBottom: "1.5rem" }}>
              <b>{user.role}</b>
            </h3>
            <tr>
              <td className="profile-attribute-title">ID</td>
              <td>
                {user.role === "Farmer"
                  ? "F-"
                  : user.role === "Seller"
                  ? "S-"
                  : user.role === "Deliveryman" && "D-"}
                {GetUniqueId(user._id)}
              </td>
            </tr>
            <tr>
              <td className="profile-attribute-title">Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td className="profile-attribute-title">Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td className="profile-attribute-title">District</td>
              <td>
                {user.district.charAt(0).toUpperCase() + user.district.slice(1)}
              </td>
            </tr>
          </div>
          <div className="profile-stats">
            <div className="profile-stats-card">
              <h5>
                <b>No of Posts</b>
              </h5>
              <h5>{postCount}</h5>
            </div>
          </div>
        </div>
        <div className="profile-otherSections">
          <OtherSections setPostCount={setPostCount} />
        </div>
      </div>
    </div>
  );
}
