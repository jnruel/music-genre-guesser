import Head from 'next/head';
import styles from '../src/styles/Home.module.css';
import ArtistSearchForm from '../src/components/ArtistSearchForm';
import ArtistGenreQuiz from '../src/components/ArtistGenreQuiz';
import { useContext, useEffect } from 'react';
import { AppContext } from '../src/contexts/AppContext';

function Home() {
  const appContext = useContext(AppContext);

  // // Handle when artist context gets set.
  // useEffect(() => {
  //   if (appContext.artist !== null) {
  //     // TODO.
  //     console.log(appContext.artist);
  //   }
  // }, [appContext]);

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
        <ArtistSearchForm />

        {appContext.artist !== null &&
          <ArtistGenreQuiz accessToken={appContext.accessToken} artist={appContext.artist} />
        }
      </main>

      <footer className={styles.footer}>
        todo
      </footer>
    </div>
  )
}


export default Home;
