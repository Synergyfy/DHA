import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { EducationSubNav } from './EducationSubNav';
import { Icon } from '../../design/Primitives';

export function EducationHomeScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [savedArticles, setSavedArticles] = useState<string[]>(['composite-16']);

  const toggleSave = (id: string) => {
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'hygiene', name: 'Oral Hygiene', count: '14 Guides', icon: 'cleaning_services', color: 'bg-primary-fixed text-primary' },
    { id: 'gums', name: 'Teeth & Gums', count: '22 Articles', icon: 'dentistry', color: 'bg-primary-fixed text-primary' },
    { id: 'kids', name: "Children's Health", count: '18 Resources', icon: 'child_care', color: 'bg-secondary-fixed text-secondary' },
    { id: 'conditions', name: 'Conditions', count: '15 Topics', icon: 'coronavirus', color: 'bg-primary-fixed text-primary' },
    { id: 'treatments', name: 'Treatments', count: '19 Guides', icon: 'medical_services', color: 'bg-primary-fixed text-primary' },
    { id: 'preventive', name: 'Preventive Care', count: '12 Modules', icon: 'verified_user', color: 'bg-primary-fixed text-primary' },
    { id: 'nutrition', name: 'Nutrition', count: '9 Articles', icon: 'nutrition', color: 'bg-primary-fixed text-primary' },
    { id: 'emergencies', name: 'Emergencies', count: '8 Protocols', icon: 'emergency', color: 'bg-error-container text-error' },
  ];

  return (
    <DashboardShell pageTitle="Patient Education Hub">
      <EducationSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-container to-tertiary text-on-primary p-6 sm:p-10 shadow-md">
          <div className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full bg-surface-container-lowest/10 pointer-events-none blur-2xl"></div>
          <div className="absolute right-4 top-4 opacity-15 pointer-events-none hidden sm:block">
            <Icon name="health_and_safety" className="text-[120px] text-on-primary" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md">
              <Icon name="verified" className="text-[16px] text-secondary-fixed" />
              <span className="font-label-sm text-surface-container-lowest uppercase tracking-wider font-semibold">
                DHA Certified Clinical Education
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg font-bold leading-tight">
              Learn how to keep your smile healthy.
            </h1>
            <p className="font-body-lg text-on-primary/90">
              Evidence-based oral healthcare insights reviewed and accredited by Nigeria Dental Health Authority dental boards.
            </p>

            {/* Search Input Bar */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1">
                <Icon
                  name="search"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dental health topics, conditions, guides..."
                  className="w-full h-12 pl-10 pr-4 rounded-2xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                />
              </div>
              <button
                type="button"
                onClick={() => navigate(`/patient-dashboard/education/topics?q=${encodeURIComponent(searchQuery)}`)}
                className="h-12 px-5 rounded-2xl bg-secondary text-on-secondary font-title-sm font-semibold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
              >
                <Icon name="search" className="text-[18px]" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </section>

        {/* Active Context Banner */}
        <section className="flex items-center gap-3 p-4 rounded-2xl bg-secondary-fixed/30 text-on-secondary-fixed border border-secondary/20">
          <Icon name="shield_person" className="text-secondary text-[22px] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-body-sm text-body-sm text-on-surface leading-snug">
              Personalized recommendations active for <strong className="font-title-sm text-on-surface">Ngozi Eze</strong> (Primary Account). Browse all clinical guides freely.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/patient-dashboard/education/saved')}
            className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-secondary font-title-sm font-semibold shadow-xs hover:bg-surface-container transition-colors shrink-0 hidden sm:inline-flex"
          >
            Saved Items
          </button>
        </section>

        {/* Daily Oral Health Tip */}
        <section className="rounded-3xl bg-primary-fixed/40 p-6 border border-primary/20 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <Icon name="lightbulb" className="text-[16px]" />
              </span>
              <span className="font-label-md text-primary font-bold uppercase tracking-wider">
                Daily Oral Health Tip
              </span>
              <span className="text-outline text-label-sm">• Today</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed">
              Brushing right after acidic drinks weakens softened enamel. Rinse thoroughly with plain water first and wait 30 minutes before brushing with fluoride paste.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/patient-dashboard/education/daily-care')}
            className="inline-flex items-center gap-1.5 font-title-sm font-semibold text-primary hover:text-primary-container transition-colors shrink-0"
          >
            <span>Read Science &amp; Routine</span>
            <Icon name="arrow_forward" className="text-[17px]" />
          </button>
        </section>

        {/* Kids Clinical Corner Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary-container via-surface-container-high to-primary-fixed p-6 sm:p-8 text-on-secondary-container shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-secondary shadow-xs shrink-0">
                <Icon name="celebration" className="text-[22px]" />
              </div>
              <div>
                <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                  Kids Clinical Corner
                </span>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Children's Dental Adventure Quest
                </h2>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Interactive 2-minute quiz, interactive dental arch tooth map &amp; brushing quest games for <strong className="text-on-surface">Tariq (Age 6)</strong> and <strong className="text-on-surface">Zayd (Age 9)</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/patient-dashboard/education/kids')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-secondary text-on-secondary font-title-sm font-semibold shadow-sm hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all shrink-0 cursor-pointer"
          >
            <span>Enter Kids Learning Centre</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </section>

        {/* Browse by Category 8-Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                Browse by Category
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                8 specialized oral health topics and clinical reference modules
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/patient-dashboard/education/topics')}
              className="font-title-sm font-semibold text-primary hover:text-primary-container transition-colors flex items-center gap-1"
            >
              <span>View All 72 Materials</span>
              <Icon name="arrow_forward" className="text-[17px]" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigate(`/patient-dashboard/education/topics?cat=${cat.id}`)}
                className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary hover:shadow-md transition-all flex items-center gap-3 text-left group cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${cat.color}`}
                >
                  <Icon name={cat.icon} className="text-[22px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-title-sm text-title-sm font-bold text-on-surface truncate block group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {cat.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Recommended For You (Chart Synced) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="auto_awesome" className="text-primary text-[22px]" />
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                Recommended For You
              </h2>
            </div>
            <span className="font-label-sm text-secondary bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full uppercase font-bold">
              Chart Synced
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Tooth #16 Record */}
            <div className="rounded-3xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-sm font-bold uppercase">
                    <Icon name="dentistry" className="text-[14px] text-secondary" />
                    <span>Linked to Tooth #16 Record</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSave('composite-16')}
                    className="text-on-surface-variant hover:text-primary transition-colors p-1"
                    aria-label="Save guide"
                  >
                    <Icon
                      name={savedArticles.includes('composite-16') ? 'bookmark' : 'bookmark_border'}
                      className="text-[22px] text-primary"
                    />
                  </button>
                </div>

                <h3 className="font-title-md text-title-md font-bold text-on-surface">
                  Caring for Restored Teeth &amp; Composite Seals
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Prevent secondary micro-leakage and maintain marginal seal stability following your recent composite restoration.
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between text-body-sm">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Icon name="stethoscope" className="text-[17px] text-primary" />
                  <span>Dr. Chinedu Okafor • 4 min read</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/patient-dashboard/education/topics')}
                  className="font-title-sm font-bold text-primary hover:underline"
                >
                  Read Guide
                </button>
              </div>
            </div>

            {/* Card 2: For Tariq Age 6 */}
            <div className="rounded-3xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm font-bold uppercase">
                    <Icon name="face_6" className="text-[15px] text-primary" />
                    <span>For Tariq (Age 6)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSave('fissure-sealants')}
                    className="text-on-surface-variant hover:text-primary transition-colors p-1"
                    aria-label="Save guide"
                  >
                    <Icon
                      name={savedArticles.includes('fissure-sealants') ? 'bookmark' : 'bookmark_border'}
                      className="text-[22px] text-primary"
                    />
                  </button>
                </div>

                <h3 className="font-title-md text-title-md font-bold text-on-surface">
                  Preventing Pediatric Caries with Fissure Sealants
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Why safeguarding Tariq's newly erupted first permanent molars offers durable defense against decay and enamel breakdown.
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between text-body-sm">
                <span className="text-on-surface-variant">DHA Pediatric Committee • 3 min read</span>
                <button
                  type="button"
                  onClick={() => navigate('/patient-dashboard/education/kids')}
                  className="font-title-sm font-bold text-primary hover:underline"
                >
                  Open Module
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Articles List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              Popular Clinical Articles
            </h2>
            <button
              type="button"
              onClick={() => navigate('/patient-dashboard/education/topics')}
              className="font-title-sm font-semibold text-primary hover:text-primary-container"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'art-1',
                title: 'How to Brush Your Teeth Correctly (Modified Bass)',
                subtitle: 'Step-by-step angle & pressure instructions for gingival sulcus',
                duration: '5 min read',
                image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=500&q=80',
              },
              {
                id: 'art-2',
                title: 'The Science of Flossing: Why String Beats Toothpicks',
                subtitle: 'Interdental plaque removal evidence review & biofilm disruption',
                duration: '4 min read',
                image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=500&q=80',
              },
            ].map((art) => (
              <div
                key={art.id}
                className="rounded-2xl bg-surface-container-lowest p-4 border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => navigate('/patient-dashboard/education/topics')}
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-surface-container group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-secondary bg-secondary-fixed/40 px-2 py-0.5 rounded font-bold">
                      Verified
                    </span>
                    <span className="font-label-sm text-on-surface-variant">{art.duration}</span>
                  </div>
                  <h3 className="font-title-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                    {art.title}
                  </h3>
                  <p className="font-body-sm text-on-surface-variant truncate">{art.subtitle}</p>
                </div>
                <Icon name="chevron_right" className="text-on-surface-variant text-[20px] shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* Latest Video Demonstrations */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="play_circle" className="text-primary text-[22px]" />
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                Latest Video Demonstrations
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/patient-dashboard/education/videos')}
              className="font-title-sm font-semibold text-primary hover:text-primary-container"
            >
              Watch All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
              onClick={() => navigate('/patient-dashboard/education/videos')}
            >
              <div className="relative h-44 w-full bg-surface-container">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80"
                  alt="Modified Bass Brushing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon name="play_arrow" className="text-[28px] translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/75 text-white font-mono text-[12px]">
                  2:45
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-title-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  Demonstrating the Modified Bass Brushing Technique
                </h3>
                <span className="font-body-sm text-on-surface-variant block">
                  Dr. Amina Bello • DHA Dental Hygienist Specialist
                </span>
              </div>
            </div>

            <div
              className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
              onClick={() => navigate('/patient-dashboard/education/videos')}
            >
              <div className="relative h-44 w-full bg-surface-container">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=80"
                  alt="Child Dental Checkup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon name="play_arrow" className="text-[28px] translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/75 text-white font-mono text-[12px]">
                  3:15
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-title-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  What to Expect at Tariq's Next Pediatric Checkup
                </h3>
                <span className="font-body-sm text-on-surface-variant block">
                  DHA Pediatric Committee • Family Orientation
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Progress Summary Strip */}
        <section className="rounded-3xl bg-surface-container p-6 border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md">
              <Icon name="bookmarks" className="text-[28px]" />
            </div>
            <div>
              <h3 className="font-title-md font-bold text-on-surface">
                Your Learning Library &amp; Progress
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Quick access to your 5 bookmarked guides, clinical PDFs, and Tariq's completed lessons.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/patient-dashboard/education/saved')}
            className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-title-sm font-semibold transition-all shadow-sm shrink-0 cursor-pointer"
          >
            Open Saved Library
          </button>
        </section>
      </main>
    </DashboardShell>
  );
}

