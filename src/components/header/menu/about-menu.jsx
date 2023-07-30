import ControlBox from "../../control-box";
import Section from "../../control-box/section";
import Link from "../../link";

export default function AboutMenu() {
  return (
    <ControlBox className="flex bg-white">
      <Section title="OSI" className="border-r border-dotted px-1">
        <i className="fab fa-osi text-4xl m-3 text-teal-800"></i>
      </Section>
      <Section title="About the project" className="flex-1">
        <div className="px-3 pt-3">
          Designed and developed by{" "}
          <Link href="https://siamand.cc" target="_blank">
            https://siamand.cc
          </Link>
          <br />
          3rd Parties: <strong>FontAwesome Icons</strong> &{" "}
          <strong>Google noto web font</strong> <br />
          Licence: <strong>MIT Licence</strong>
        </div>
      </Section>
    </ControlBox>
  );
}
