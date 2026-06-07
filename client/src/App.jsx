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
    <div className="flex items-center justify-center h-full p-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-on-surface-variant font-mono">Loading subsystem...</span>
      </div>
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
      case 'directory': return <DirectoryPage />;
      case 'faculty': return <FacultyPage />;
      case 'campus': return <CampusLife />;
      case 'governance': return <GovernancePage />;
      case 'clubs': return <ClubDirectory onSelectClub={(id) => handleNavigate('club-detail', { clubId: id })} />;
      case 'club-detail': return <ClubPage clubId={clubId} onBack={() => handleNavigate('clubs')} />;
      case 'titles': return <TitlesPage />;
      case 'leaderboard': return <LeaderboardPage />;
      case 'messaging': return <MessagingPage />;
      case 'resume': return <ResumeBuilder />;
      case 'books': return <BookSuggestions />;
      case 'resources': return <PracticalResources />;
      default: return <DirectoryPage />;
    }
  };

  return (
    <AuthProvider>
      <SocketProvider>
        <div className="min-h-screen bg-surface-dim">
          <div className="scanline-overlay" />
          <Navbar activeTab={activeTab} onNavigate={handleNavigate} />
          <main className="md:ml-64 pt-16 min-h-screen p-4 md:p-6 lg:p-8 relative z-10">
            <div className="max-w-[1440px] mx-auto">
              <Suspense fallback={<LoadingFallback />}>
                {renderPage()}
              </Suspense>
            </div>
          </main>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}
