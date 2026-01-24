import { IconButton,useColorMode } from "@chakra-ui/react";
import { MoonIcon,SunIcon } from "@chakra-ui/icons";
export default function ColorModeToggle(){
  const {colorMode,toggleColorMode}=useColorMode();
  return <IconButton aria-label="toggle" onClick={toggleColorMode} icon={colorMode==='dark'?<SunIcon/>:<MoonIcon/>}/>;
}