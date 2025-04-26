import { Box, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import VisualLocationFinder from "./VisualLocationFinder";
import ItemTable from "./ItemTable";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { useAxios } from "./hooks/useData";

export type LayoutItem = {
  LayoutID: number;
  LocationID: number;
  Name: string;
  Grid: number[][];
  Visible: string | null;
};

function DisplayModule() {
  const { post } = useAxios();
  const [LayoutData, setLayoutData] = useState<LayoutItem[]>([]);
  const onLoad = (LocationID: number) => {
    post("/getdata", { LocationID: LocationID })
      .then((data) => {
        let temp: LayoutItem[] = [];
        data.map((val: any) => {
          temp.push({
            LayoutID: val[0],
            LocationID: val[1],
            Name: val[2],
            Grid: JSON.parse(val[3]),
            Visible: val[4],
          });
        });
        setLayoutData(temp);
      })
      .catch((err) => console.error("Post error", err));
  };
  useEffect(() => {
    onLoad(1);
  }, []);
  let itemData = [
    {
      Name: "Jerry Can",
      Quantity: "2",
      Status: "Avaliable",
      Store: "Test1",
      Location: "4,0",
    },
    {
      Name: "GS Table",
      Quantity: "2",
      Status: "In use",
      Store: "Test2",
      Location: "5,0",
    },
  ];
  let [focus, setFocus] = useState<string>();
  const [nameQuery, setNameQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [currentStore, setCurrentStore] = useState("");
  useEffect(() => {
    if (LayoutData.length > 0) {
      setCurrentStore(LayoutData[0].Name);
    }
  }, [LayoutData]);
  const selectedLayout = LayoutData.find(
    (layout) => layout.Name === currentStore
  );
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
                  stores={LayoutData}
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
              data={selectedLayout?.Grid ?? []}
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
