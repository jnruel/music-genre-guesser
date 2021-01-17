import Head from 'next/head';
import styles from '../src/styles/Home.module.css';
import Link from 'next/link';

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Music Genre Guesser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Music Genre Guesser
        </h1>

        <Link href="/choose-artist">
          <a>Choose an Artist</a>
        </Link>
      </main>

      <footer className={styles.footer}>
        todo
      </footer>
    </div>
  )
}

export default Home;
