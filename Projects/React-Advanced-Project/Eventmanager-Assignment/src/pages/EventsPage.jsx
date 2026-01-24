import {SimpleGrid,Box,Heading,Image,Text,Input,Checkbox,Stack,Skeleton} from "@chakra-ui/react";
import {Link} from "react-router-dom"; import {useEvents} from "../context/EventsContext"; import {useState} from "react";
export default function EventsPage(){
  const {events,categories,loading}=useEvents(); const [q,setQ]=useState(""); const [f,setF]=useState([]);
  if(loading) return <Skeleton h="200px"/>;
  const vis=events.filter(e=>e.title.toLowerCase().includes(q.toLowerCase())&&(f.length===0||f.some(id=>e.categoryIds.includes(id))));
  return (<>
    <Heading mb={4}>List of events</Heading>
    <Input mb={4} placeholder="Search" onChange={e=>setQ(e.target.value)}/>
    <Stack direction="row" mb={4}>{categories.map(c=>
      <Checkbox key={c.id} onChange={e=>setF(x=>e.target.checked?[...x,c.id]:x.filter(i=>i!==c.id))}>{c.name}</Checkbox>)}
    </Stack>
    <SimpleGrid columns={[1,2,3]} spacing={6}>
      {vis.map(e=>(<Link key={e.id} to={`/events/${e.id}`}>
        <Box h="100%" borderRadius="xl" overflow="hidden" boxShadow="md" _hover={{boxShadow:"xl", transform:"translateY(-4px)"}} transition="0.2s">
          <Image src={e.image} h="200px" w="100%" objectFit="cover"/>
          <Box p={4}><Heading size="md" mb={2}>{e.title}</Heading><Text color="gray.500">{e.description}</Text></Box>
        </Box>
      </Link>))}
    </SimpleGrid>
  </>);
}