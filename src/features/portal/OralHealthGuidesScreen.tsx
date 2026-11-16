import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { GUIDES, type GuideItem } from './oralHealthGuides';
import { PublicSiteHeader } from './PublicSiteHeader';

export const OralHealthGuidesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredGuides = useMemo<GuideItem[]>(() => {
    return GUIDES.filter((guide) => {
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        guide.title.toLowerCase().includes(q) ||
        guide.summary.toLowerCase().includes(q) ||
        guide.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
      {/* Top Header — shared public-site header */}
      <PublicSiteHeader />

      {/* Main Container */}
      <main className="flex-1 w-full pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#f2f3ff] to-[#faf8ff] py-14 sm:py-18 border-b border-[#eaedff]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
              Evidence-Based Oral Health Guides
            </h1>
            <p className="text-sm text-[#3f4850] max-w-xl leading-relaxed">
              Clinician-approved guides on preventive hygiene, pediatric dental wellness, emergency care, and treatment
              expectations tailored for Nigerian families.
            </p>

            {/* Search Input */}
            <div className="w-full max-w-md mt-4 relative">
              <Icon
                name="search"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px] pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brushing, flossing, teething, emergencies..."
                className="w-full h-12 pl-11 pr-10 rounded-2xl bg-white border border-[#eaedff] text-sm text-[#131b2e] placeholder:text-[#707881] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] hover:text-[#131b2e] p-1"
                >
                  <Icon name="cancel" className="text-[18px]" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'all', label: 'All Guides' },
              { id: 'daily-care', label: 'Daily Care & Hygiene' },
              { id: 'kids', label: 'Kids & Pediatric' },
              { id: 'emergency', label: 'Emergency First-Aid' },
              { id: 'treatments', label: 'Dental Treatments' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-white border border-[#eaedff] text-[#3f4850] hover:bg-[#f2f3ff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Guides Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <article
                  key={guide.id}
                  className="group rounded-2xl bg-white border border-[#eaedff] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#006194]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194] group-hover:scale-105 transition-transform">
                        <Icon name={guide.icon} className="text-[22px]" />
                      </span>
                      <span className="text-[11px] font-semibold text-[#707881] bg-[#f2f3ff] px-2.5 py-0.5 rounded-full">
                        {guide.readTime}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-[#006a61] uppercase tracking-wider">
                      {guide.categoryLabel}
                    </span>
                    <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1 group-hover:text-[#006194] transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[#3f4850] mt-2 leading-relaxed line-clamp-3">{guide.summary}</p>
                  </div>

                  <Link
                    to={`/oral-health-guides/${guide.id}`}
                    className="pt-4 border-t border-[#eaedff]/60 mt-4 flex items-center justify-between text-xs font-semibold text-[#006194]"
                  >
                    <span>Read Full Guide</span>
                    <Icon name="arrow_forward" className="text-[16px] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-[#eaedff] max-w-md mx-auto">
              <Icon name="search_off" className="text-[32px] text-[#707881] mb-2" />
              <h3 className="text-sm font-bold text-[#131b2e]">No guides found</h3>
              <p className="text-xs text-[#707881] mt-1">Try another keyword or select All Guides.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-semibold"
              >
                Reset Search
              </button>
            </div>
          )}
        </section>

        {/* Find Clinic Consultation Callout */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#006194] flex items-center justify-center text-white shrink-0">
                <Icon name="calendar_month" className="text-[24px]" />
              </div>
              <div>
                <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                  Need a Comprehensive In-Person Checkup?
                </h3>
                <p className="text-xs sm:text-sm text-[#3f4850]">
                  Find licensed dental practices, check verified clinician reviews, and book appointments near you.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/portal/find-care')}
              className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shrink-0"
            >
              Find Clinics Near Me
            </button>
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
