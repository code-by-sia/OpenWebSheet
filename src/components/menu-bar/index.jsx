import { useMemo } from "react";
import MenuItem from "./menu";

export default function MenuBar({ items = [], value = "", onChange }) {
  const Panel = useMemo(
    () => items.find((it) => it.id === value).panel,
    [items, value]
  );

  return (
    <div className="flex flex-col">
      <ul className="flex w-full gap-2 text-xs font-bold pl-6 shadow-inner px-2 pt-2 bg-teal-900">
        {items?.map((item) => (
          <MenuItem
            key={item.id}
            isActive={item.id == value}
            label={item.label}
            onClick={() => onChange && onChange(item.id)}
          />
        ))}
      </ul>
      <div className="w-full flex-1 p-3 bg-gradient-to-b from-white to-neutral-100">
        <Panel />
      </div>
    </div>
  );
}
