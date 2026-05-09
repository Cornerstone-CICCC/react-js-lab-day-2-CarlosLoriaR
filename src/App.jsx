import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ThemeProvider, useTheme } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { TodoList } from "./pages/TodoList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./index.css";
import { Toaster } from "react-hot-toast";

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "dark" : ""}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
