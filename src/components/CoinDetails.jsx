import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Loader from './Loader';
import {Container, Img, StatLabel, Text, VStack, Stat, StatNumber, RadioGroup, Radio, HStack, StatArrow, StatHelpText, Badge, Progress, Box, Button} from '@chakra-ui/react';
import axios from 'axios';
import Chart from './Chart';

const CoinDetails = () => {
  const [loading, setLoading]=useState(true);
  const [coin, setCoin]=useState({});
  const params= useParams();
  const [currency,setCurrency]=useState("inr");
  const [days,setDays]=useState("24h");
  const [chart,setChart]=useState([]);
  const currs= currency==="inr"?"₹":currency==="usd"?"$" :"€";
  const btns=["24h","7d","14d","30d","60d","200d","365d","max"];

  const switchChartStats=(key)=>{
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
        case "7d":
          setDays("7d");
          setLoading(true);
          break;
          case "14d":
        setDays("14d");
        setLoading(true);
        break;
        case "30d":
        setDays("30d");
        setLoading(true);
        break;
        case "60d":
        setDays("60d");
        setLoading(true);
        break;
        case "200d":
        setDays("200d");
        setLoading(true);
        break;
        case "365d":
        setDays("365");
        setLoading(true);
        break;
        case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  }

  useEffect(() => {
    const fetchCoin= async ()=> {
     const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`);
     const {data:chartData} = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
     setCoin(data);
     setLoading(false);
     setChart(chartData.prices);
    };
    fetchCoin();
  }, [params.id,currency,days]);
  return(
    <Container maxW={"container.xl"}>
    {
      loading? (<Loader />) :
      (
        <>
        <Box width={"full"} borderWidth={1}>
          <Chart currency={currs} arr={chart} days={days}/>
        </Box>

        <HStack p={"4"} wrap={"wrap"}>
          {
          btns.map((i)=>(
              <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
            ))
          }
        </HStack>

        <RadioGroup value={currency} onChange={setCurrency}>
          <HStack spacing={"4"} p={"4"} justifyContent={"center"} marginTop={"3"}>
          <Radio value={"inr"}>INR</Radio>
          <Radio value={"usd"}>USD</Radio>
          <Radio value={"eur"}>EUR</Radio>
          </HStack>
        </RadioGroup>

        <VStack spacing={"4"} p={"16"} alignItems={"flex-start"} marginTop={"-14"}>
          <Text fontSize={"md"} alignSelf={"center"} opacity={"0.7"}>
            Last updated on {" "} {Date(coin.market_data.last_updated).split("G")[0]}
          </Text>
          <Img src={coin.image.large} objectFit={"contain"} w={"16"} h={"16"}/>
          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currs}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
            <StatArrow type={coin.market_data.price_change_percentage_24h >0 ? "increase" : "decrease" } />
              {coin.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>
          <Badge fontSize={"2xl"} bgColor={"blue.600"} color={"white"}>
            #{coin.market_data.market_cap_rank}
          </Badge>
          <CustomBar 
          high={`${currs}${coin.market_data.high_24h[currency]}`}
          low={`${currs}${coin.market_data.low_24h[currency]}`} />
          <Box w={"full"} p={"4"}>
            <Item title={"Max Supply"} value={coin.market_data.max_supply} />
            <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
            <Item title={"All Time High"} value={`${currs}${coin.market_data.ath[currency]}`} />
            <Item title={"All Time Low"} value={`${currs}${coin.market_data.atl[currency]}`} />
          </Box>
        </VStack>
        </>
      )}
      </Container>
  );
};

const CustomBar = ({high,low}) => (
<VStack w={"full"}>
  <Progress value={50} colorScheme={"teal"} w={"full"}/>
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
        <Text>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
</VStack>
)

const Item=({title,value}) =>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>

)

export default CoinDetails;