import React from 'react';
import { Container, HStack, VStack, Text, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Home = () => {
  
  const options = {
    method: 'GET',
    url: 'https://crypto-news16.p.rapidapi.com/news/top/20',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_MY_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_MY_HOST
    }
  };
  
  const [news, setNews]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const fetchNews= async() =>{
    const {data}= await axios.request(options);  
    setNews(data);
    setLoading(false);
  };
    fetchNews();
  }, []);
  return (
    <Container maxW={"container.xl"}>
    {
      loading?
      (<Loader />) :
      (
        <>
        <Heading display={"flex"} justifyContent={"center"} fontSize={"2xl"} p={4}>Top 20 Headlines of the day</Heading>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}> 
          {news.map((i)=>(
            <NewsCard
            key={i.title}
            title={i.title}
            des={i.description}
            url={i.url}
            />
          ))}
          </HStack>
        </>
    )}
    </Container>
  );
};

const NewsCard=({title,des,url}) =>(

<a href={url} target={"blank"}>
<VStack w={52} p={8} shadow={"lg"} borderRadius={"lg"} m={4} transition={"all 0.3s"}
css={{"&:hover":{transform:"scale(1.1)"}}}>
  <Text noOfLines={3} fontWeight={'bold'}>{title}</Text>
  <Text noOfLines={3}>{des}</Text>
</VStack>
</a>
);



export default Home;