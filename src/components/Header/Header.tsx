import styles from './styles.module.scss';

export default function Header() {
  // noinspection SpellCheckingInspection
  return (
    <header className={styles.header}>
      <div className='wrap'>
        <h1 className='typo h1'>Superprime Mortgage</h1>
      </div>
    </header>
  );
}
