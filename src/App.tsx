import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './components/pages/HomePage';
import CouplePage from './components/pages/CouplePage';
import GalleryPage from './components/pages/GalleryPage';
import SchedulePage from './components/pages/SchedulePage';
import LocationPage from './components/pages/LocationPage';
import WishesPage from './components/pages/WishesPage';
import GuestBookPage from './components/pages/GuestBookPage';
import { Web3Provider } from './contexts/Web3Context';
import { NotificationProvider } from './contexts/NotificationContext';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <NotificationProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/couple" element={<CouplePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/wishes" element={<WishesPage />} />
              <Route path="/guestbook" element={<GuestBookPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </NotificationProvider>
    </Web3Provider>
  );
}

export default App;
