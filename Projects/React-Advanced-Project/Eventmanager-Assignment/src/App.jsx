import { Routes,Route,Link } from "react-router-dom";
import { Box,HStack,Button,useDisclosure } from "@chakra-ui/react";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import AboutPage from "./pages/AboutPage";
import AddEventModal from "./components/AddEventModal";
import ColorModeToggle from "./components/ColorModeToggle";
export default function App(){
  const modal=useDisclosure();
  return (<Box p={4}>
    <HStack mb={6} px={4} py={3} borderRadius='md' bg='chakra-body-bg' justify='space-between'>
      <HStack spacing={6}><Link to='/'>Events</Link><Link to='/about'>About</Link></HStack>
      <HStack spacing={3}><Button colorScheme='blue' onClick={modal.onOpen}>Add Event</Button><ColorModeToggle/></HStack>
    </HStack>
    <AddEventModal isOpen={modal.isOpen} onClose={modal.onClose}/>
    <Routes>
      <Route path="/" element={<EventsPage/>}/>
      <Route path="/events/:id" element={<EventPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
    </Routes>
  </Box>);
}