import React, { useState, useEffect } from "react";
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Card, CardContent, Typography, IconButton, List,
  ListItem,
  ListItemText, Divider,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { getUserJobs, addJob, updateJob, deleteJob, getApplicationsForJob } from "../utils/api";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationDialog, setApplicationDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company_name: "",

  });
  const navigate = useNavigate();
  // Fetch user jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getUserJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching user jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle dialog open/close
  const handleOpenDialog = (job = null) => {
    setEditingJob(job);
    setFormValues(job || { title: "", description: "", location: "", salary: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingJob(null);
  };

  // Handle add/update job
  const handleSaveJob = async () => {
    try {
      if (editingJob) {
        // Update job
        const updatedJob = await updateJob(editingJob.id, formValues);
        setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
      } else {
        // Add job
        const newJob = await addJob(formValues);
        setJobs([...jobs, newJob]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // Handle delete job
  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  // Handle view applications
  const handleViewApplications = async (jobId) => {
    try {
      const applications = await getApplicationsForJob(jobId);
      setApplications(applications);
      setSelectedJob(jobs.find((job) => job.id === jobId));
      // console.log(selectedJob);
      setApplicationDialog(true);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleCloseApplicationDialog = () => {
    setApplicationDialog(false);
    setApplications([]);
    setSelectedJob(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Your Job Posts
      </Typography>
      <Button variant="contained" onClick={() => handleOpenDialog()} style={{ marginBottom: "20px" }}>
        Add New Job
      </Button>
      <Grid container spacing={3}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{job.id} - {job.title}</Typography>
                  <Typography variant="body2">{job.description}</Typography>
                  <Typography variant="body2">{job.location}</Typography>
                  <Typography variant="body2"><strong>Salary:</strong> {job.salary}</Typography>

                  <div style={{ marginTop: "10px" }}>
                    <IconButton onClick={() => handleOpenDialog(job)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteJob(job.id)}>
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => navigate(`/application/${job.id}`)}>
                      <Visibility />
                    </IconButton>
                    {/* <IconButton onClick={() => handleViewApplications(job.id)}>
                      <Visibility />
                    </IconButton> */}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No jobs posted yet.</Typography>
        )}
      </Grid>

      {/* Dialog for Add/Edit Job */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingJob ? "Edit Job" : "Add New Job"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Job Title"
            type="text"
            fullWidth
            value={formValues.title}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="company_name"
            label="Company"
            type="text"
            fullWidth
            value={formValues.company_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Job Description"
            type="text"
            fullWidth
            value={formValues.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Job Location"
            type="text"
            fullWidth
            value={formValues.location}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="salary"
            label="Salary"
            type="text"
            fullWidth
            value={formValues.salary}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveJob} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>


      {/* Dialog for View Applications */}
      <Dialog open={applicationDialog} onClose={handleCloseApplicationDialog}>
        <DialogTitle>Applications for {selectedJob?.title}</DialogTitle>
        <DialogContent>
          <List>
            {applications.length > 0 ? (
              applications.map((application) => (
                <div key={application.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${application.id} - ${application.applicant_name}`}
                      secondary={`Applied at: ${new Date(application.applied_at).toLocaleDateString()}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))
            ) : (
              <Typography variant="body1">No applications yet.</Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApplicationDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobPost;
