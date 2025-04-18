import { Table } from "@chakra-ui/react";

export interface ItemData {
  Name: String;
  Quantity: String;
  Status: String;
  Store: String;
  Location: String;
}

interface Props {
  items: ItemData[];
  OnClick: (item: ItemData) => void;
}

function ItemTable({ items, OnClick }: Props) {
  return (
    <Table.Root interactive>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Quantity</Table.Cell>
          <Table.Cell>Status</Table.Cell>
          <Table.Cell>Delete?</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item, ind) => (
          <Table.Row onClick={() => OnClick(item)} key={ind}>
            <Table.Cell>{item.Name}</Table.Cell>
            <Table.Cell>{item.Quantity}</Table.Cell>
            <Table.Cell>{item.Status}</Table.Cell>
            <Table.Cell>Delete?</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default ItemTable;
