import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import VisualLocationFinder from "../VisualLocationFinder";
import SizeSlider from "./SizeSlider";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import GridTypeSelector from "./GridTypeSelector";
import AdditionalDetails from "./AdditionalDetails";
import { useAxios } from "../hooks/useData";

function VisualLocationAdder() {
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);
  const [grid, setGrid] = useState(generateGrid(1, 1));
  const [name, setName] = useState("");
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
  function updateGrid(rows: number, cols: number) {
    const prevGrid = [...grid];
    const prevCols = prevGrid.length;
    const prevRows = prevGrid[0].length;
    const newGrid = [];
    for (let y = 0; y < rows; y++) {
      const temp = [];
      for (let x = 0; x < cols; x++) {
        if (y < prevCols && x < prevRows) {
          temp.push(prevGrid[y][x]);
        } else {
          temp.push(0);
        }
      }
      newGrid.push(temp);
    }
    return newGrid;
  }
  generateGrid(row, col);
  useEffect(() => {
    setGrid(updateGrid(row, col));
  }, [row, col]);

  const updateCell = (coordStr: string, newValue: number) => {
    const [colIndex, rowIndex] = coordStr.split(",").map(Number);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const newRow = [...newGrid[rowIndex]];
      newRow[colIndex] = newValue;
      newGrid[rowIndex] = newRow;
      return newGrid;
    });
  };

  const { post } = useAxios();
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  const handleClick = (grid: number[][], name: string) => {
    post("/addlayout", { Grid: grid, Name: name })
      .then((data) => setResponseMsg(data.message))
      .catch((err) => console.error("Post error", err));
  };

  return (
    <Box marginX={10}>
      <Grid
        templateAreas={{
          base: `
      "title title"
      "slider slider"
      "visual visual"
      "picker picker"
      "details details"
    `,
          lg: `
    "title title title"
    "visual slider slider"
    "visual picker picker"
    "visual details details"
  `,
        }}
        templateColumns={{
          base: "1fr 1fr",
          lg: "500px 1fr",
        }}
        templateRows={{
          base: "1fr 1fr",
          lg: "1fr",
        }}
        rowGap={5}
        columnGap={6}
      >
        <GridItem area="title">
          <InputBox OnChange={(res) => setName(res.toString())}>
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
          <VisualLocationFinder
            data={grid}
            OnClick={(location) => {
              updateCell(location, 1);
            }}
          />
        </GridItem>

        <GridItem area="picker">
          <GridTypeSelector />
        </GridItem>
        <GridItem area="details">
          <AdditionalDetails OnClick={() => handleClick(grid, name)} />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default VisualLocationAdder;
