"use client"
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
import { useState } from 'react';
  
  type ForgotPasswordFormInputs = {
    email: string;
  };
  
  export default function ForgotPassword(): JSX.Element {
    const [email, setEmail] = useState("");
    const toast = useToast();
    const handleSubmit = async (e : React.FormEvent) =>{
      e.preventDefault();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/password/email`; // Replace with your API endpoint
      const payload = {
        email,
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
        if (res.status == 200) {
          console.log("no error " + data);
          toast({
            position: "top",
            title: "Reset Link",
            description: "Reset link sent successfully ",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }else{
          toast({
            position: "top",
            title: "Reset Link",
            description: "something went wrong please try again ",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }

        
      } catch (error) {
        console.error("Error:", error);
        toast({
          position: "top",
          title: "Reset Link",
          description: "something went wrong please try again ",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
   
      }

    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
          <form onSubmit={handleSubmit}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
            
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              type='submit'
              _hover={{
                bg: 'blue.500',
              }}>
              Request Reset
            </Button>
          </Stack>
          
        </Stack>
        </form>
      </Flex>
    );
  }