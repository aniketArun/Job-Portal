import React, { useState, useEffect } from "react";
import { fetchUserApplications } from "../utils/api";
import { Card, CardContent, Typography, Grid, Chip, CircularProgress, Box } from "@mui/material";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const data = await fetchUserApplications();
        setApplications(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load applications.");
        setLoading(false);
      }
    };

    getApplications();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
        {error}
      </Typography>
    );
  }
  /*
       {
        "id": 1,
        "job": 3,
        "applicant": 1,
        "applicant_name": "aniket",
        "cover_letter": "I am good enginner",
        "applied_at": "2025-01-25T11:08:56.121023Z",
        "job_details": {
            "id": 3,
            "title": "Lead Java Sofware Engineer",
            "description": "Required experinece of Java and Spring.",
            "location": "Pune",
            "salary": "500000.00",
            "created_at": "2025-01-25T09:47:41.131026Z",
            "posted_by": 1,
            "posted_by_name": "aniket",
            "company_name": "Hexaware"
        }
    },
  */
  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {applications.length > 0 ? (
        applications.map((application) => (
          <Grid item xs={12} sm={6} md={4} key={application.id}>
            <Card>
              <CardContent>
              <Typography variant="h5" component="div">
                </Typography>
                <Typography variant="h5" component="div">
                  {application.job_details.id} - 
                   {application.job_details.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Application ID:</strong> {application.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Company:</strong> {application.job_details.company_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Applied On:</strong> {new Date(application.applied_at).toLocaleDateString()}
                </Typography>
                <Chip
                  label={application.job_details.location}
                  color="warning"
                  style={{ marginTop: "10px" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" style={{ textAlign: "center", width: "100%" }}>
          You haven't applied for any jobs yet.
        </Typography>
      )}
    </Grid>
  );
};

export default Applications;
