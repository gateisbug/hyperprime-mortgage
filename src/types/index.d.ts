type SetStateType<T> = (value: T | ((prev: T) => T)) => void;
// type StateType<T> = [T, SetStateType<T>];
type OnClickType = () => void;

interface FundType {
  ticker?: string;
  explains?: string;
}
