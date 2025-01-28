import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { getJobs, getJobDetails } from "../utils/api"; // Import API calls

const Jobs = () => {
  const [jobs, setJobs] = useState([]); // Job list
  const [selectedJob, setSelectedJob] = useState(null); // Selected job details
  const [loading, setLoading] = useState(true); // Loading state
  const [jobLoading, setJobLoading] = useState(false); // Loading for job details

  // Fetch job list on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      if (data) setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  // Fetch selected job details
  const handleJobClick = async (jobId) => {
    setJobLoading(true); // Show loading while fetching details
    const data = await getJobDetails(jobId);
    if (data) setSelectedJob(data);
    setJobLoading(false);
  };

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {/* Left Panel: Job List */}
      <Grid item xs={12} md={4} style={{ overflowY: "auto", maxHeight: "80vh" }}>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Job Openings
        </Typography>
        {loading ? (
          <Typography>Loading jobs...</Typography>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <Card
              key={job.id}
              style={{ marginBottom: "10px", cursor: "pointer" }}
              onClick={() => handleJobClick(job.id)}
            >
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.company_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.location}
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
        {jobLoading ? (
          <Typography>Loading job details...</Typography>
        ) : selectedJob ? (
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedJob.title}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {selectedJob.company_name}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              <strong>Location:</strong> {selectedJob.location}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              <strong>Salary:</strong> {selectedJob.salary}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              <strong>Description:</strong> {selectedJob.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              href={`/apply/${selectedJob.id}`}
            >
              Apply Now
            </Button>
          </Box>
        ) : (
          <Typography>Select a job to see details.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Jobs;
