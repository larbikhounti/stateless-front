"use client"
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
  import { useParams } from 'next/navigation';
  import { useState } from 'react';
  export default function ResetPassword(): JSX.Element {
    const [password, setPassword] = useState("");
    const params = useParams<{ token: string; email: string }>()
    const { token, email } = params;
    const toast = useToast();
    const decodedEmail = decodeURIComponent(email)
    const handleSubmit = async (e : React.FormEvent) =>{
      e.preventDefault();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/password/reset/${token}/${email}`; 
      const payload = {
        password,
        token,
        decodedEmail

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
        if (res.status == 201) {
          console.log("no error " + data);
          toast({
            position: "top",
            title: "Reset Link",
            description: "Password changed successfully ",
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
            Enter new password
          </Heading>
          <FormControl  id="password" isRequired>
            <FormLabel> New password</FormLabel>
            <Input onChange={(e)=> setPassword(e.target.value) } type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Button
            type='submit'
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
        </form>
      </Flex>
    );
  }