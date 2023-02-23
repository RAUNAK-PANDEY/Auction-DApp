import "./topbar.css";
import { NavLink, Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
 
 
export default function Topbar() {
  
 
   
 
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <NavLink exact className="nav-link" to="/">
          <span className="homeLogo1">
            <i class="fa fa-solid fa-dice-d20"></i> AUCTION PLACE
          </span>
        </NavLink>
        <span className="homeLogo" >
        AUCTION PLACE
        </span>
 
        
      </div>
    </div>
  );
}