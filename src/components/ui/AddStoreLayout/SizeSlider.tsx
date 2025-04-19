import { HStack, Slider } from "@chakra-ui/react";

interface Props {
  Orientation: "horizontal" | "vertical";
  OnValueChange: (value: number) => void;
  children: String;
}

function SizeSlider({ Orientation, OnValueChange, children }: Props) {
  return (
    <Slider.Root
      maxW="lg"
      size={"sm"}
      defaultValue={[1]}
      onValueChange={(val) => OnValueChange(val.value[0])}
      orientation={Orientation}
      min={1}
      max={30}
      width={250}
    >
      <HStack justify="space-between">
        <Slider.Label>{children}</Slider.Label>
        <Slider.ValueText />
      </HStack>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs rounded="l1" />
      </Slider.Control>
    </Slider.Root>
  );
}

export default SizeSlider;
