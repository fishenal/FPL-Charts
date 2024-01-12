import React from "react";

export const Nav = () => {
  return (
    <ul className="p-2 text-slate-200">
      <li className="pt-4 text-xl">User Performance</li>
      <li className="pl-4">
        <a href="#" className="hover:text-yellow-100">
          Points
        </a>
      </li>
      <li className="pl-4">
        <a href="#" className="hover:text-yellow-100">
          Rank
        </a>
      </li>
      <li className="pl-4">
        <a href="#" className="hover:text-yellow-100">
          Team Value
        </a>
      </li>
      <li className="pl-4">
        <a href="#" className="hover:text-yellow-100">
          Transfer
        </a>
      </li>
      <li className="pt-4">
        <a href="#" className="text-xl hover:text-yellow-100">
          Player Performance
        </a>
      </li>
      <li className="pt-4">
        <a href="#" className="text-xl hover:text-yellow-100">
          Team Performance
        </a>
      </li>
    </ul>
  );
};
