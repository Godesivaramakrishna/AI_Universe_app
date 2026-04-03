import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import ChatWithAI from '../pages/ChatWithAI'
import WebsiteMaker from '../pages/WebsiteMaker'
import ApiKeyGuide from '../pages/ApiKeyGuide'
import AllTools from '../pages/Tools/AllTools'
import ToolDetails from '../pages/Tools/ToolDetails'
import Categories from '../pages/Tools/Categories'
import AtoZ from '../pages/Tools/AtoZ'
import CompareTools from '../pages/Tools/CompareTools'

const Private = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/"        element={<Home />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/signup"  element={<Signup />} />

      {/* Protected pages — require login */}
      <Route path="/dashboard"    element={<Private><Dashboard /></Private>} />
      <Route path="/chat"         element={<Private><ChatWithAI /></Private>} />
      <Route path="/tools"        element={<Private><AllTools /></Private>} />
      <Route path="/tools/:id"    element={<Private><ToolDetails /></Private>} />
      <Route path="/categories"   element={<Private><Categories /></Private>} />
      <Route path="/a-to-z"       element={<Private><AtoZ /></Private>} />
      <Route path="/compare"      element={<Private><CompareTools /></Private>} />
      <Route path="/website-maker" element={<Private><WebsiteMaker /></Private>} />
      <Route path="/api-key-guide" element={<Private><ApiKeyGuide /></Private>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
