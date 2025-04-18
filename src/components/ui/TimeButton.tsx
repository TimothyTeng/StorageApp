import { useEffect, useState } from "react";

function TimeButton() {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurr(data.time);
      });
  }, []);
  return (
    <div>
      <p>The current time is {curr}</p>
    </div>
  );
}

export default TimeButton;
