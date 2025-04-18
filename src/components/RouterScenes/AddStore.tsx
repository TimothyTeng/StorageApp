import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../ui/NavBar";
import AddStoreDisplayModule from "../ui/AddStoreDisplayModule";

function AddStore() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>
      <GridItem area="main">
        <AddStoreDisplayModule />
      </GridItem>
    </Grid>
  );
}

export default AddStore;
