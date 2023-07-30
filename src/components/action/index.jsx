import classNames from "classnames";

const STYLES = {
  default: "",
};
export default function Button({
  icon,
  style = "default",
  className,
  title,
  onClick,
  chilren,
}) {
  return (
    <button
      className={classNames(className, STYLES[style])}
      onClick={(e) => onClick && onClick()}
    >
      {icon}
      {title}
    </button>
  );
}
