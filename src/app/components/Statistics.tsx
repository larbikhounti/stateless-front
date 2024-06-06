"use client"
import {
    Box,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  import { ReactNode, useEffect, useState } from 'react';
  import { BsPerson } from 'react-icons/bs';
  import { FiPackage, FiSend, FiServer } from 'react-icons/fi';
  import useAuthStore from '../store/Authstore';
  
  interface StatsCardProps {
    title: string;
    stat: number;
    icon: ReactNode;
  }
  function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function Statistics() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const toast =  useToast()
    const [total_variables, setTotalVariables] = useState(0);
    const [total_projects, setTotalProjects] = useState(0);
    const [total_requests, setTotalRequests] = useState(0);
    
  
    useEffect(() => {
      console.log("Component rendered");
      console.log("Access token:", accessToken);
      
      if (!accessToken) {
        console.error("No access token available");
        return;
      }
  
      const fetchData = async () => {
        console.log("Fetching data...");
        const url = 'http://localhost/api/v1/dashboard/statistics';
        const headers = {
          'accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'host': 'localhost'
        };
        
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: headers,
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const { data: { total_variables, total_projects, total_requests } } = await response.json();

          setTotalVariables(total_projects);
          setTotalProjects(total_variables);
          setTotalRequests(total_requests);

        } catch (error) {
          console.error('Error fetching data:', error);
  
          
        }
      };
  
      fetchData();
    }, [accessToken,total_variables,total_projects,total_requests]); // Add accessToken to dependency array
  

    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'variables'}
            stat={total_variables}
            icon={<FiPackage size={'3em'} />}
          />
          <StatsCard
            title={'Projects'}
            stat={total_projects}
            icon={<FiServer size={'3em'} />}
          />
          <StatsCard
            title={'Requests'}
            stat={total_requests}
            icon={<FiSend size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    );
  }