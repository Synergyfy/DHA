import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { GUIDES } from './oralHealthGuides';
import { PublicSiteHeader } from './PublicSiteHeader';

/**
 * Full-page view of a single oral health guide.
 * Route: `/oral-health-guides/:guideId`
 *
 * The landing page's "Read Guide" cards deep-link straight into a specific
 * guide here instead of the guide list.
 */
export const OralHealthGuideDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { guideId } = useParams<{ guideId: string }>();
  const guide = GUIDES.find((item) => item.id === guideId);

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
        <PublicSiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full text-center rounded-2xl bg-white border border-[#eaedff] p-10 shadow-sm">
            <Icon name="search_off" className="text-[36px] text-[#707881] mb-3" />
            <h1 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Guide not found</h1>
            <p className="text-sm text-[#3f4850] mt-2">
              This oral health guide may have moved. Browse the full library to find the article you were looking for.
            </p>
            <button
              type="button"
              onClick={() => navigate('/oral-health-guides')}
              className="mt-5 h-11 px-6 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9]"
            >
              Browse All Guides
            </button>
          </div>
        </main>
      </div>
    );
  }

  const guideIndex = GUIDES.findIndex((item) => item.id === guide.id);
  const nextGuide = GUIDES[(guideIndex + 1) % GUIDES.length];

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
      {/* Top Header — shared public-site header */}
      <PublicSiteHeader />

      <main className="flex-1 w-full pb-16">
        {/* Article Header */}
        <section className="bg-gradient-to-b from-[#f2f3ff] to-[#faf8ff] border-b border-[#eaedff]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <button
              type="button"
              onClick={() => navigate('/oral-health-guides')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006194] hover:text-[#007bb9] mb-6 transition-colors"
            >
              <Icon name="arrow_back" className="text-[16px]" />
              <span>All Oral Health Guides</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0">
                <Icon name={guide.icon} className="text-[26px]" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#006a61] uppercase tracking-wider">
                  {guide.categoryLabel} &bull; {guide.readTime}
                </span>
                <span className="text-[11px] font-semibold text-[#707881] bg-white border border-[#eaedff] px-2.5 py-0.5 rounded-full w-fit">
                  Clinician reviewed
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight leading-snug">
              {guide.title}
            </h1>
            <p className="text-sm sm:text-base text-[#3f4850] mt-3 leading-relaxed">{guide.summary}</p>
          </div>
        </section>

        {/* Article Body */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Step-by-Step Instructions */}
          <div className="rounded-2xl bg-white border border-[#eaedff] p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Icon name="list_alt" className="text-[20px] text-[#006194]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">Clinical Step-by-Step</h2>
            </div>
            <ol className="space-y-4">
              {guide.content.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#3f4850]">
                  <span className="w-6 h-6 rounded-full bg-[#cce5ff] text-[#001d31] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Clinical Tips */}
          <div className="p-6 rounded-2xl bg-[#86f2e4]/20 border border-[#86f2e4]/40 space-y-3">
            <div className="flex items-center gap-2 text-[#005049] text-xs font-bold uppercase tracking-wider">
              <Icon name="lightbulb" className="text-[16px] text-[#006a61]" filled={true} />
              <span>Dentist Practical Tips</span>
            </div>
            <ul className="space-y-2">
              {guide.tips.map((tip, idx) => (
                <li key={idx} className="text-sm text-[#005049] flex items-start gap-2">
                  <span className="text-[#006a61] mt-0.5">&bull;</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Clinic Callout */}
          <div className="p-6 rounded-3xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                Want this reviewed by a professional?
              </h3>
              <p className="text-xs sm:text-sm text-[#3f4850] mt-1">
                Browse verified dentists and clinics across Nigeria and book a consultation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/portal/find-care')}
              className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shrink-0"
            >
              Find Care Near Me
            </button>
          </div>

          {/* Next Guide */}
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white border border-[#eaedff] p-5 shadow-sm">
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Up next</span>
              <p className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
                {nextGuide.title}
              </p>
            </div>
            <Link
              to={`/oral-health-guides/${nextGuide.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#006194] hover:text-[#007bb9] shrink-0"
            >
              <span>Read Guide</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f2f3ff] border-t border-[#eaedff] py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707881]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#006194] flex items-center justify-center text-white">
              <Icon name="dentistry" className="text-[14px]" />
            </div>
            <span className="font-semibold text-[#131b2e]">DHA Dental Health Authority</span>
          </div>
          <span>&copy; 2026 DHA. All rights reserved. Public Educational Resources.</span>
        </div>
      </footer>
    </div>
  );
};
