import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link to={url} className="flex flex-col h-full items-center bg-blue-600 text-white p-5 rounded-lg gap-3">
        {icon}
        {name}
    </Link>
  );
};

export default ModuleBtn;
