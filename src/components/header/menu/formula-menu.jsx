import ControlBox from "../../control-box";
import Section from "../../control-box/section";
import TODO from "../../todo";

export default function FormulaMenu() {
  return (
    <div className="flex-1 flex   gap-2">
      <ControlBox className="flex bg-white">
        <Section title="Mathematical" className="flex-1 border-r border-dotted">
          <TODO title="Mathematical" />
        </Section>
        <Section title="Statistics" className="flex-1">
          <TODO title="Statistics" />
        </Section>
      </ControlBox>
      <ControlBox className="flex bg-white flex-1">
        <Section
          title="USER DEFINED FUNCTIONS"
          className="flex-1"
        >
          <TODO
            title="USER DEFINED FUNCTIONS"
          />
        </Section>
      </ControlBox>
    </div>
  );
}
