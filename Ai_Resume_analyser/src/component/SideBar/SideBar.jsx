import React, { useContext } from "react";
import styles from "./SideBar.module.css";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../utils/AuthContext";

import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { islogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    setUserInfo(null);
    navigate("/");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sideBarIcon}>
        <DocumentScannerIcon sx={{ fontSize: 55, marginBottom: 2 }} />

        <div className={styles.sidebarTopContent}>Resume Screening</div>
      </div>

      <div className={styles.sideBarOptionsBlock}>
        <Link //DASHBOARD  HERE-------
          to={"/dashboard"}
          className={[
            styles.sideBarOptions,
            location.pathname === "/dashboard" ? styles.selectedOption : null,
          ].join(" ")}
        >
          <DashboardIcon sx={{ fontSize: 22 }} />
          <div>Dashboard</div>
        </Link>

        <Link //HISTORY  HERE-------
          to={"/history"}
          className={[
            styles.sideBarOptions,
            location.pathname === "/history" ? styles.selectedOption : null,
          ].join(" ")}
        >
          <HistoryIcon sx={{ fontSize: 22 }} />
          <div>History</div>
        </Link>

        {userInfo?.role === "user" && (
          <Link //ADMIN  HERE------
            to={"/admin"}
            className={[
              styles.sideBarOptions,
              location.pathname === "/admin" ? styles.selectedOption : null,
            ].join(" ")}
          >
            <AdminPanelSettingsIcon sx={{ fontSize: 22 }} />
            <div>Admin</div>
          </Link>
        )}

        <div onClick={handleLogout} className={styles.sideBarOptions}>
          <LogoutIcon sx={{ fontSize: 22 }} />
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
