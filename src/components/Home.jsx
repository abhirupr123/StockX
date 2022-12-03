import React from 'react';
import { Container, HStack, Img, VStack, Text, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Home = () => {
  
  const [news, setNews]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const fetchNews= async() =>{
    const {data}= await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${process.env.REACT_APP_MY_API_KEY}`);  
    setNews(data.articles);
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
            img={i.urlToImage}
            url={i.url}
            />
          ))}
          </HStack>
        </>
    )}
    </Container>
  );
};

const NewsCard=({title,img,url}) =>(

<a href={url} target={"blank"}>
<VStack w={52} p={8} shadow={"lg"} borderRadius={"lg"} m={4} transition={"all 0.3s"}
css={{"&:hover":{transform:"scale(1.1)"}}}>
  <Img src={img} w={160} h={20}/>
  <Text noOfLines={3}>{title}</Text>
</VStack>
</a>
);



export default Home;