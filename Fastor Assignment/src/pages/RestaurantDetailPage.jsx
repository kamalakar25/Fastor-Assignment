"use client"

import { useState, useRef, useEffect } from "react"
import { Box, Button, Container, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { ArrowBackIcon, DownloadIcon, EmailIcon } from "@chakra-ui/icons"

export default function RestaurantDetailPage({ restaurant, onBack }) {
  const canvasRef = useRef(null)
  const [logoPos, setLogoPos] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    drawCanvas()
  }, [logoPos])

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Draw Fastor logo (simple circle with text)
      ctx.fillStyle = "rgba(255, 107, 53, 0.8)"
      ctx.beginPath()
      ctx.arc(logoPos.x, logoPos.y, 40, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "white"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("FASTOR", logoPos.x, logoPos.y)
    }

    img.src = restaurant.image
  }

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const distance = Math.sqrt(Math.pow(x - logoPos.x, 2) + Math.pow(y - logoPos.y, 2))

    if (distance < 40) {
      setIsDragging(true)
      setDragOffset({ x: x - logoPos.x, y: y - logoPos.y })
    }
  }

  const handleCanvasMouseMove = (e) => {
    if (!isDragging) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setLogoPos({
      x: Math.max(40, Math.min(x - dragOffset.x, canvas.width - 40)),
      y: Math.max(40, Math.min(y - dragOffset.y, canvas.height - 40)),
    })
  }

  const handleCanvasMouseUp = () => {
    setIsDragging(false)
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    link.download = `${restaurant.name}-fastor.png`
    link.click()
  }

  const shareImage = async () => {
    const canvas = canvasRef.current
    canvas.toBlob(async (blob) => {
      const file = new File([blob], `${restaurant.name}.png`, { type: "image/png" })

      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: "Fastor Restaurant",
            text: `Check out ${restaurant.name}!`,
          })
        } catch (error) {
          console.log("Share cancelled or failed:", error)
        }
      } else {
        alert("Sharing not supported on this device. Use Download instead.")
      }
    })
  }

  return (
    <Box minH="100vh" bg="#f8f9fa">
      {/* Header */}
      <Box bg="#004e89" color="white" py={6} px={4} position="sticky" top={0} boxShadow="md">
        <Container maxW="4xl">
          <Button
            variant="ghost"
            color="white"
            fontSize="sm"
            leftIcon={<ArrowBackIcon />}
            onClick={onBack}
            _hover={{ color: "#ff6b35" }}
          >
            Back
          </Button>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="4xl" py={8} px={4}>
        <VStack align="start" spacing={6}>
          <VStack align="start" spacing={1}>
            <Heading as="h1" size="2xl" color="#333333">
              {restaurant.name}
            </Heading>
            <Text color="gray.600">{restaurant.address}</Text>
          </VStack>

          {/* Canvas Section */}
          <Box w="100%" bg="white" borderRadius="lg" boxShadow="lg" p={6}>
            <Heading as="h2" size="md" color="#333333" mb={4}>
              Superimpose Fastor Logo
            </Heading>
            <Box bg="gray.100" borderRadius="lg" overflow="hidden" mb={3}>
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                style={{
                  width: "100%",
                  height: "auto",
                  cursor: isDragging ? "grabbing" : "grab",
                  backgroundColor: "#e2e8f0",
                  display: "block",
                }}
              />
            </Box>
            <Text fontSize="sm" color="gray.600">
              Drag the logo to reposition it
            </Text>
          </Box>

          {/* Action Buttons */}
          <Grid w="100%" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <Button
              w="100%"
              bg="#ff6b35"
              color="white"
              fontWeight="semibold"
              py={6}
              leftIcon={<DownloadIcon />}
              onClick={downloadImage}
              _hover={{ bg: "#ff5722" }}
            >
              Download Image
            </Button>
            <Button
              w="100%"
              bg="#004e89"
              color="white"
              fontWeight="semibold"
              py={6}
              leftIcon={<EmailIcon />}
              onClick={shareImage}
              _hover={{ bg: "#003d6b" }}
            >
              Share Image
            </Button>
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}
