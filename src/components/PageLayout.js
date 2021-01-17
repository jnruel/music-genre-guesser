
import Head from 'next/head';
import styles from '../styles/PageLayout.module.css';
// import styles from '../styles/GenreQuiz.module.scss';

export default function PageLayout(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Music Genre Guesser</h1>
        <div>{props.children}</div>
      </main>

      <footer className={styles.footer}>
        todo
      </footer>
    </div>
  );
}
