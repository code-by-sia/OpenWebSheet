import ControlBox from "../../control-box";
import Section from "../../control-box/section";
import TODO from "../../todo";

export default function ViewMenu() {
  return (
    <ControlBox className="flex bg-white">
      <Section title="Print" className="border-r border-dotted px-1">
        <i className="fa fa-print text-4xl m-3"></i>
      </Section>
      <Section title="Layout" className="flex-1">
        <TODO
          issueNumber={49}
          title="Add layout section items in the View menu"
        />
      </Section>
    </ControlBox>
  );
}
