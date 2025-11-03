"use client"

import { useState } from "react"
import { Box } from "@chakra-ui/react"
import LoginPage from "./pages/LoginPage"
import RestaurantListPage from "./pages/RestaurantListPage"
import RestaurantDetailPage from "./pages/RestaurantDetailPage"

export default function App() {
  const [currentPage, setCurrentPage] = useState("login")
  const [user, setUser] = useState(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const handleLogin = (phoneNumber) => {
    setUser({ phoneNumber })
    setCurrentPage("restaurants")
  }

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant)
    setCurrentPage("detail")
  }

  const handleBack = () => {
    if (currentPage === "detail") {
      setCurrentPage("restaurants")
    } else {
      setCurrentPage("login")
      setUser(null)
    }
  }

  return (
    <Box minH="100vh" bg="#f8f9fa">
      {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
      {currentPage === "restaurants" && (
        <RestaurantListPage user={user} onSelectRestaurant={handleSelectRestaurant} onLogout={handleBack} />
      )}
      {currentPage === "detail" && <RestaurantDetailPage restaurant={selectedRestaurant} onBack={handleBack} />}
    </Box>
  )
}
