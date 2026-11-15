import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { EducationSubNav } from './EducationSubNav';
import { Icon } from '../../design/Primitives';

type FormatFilter = 'all' | 'articles' | 'videos' | 'pdf' | 'infographics';
type AgeFilter = 'all' | 'adults' | 'children' | 'teens' | 'seniors';

export function OralHealthTopicsScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedFormat, setSelectedFormat] = useState<FormatFilter>('all');
  const [selectedAge, setSelectedAge] = useState<AgeFilter>('all');
  const [savedTopics, setSavedTopics] = useState<string[]>(['brushing-methods']);
  const [activeModalTopic, setActiveModalTopic] = useState<string | null>(null);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedTopics((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      id: 'brushing-methods',
      badge: 'Foundation Technique',
      badgeColor: 'text-primary bg-primary-fixed',
      title: 'Correct Brushing Technique & Methods',
      description:
        'Master the Bass technique, 45° angle calibration, and electric vs manual brush efficacy for comprehensive sulcular plaque removal.',
      articles: '4 Articles',
      videos: '2 Videos',
      extras: '1 PDF Guide',
      age: 'All Ages',
      format: 'articles',
      icon: 'brush',
      iconColor: 'bg-primary-fixed text-primary',
    },
    {
      id: 'interdental-flossing',
      badge: 'Proximal Care',
      badgeColor: 'text-secondary bg-secondary-container',
      title: 'Interdental Flossing & Proximal Cleaning',
      description:
        'Prevent interproximal caries and gingivitis through daily floss contouring, water flosser pressure calibration, and interdental brushes.',
      articles: '3 Articles',
      videos: '2 Videos',
      extras: '1 Printable Chart',
      age: 'Adults & Teens',
      format: 'articles',
      icon: 'cable',
      iconColor: 'bg-secondary-fixed text-secondary',
    },
    {
      id: 'gum-conditions',
      badge: 'Pathology & Diagnosis',
      badgeColor: 'text-tertiary bg-tertiary-fixed',
      title: 'Teeth & Gum Conditions (Gingivitis & Caries)',
      description:
        'Recognize early signs of enamel demineralization, bleeding gums, reversible gingivitis, and periodontal pocket risk indicators.',
      articles: '6 Articles',
      videos: '3 Videos',
      extras: 'Clinical Notes',
      age: 'All Ages',
      format: 'articles',
      icon: 'healing',
      iconColor: 'bg-surface-container-highest text-primary',
    },
    {
      id: 'nutrition-erosion',
      badge: 'Dietary Prevention',
      badgeColor: 'text-amber-800 bg-amber-100',
      title: 'Nutrition, Sugar Frequency & Enamel Acid Erosion',
      description:
        'Understand the Stephan curve demineralization windows, sugar exposure intervals, and the protective role of calcium and dairy.',
      articles: '4 Articles',
      videos: '1 Video',
      extras: '1 Infographic',
      age: 'All Ages',
      format: 'infographics',
      icon: 'nutrition',
      iconColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'pediatric-health',
      badge: 'Pediatric Milestone',
      badgeColor: 'text-secondary bg-secondary-container',
      title: "Children's Early Dental Health & Habits",
      description:
        'Infant gum wipe routines, teething relief, fluoride toothpaste age guidelines, and scheduling your baby’s first dental checkup by age 1.',
      articles: '5 Articles',
      videos: '3 Videos',
      extras: '2 Checklists',
      age: 'Children (0-12)',
      format: 'articles',
      icon: 'child_care',
      iconColor: 'bg-secondary-fixed text-secondary',
    },
    {
      id: 'ortho-care',
      badge: 'Specialty Maintenance',
      badgeColor: 'text-primary bg-primary-fixed',
      title: 'Orthodontic Care, Braces & Aligner Hygiene',
      description:
        'Braces threader flossing, wax application for mucosal ulcers, and daily ultrasonic tray sanitization for Invisalign patients.',
      articles: '4 Articles',
      videos: '2 Videos',
      extras: '1 Schedule',
      age: 'Teens & Adults',
      format: 'pdf',
      icon: 'dentistry',
      iconColor: 'bg-primary-fixed text-primary',
    },
    {
      id: 'emergency-trauma',
      badge: 'Urgent Protocol',
      badgeColor: 'text-error bg-error-container',
      title: 'Dental Emergencies & Avulsed Teeth First-Aid',
      description:
        'Immediate action protocol for knocked-out permanent teeth (milk storage medium), chipped crowns, severe acute dental abscesses, and facial trauma triage.',
      articles: '3 Protocols',
      videos: '1 Video',
      extras: 'Emergency Map',
      age: 'Immediate Protocol',
      format: 'articles',
      icon: 'emergency',
      iconColor: 'bg-error-container text-error',
    },
  ];

  const filteredTopics = topics.filter((t) => {
    const matchesQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat =
      selectedFormat === 'all' ||
      (selectedFormat === 'articles' && t.format === 'articles') ||
      (selectedFormat === 'videos' && t.videos.includes('Video')) ||
      (selectedFormat === 'pdf' && (t.extras.includes('PDF') || t.format === 'pdf')) ||
      (selectedFormat === 'infographics' && t.extras.includes('Infographic'));
    const matchesAge =
      selectedAge === 'all' ||
      (selectedAge === 'adults' && (t.age.includes('Adult') || t.age.includes('All'))) ||
      (selectedAge === 'children' && (t.age.includes('Children') || t.age.includes('All'))) ||
      (selectedAge === 'teens' && (t.age.includes('Teen') || t.age.includes('All'))) ||
      (selectedAge === 'seniors' && t.age.includes('All'));

    return matchesQuery && matchesFormat && matchesAge;
  });

  const activeTopic = topics.find((t) => t.id === activeModalTopic);

  return (
    <DashboardShell pageTitle="Oral Health Topics & Categories" showBack>
      <EducationSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Header & Search Bar */}
        <section className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Oral Health Topics &amp; Categories
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-secondary font-bold">
                  {filteredTopics.length} of {topics.length} Verified Educational Materials
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/patient-dashboard/education/saved')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm font-semibold transition-colors"
            >
              <Icon name="bookmark" className="text-primary text-[18px]" />
              <span>Saved Items ({savedTopics.length})</span>
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, symptoms, conditions, or clinical care guides..."
              className="w-full h-12 pl-10 pr-10 rounded-2xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-md border border-outline-variant/30 focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-on-surface"
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            )}
          </div>

          {/* Filter Pills Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-label-md">
            <span className="font-label-sm text-on-surface-variant font-bold uppercase tracking-wider mr-1">
              Format:
            </span>
            {(['all', 'articles', 'videos', 'pdf', 'infographics'] as FormatFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFormat(f)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-colors ${
                  selectedFormat === f
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {f === 'all'
                  ? 'All Formats'
                  : f === 'articles'
                  ? 'Articles (42)'
                  : f === 'videos'
                  ? 'Videos (18)'
                  : f === 'pdf'
                  ? 'PDF Guides (12)'
                  : 'Infographics'}
              </button>
            ))}
          </div>

          {/* Age Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-outline-variant/20 text-label-sm">
            <span className="font-label-sm text-on-surface-variant font-bold uppercase tracking-wider mr-1 flex items-center gap-1">
              <Icon name="groups" className="text-[15px]" />
              Age:
            </span>
            {(['all', 'adults', 'children', 'teens', 'seniors'] as AgeFilter[]).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setSelectedAge(a)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  selectedAge === a
                    ? 'bg-secondary text-on-secondary font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {a === 'all'
                  ? 'All Ages'
                  : a === 'adults'
                  ? 'Adults'
                  : a === 'children'
                  ? 'Children (0–12)'
                  : a === 'teens'
                  ? 'Teens'
                  : 'Seniors'}
              </button>
            ))}
          </div>
        </section>

        {/* Clinical Quality Assurance Seal Card */}
        <section className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
                DHA Quality Standard
              </span>
              <span className="text-outline text-label-sm">• Federal Clinical Compliance</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              All educational topics are authored or peer-reviewed by DHA-licensed clinicians and verified against federal UAE dental healthcare standards.
            </p>
          </div>
        </section>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTopics.map((topic) => (
            <article
              key={topic.id}
              onClick={() => setActiveModalTopic(topic.id)}
              className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 hover:border-primary hover:shadow-md transition-all flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl ${topic.iconColor} flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      <Icon name={topic.icon} className="text-[26px]" />
                    </div>
                    <div>
                      <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                        {topic.badge}
                      </span>
                      <h2 className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors">
                        {topic.title}
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleSave(topic.id, e)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:text-primary transition-colors"
                    aria-label="Save topic"
                  >
                    <Icon
                      name={savedTopics.includes(topic.id) ? 'bookmark' : 'bookmark_border'}
                      className="text-[22px] text-primary"
                    />
                  </button>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                  {topic.description}
                </p>

                {/* Content breakdown tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-on-surface-variant flex items-center gap-1">
                    <Icon name="article" className="text-[14px] text-primary" />
                    <span>{topic.articles}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-on-surface-variant flex items-center gap-1">
                    <Icon name="videocam" className="text-[14px] text-tertiary" />
                    <span>{topic.videos}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-on-surface-variant flex items-center gap-1">
                    <Icon name="description" className="text-[14px] text-secondary" />
                    <span>{topic.extras}</span>
                  </span>
                </div>
              </div>

              {/* Footer Metadata */}
              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between text-body-sm">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface font-semibold">
                    {topic.age}
                  </span>
                  <span className="flex items-center gap-1 font-label-sm text-secondary font-bold">
                    <Icon name="verified" className="text-[14px]" />
                    <span>DHA Reviewed</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 font-title-sm text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Explore</span>
                  <Icon name="arrow_forward" className="text-[16px]" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Topic Detail Modal */}
        {activeTopic && (
          <div
            className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setActiveModalTopic(null)}
          >
            <div
              className="bg-surface-container-lowest rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b border-outline-variant/30 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${activeTopic.iconColor} flex items-center justify-center`}>
                    <Icon name={activeTopic.icon} className="text-[26px]" />
                  </div>
                  <div>
                    <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                      {activeTopic.badge}
                    </span>
                    <h3 className="font-headline-sm font-bold text-on-surface">{activeTopic.title}</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalTopic(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {activeTopic.description}
              </p>

              <div className="p-4 bg-surface-container-low rounded-2xl space-y-2">
                <span className="font-label-sm text-primary font-bold uppercase tracking-wider block">
                  Available Media Resources in This Topic
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-surface-container rounded-xl font-label-md font-semibold text-on-surface">
                    {activeTopic.articles}
                  </div>
                  <div className="p-2 bg-surface-container rounded-xl font-label-md font-semibold text-on-surface">
                    {activeTopic.videos}
                  </div>
                  <div className="p-2 bg-surface-container rounded-xl font-label-md font-semibold text-on-surface">
                    {activeTopic.extras}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalTopic(null);
                    navigate('/patient-dashboard/education/daily-care');
                  }}
                  className="flex-1 py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Icon name="menu_book" className="text-[18px]" />
                  <span>Open Full Clinical Guide</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalTopic(null);
                    navigate('/patient-dashboard/education/videos');
                  }}
                  className="px-4 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-title-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Icon name="play_arrow" className="text-[18px] text-primary" />
                  <span>Video</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </DashboardShell>
  );
}

