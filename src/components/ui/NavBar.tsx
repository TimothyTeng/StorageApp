import { Box, Button, HStack } from "@chakra-ui/react";
import { MdOutlineStorage } from "react-icons/md";

function NavBar() {
  return (
    <HStack p={5}>
      <Box cursor={"button"}>
        <MdOutlineStorage size={25} cursor={"button"} />
      </Box>
      <Box marginLeft={4} cursor={"default"}>
        Storganiser
      </Box>
      <Box display={"block"} marginLeft={"auto"}>
        <Button variant={"outline"} size={"sm"}>
          Login
        </Button>
      </Box>
    </HStack>
  );
}

export default NavBar;
