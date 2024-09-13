import { useState } from "react";
import { updateSubmission } from "../../services/updateSubmission";

export default function Form() {
  const [idValue, setIdValue] = useState("");
  const [fieldValue, setFieldValue] = useState("");

  return (
    <form>
      <label>
        Enter Sensor ID and Fields
        <br />
        <input
          type="text"
          onChange={(event) => setIdValue(event.target.value)}
          name="Sensor ID"
        ></input>
        <br />
        <input
          type="text"
          onChange={(event) => setFieldValue(event.target.value)}
          name="Fields"
        ></input>
        <br />
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            updateSubmission(parseInt(idValue), fieldValue);
          }}
        >
          Submit
        </button>
      </label>
    </form>
  );
}
