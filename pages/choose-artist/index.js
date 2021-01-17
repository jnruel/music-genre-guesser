import Head from 'next/head';
import styles from '../../src/styles/Home.module.css';
import ArtistSearchForm from '../../src/components/ArtistSearchForm';
import ArtistGenreQuiz from '../../src/components/ArtistGenreQuiz';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../src/contexts/AppContext';

function ChooseArtist() {
  const appContext = useContext(AppContext);

  const reset = () => {
    appContext.setArtist(null);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Choose Artist | Music Genre Guesser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Music Genre Guesser
        </h1>
        <button onClick={reset}>reset artist</button>

        {appContext.artist !== null ? (
          <ArtistGenreQuiz accessToken={appContext.accessToken} artist={appContext.artist} />
        ) : (
          <ArtistSearchForm />
        )}
      </main>

      <footer className={styles.footer}>
        todo
      </footer>
    </div>
  )
}

export default ChooseArtist;
