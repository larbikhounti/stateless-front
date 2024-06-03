"use client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
export default function Register() {
  const { push } = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAccountCreated, setIsCreated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(`user${randomInt(1, 1000)}@gmail.com`);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(e.target);

    const fetchData = async () => {
      const url = "http://localhost:80/api/v1/register"; // Replace with your API endpoint
      const payload = {
        email,
        username,
        password,
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            host: "localhost",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        setIsSubmitting(false);
        toast({
          position: "top",
          title: "Message",
          description: "Account created successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        console.log(data);
        push("/auth/login");
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error:", error);
        toast({
          position: "top",
          title: "An error occurred.",
          description: "Unable to create your account.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchData();
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <HStack>
                <Box>
                  <FormControl paddingY={4} isRequired id="lastName">
                    <FormLabel fontWeight={"bold"}>Username</FormLabel>
                    <Input
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      type="text"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl paddingY={4} id="email" isRequired>
                <FormLabel fontWeight={"bold"}>Email address</FormLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                />
              </FormControl>
              <FormControl paddingY={4} id="password" isRequired>
                <FormLabel fontWeight={"bold"}>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    isRequired
                    type="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isSubmitting}
                  loadingText="Creating Your Account... "
                  type="submit"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="/auth/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
