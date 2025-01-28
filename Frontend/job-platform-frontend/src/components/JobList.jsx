import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { getJobs } from "../utils/api"; // Import the API call function

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      if (data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {loading ? (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <CircularProgress />
        </Grid>
      ) : jobs.length > 0 ? (
        jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.company_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Pay Range: </strong>{job.salary}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: "10px" }}>
                  <strong>Posted by:</strong> {job.posted_by_name}
                </Typography>
                <Button
                  variant="contained"
                  style={{ marginTop: "10px" }}
                  href={`/applynow`}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" style={{ textAlign: "center", width: "100%" }}>
          No jobs available at the moment.
        </Typography>
      )}
    </Grid>
  );
};

export default JobList;
