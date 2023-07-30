import ControlBox from "../../control-box";
import Section from "../../control-box/section";
import TODO from "../../todo";

export default function DataMenu() {
  return (
    <ControlBox className="flex bg-white">
      <Section title="File" className="border-r border-dotted px-1">
        <i className="fa fa-file-excel text-4xl m-3"></i>
      </Section>
      <Section title="Open Office" className="flex-1">
        <TODO title="Add open office impl" />
      </Section>
      <Section title="Connectors" className="flex-1">
        <TODO title="Add connectors menu" />
      </Section>
    </ControlBox>
  );
}
