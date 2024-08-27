import React from "react";

let inputCss =
  "w-[250px] rounded-md text-slate-400 text-lg bg-slate-800 md:w-[450px] px-4 py-1 focus:bg-slate-900 ease-in duration-100";

export default function Input({ value, type, id, error }) {
  return (
    <>
      <label className="text-lg" htmlFor="email">
        {value}
      </label>
      <input
        id={id}
        type={type}
        className={inputCss}
        placeholder={value}
        name={value}
      />
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}
