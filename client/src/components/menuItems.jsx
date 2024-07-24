import React from "react";

export default function menuItems({ name, link, active }) {
  return (
    <li>
      <a
        href={link}
        className="block rounded-lg p-3 font-semibold text-sm text-gray-700"
      >
        {name}
      </a>
    </li>
  );
}
