import calssnames from "classnames";

export default function MenuItem({ label = "", isActive = false, onClick }) {
  return (
    <li
      className={calssnames("cursor-pointer px-3 py-1 ", {
        "bg-white rounded-t": isActive,
        "text-white rounded mb-1 hover:bg-teal-700": !isActive,
      })}
      onClick={(_) => onClick && onClick()}
    >
      {label}
    </li>
  );
}
