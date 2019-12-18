export default interface Action {
  name: string;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}
