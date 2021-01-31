import { useContext } from 'react';
import { AppContext } from '../../src/contexts/AppContext';
import PageLayout from '../../src/components/PageLayout';
import ArtistSearchForm from '../../src/components/ArtistSearchForm';
import ArtistGenreQuiz from '../../src/components/ArtistGenreQuiz';

/**
 * Choose an Artist page component.
 */
function ChooseArtist() {
  const appContext = useContext(AppContext);

  const reset = () => {
    appContext.setArtist(null);
  }

  return (
    <PageLayout title="Choose an Artist">
      { appContext.artist !== null &&
        <button onClick={reset}>Reset</button>
      }


      {/* Show artist search if no artist is set,
          or the ArtistGenreQuiz if it is.
       */}
      {appContext.artist === null ? (
        <ArtistSearchForm />
      ) : (
        <ArtistGenreQuiz accessToken={appContext.accessToken} artist={appContext.artist} />
      )}
    </PageLayout>
  )
}

export default ChooseArtist;
