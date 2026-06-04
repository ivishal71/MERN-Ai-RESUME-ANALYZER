import React from "react";
import styles from "./Dashboard.module.css";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import { useState } from "react";
import axios from "../../utils/axios";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const Dashboard = () => {
  const [uploadFiletext, setUploadFileText] = useState("Upload your resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");

  const [result, setResult] = useState(null);
  const { userInfo } = useContext(AuthContext);

  const storedUser = JSON.parse(localStorage.getItem("userInfo"));

  console.log("Stored User:", storedUser);

  const handleOnChangeFile = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  };

  const handleUpload = async () => {
    setResult(null);

    if (!jobDesc || !resumeFile) {
      alert("Please fill Job Description & Upload Resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);

    console.log("Stored User:", storedUser);
    console.log("Stored User ID:", storedUser?._id);

    // alert(JSON.stringify(storedUser));

    formData.append("user", storedUser?._id);

    setLoading(true);

    try {
      const response = await axios.post("/api/resume/addResume", formData);

      console.log("Response:", response);
      console.log("Response Data:", response.data);

      setResult(response.data.data);
    } catch (err) {
      console.log("FULL ERROR:");
      console.log(err);
      console.log(err.response?.data);

      // alert(JSON.stringify(err.response?.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>
        <div className={styles.DashboardHeader}>
          <div className={styles.DashboardHeaderTitle}>
            Smart Resume Screening
          </div>
          <div className={styles.DashboardHeaderLargeTitle}>
            Resume Match Score
          </div>
        </div>

        <div className={styles.alertInfo}>
          <div>🔔 Important Instructions:</div>
          <div className={styles.dashboardInstruction}>
            <div>
              🗒️ Please paste the complete job description in the "Job
              Description" field before submitting.
            </div>
            <div>🔗 Only PDF format (.pdf) resumes are accepted.</div>
          </div>
        </div>

        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>{uploadFiletext}</div>

          <div className={styles.DashboardInputField}>
            <label htmlFor="inputField" className={styles.analyseAIBtn}>
              Upload Resume
            </label>
            <input
              type="file"
              accept=".pdf"
              id="inputField"
              onChange={handleOnChangeFile}
            />
          </div>
        </div>

        <div className={styles.jobDesc}>
          <textarea
            value={jobDesc}
            onChange={(e) => {
              setJobDesc(e.target.value);
            }}
            className={styles.textarea}
            placeholder="Paste Your Job Description"
            rows={10}
            cols={50}
          ></textarea>
          <div className={styles.AnalyzeBtn} onClick={handleUpload}>
            Analyze
          </div>
        </div>
      </div>

      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
          <div className={styles.content}>Analyse with Ai</div>
          <img className={styles.profileImg} src={userInfo?.photoUrl} />
          <h3>{userInfo?.name}</h3>
        </div>

        {result && (
          <div className={styles.DashboardRightTopCard}>
            <div className={styles.content}>Result</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <h1>{result?.score}%</h1>
              <SignalCellularAltIcon sx={{ fontSize: 50 }} />
            </div>
            <div>
              <h3>Feedback</h3>
              <p>{JSON.stringify(result?.feedback)}</p>
            </div>
          </div>
        )}

        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20px" }}
            width={320}
            height={280}
          />
        )}
      </div>
    </div>
  );
};

export default WithAuthHOC(Dashboard);
