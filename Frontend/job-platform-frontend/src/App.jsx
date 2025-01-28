import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '/src/components/Navbar';
import JobList from '/src/components/JobList';
import Login from '/src/components/Login';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';
import JobPost from './pages/JobPost';
import Register from './components/Register';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/applynow" element={<Jobs />} />
        <Route path="/apply/:jobId" element={<ApplicationForm />} />
        <Route path="/application/:jobId" element={<ApplicationList/>} />
        <Route path="/post-job" element={<JobPost/>} />
        <Route path="/applications" element={<Applications/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
