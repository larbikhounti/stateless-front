"use client";
import {get,save} from "@/app/cookies/cookiesHandler";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { push } = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("password");

  const handleSubmit = (e: any ) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(e.target);

    const fetchData = async () => {
      const url = "http://localhost:80/api/v1/login"; // Replace with your API endpoint
      const payload = {
        email,
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
        if(!data.access_token){
          toast({
            position: "top",
            title: "An error occurred.",
            description: data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });

        }else{
          await save("access_token",data.access_token)         
          toast({
            position: "top",
            title: "Message",
            description: "Logged in successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
        setIsSubmitting(false);
       

        console.log("no error " + data);
        push("/auth/login");
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error:", error);
        toast({
          position: "top",
          title: "An error occurred.",
          description: "Unable to login your account.",
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
               onChange={(e) => setEmail(e.target.value)}
               value={email}
              type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link href="/auth/forget" color={"blue.400"}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Logging in Your Account... "
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
