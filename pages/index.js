import Link from 'next/link';
import PageLayout from '../src/components/PageLayout';
import styles from '../src/styles/PageLayout.module.scss';

function Home() {
  return (
    <PageLayout title="Music Genre Guesser">
      <div className={styles.pageDescription}>
        Search for an artist and guess the genres listed on Spotify.
      </div>

      <nav className={styles.pageNav}>
        <ul>
          <li>
            <Link href="/choose-artist">
              <a>Choose an Artist</a>
            </Link>
          </li>
        </ul>
      </nav>

    </PageLayout>
  )
}

export default Home;
