import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../ui/NavBar";
import DisplayModule from "../ui/DisplayModule";

function Inventory() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
      templateColumns={{
        base: `"1fr"`,
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>
      <GridItem area="main">
        <DisplayModule />
      </GridItem>
    </Grid>
  );
}

export default Inventory;
