import { useEffect, useState } from "react";
import { useAxios } from "./hooks/useData";

function TimeButton() {
  const { get, loading, error } = useAxios();
  const [curr, setCurr] = useState(null);

  useEffect(() => {
    get("/time")
      .then((data) => setCurr(data.time))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching time.</p>}
      {curr && <p>The current time is {curr}</p>}
    </div>
  );
}

export default TimeButton;
