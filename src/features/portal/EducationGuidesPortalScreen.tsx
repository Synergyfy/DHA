import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PortalShell } from './PortalShell';
import { Icon } from '../../design/Primitives';

type GuideCategory = 'all' | 'pediatric' | 'brushing' | 'preventive';

interface GuideItem {
  id: string;
  category: GuideCategory;
  categoryLabel: string;
  readTime: string;
  title: string;
  description: string;
  imageUrl: string;
  panelLabel: string;
  spotlightBadge?: string;
  isBookmarked?: boolean;
}

const GUIDES_DATA: GuideItem[] = [
  {
    id: 'guide-1',
    category: 'brushing',
    categoryLabel: 'Oral Hygiene',
    readTime: '5 min read',
    title: 'How to Brush Your Teeth Properly',
    description:
      'Master the Modified Bass technique, optimal 45-degree bristle angle, and gentle gumline care to prevent enamel wear.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxdIukT4v3xImiblifO185fS1tCFtsi3A6kNCLKFpkhkIgLz0yQkdzdEFa4kJKKLgVn6budwe5Cx-s4fP-gvLX6BVT2mUc2LDtSFpL_PIdhknf8URlhZU7i2KjGb2gr4Xzbq15cgydwHqp9Z7DZu9xSDVhpqz8GofnBKRm0IkDPft_-mrJawQafPxOUAdZAwboYtwoicKpb9gy1Npc6pivu8Ofm7OWXX1sTygwPlee',
    panelLabel: 'DHA Hygiene Panel',
  },
  {
    id: 'guide-2',
    category: 'pediatric',
    categoryLabel: 'Pediatric Care',
    readTime: '4 min read',
    title: 'Helping Children Build Healthy Oral Care Habits',
    description:
      'Fun interactive strategies, positive reinforcement schedules, and age-specific fluoride guidelines for toddlers and school students.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrANs_3SIz4-VreRIaDpWAfu15uHHWM4SIbZaVMAFV8aWPiI1ximjD2bMXy9lYW1sfvTiwm31L2TAdLueiU-fx3zldE2S8rxl5uVWjdnVY-eZmR6GAGulaccDLtQo8adn3ODo-cGihkNOefJ2IIS1IHXaHvuqzWyc_92seaOyLeTNmdAXHVV_mbSW0YijDXtvtKNQOmrDCLYaspjthHy9Dxs7SjOGHh5KrQh27BKaZ5nzQ',
    panelLabel: 'Pediatric Board Approved',
    spotlightBadge: 'Parent & Child Spotlight',
  },
  {
    id: 'guide-3',
    category: 'preventive',
    categoryLabel: 'Preventive Insights',
    readTime: '6 min read',
    title: 'Why Regular Dental Check-ups Matter',
    description:
      'Early detection of micro-cavities, periodontal screenings, and how bi-annual routine cleanings prevent invasive surgical treatments.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApF8Z7CpnLTYJ5_hTLZeSbw2Wvj-CTIlS4-X7jDMWDQjK7LObHQW-PR0L7Znrlf2o76rZKEetegM5E9NyruCSSJR0GV_KhZJSuvPGk-swIItdFQt0EJwsXEsmlTX5y41iRNgfuh5G-0X9MbbOOFS1TUU76THZZ-baijcUnXGBeG5xTbZFa657_IMkTMo0sP63vJKBbmLUOjsU5hsVAkYHckWejN52cP91-iCxlhHez',
    panelLabel: 'Clinical Council Verified',
  },
];

export function EducationGuidesPortalScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [readingGuide, setReadingGuide] = useState<GuideItem | null>(null);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredGuides = GUIDES_DATA.filter(
    (g) => selectedCategory === 'all' || g.category === selectedCategory
  );

  return (
    <PortalShell pageTitle="Oral Health Guides">
      {/* Reading Modal */}
      {readingGuide && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setReadingGuide(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {readingGuide.categoryLabel} • {readingGuide.readTime}
              </span>
              <button
                type="button"
                onClick={() => setReadingGuide(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface">{readingGuide.title}</h3>
            <img src={readingGuide.imageUrl} alt={readingGuide.title} className="w-full h-44 object-cover rounded-xl" />
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {readingGuide.description}
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant flex items-center gap-2">
              <Icon name="verified" filled className="text-secondary text-[16px]" />
              <span>Certified under {readingGuide.panelLabel}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <NavLink
                to="/patient-dashboard/education"
                className="text-xs text-primary font-semibold hover:underline"
              >
                Open Full Interactive Hub →
              </NavLink>
              <button
                type="button"
                onClick={() => setReadingGuide(null)}
                className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6">
        {/* Top Ambient Banner / Authority Header */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs">
                <Icon name="verified_user" className="text-[18px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
                  DHA Certified Hub
                </span>
                <span className="text-xs text-on-surface-variant font-medium">Dubai Health Authority</span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-semibold uppercase tracking-wider self-start sm:self-auto">
              <Icon name="local_library" filled className="text-[14px]" />
              <span>Clinical Health Library</span>
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
              Learn More About Your Oral Health
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1 leading-relaxed">
              Good oral health starts with the right information. Explore simple, helpful resources for adults, parents and children verified by Dubai Health Authority dental boards.
            </p>
          </div>

          {/* Public Accessibility Banner */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary shadow-xs">
              <Icon name="lock_open" className="text-[20px]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-bold text-on-surface leading-tight">Public Health Access</p>
              <p className="text-xs text-on-surface-variant truncate">No Registration Required to Read or Share</p>
            </div>
            <Icon name="check_circle" className="text-secondary text-[20px] shrink-0" />
          </div>
        </div>

        {/* Interactive Category Pill Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
              selectedCategory === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            All Guides
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('pediatric')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'pediatric'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Pediatric Dentistry
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('brushing')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'brushing'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Brushing Technique
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('preventive')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'preventive'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Preventive Care
          </button>
        </div>

        {/* Featured Resource Cards: Responsive 3-Column Grid on Tablet/Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => {
            const isBookmarked = bookmarkedIds.has(guide.id);
            return (
              <article
                key={guide.id}
                onClick={() => setReadingGuide(guide)}
                className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
              >
                <div>
                  <div className="relative w-full h-40 bg-surface-container overflow-hidden">
                    <img
                      src={guide.imageUrl}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent" />

                    {guide.spotlightBadge && (
                      <div className="absolute top-2.5 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary text-[10px] font-bold shadow-sm">
                          <Icon name="kid_star" filled className="text-[12px]" />
                          <span>{guide.spotlightBadge}</span>
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-on-primary">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface/90 text-on-surface text-[10px] font-semibold backdrop-blur-md">
                        <Icon name="dentistry" filled className="text-[12px] text-primary" />
                        <span>{guide.categoryLabel} • {guide.readTime}</span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(guide.id, e)}
                        className="w-7 h-7 rounded-full bg-surface/80 text-on-surface flex items-center justify-center backdrop-blur-md hover:bg-surface transition-colors"
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark guide'}
                      >
                        <Icon
                          name={isBookmarked ? 'bookmark' : 'bookmark_border'}
                          filled={isBookmarked}
                          className={`text-[16px] ${isBookmarked ? 'text-primary' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h2 className="text-sm sm:text-base font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {guide.title}
                    </h2>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-surface-container-low/60 border-t border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <Icon name="verified" className="text-[14px]" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">{guide.panelLabel}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Daily Dental Quick Tip Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-secondary-container/30 border border-secondary/20 flex items-start gap-3.5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="lightbulb" className="text-[22px]" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-on-surface">Daily Clinical Tip</h4>
            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              Wait at least 30 minutes after eating acidic foods or citrus fruits before brushing your teeth to safeguard softened enamel from abrasion.
            </p>
          </div>
        </div>

        {/* Bottom CTA Area */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center space-y-3 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-on-surface">Explore All Interactive DHA Education</h3>
          <p className="text-xs text-on-surface-variant max-w-xl mx-auto">
            Includes dental video modules, daily care hygiene routines, interactive quizzes for kids, and clinical odontograms.
          </p>
          <button
            type="button"
            onClick={() => navigate('/patient-dashboard/education')}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <span>Explore All Oral Health Guides</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>
      </div>
    </PortalShell>
  );
}

