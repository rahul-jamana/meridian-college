import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FacultyPage from './pages/FacultyPage.jsx'
import FacilitiesPage from './pages/FacilitiesPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import AchieversPage from './pages/AchieversPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import CourseDetailPage from './pages/CourseDetailPage.jsx'
import VisionMissionPage from './pages/VisionMissionPage.jsx'
import FeeStructurePage from './pages/FeeStructurePage.jsx'
import DirectoryPage from './pages/DirectoryPage.jsx'
import AdmissionPage from './pages/AdmissionPage.jsx'
import AdmissionPopup from './components/AdmissionPopup.jsx'
import ChatAgent from './components/ChatAgent.jsx'

import Login from './pages/admin/Login.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ManageNews from './pages/admin/ManageNews.jsx'
import ManageMedia from './pages/admin/ManageMedia.jsx'
import ManageVision from './pages/admin/ManageVision.jsx'
import ManageFees from './pages/admin/ManageFees.jsx'
import Settings from './pages/admin/Settings.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/achievers" element={<AchieversPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/vision-mission" element={<VisionMissionPage />} />
        <Route path="/fees" element={<FeeStructurePage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/course/:slug" element={<CourseDetailPage />} />
        <Route path="/admission" element={<AdmissionPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/news" element={<ManageNews />} />
          <Route path="/admin/media" element={<ManageMedia />} />
          <Route path="/admin/vision" element={<ManageVision />} />
          <Route path="/admin/fees" element={<ManageFees />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Routes>
      <AdmissionPopup />
      <ChatAgent />
    </BrowserRouter>
  )
}

export default App
