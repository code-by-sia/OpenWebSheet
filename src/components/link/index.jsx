import classNames from "classnames";

const STYLES = {
  default: "text-blue-800 italic hover:underline",
};

export default function Link({
  style = "default",
  className = "",
  href = "#",
  children,
  ...rest
}) {
  return (
    <a href={href} {...rest} className={classNames(className, STYLES[style])}>
      {children}
    </a>
  );
}
