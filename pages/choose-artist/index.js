import PageLayout from '../../src/components/PageLayout';
import ArtistSearchForm from '../../src/components/ArtistSearchForm';
import ArtistGenreQuiz from '../../src/components/ArtistGenreQuiz';
import { useContext } from 'react';
import { AppContext } from '../../src/contexts/AppContext';

function ChooseArtist() {
  const appContext = useContext(AppContext);

  const reset = () => {
    appContext.setArtist(null);
  }

  return (
    <PageLayout title="Music Genre Guesser">
      <button onClick={reset}>reset artist</button>

      {appContext.artist !== null ? (
        <ArtistGenreQuiz accessToken={appContext.accessToken} artist={appContext.artist} />
      ) : (
        <ArtistSearchForm />
      )}
    </PageLayout>
  )
}

export default ChooseArtist;
