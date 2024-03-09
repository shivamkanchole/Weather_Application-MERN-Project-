import React from "react";

function Input({
  id="",
  name="",
  placeholder="Search City",
  className = "w-96 border-2 border-black rounded-2xl p-6",
  ...props
}) {
  return (
    <input type="text" id={`${id}`} name={`${name}`} placeholder={`${placeholder}`+" City"} className={`${className}`} {...props} />
  )
}

export { Input };
