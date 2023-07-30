import Link from "../link";
const CLASSNAME =
  "flex gap-2 flex-1 items-center bg-orange-100 p-2 m-3 rounded hover:shadow-lg border group italic";
export default function TODO({ issueNumber, title }) {
  if (!issueNumber) {
    return (
      <div className={CLASSNAME}>
        <small className="font-black text-gray-400">TODO</small>
        <span className="group-hover:underline">{title}</span>
      </div>
    );
  }

  return (
    <Link
      style="custom"
      className={CLASSNAME}
      href={`https://github.com/code-by-sia/OpenWebSheet/issues/${issueNumber}`}
      target="_blank"
    >
      <small className="font-black text-gray-400">TODO</small>
      <i className="fab fa-github text-sm" />
      <span className="group-hover:underline">{title}</span>
      <strong>#{issueNumber}</strong>
    </Link>
  );
}
