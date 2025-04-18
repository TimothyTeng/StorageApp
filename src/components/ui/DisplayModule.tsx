import { Box, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import VisualLocationFinder from "./VisualLocationFinder";
import ItemTable from "./ItemTable";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

function DisplayModule() {
  let data: { [key: string]: number[][] } = {
    MS: [
      [0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
      [2, 2, 0, 0, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0, 0],
      [2, 2, 0, 0, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0, 1],
      [2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 0, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0],
    ],
    PS: [
      [0, 1, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0],
      [2, 2, 0, 0, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0],
      [2, 2, 0, 0, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0],
      [2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  };
  let itemData = [
    {
      Name: "Jerry Can",
      Quantity: "2",
      Status: "Avaliable",
      Store: "MS",
      Location: "4,0",
    },
    {
      Name: "GS Table",
      Quantity: "2",
      Status: "In use",
      Store: "PS",
      Location: "5,0",
    },
  ];
  let [focus, setFocus] = useState<string>();
  const [nameQuery, setNameQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [storeNames, setStoreNames] = useState(["MS", "PS"]);
  const [currentStore, setCurrentStore] = useState("MS");
  const filteredItems = itemData.filter((item) =>
    item.Name.toLowerCase().includes(nameQuery.toLowerCase())
  );
  let filterLocation = filteredItems.filter((item) =>
    item.Location.toLowerCase().includes(locationQuery.toLowerCase())
  );
  filterLocation = filterLocation.filter((item) =>
    item.Store.toLowerCase().includes(currentStore.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <Box marginX={10}>
      <Grid
        templateAreas={{
          base: `"visual" "list"`,
          lg: `"visual list"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "500px 1fr",
        }}
      >
        <GridItem area="visual" paddingX={10}>
          <VStack paddingBottom={5}>
            <HStack justifyContent={"space-between"} width="90%">
              <Text>My Inventory</Text>
              <HStack>
                <Text>Current Store:</Text>
                <Dropdown
                  stores={storeNames}
                  current={currentStore}
                  OnClick={(val) => {
                    if (
                      val ==
                      "2e7278109f05b6ddc223f3c0687aa253aeafca41fd450405a81b8e811e300cd2022de881171e89c0d3e8857823caae386c0be88be94d7db343caf08f7a48be02"
                    ) {
                      navigate("/addstore");
                    } else {
                      setCurrentStore(val);
                    }
                  }}
                ></Dropdown>
              </HStack>
            </HStack>
            <VisualLocationFinder
              data={data[currentStore]}
              focus={focus}
              OnClick={(location) => {
                if (focus == location.toString()) {
                  setLocationQuery("");
                  setFocus(undefined);
                } else {
                  setLocationQuery(location.toString());
                  setFocus(location.toString());
                }
              }}
            ></VisualLocationFinder>
          </VStack>
        </GridItem>
        <GridItem area="list">
          <SearchBar onSearch={(text) => setNameQuery(text)}></SearchBar>
          <ItemTable
            items={filterLocation}
            OnClick={(item) => {
              setFocus(item.Location.toString());
            }}
          ></ItemTable>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default DisplayModule;
