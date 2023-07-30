import classNames from "classnames";

export default function ControlBox({ className = "bg-white", children }) {
  return (
    <div className={classNames("border rounded shadow", className)}>
      {children}
    </div>
  );
}
