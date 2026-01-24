import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input,Checkbox,Stack} from "@chakra-ui/react";
import {useState} from "react"; import {useEvents} from "../context/EventsContext";
export default function AddEventModal({isOpen,onClose}){
  const {categories,addEvent}=useEvents();
  const [form,set]=useState({title:"",description:"",image:"",startTime:"",endTime:"",categoryIds:[]});
  const submit=()=>{addEvent(form); onClose();};
  return (<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/><ModalContent>
      <ModalHeader>Add Event</ModalHeader>
      <ModalBody>
        {["title","description","image","startTime","endTime"].map(k=>
          <Input key={k} placeholder={k} mb={2} onChange={e=>set({...form,[k]:e.target.value})}/>)}
        <Stack>
          {categories.map(c=><Checkbox key={c.id} onChange={e=>set(f=>({...f,categoryIds:e.target.checked?[...f.categoryIds,c.id]:f.categoryIds.filter(i=>i!==c.id)}))}>{c.name}</Checkbox>)}
        </Stack>
      </ModalBody>
      <ModalFooter><Button onClick={submit}>Save</Button></ModalFooter>
    </ModalContent>
  </Modal>);
}