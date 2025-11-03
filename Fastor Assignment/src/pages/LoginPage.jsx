"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

export default function LoginPage({ onLogin }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const validatePhone = (num) => {
    const regex = /^[6-9]\d{9}$/; // Valid Indian mobile numbers (10 digits, starts 6-9)
    return regex.test(num);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit Indian mobile number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your mobile number.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      toast({
        title: "Invalid OTP format",
        description: "Please enter a 6-digit numeric OTP.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (otp === "123456") {
      toast({
        title: "Login Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onLogin(phone);
    } else {
      toast({
        title: "Incorrect OTP",
        description: "Hint: Try using 123456",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, #004e89, #ff6b35)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={4}
    >
      <Container maxW="md" bg="white" borderRadius="lg" boxShadow="2xl" p={8}>
        <VStack spacing={8}>
          <VStack spacing={2} textAlign="center">
            <Heading as="h1" size="2xl" color="#004e89">
              Fastor
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Find & Share Restaurants
            </Text>
          </VStack>

          {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit} style={{ width: "100%" }}>
              <VStack spacing={6} w="100%">
                <FormControl>
                  <FormLabel fontWeight="semibold" color="#333333">
                    Mobile Number
                  </FormLabel>
                  <Input
                    type="tel"
                    placeholder="Enter your 10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    borderWidth={2}
                    borderColor="#e0e0e0"
                    _focus={{
                      borderColor: "#ff6b35",
                      outline: "none",
                    }}
                    required
                  />
                </FormControl>
                <Button
                  type="submit"
                  w="100%"
                  bg="#ff6b35"
                  color="white"
                  fontWeight="semibold"
                  py={3}
                  isLoading={loading}
                  loadingText="Sending OTP..."
                  _hover={{ bg: "#ff5722" }}
                >
                  Send OTP
                </Button>
              </VStack>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} style={{ width: "100%" }}>
              <VStack spacing={6} w="100%">
                <FormControl>
                  <FormLabel fontWeight="semibold" color="#333333">
                    Enter OTP
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    textAlign="center"
                    fontSize="2xl"
                    letterSpacing="widest"
                    borderWidth={2}
                    borderColor="#e0e0e0"
                    _focus={{
                      borderColor: "#ff6b35",
                      outline: "none",
                    }}
                    required
                  />
                  <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                    Hint: 123456
                  </Text>
                </FormControl>
                <Button
                  type="submit"
                  w="100%"
                  bg="#ff6b35"
                  color="white"
                  fontWeight="semibold"
                  py={3}
                  _hover={{ bg: "#ff5722" }}
                >
                  Verify & Login
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  w="100%"
                  color="#004e89"
                  fontWeight="semibold"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                  }}
                  _hover={{ textDecoration: "underline" }}
                >
                  Back to Phone
                </Button>
              </VStack>
            </form>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
