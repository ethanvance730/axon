import { ArrowLeft } from 'lucide-react';
import { AppRoute, ROUTES, navigateTo } from '../utils/router';

interface DemoPortfolioBarProps {
  currentRoute: AppRoute;
  clinicLabel: string;
}

const DEMO_PROJECTS: { route: AppRoute; shortName: string }[] = [
  { route: ROUTES.NORTHFIELD_DENTAL, shortName: '01. Northfield Dental' },
  { route: ROUTES.MAISON_AESTHETICS, shortName: '02. Maison Aesthetics' },
  { route: ROUTES.WILLOWBROOK_MEDICAL, shortName: '03. Willowbrook Medical' },
  { route: ROUTES.APEX_PHYSIOTHERAPY, shortName: '04. Apex Physio' },
];

export function DemoPortfolioBar({ currentRoute, clinicLabel }: DemoPortfolioBarProps) {
  return (
    <div
      role="region"
      aria-label="Portfolio demonstration bar"
      className="bg-neutral-950 text-neutral-200 border-b border-neutral-800 text-xs font-agency-body"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <a
            href={ROUTES.AGENCY}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(ROUTES.AGENCY);
            }}
            className="inline-flex items-center gap-1.5 text-white hover:text-neutral-300 transition-colors font-medium whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Axon. Portfolio</span>
          </a>
          <span className="hidden sm:inline text-neutral-600" aria-hidden="true">
            |
          </span>
          <span className="hidden sm:inline text-neutral-400 truncate">
            Fictional UK Clinic Demo · {clinicLabel}
          </span>
        </div>

        <nav aria-label="Switch demo project" className="hidden lg:flex items-center gap-5">
          {DEMO_PROJECTS.map((project) => {
            const active = project.route === currentRoute;
            return (
              <a
                key={project.route}
                href={project.route}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(project.route);
                }}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'text-white font-semibold underline underline-offset-4'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {project.shortName}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
