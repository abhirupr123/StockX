import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container,VStack,HStack, Img, Heading,Text, RadioGroup, Radio} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Coins = () => {

  const [coins, setCoins]=useState([]);
  const [currency, setCurrency]=useState("inr");
  const [loading, setLoading]=useState(true);
  const currs= currency==="inr"?"₹": currency==="usd"?"$" :"€";
    
    useEffect(() => {
    const fetchCoins = async ()=>{ 
    const {data}= await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`); 
    setCoins(data);
    setLoading(false);
    };
    fetchCoins(); 
  }, [currency]);
  return (
    <Container maxW={"container.xl"}>
      { loading ?(<Loader />) :
        ( 
        <>
      <Heading display={"flex"} justifyContent={"center"} fontSize={"2xl"} p={"7"}>Select the Currency type</Heading>
      <RadioGroup value={currency} onChange={setCurrency}>
        <HStack p={'3'} spacing={"4"} justifyContent={"center"} marginTop={"-3"}>
          <Radio value={"inr"} >INR</Radio>
          <Radio value={"usd"} >USD</Radio>
          <Radio value={"eur"} >EUR</Radio>
        </HStack>
      </RadioGroup>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"} >
       {coins.map((i)=>(
        <CoinCard
          key={i.id}
          id={i.id}
          img={i.image}
          symbol={i.symbol}
          name={i.name}
          price={i.current_price}
          currs={currs}
          />
       ))}
       </HStack>
       </> )}
       </Container>
  );
};

const CoinCard = ({id,img,symbol,name,price,currs})=>(
  <>
  <Link to={`/coin/${id}`}>
  <VStack width={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"}
  transition={"all 0.3s"} m={"4"} css={{"&:hover":{transform:"scale(1.1)"}}}>
  <Img src={img}
  w={"10"}
  h={"10"}
  objectFit={"contain"}
  alt={"Coin"}
  />
   <Heading noOfLines={1}>{symbol}</Heading>
   <Text noOfLines={1}>{name}</Text>
   <Text noOfLines={1}>{price?`${currs}${price}`:"NA"}</Text>
   </VStack>
   </Link>
   </>
);

export default Coins;