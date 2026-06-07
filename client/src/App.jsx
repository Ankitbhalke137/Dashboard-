import { useState, Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/layout/Navbar';

const DirectoryPage = lazy(() => import('./components/directory/DirectoryPage'));
const FacultyPage = lazy(() => import('./components/faculty/FacultyPage'));
const CampusLife = lazy(() => import('./components/campus/CampusLife'));
const GovernancePage = lazy(() => import('./components/governance/GovernancePage'));
const ClubDirectory = lazy(() => import('./components/clubs/ClubDirectory'));
const ClubPage = lazy(() => import('./components/clubs/ClubPage'));
const TitlesPage = lazy(() => import('./components/titles/TitlesPage'));
const LeaderboardPage = lazy(() => import('./components/leaderboard/LeaderboardPage'));
const MessagingPage = lazy(() => import('./components/messaging/MessagingPage'));
const ResumeBuilder = lazy(() => import('./components/resume/ResumeBuilder'));
const BookSuggestions = lazy(() => import('./components/resources/BookSuggestions'));
const PracticalResources = lazy(() => import('./components/resources/PracticalResources'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="neon-text text-lg animate-pulse">Loading...</div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('directory');
  const [clubId, setClubId] = useState(null);

  const handleNavigate = (tab, params) => {
    setActiveTab(tab);
    if (params?.clubId) setClubId(params.clubId);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'directory':
        return <DirectoryPage />;
      case 'faculty':
        return <FacultyPage />;
      case 'campus':
        return <CampusLife />;
      case 'governance':
        return <GovernancePage />;
      case 'clubs':
        return <ClubDirectory onSelectClub={(id) => handleNavigate('club-detail', { clubId: id })} />;
      case 'club-detail':
        return <ClubPage clubId={clubId} onBack={() => handleNavigate('clubs')} />;
      case 'titles':
        return <TitlesPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'messaging':
        return <MessagingPage />;
      case 'resume':
        return <ResumeBuilder />;
      case 'books':
        return <BookSuggestions />;
      case 'resources':
        return <PracticalResources />;
      default:
        return <DirectoryPage />;
    }
  };

  return (
    <AuthProvider>
      <SocketProvider>
        <div className="flex h-screen bg-dark-500 overflow-hidden">
          <div className="scanline" />
          <Navbar activeTab={activeTab} onNavigate={handleNavigate} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Suspense fallback={<LoadingFallback />}>
              {renderPage()}
            </Suspense>
          </main>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}
