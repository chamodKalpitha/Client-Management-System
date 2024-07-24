import React from "react";

export default function ErrorAlert({ errorList }) {
  console.log(errorList);
  return (
    <div className="mb-4">
      <div
        role="alert"
        className="rounded border-s-4 border-red-500 bg-red-50 p-4"
      >
        <strong className="block font-medium text-red-800 mb-2">
          Something went wrong
        </strong>

        {errorList.map((error, index) => (
          <div className="flex gap-1 items-center" key={index}>
            <span className="material-symbols-rounded text-red-700 text-base font-medium">
              error
            </span>
            <p className=" text-sm text-red-700">{error}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
