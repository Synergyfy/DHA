import { useState } from 'react';
import { DashboardShell } from '../dashboard/DashboardShell';
import { EducationSubNav } from './EducationSubNav';
import { Icon } from '../../design/Primitives';

type MainTab = 'adult' | 'kids';
type AdultFilter = 'all' | 'article' | 'video' | 'pdf';
type KidDependent = 'tariq' | 'zayd';

interface SavedItem {
  id: string;
  category: AdultFilter;
  title: string;
  badge: string;
  badgeColor: string;
  badgeIcon: string;
  meta: string;
  actionText: string;
  actionIcon: string;
  image: string;
}

export function SavedEducationScreen() {
  const [activeTab, setActiveTab] = useState<MainTab>('adult');
  const [adultFilter, setAdultFilter] = useState<AdultFilter>('all');
  const [activeDependent, setActiveDependent] = useState<KidDependent>('tariq');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: 'bass-pdf',
      category: 'pdf',
      title: 'How to Brush Your Teeth Correctly (Modified Bass)',
      badge: 'PDF Downloaded (2.1 MB)',
      badgeColor: 'bg-secondary-fixed text-on-secondary-fixed-variant',
      badgeIcon: 'picture_as_pdf',
      meta: 'Last viewed 2 days ago • 4 min read • Available Offline',
      actionText: 'Read PDF',
      actionIcon: 'arrow_forward',
      image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'composite-16',
      category: 'article',
      title: 'Caring for Restored Teeth & Composite Seals',
      badge: 'Tooth #16 Targeted Care',
      badgeColor: 'bg-primary-fixed text-on-primary-fixed-variant',
      badgeIcon: 'dentistry',
      meta: 'Reviewed by Dr. Farouk (DHA) • Linked to Treatment Plan',
      actionText: 'View Protocol',
      actionIcon: 'arrow_forward',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'floss-video',
      category: 'video',
      title: 'Flossing Tight Contacts without Gum Snapping',
      badge: '1:50 min Quick Video',
      badgeColor: 'bg-surface-container-highest text-on-surface-variant',
      badgeIcon: 'videocam',
      meta: 'Gentle C-Shape flossing technique for sensitive molars',
      actionText: 'Watch Video',
      actionIcon: 'play_arrow',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const removeCard = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from saved education');
  };

  const filteredItems = savedItems.filter(
    (item) => adultFilter === 'all' || item.category === adultFilter
  );

  return (
    <DashboardShell pageTitle="Saved Education & Learning Progress" showBack>
      <EducationSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Interactive Toast */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-secondary text-[22px]" />
            <span className="font-title-sm font-semibold">{toastMessage}</span>
            <span className="font-label-sm text-secondary bg-surface-container/20 px-2 py-0.5 rounded ml-2">
              DHA Cloud
            </span>
          </div>
        )}

        {/* Hero Context Header */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-label-sm text-primary uppercase tracking-widest font-bold">
                  Clinical Knowledge Hub
                </span>
              </div>
              <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-1">
                Saved Education &amp; Learning Progress
              </h1>
            </div>

            <button
              type="button"
              onClick={() => showToast('Synced with DHA Health Records Network')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-title-sm font-semibold transition-colors"
            >
              <Icon name="sync" className="text-[18px]" />
              <span>Sync Network Records</span>
            </button>
          </div>

          {/* Guardian Account Banner */}
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <Icon name="verified_user" className="text-[18px]" />
              </div>
              <div>
                <span className="font-label-sm text-on-surface-variant uppercase font-semibold block">
                  Guardian Account
                </span>
                <span className="font-title-sm font-bold text-on-surface">
                  Ngozi Eze • Family Dental Unit
                </span>
              </div>
            </div>
            <span className="font-label-sm px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-bold">
              Verified Guardian
            </span>
          </div>
        </section>

        {/* Segmented View Controller Tabs */}
        <div className="p-1.5 rounded-2xl bg-surface-container flex items-center max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab('adult')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-center font-title-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'adult'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="person" className="text-[18px]" />
            <span>Sarah's Library ({savedItems.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kids')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-center font-title-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'kids'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="child_care" className="text-[18px]" />
            <span>Kids' Learning</span>
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
          </button>
        </div>

        {/* VIEW 1: SARAH'S SAVED LIBRARY */}
        {activeTab === 'adult' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Metric Stat Strip */}
            <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm grid grid-cols-3 divide-x divide-outline-variant/30 text-center">
              <div className="space-y-0.5">
                <span className="font-headline-md font-bold text-primary">5</span>
                <span className="font-label-sm text-on-surface-variant uppercase block">Articles</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-headline-md font-bold text-tertiary">2</span>
                <span className="font-label-sm text-on-surface-variant uppercase block">Videos</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-headline-md font-bold text-secondary">3</span>
                <span className="font-label-sm text-on-surface-variant uppercase block">PDF Guides</span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-label-md">
              {[
                { id: 'all', label: 'All Saved' },
                { id: 'article', label: 'Articles' },
                { id: 'video', label: 'Videos' },
                { id: 'pdf', label: 'Clinical PDFs' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setAdultFilter(f.id as AdultFilter)}
                  className={`px-4 py-1.5 rounded-full font-semibold transition-colors ${
                    adultFilter === f.id
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Cards List */}
            {filteredItems.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-3xl p-10 text-center space-y-3 border border-outline-variant/30">
                <Icon name="bookmark_border" className="text-[36px] text-on-surface-variant mx-auto" />
                <h3 className="font-title-md font-bold text-on-surface">No saved items in this category</h3>
                <p className="font-body-sm text-on-surface-variant">Browse education topics to bookmark clinical guides.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all"
                  >
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1.5 font-label-sm px-3 py-1 rounded-full font-bold ${item.badgeColor}`}
                        >
                          <Icon name={item.badgeIcon} className="text-[14px]" />
                          <span>{item.badge}</span>
                        </span>

                        <div className="flex items-center gap-1 text-on-surface-variant">
                          <button
                            type="button"
                            onClick={() => showToast('Shared guide via encrypted DHA link')}
                            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
                            aria-label="Share guide"
                          >
                            <Icon name="share" className="text-[18px]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeCard(item.id)}
                            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container text-error transition-colors"
                            aria-label="Remove guide"
                          >
                            <Icon name="bookmark_remove" className="text-[18px]" />
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-surface-container"
                        />
                        <div className="min-w-0 flex-1 space-y-1">
                          <h2 className="font-title-md font-bold text-on-surface leading-snug">
                            {item.title}
                          </h2>
                          <p className="font-body-sm text-on-surface-variant">{item.meta}</p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between">
                      <span className="font-label-sm text-secondary font-semibold flex items-center gap-1">
                        <Icon name="cloud_done" className="text-[16px]" />
                        <span>Available Offline</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => showToast(`Opening ${item.title}...`)}
                        className="font-title-sm text-primary font-bold flex items-center gap-1 hover:underline"
                      >
                        <span>{item.actionText}</span>
                        <Icon name={item.actionIcon} className="text-[16px]" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Recently Viewed History */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-title-sm font-bold text-on-surface flex items-center gap-1.5">
                  <Icon name="history" className="text-outline text-[18px]" />
                  <span>Recently Viewed History</span>
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('History cleared')}
                  className="font-label-sm text-on-surface-variant hover:text-error transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
                    <Icon name="science" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-title-sm font-bold text-on-surface block truncate">
                      The Science of Enamel Remineralization &amp; Fluoride
                    </span>
                    <span className="font-body-sm text-on-surface-variant">
                      Completed Oct 14, 2026 • 6 min read
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Article re-added to Saved Library')}
                  className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-primary hover:bg-surface-container shrink-0"
                  title="Re-save"
                >
                  <Icon name="bookmark_add" className="text-[18px]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: KIDS' LEARNING PROGRESS & GUARDIAN OVERSIGHT */}
        {activeTab === 'kids' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Dependent Selector Tabs */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setActiveDependent('tariq')}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  activeDependent === 'tariq'
                    ? 'bg-surface-container-lowest border-2 border-primary shadow-sm'
                    : 'bg-surface-container-low border-outline-variant/20 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold font-title-sm flex items-center justify-center">
                    TO
                  </div>
                  <div>
                    <span className="font-title-sm font-bold text-on-surface flex items-center gap-1.5">
                      <span>Tariq</span>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </span>
                    <span className="font-label-sm text-on-surface-variant">Age 6 • Active Quest</span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveDependent('zayd')}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  activeDependent === 'zayd'
                    ? 'bg-surface-container-lowest border-2 border-primary shadow-sm'
                    : 'bg-surface-container-low border-outline-variant/20 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary-fixed text-on-primary-fixed font-bold font-title-sm flex items-center justify-center">
                    ZO
                  </div>
                  <div>
                    <span className="font-title-sm font-bold text-on-surface">Zayd</span>
                    <span className="font-label-sm text-on-surface-variant block">Age 9 • On Track</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Tariq's Profile */}
            {activeDependent === 'tariq' && (
              <div className="space-y-5 animate-in fade-in">
                {/* High Level Progress & Sparkle Stars */}
                <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-primary uppercase font-bold tracking-wider block">
                        Level 1 Habit Builder
                      </span>
                      <h2 className="font-headline-md font-bold text-on-surface mt-0.5">
                        Tariq's Brushing Journey
                      </h2>
                    </div>
                    <div className="px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container flex items-center gap-1.5 font-title-sm font-bold shadow-xs">
                      <Icon name="star" className="text-amber-500 text-[18px] fill-current" />
                      <span>12 Sparkle Stars</span>
                    </div>
                  </div>

                  {/* Circular Meter & Stats */}
                  <div className="flex items-center gap-5 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 72 72">
                        <circle
                          className="text-surface-container-high"
                          cx="36"
                          cy="36"
                          fill="none"
                          r="30"
                          stroke="currentColor"
                          strokeWidth="6"
                        />
                        <circle
                          className="text-secondary"
                          cx="36"
                          cy="36"
                          fill="none"
                          r="30"
                          stroke="currentColor"
                          strokeDasharray="188.5"
                          strokeDashoffset="65.9"
                          strokeLinecap="round"
                          strokeWidth="6"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-title-md font-bold text-on-surface">65%</span>
                        <span className="font-label-sm text-on-surface-variant text-[10px]">Done</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-title-sm font-bold text-on-surface block">
                        4 of 6 Lessons Mastered
                      </span>
                      <p className="font-body-sm text-on-surface-variant leading-relaxed">
                        2 morning missions remaining this week to earn the official Golden Bristle badge.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Completed Activities Timeline */}
                <div className="space-y-3">
                  <h3 className="font-title-sm font-bold text-on-surface flex items-center gap-1.5">
                    <Icon name="verified" className="text-secondary text-[20px]" />
                    <span>Completed Activities &amp; Milestones</span>
                  </h3>

                  <div className="space-y-2.5">
                    {[
                      {
                        title: 'The 2-Minute Brushing Quest',
                        desc: 'Completed Jan 18, 2026 • Perfect Score 100%',
                        icon: 'timer',
                        iconBg: 'bg-secondary-fixed text-on-secondary-fixed',
                      },
                      {
                        title: 'Super Foods vs Sticky Monsters',
                        desc: 'Completed Jan 15, 2026 • 3 Stars Earned',
                        icon: 'nutrition',
                        iconBg: 'bg-primary-fixed text-on-primary-fixed',
                      },
                      {
                        title: 'Visiting Dr. Layla the Dentist',
                        desc: 'Ready for upcoming visit Jan 28!',
                        icon: 'stethoscope',
                        iconBg: 'bg-surface-container-high text-primary',
                        readyBadge: true,
                      },
                    ].map((act) => (
                      <div
                        key={act.title}
                        className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${act.iconBg}`}
                          >
                            <Icon name={act.icon} className="text-[22px]" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-title-sm font-bold text-on-surface block truncate">
                              {act.title}
                            </span>
                            <span className="font-body-sm text-on-surface-variant">{act.desc}</span>
                          </div>
                        </div>

                        {act.readyBadge ? (
                          <span className="px-3 py-1 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm font-bold shrink-0">
                            Ready
                          </span>
                        ) : (
                          <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                            <Icon name="check" className="text-[18px]" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Next Step Hero Card */}
                <div className="p-6 rounded-3xl bg-primary text-on-primary shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm uppercase tracking-wider text-primary-fixed font-bold flex items-center gap-1">
                      <Icon name="auto_awesome" className="text-[16px]" />
                      <span>Recommended Next Step</span>
                    </span>
                    <span className="font-label-sm px-2.5 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                      For Age 6
                    </span>
                  </div>

                  <h4 className="font-headline-sm font-bold text-white">
                    Baby Teeth &amp; Wobbly Teeth Lesson
                  </h4>
                  <p className="font-body-sm text-primary-fixed leading-relaxed">
                    Helps prepare Tariq for loose tooth milestones with gentle animations and bravery badges.
                  </p>

                  <button
                    type="button"
                    onClick={() => showToast('Launching interactive lesson with Tariq...')}
                    className="w-full py-3 rounded-xl bg-surface-container-lowest text-primary font-title-sm font-semibold flex items-center justify-center gap-2 hover:bg-surface-container transition-colors shadow-xs"
                  >
                    <span>Start Lesson Together</span>
                    <Icon name="play_arrow" className="text-[18px]" />
                  </button>
                </div>

                {/* Single-Tap Certificate Download Action */}
                <button
                  type="button"
                  onClick={() => showToast('Downloading Tariq_OralHealth_Certificate.pdf')}
                  className="w-full py-4 px-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <Icon name="workspace_premium" className="text-[24px]" />
                    </div>
                    <div className="text-left">
                      <span className="font-title-sm font-bold text-on-surface block">
                        Tariq's Oral Health Certificate
                      </span>
                      <span className="font-body-sm text-on-surface-variant">
                        DHA Dental Hero Award PDF
                      </span>
                    </div>
                  </div>
                  <Icon name="download" className="text-primary text-[22px]" />
                </button>
              </div>
            )}

            {/* Zayd's Profile */}
            {activeDependent === 'zayd' && (
              <div className="space-y-5 animate-in fade-in">
                <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-primary uppercase font-bold tracking-wider block">
                        Level 3 Junior Ortho
                      </span>
                      <h2 className="font-headline-md font-bold text-on-surface mt-0.5">
                        Zayd's Braces &amp; Care
                      </h2>
                    </div>
                    <div className="px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container flex items-center gap-1.5 font-title-sm font-bold">
                      <Icon name="star" className="text-amber-500 text-[18px] fill-current" />
                      <span>19 Sparkle Stars</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-title-sm font-bold text-on-surface block">
                        Overall Course: 88% Finished
                      </span>
                      <span className="font-body-sm text-on-surface-variant">
                        Completed "Braces Threading Techniques" yesterday
                      </span>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <Icon name="done_all" className="text-[20px]" />
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Downloading Zayd_Certificate_Level3.pdf')}
                  className="w-full py-4 px-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                      <Icon name="military_tech" className="text-[24px]" />
                    </div>
                    <div className="text-left">
                      <span className="font-title-sm font-bold text-on-surface block">
                        Zayd's Orthodontic Mastery PDF
                      </span>
                      <span className="font-body-sm text-on-surface-variant">Updated October 2026</span>
                    </div>
                  </div>
                  <Icon name="download" className="text-primary text-[22px]" />
                </button>
              </div>
            )}

            {/* Guardian Privacy Shield */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
              <Icon name="shield" className="text-secondary text-[22px] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-title-sm font-bold text-on-surface block">
                  Guardian Privacy Shield
                </span>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">
                  All learning data is cryptographically anchored to Sarah's guardian account and isolated from public leaderboards.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </DashboardShell>
  );
}

