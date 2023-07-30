import classnames from "classnames";
import { useState } from "react";

export default function FormulaBar({
  label = "",
  value,
  onChange,
  onAbort,
  onCommit,
}) {
  const [active, setActive] = useState(false);
  return (
    <div className="border-y flex items-center">
      <input
        type="text"
        className="w-16 text-md text-center p-1"
        placeholder="??"
        value={label}
      />
      <div className="flex items-center gap-2 px-3 py-1.5 font-bolder text-small border-l">
        <span className="flex gap-2 items-center text-xs text-gray-600 cursor-pointer">
          <i
            className={classnames("fa fa-times cancel", {
              "text-red-700 hover:text-red-600": active,
            })}
            onClick={onAbort}
          />
          <i
            className={classnames("fa fa-check commit", {
              "text-green-700 hover:text-green-600": active,
            })}
            onClick={onCommit}
          />
        </span>
        <span className="font-black text-md">𝑓𝑥</span>
      </div>
      <input
        id="formula-input"
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={(_) => setActive(true)}
        onBlur={(_) => setActive(false)}
        className="flex-1 border-l px-1"
      />
      <div className="text-neutral-300 mx-2">
        <i className="fas fa-angle-down"></i>
      </div>
    </div>
  );
}
