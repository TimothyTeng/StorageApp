import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import VisualLocationFinder from "./VisualLocationFinder";
import SizeSlider from "./SizeSlider";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";

function VisualLocationAdder() {
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);
  const [grid, setGrid] = useState(generateGrid(1, 1));
  function generateGrid(rows: number, cols: number) {
    const newGrid = [];
    for (let y = 0; y < rows; y++) {
      const temp = [];
      for (let x = 0; x < cols; x++) {
        temp.push(0);
      }
      newGrid.push(temp);
    }
    return newGrid;
  }
  useEffect(() => {
    setGrid(generateGrid(row, col));
  }, [row, col]);

  return (
    <Box marginX={10}>
      <Grid
        templateAreas={{
          base: `
      "title title"
      "slider slider"
      "visual visual"
      "picker details"
    `,
          lg: `
    "title title title"
    "visual slider slider"
    "visual picker detail"
  `,
        }}
        templateColumns={{
          base: "1fr 1fr",
          lg: "500px 1fr",
        }}
        rowGap={5}
        columnGap={6}
      >
        <GridItem area="title">
          <InputBox onSearch={(res) => console.log(res)}>
            Input store name...
          </InputBox>
        </GridItem>
        <GridItem area="slider">
          <Box>
            <HStack justifyContent={"space-between"}>
              <SizeSlider
                Orientation="horizontal"
                OnValueChange={(val) => {
                  setRow(val);
                }}
              >
                Rows
              </SizeSlider>
              <SizeSlider
                Orientation="horizontal"
                OnValueChange={(val) => {
                  setCol(val);
                }}
              >
                Columns
              </SizeSlider>
            </HStack>
          </Box>
        </GridItem>
        <GridItem area="visual">
          <VisualLocationFinder data={grid} OnClick={() => console.log("0")} />
        </GridItem>

        <GridItem area="picker">
          <h1>pi</h1>
        </GridItem>
        <GridItem area="details">
          <h1>de</h1>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default VisualLocationAdder;
