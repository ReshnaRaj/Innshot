import React from "react";
// import { SiGooglechat } from "react-icons/si";
 
// import { Link } from "react-router-dom";

const Headerr = ({ name }) => {
  return (
    <div className="flex-1">
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="flex items-center">
        {/* <Link to='/chatwithuser'>Chat
          <SiGooglechat className="text-2xl text-info" />
          </Link> */}
        </div>
      </header>
    </div>
  );
};

export default Headerr;
