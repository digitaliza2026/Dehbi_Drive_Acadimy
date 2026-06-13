import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import AdminLayout from './admin/AdminLayout';

// Public pages — loaded on demand, never bundled into the initial chunk
const Home = lazy(() => import('./pages/Home'));
const Formations = lazy(() => import('./pages/Formations'));
const Etablissements = lazy(() => import('./pages/Etablissements'));
const Reservation = lazy(() => import('./pages/Reservation'));
const Galerie = lazy(() => import('./pages/Galerie'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));

// Admin pages — separate chunks so admin code never ships to public visitors
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminHero = lazy(() => import('./admin/pages/AdminHero'));
const AdminFormations = lazy(() => import('./admin/pages/AdminFormations'));
const AdminEtablissements = lazy(() => import('./admin/pages/AdminEtablissements'));
const AdminTemoignages = lazy(() => import('./admin/pages/AdminTemoignages'));
const AdminGalerie = lazy(() => import('./admin/pages/AdminGalerie'));
const AdminCreneaux = lazy(() => import('./admin/pages/AdminCreneaux'));
const AdminReservations = lazy(() => import('./admin/pages/AdminReservations'));
const AdminMessages = lazy(() => import('./admin/pages/AdminMessages'));
const AdminSettings = lazy(() => import('./admin/pages/AdminSettings'));

function ChunkLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      <div className="w-10 h-10 border-4 border-brand-200 border-t-gold-500 rounded-full animate-spin" />
    </div>
  );
}

function PublicSite() {
  return (
    <Layout>
      <PageTransition>
        <Suspense fallback={<ChunkLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/etablissements" element={<Etablissements />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </Layout>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <SettingsProvider>
      <AuthProvider>
        {isAdmin ? (
          <Suspense fallback={<ChunkLoader />}>
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/hero" element={<AdminLayout><AdminHero /></AdminLayout>} />
              <Route path="/admin/formations" element={<AdminLayout><AdminFormations /></AdminLayout>} />
              <Route path="/admin/etablissements" element={<AdminLayout><AdminEtablissements /></AdminLayout>} />
              <Route path="/admin/temoignages" element={<AdminLayout><AdminTemoignages /></AdminLayout>} />
              <Route path="/admin/galerie" element={<AdminLayout><AdminGalerie /></AdminLayout>} />
              <Route path="/admin/creneaux" element={<AdminLayout><AdminCreneaux /></AdminLayout>} />
              <Route path="/admin/reservations" element={<AdminLayout><AdminReservations /></AdminLayout>} />
              <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
              <Route path="/admin/parametres" element={<AdminLayout><AdminSettings /></AdminLayout>} />
            </Routes>
          </Suspense>
        ) : (
          <PublicSite />
        )}
      </AuthProvider>
    </SettingsProvider>
  );
}
