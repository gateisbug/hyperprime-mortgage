import styles from './styles.module.scss';
import Item from './Item';

interface Props {
  funds: FundType[];
}

export default function ItemList({ funds }: Props) {
  return (
    <ul className={styles.list}>
      {funds.map((v, i) => (
        <li key={i}>
          <Item fund={v} />
        </li>
      ))}
    </ul>
  );
}
