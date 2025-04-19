import { Button, Card, HStack, VStack } from "@chakra-ui/react";
import { RiMailLine } from "react-icons/ri";

function GridTypeSelector() {
  return (
    <>
      <Card.Root>
        <Card.Body>
          <HStack justifyContent={"space-between"}>
            <Button colorPalette="teal" variant="solid" width="30%">
              <RiMailLine /> Email
            </Button>
            <Button colorPalette="teal" variant="solid" width="30%">
              <RiMailLine /> Email
            </Button>
            <Button colorPalette="teal" variant="solid" width="30%">
              <RiMailLine /> Email
            </Button>
          </HStack>
        </Card.Body>
      </Card.Root>
    </>
  );
}

export default GridTypeSelector;
