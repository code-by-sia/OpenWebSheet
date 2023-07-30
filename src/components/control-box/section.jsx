import classNames from "classnames";

export default function Section({
  className = "",
  contentClassName = "",
  title = "",
  children,
}) {
  return (
    <div className={classNames(className, "flex flex-col")}>
      <div className={classNames("flex flex-1", contentClassName)}>
        {children}
      </div>
      {title && (
        <h1 className="text-center text-xs text-gray-400 pb-1 uppercase">
          {title}
        </h1>
      )}
    </div>
  );
}
