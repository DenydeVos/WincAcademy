import {useParams,useNavigate} from "react-router-dom";
import {Box,Heading,Text,Button,Image,useDisclosure} from "@chakra-ui/react";
import {useEvents} from "../context/EventsContext";
import EditEventModal from "../components/EditEventModal";
export default function EventPage(){
  const {id}=useParams(); const nav=useNavigate(); const edit=useDisclosure();
  const {events,categories,deleteEvent}=useEvents();
  const e=events.find(x=>x.id===Number(id)); if(!e) return null;
  return (<Box>
    <Image src={e.image} h="300px" w="100%" objectFit="cover"/>
    <Heading>{e.title}</Heading>
    <Text>{e.description}</Text>
    <Text>{new Date(e.startTime).toLocaleString()} – {new Date(e.endTime).toLocaleString()}</Text>
    <Text>{categories.filter(c=>e.categoryIds.includes(c.id)).map(c=>c.name).join(", ")}</Text>
    <Button mr={2} onClick={edit.onOpen}>Edit</Button>
    <Button colorScheme="red" onClick={()=>{if(confirm("Delete?")){deleteEvent(e.id); nav("/");}}}>Delete</Button>
    <EditEventModal isOpen={edit.isOpen} onClose={edit.onClose} event={e}/>
  </Box>);
}