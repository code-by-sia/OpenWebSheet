import classNames from "classnames";

const CLASSNAME =
  "border p-1 rounded bg-gradient-to-b from-white to-neutral-100";

export default function DropDown({ options, className, value, onChange }) {
  return (
    <select
      className={classNames(CLASSNAME, className)}
      value={value}
      onChange={(e) => onChange && onchange(e.target.value)}
    >
      {options &&
        options.map((option, index) => <option key={index}>{option}</option>)}
    </select>
  );
}
