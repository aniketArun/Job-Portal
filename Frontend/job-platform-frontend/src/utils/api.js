import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Helper functions to retrieve tokens
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle token refresh automatically
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - try refreshing the token
      const originalRequest = error.config;
      const refreshToken = getRefreshToken();

      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data } = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          // Store the new access token
          localStorage.setItem("accessToken", data.access);

          // Update the Authorization header and retry the original request
          axiosInstance.defaults.headers.Authorization = `Bearer ${data.access}`;
          originalRequest.headers.Authorization = `Bearer ${data.access}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Redirect to login if token refresh fails
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// API calls
export const getJobs = async () => {
  try {
    const response = await axiosInstance.get("/jobs/", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getJobDetails = async (jobId) => {
  try {
    const response = await axiosInstance.get(`/jobs/${jobId}/`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching job details for ID ${jobId}:`, error);
    throw error;
  }
};

export const postApplication = async (data) => {
  try {
    const response = await axiosInstance.post("/applications/", data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

export const fetchUserApplications = async () => {
  try {
    const response = await axiosInstance.get("/applications/", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user applications:", error);
    throw error;
  }
};


// Fetch jobs posted by the user
export const getUserJobs = async () => {
    const response = await axiosInstance.get("/jobs/posts/", {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return response.data;
  };
  
  // Add a new job
  export const addJob = async (jobData) => {
    const response = await axiosInstance.post("/jobs/", jobData, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return response.data;
  };
  
  // Update an existing job
  export const updateJob = async (jobId, jobData) => {
    const response = await axiosInstance.put(`/jobs/${jobId}/`, jobData, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return response.data;
  };
  
  // Delete a job
  export const deleteJob = async (jobId) => {
    await axiosInstance.delete(`/jobs/${jobId}/`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
  };

  // Fetch applications for a specific job
export const getApplicationsForJob = async (jobId) => {
  const response = await axiosInstance.get(`/jobs/${jobId}/applications/`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};



//register user

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/register/", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong. Please try again.";
  }
};