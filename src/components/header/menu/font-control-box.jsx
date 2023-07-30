import classNames from "classnames";
import ControlBox from "../../control-box";
import Section from "../../control-box/section";
import DropDown from "../../drop-down";

const KLASS =
  "p-1 w-6 text-center cursor-pointer bg-gradient-to-b from-white to-neutral-100";

function FontStyle({ value, onChange }) {
  return (
    <div className="flex">
      <span className={classNames(KLASS, "rounded-l border-l border-y")}>
        B
      </span>
      <span className={classNames(KLASS, "border")}>I</span>
      <span className={classNames(KLASS, "rounded-r border-r border-y")}>
        U
      </span>
    </div>
  );
}

export default function FontControlBox() {
  return (
    <ControlBox className="flex bg-white">
      <Section
        title="font"
        className="flex-1 border-r border-dotted"
        contentClassName="flex-col gap-2 p-2"
      >
        <div className="flex gap-2">
          <DropDown options={["Courier", "Tahoma"]} />
          <DropDown options={["1px", "2px"]} />
        </div>
        <div className="flex gap-2">
          <FontStyle />
        </div>
      </Section>
      <Section title="format" className="flex-1"></Section>
    </ControlBox>
  );
}
