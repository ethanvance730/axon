import { useEffect, useState } from 'react';
import {
  AppRoute,
  ROUTE_CHANGE_EVENT,
  ROUTES,
  navigateTo,
  normalizeRoute,
} from './utils/router';
import { applyRouteMetadata } from './utils/metadata';
import { AgencyPage } from './pages/agency/AgencyPage';
import { NorthfieldDentalPage } from './pages/clinics/NorthfieldDentalPage';
import { MaisonAestheticsPage } from './pages/clinics/MaisonAestheticsPage';
import { WillowbrookMedicalPage } from './pages/clinics/WillowbrookMedicalPage';
import { ApexPhysiotherapyPage } from './pages/clinics/ApexPhysiotherapyPage';

function resolveCurrentRoute(): AppRoute | null {
  if (typeof window === 'undefined') return ROUTES.AGENCY;
  return normalizeRoute(window.location.pathname);
}

export default function App() {
  const [route, setRoute] = useState<AppRoute | null>(() => resolveCurrentRoute());

  useEffect(() => {
    const syncRoute = () => {
      setRoute(resolveCurrentRoute());
    };
    window.addEventListener('popstate', syncRoute);
    window.addEventListener(ROUTE_CHANGE_EVENT, syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener(ROUTE_CHANGE_EVENT, syncRoute);
    };
  }, []);

  useEffect(() => {
    if (route) {
      applyRouteMetadata(route);
    } else if (typeof document !== 'undefined') {
      document.title = 'Page Not Found — Axon.';
    }
  }, [route]);

  if (route === ROUTES.AGENCY) {
    return <AgencyPage />;
  }

  if (route === ROUTES.NORTHFIELD_DENTAL) {
    return <NorthfieldDentalPage />;
  }

  if (route === ROUTES.MAISON_AESTHETICS) {
    return <MaisonAestheticsPage />;
  }

  if (route === ROUTES.WILLOWBROOK_MEDICAL) {
    return <WillowbrookMedicalPage />;
  }

  if (route === ROUTES.APEX_PHYSIOTHERAPY) {
    return <ApexPhysiotherapyPage />;
  }

  return (
    <main className="min-h-screen bg-[#F7F6F3] text-[#111111] font-agency-body flex flex-col items-center justify-center px-6 text-center gap-6">
      <p className="text-xs font-agency-mono text-[#E12D39]">404 · Route Not Found</p>
      <h1 className="font-agency-display text-3xl sm:text-4xl font-bold">
        That page could not be found.
      </h1>
      <p className="text-sm text-neutral-600 max-w-md">
        Return to the Axon Digital homepage or open one of our four UK clinic demonstration websites.
      </p>
      <button
        type="button"
        onClick={() => navigateTo(ROUTES.AGENCY)}
        className="px-6 py-3 bg-[#111111] text-white text-sm font-medium hover:bg-[#E12D39] transition-colors cursor-pointer"
      >
        Return to Axon. Home
      </button>
    </main>
  );
}
