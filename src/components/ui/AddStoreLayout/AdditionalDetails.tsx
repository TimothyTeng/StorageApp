import { Button, Card } from "@chakra-ui/react";
import { RiMailLine } from "react-icons/ri";

interface Props {
  OnClick: () => void;
}

function AdditionalDetails({ OnClick }: Props) {
  return (
    <Card.Root>
      <Card.Header />
      <Card.Body>
        <Button colorPalette="teal" variant="solid" onClick={OnClick}>
          <RiMailLine /> Save Layout
        </Button>
      </Card.Body>
      <Card.Footer />
    </Card.Root>
  );
}

export default AdditionalDetails;
