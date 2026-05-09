import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: uuid(), text: input }]);
      setInput("");
      toast.success("Task added!");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const bgColor = isDark ? "bg-gray-800" : "bg-gray-100";
  const cardColor = isDark ? "bg-gray-600" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-gray-200" : "text-gray-600";
  const inputBg = isDark ? "bg-gray-700" : "bg-gray-50";
  const inputBorder = isDark ? "border-gray-500" : "border-gray-300";
  const itemBg = isDark ? "bg-gray-500" : "bg-gray-200";
  const buttonBg = isDark ? "bg-gray-900" : "bg-gray-800";
  const buttonHover = isDark ? "hover:bg-black" : "hover:bg-gray-900";

  return (
    <div className={`flex items-center justify-center min-h-screen ${bgColor}`}>
      <div className={`${cardColor} p-12 rounded-3xl shadow-2xl w-full max-w-2xl mx-4`}>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${textColor} mb-2`}>
              Welcome, {user}!
            </h1>
            <p className={`${textMuted} text-sm`}>
              Have a great and productive day!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className={`${buttonBg} ${buttonHover} text-white font-bold py-2 px-6 rounded-lg transition duration-200 text-sm`}
          >
            Log out
          </button>
        </div>

        <div className="space-y-3 mb-8">
          {todos.length === 0 ? (
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
              No tasks yet. Add one to get started!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex justify-between items-center ${itemBg} p-3 rounded-lg gap-3`}
              >
                <span className={`${textColor} text-sm flex-1`}>{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded transition duration-200 text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className={`flex-1 px-4 py-3 border ${inputBorder} rounded-lg ${inputBg} ${textColor} placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm`}
          />
          <button
            onClick={addTodo}
            className={`${buttonBg} ${buttonHover} text-white font-bold py-3 px-6 rounded-lg transition duration-200 text-sm`}
          >
            Add Task
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className={`w-full ${isDark ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400" : "bg-gray-700 text-white hover:bg-gray-800"} py-2 px-4 rounded-lg transition duration-200 text-sm font-bold`}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}
