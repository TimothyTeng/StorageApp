import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";

interface Props {
  OnChange: (res: String) => void;
  children: string;
}

function InputBox({ OnChange, children }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      onChange={() => {
        if (ref.current) OnChange(ref.current.value);
      }}
    >
      <InputGroup
        width="50%"
        marginBottom={4}
        startElement={<MdDriveFileRenameOutline />}
      >
        <Input borderRadius={20} placeholder={children} ref={ref} />
      </InputGroup>
    </form>
  );
}

export default InputBox;
