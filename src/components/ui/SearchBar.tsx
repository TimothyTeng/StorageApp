import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

function SearchBar({ onSearch }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onChange={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup
        startElement={<BsSearch />}
        width="94%"
        marginLeft="3%"
        marginRight="3%"
        marginBottom={4}
      >
        <Input borderRadius={20} placeholder="Search item..." ref={ref} />
      </InputGroup>
    </form>
  );
}

export default SearchBar;
