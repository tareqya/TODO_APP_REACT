import React from "react";
import "./SideBar.css";
import { Icon } from "../../assets/images";
import { Link } from "react-router-dom";
import { Icons } from "../../assets";

function SideBar() {
  return (
    <div className="SideBar">
      <img src={Icon} className="Icon" alt="icon" />
      <div className="linksWrapper">
        <Link to={"/"}>
          <Icons.HomeIcon color="white" size={25} />
        </Link>
        <Link to={"/dashboard"}>
          <Icons.ChartIcon color="white" size={25} />
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
