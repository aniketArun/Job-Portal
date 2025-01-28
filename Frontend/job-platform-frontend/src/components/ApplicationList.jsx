import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { getJobDetails, getApplicationsForJob } from "../utils/api"; // Import API calls
import { useParams } from "react-router-dom";
const Jobs = () => {
  const [applications, setApplications] = useState([]); // Job list
  const [selectedApplication, setSelectedApplication] = useState(null); // Selected job details
  const [loading, setLoading] = useState(true); // Loading state
  const [applicationLoading, setAppLicationLoading] = useState(false); // Loading for job details
  const { jobId } = useParams();
  // Fetch job list on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      const data = await getApplicationsForJob(jobId);
      if (data) setApplications(data);
      setLoading(false);
    };
    fetchApplications();
  }, []);

  // Fetch selected job details
  const handleJobClick = async (jobId) => {
    setAppLicationLoading(true); // Show loading while fetching details
    // const data = await getJobDetails(jobId);
    if (applications) setSelectedApplication(applications.find((application) => application.id === jobId));
    console.log(applications)
    setAppLicationLoading(false);
  };

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {/* Left Panel: Job List */}
      <Grid item xs={12} md={4} style={{ overflowY: "auto", maxHeight: "80vh" }}>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Recieved Applications
        </Typography>
        {loading ? (
          <Typography>Loading Applications...</Typography>
        ) : applications.length > 0 ? (
          applications.map((application) => (
            <Card
              key={application.id}
              style={{ marginBottom: "10px", cursor: "pointer" }}
              onClick={() => handleJobClick(application.id)}
            >
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {`Application ID - ${application.id}`}
                </Typography>
                <Typography variant="h6">{application.applicant_name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Applied At: 
                {new Date(application.applied_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No jobs available.</Typography>
        )}
      </Grid>

      {/* Right Panel: Job Details */}
      <Grid item xs={12} md={8}>
        {applicationLoading ? (
          <Typography>Loading Application details...</Typography>
        ) : selectedApplication ? (
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedApplication.applicant_name}
            </Typography>
            <Typography variant="h6" color="textSecondary">
            Applied At: 
            {new Date(selectedApplication.applied_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              
              <strong>Cover Letter:</strong> <br></br>
              {selectedApplication.cover_letter}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              href={""}
            >
              Take Action
            </Button>
          </Box>
        ) : (
          <Typography>Select a Application to see details.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Jobs;
