import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box, Typography } from "@mui/material";
import { postApplication } from "../utils/api"; // Import the API function
import { useNavigate, useParams } from "react-router-dom";

const ApplicationForm = () => {
  const [applicantInfo, setApplicantInfo] = useState({ cover_letter: ""});
  const [loading, setLoading] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await postApplication({ job: jobId, ...applicantInfo });
    if (response) {
      setApplicantInfo({cover_letter:""});
      alert("Application submitted successfully!");
      setLoading(false);
      navigate('/applynow');
    } else {
      alert("Failed to submit application.");
      setLoading(false);
    }
  };

  return (    
    <Box style={{ padding: "20px" }}>
    <Typography variant="h4" gutterBottom>
      Apply for Job ID: {jobId}
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Full Name"
        // value={applicantInfo.name}
        // onChange={(e) => setApplicantInfo({ ...applicantInfo, name: e.target.value })}
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Email"
        variant="outlined"
        // value={applicantInfo.email}
        // onChange={(e) => setApplicantInfo({ ...applicantInfo, email: e.target.value })}
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Cover Letter"
        variant="outlined"
        value={applicantInfo.cover_letter}
        onChange={(e) => setApplicantInfo({ ...applicantInfo, cover_letter: e.target.value })}
        fullWidth
        multiline
        rows={4}
        style={{ marginBottom: "20px" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Submit Application"}
      </Button>

    </form>
  </Box>
  );
};

export default ApplicationForm;
