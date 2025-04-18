import { Box } from "@chakra-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface Props {
  data: number[][];
  focus?: string;
  OnClick: (Location: string) => void;
}

function VisualLocationFinder({ data, focus, OnClick }: Props) {
  const numRows = data.length;
  const numCols = data[0]?.length || 0;

  const containerWidth = 450;
  const containerHeight = 450;
  const maxCells = 15;

  const shouldZoom = numCols > maxCells || numRows > maxCells;
  const cellSize = Math.floor(
    Math.min(
      containerWidth / Math.max(numCols, maxCells),
      containerHeight / Math.max(numRows, maxCells)
    )
  );

  const grid = (
    <Box
      maxWidth={`${cellSize * numCols}px`}
      maxHeight={`${cellSize * numRows}px`}
      display="grid"
      gridTemplateColumns={`repeat(${numCols}, ${cellSize}px)`}
      gridTemplateRows={`repeat(${numRows}, ${cellSize}px)`}
      boxSizing="content-box"
    >
      {data.map((col, y) =>
        col.map((value, x) => (
          <Box
            key={`${x},${y}`}
            id={`${x},${y}`}
            onClick={() => OnClick(`${x},${y}`)}
            width={`${cellSize}px`}
            maxHeight={`${cellSize}px`}
            backgroundColor={
              focus && `${x},${y}` === focus
                ? "gray.200"
                : value === 0
                ? "gray.900"
                : "gray.700"
            }
            border="1px solid gray"
            cursor="pointer"
          />
        ))
      )}
    </Box>
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      width="100%"
    >
      {shouldZoom ? (
        <Box
          maxWidth={`${containerWidth}px`}
          maxHeight={`${containerHeight}px`}
          overflow="hidden"
        >
          <TransformWrapper
            centerOnInit
            centerZoomedOut={false}
            initialScale={1}
            minScale={1}
            limitToBounds
            disablePadding
            wheel={{
              disabled: false,
              touchPadDisabled: false,
              activationKeys: [],
            }}
          >
            <TransformComponent>{grid}</TransformComponent>
          </TransformWrapper>
        </Box>
      ) : (
        // No zoom — just display grid sized to content
        grid
      )}
    </Box>
  );
}

export default VisualLocationFinder;
