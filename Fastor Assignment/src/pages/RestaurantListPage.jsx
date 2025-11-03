"use client"

import { useState, useEffect } from "react"
import { Box, Button, Container, Grid, Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react"

const mockRestaurants = [
  {
    id: 1,
    name: "The Italian Corner",
    address: "123 Main St, Downtown",
    image: "/vibrant-mexican-restaurant.jpg",
    cuisine: "Italian",
  },
  {
    id: 2,
    name: "Spice Palace",
    address: "456 Oak Ave, Midtown",
    image: "/indian-restaurant-exterior.jpg",
    cuisine: "Indian",
  },
  {
    id: 3,
    name: "Sushi Dreams",
    address: "789 Pine Rd, Uptown",
    image: "/bustling-sushi-restaurant.jpg",
    cuisine: "Japanese",
  },
  {
    id: 4,
    name: "Burger Barn",
    address: "321 Elm St, Suburbs",
    image: "/burger-restaurant.jpg",
    cuisine: "American",
  },
]

export default function RestaurantListPage({ user, onSelectRestaurant, onLogout }) {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    setRestaurants(mockRestaurants)
  }, [])

  return (
    <Box minH="100vh" bg="#f8f9fa">
      {/* Header */}
      <Box bg="#004e89" color="white" py={6} px={4} position="sticky" top={0} boxShadow="md">
        <Container maxW="6xl">
          <HStack justifyContent="space-between">
            <VStack align="start" spacing={0}>
              <Heading as="h1" size="lg">
                Fastor
              </Heading>
              <Text fontSize="sm" color="blue.100">
                Hello, {user?.phoneNumber}
              </Text>
            </VStack>
            <Button bg="#ff6b35" color="white" fontWeight="semibold" onClick={onLogout} _hover={{ bg: "#ff5722" }}>
              Logout
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Restaurants Grid */}
      <Container maxW="6xl" py={8} px={4}>
        <Heading as="h2" size="lg" color="#333333" mb={6}>
          Nearby Restaurants
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {restaurants.map((restaurant) => (
            <Box
              key={restaurant.id}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              overflow="hidden"
              cursor="pointer"
              transition="all 0.3s"
              _hover={{
                boxShadow: "xl",
                transform: "scale(1.05)",
              }}
              onClick={() => onSelectRestaurant(restaurant)}
            >
              <Image
                src={restaurant.image || "/placeholder.svg"}
                alt={restaurant.name}
                h={48}
                objectFit="cover"
                w="100%"
              />
              <Stack p={4} spacing={2}>
                <Heading as="h3" size="md" color="#333333">
                  {restaurant.name}
                </Heading>
                <Text color="#ff6b35" fontWeight="semibold" fontSize="sm">
                  {restaurant.cuisine}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  {restaurant.address}
                </Text>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
