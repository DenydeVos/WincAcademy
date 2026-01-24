import {createContext,useContext,useEffect,useState} from "react";
import {useToast} from "@chakra-ui/react";
const C=createContext(); export const useEvents=()=>useContext(C);
export function EventsProvider({children}){
  const [events,setEvents]=useState([]);
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(true);
  const toast=useToast();
  const load=async()=>{
    const [e,c]=await Promise.all([
      fetch("http://localhost:3000/events"),
      fetch("http://localhost:3000/categories")
    ]);
    setEvents(await e.json());
    setCategories(await c.json());
    setLoading(false);
  };
  useEffect(()=>{load();},[]);
  const addEvent=async(data)=>{
    await fetch("http://localhost:3000/events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
    toast({title:"Event added",status:"success"}); load();
  };
  const updateEvent=async(data)=>{
    await fetch(`http://localhost:3000/events/${data.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
    toast({title:"Event updated",status:"success"}); load();
  };
  const deleteEvent=async(id)=>{
    await fetch(`http://localhost:3000/events/${id}`,{method:"DELETE"});
    toast({title:"Event deleted",status:"success"}); load();
  };
  return <C.Provider value={{events,categories,loading,addEvent,updateEvent,deleteEvent}}>{children}</C.Provider>;
}