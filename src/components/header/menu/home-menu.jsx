import ControlBox from "../../control-box";
import Section from "../../control-box/section";
import Action from "../../action";
import FontControlBox from "./font-control-box";

export default function HomeMenu() {
  return (
    <div className="flex-1 flex gap-2">
      <ControlBox className="flex bg-white px-3">
        <Section
          title="Document"
          contentClassName="items-center gap-2 justify-center"
        >
          <Action title="XXX" />
          <Action title="YYY" />
          <Action title="ZZZZ" />
        </Section>
      </ControlBox>
      <FontControlBox />
      <ControlBox className="flex bg-white">
        <Section title="cell" className="flex-1 border-r border-dotted">
          xxx
        </Section>
        <Section title="border" className="flex-1">
          xxx
          <div className="p-10"></div>
        </Section>
      </ControlBox>
    </div>
  );
}
