import styles from './styles.module.scss';

interface Props {
  fund?: FundType;
}

export default function Item({ fund }: Props) {
  return (
    <div className={styles.item}>
      <h2 className={`${styles.title} typo h3`}>
        {fund?.ticker ?? 'undefined ticker'}
      </h2>
      <p className='typo p1'>{fund?.explains ?? 'empty explains'}</p>
    </div>
  );
}
