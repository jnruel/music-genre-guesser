import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getAccessToken } from '../providers/authProvider';

function Home() {    
  // Retrieve access token from context;
  let accessToken = getAccessToken();

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
      </main>

      <footer className={styles.footer}>
        todo
      </footer>
    </div>
  )
}

export default Home;
