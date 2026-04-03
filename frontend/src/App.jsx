import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToolProvider } from './context/ToolContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToolProvider>
          <AppRoutes />
        </ToolProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
