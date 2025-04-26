import { Button, Menu, Portal } from "@chakra-ui/react";
import type { LayoutItem } from "./DisplayModule";

interface Props {
  stores: LayoutItem[];
  current: string;
  OnClick: (val: string) => void;
}

function Dropdown({ stores, current, OnClick }: Props) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {current}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {stores.map((data, ind) => (
              <Menu.Item
                value={data.Name}
                key={ind}
                onClick={() => OnClick(data.Name)}
              >
                {data.Name}
              </Menu.Item>
            ))}
            <Menu.Item
              value="New Store"
              onClick={() =>
                OnClick(
                  "2e7278109f05b6ddc223f3c0687aa253aeafca41fd450405a81b8e811e300cd2022de881171e89c0d3e8857823caae386c0be88be94d7db343caf08f7a48be02"
                )
              }
            >
              Add new item...
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default Dropdown;
