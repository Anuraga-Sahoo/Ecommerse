import React from "react";
import { PropagateLoader } from "react-spinners";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loader-container">
      {/* <PropagateLoader color="#56E7B7" loading={true} size={15} />{" "} */}
      <PulseLoader color="#36D7B7" loading={true} size={15} />
    </div>
  );
};

export default Loader;
