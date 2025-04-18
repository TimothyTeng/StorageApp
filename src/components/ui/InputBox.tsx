import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";

interface Props {
  onSearch: (res: String) => void;
  children: string;
}

function InputBox({ onSearch, children }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup
        width="60%"
        marginBottom={4}
        startElement={<MdDriveFileRenameOutline />}
      >
        <Input borderRadius={20} placeholder={children} ref={ref} />
      </InputGroup>
    </form>
  );
}

export default InputBox;
