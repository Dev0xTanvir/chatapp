import React, { useState } from "react";

function Dark() {
  const [dark, setDark] = useState(false);
  return (
    <div className={`${dark ? "bg-black text-white" : "bg-white text-black"} h-screen`}>
      <div>
        <input
          id="abc"
          type="checkbox"
          className="dark"
          onChange={() => setDark(!dark)}
        />
        <label for="abc" className="abc">{''}</label>
        <span>{dark ? "Light" : "Dark"}</span>
      </div>
      </div>
  );
}

export default Dark;
