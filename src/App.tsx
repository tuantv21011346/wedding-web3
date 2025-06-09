import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './components/pages/HomePage';
import CouplePage from './components/pages/CouplePage';
import TimelineGalleryPage from './components/pages/TimelineGalleryPage';
import SchedulePage from './components/pages/SchedulePage';
import LocationPage from './components/pages/LocationPage';
import WishesPage from './components/pages/WishesPage';
import GuestBookPage from './components/pages/GuestBookPage';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { Web3Provider } from './contexts/Web3Context';
import { NotificationProvider } from './contexts/NotificationContext';
import './App.css';

// Debug wrapper component
const PageWrapper: React.FC<{ children: React.ReactNode; pageName: string }> = ({ children, pageName }) => {
  console.log(`Rendering page: ${pageName}`);
  
  try {
    return <ErrorBoundary>{children}</ErrorBoundary>;
  } catch (error) {
    console.error(`Error in ${pageName}:`, error);
    throw error;
  }
};

function App() {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <Web3Provider>
        <NotificationProvider>
          <Router>
            <MainLayout>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <PageWrapper pageName="HomePage">
                      <HomePage />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/couple" 
                  element={
                    <PageWrapper pageName="CouplePage">
                      <CouplePage />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/timeline-gallery" 
                  element={
                    <PageWrapper pageName="TimelineGalleryPage">
                      <TimelineGalleryPage />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/schedule" 
                  element={
                    <PageWrapper pageName="SchedulePage">
                      <SchedulePage />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/location" 
                  element={
                    <PageWrapper pageName="LocationPage">
                      <LocationPage />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/wishes" 
                  element={
                    <PageWrapper pageName="WishesPage">
                      <WishesPage />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/guestbook" 
                  element={
                    <PageWrapper pageName="GuestBookPage">
                      <GuestBookPage />
                    </PageWrapper>
                  } 
                />
              </Routes>
            </MainLayout>
          </Router>
        </NotificationProvider>
      </Web3Provider>
    </ErrorBoundary>
  );
}

export default App;
