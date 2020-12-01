import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SearchContainer from '../src/components/SearchContainer';
import { getAccessToken } from '../src/providers/authProvider'

function Home() {  
  
  const accessToken = getAccessToken();
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
        <SearchContainer accessToken={accessToken} />
      </main>

      <footer className={styles.footer}>
        todo
      </footer>
    </div>
  )
}

export default Home;
