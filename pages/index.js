// import styles from '../src/styles/Home.module.css';
import Link from 'next/link';
import PageLayout from '../src/components/PageLayout';

function Home() {
  return (
    <PageLayout title="Music Genre Guesser">
      <Link href="/choose-artist">
        <a>Choose an Artist</a>
      </Link>
    </PageLayout>
  )
}

export default Home;
