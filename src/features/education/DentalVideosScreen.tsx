import { useState } from 'react';
import { DashboardShell } from '../dashboard/DashboardShell';
import { EducationSubNav } from './EducationSubNav';
import { Icon } from '../../design/Primitives';

export function DentalVideosScreen() {
  // Video Player Micro-interactions State
  const [isPlaying, setIsPlaying] = useState(false);
  const [ccOn, setCcOn] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1); // 0:35 active
  const [audioMode, setAudioMode] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const chapters = [
    {
      time: '0:00',
      title: 'Introduction to sulcular plaque',
      desc: 'Why subgingival bacteria cause gum inflammation and bleeding.',
      caption: '"Subgingival bacteria collect in the gingival sulcus, causing inflammatory bleeding if left uncleaned."',
    },
    {
      time: '0:35',
      title: 'How to hold the brush at exactly 45 degrees',
      desc: 'Directing bristles toward the gum line without aggressive pressure.',
      caption: '"Angle the bristle tips gently into the gingival sulcus at exactly 45 degrees to the tooth axis..."',
    },
    {
      time: '1:15',
      title: 'The gentle vibrating motion along the gingival margin',
      desc: 'Short horizontal back-and-forth micro-strokes followed by a roll.',
      caption: '"Use short, vibrating horizontal micro-strokes without scrubbing, then sweep downward across the crown."',
    },
    {
      time: '2:05',
      title: "The 'spit, don't rinse' post-brushing protocol",
      desc: 'Allowing high-fluoride toothpaste residue to rebuild enamel overnight.',
      caption: '"Spit the excess paste into the sink, but do not rinse with water to let the fluoride ions protect your teeth."',
    },
  ];

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <DashboardShell pageTitle="Dental Education Videos" showBack>
      <EducationSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Share Toast */}
        {shareToast && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-secondary text-[20px]" />
            <span className="font-title-sm font-semibold">Video link copied to clipboard!</span>
          </div>
        )}

        {/* Video Player & Main Details Section (Two Columns on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Player & Active Details (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 16:9 Realistic Video Player Mockup */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-lg group select-none">
              {/* Poster Image */}
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                alt="Modified Bass Brushing Masterclass"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isPlaying ? 'opacity-90' : 'opacity-75'
                }`}
              />

              {/* Top Overlay Controls */}
              <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="bg-error text-on-error font-label-sm text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    Featured
                  </span>
                  <span className="bg-black/60 text-white font-mono text-[11px] px-2 py-0.5 rounded">
                    1080p HD
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCcOn(!ccOn)}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold tracking-tight transition-colors ${
                      ccOn ? 'bg-secondary text-on-secondary' : 'bg-black/60 text-white'
                    }`}
                  >
                    CC {ccOn ? 'ON' : 'OFF'}
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Streaming quality: 1080p 60fps (DHA CDN Mirror).')}
                    className="p-1 text-white hover:text-secondary-fixed transition-colors"
                    aria-label="Settings"
                  >
                    <Icon name="settings" className="text-[20px]" />
                  </button>
                </div>
              </div>

              {/* Center Play / Pause Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  <Icon
                    name={isPlaying ? 'pause' : 'play_arrow'}
                    className="text-[36px] translate-x-0.5"
                  />
                </button>
              </div>

              {/* Closed Captions Overlay */}
              {ccOn && (
                <div className="absolute bottom-12 inset-x-4 flex justify-center text-center">
                  <p className="bg-black/80 backdrop-blur-sm text-white font-body-sm px-4 py-1.5 rounded-xl shadow max-w-[90%] leading-relaxed border border-white/10">
                    {chapters[activeChapterIndex].caption}
                  </p>
                </div>
              )}

              {/* Bottom Player Scrub Bar & Controls */}
              <div className="absolute bottom-0 inset-x-0 px-4 py-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-1.5">
                {/* Progress Bar */}
                <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden relative cursor-pointer">
                  <div
                    className="bg-secondary h-full rounded-full relative"
                    style={{
                      width:
                        activeChapterIndex === 0
                          ? '15%'
                          : activeChapterIndex === 1
                          ? '43%'
                          : activeChapterIndex === 2
                          ? '70%'
                          : '92%',
                    }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-white text-[12px] font-mono">
                  <div className="flex items-center gap-2">
                    <Icon name={audioMode ? 'headphones' : 'volume_up'} className="text-[17px]" />
                    <span>{chapters[activeChapterIndex].time} / 2:45</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/80 font-sans font-medium text-[11px]">
                      {chapters[activeChapterIndex].title}
                    </span>
                    <button
                      type="button"
                      onClick={() => alert('Full screen mode triggered.')}
                      aria-label="Full screen"
                    >
                      <Icon name="fullscreen" className="text-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Details Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm uppercase tracking-wider font-bold">
                  Verified Clinical Masterclass
                </span>
                <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Mastering the Modified Bass Brushing Method
                </h1>
              </div>

              {/* Presenter Profile Strip */}
              <div className="flex items-center justify-between bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center shrink-0 font-title-sm">
                    MH
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-title-sm font-bold text-on-surface truncate">
                        Dr. Amina Bello
                      </span>
                      <Icon name="verified" className="text-secondary text-[16px]" />
                    </div>
                    <p className="font-body-sm text-on-surface-variant truncate">
                      DHA Dental Hygienist Specialist • Clinical Faculty
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-label-sm text-outline block">Total Run Time</span>
                  <span className="font-title-sm font-bold text-primary">2m 45s</span>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="flex flex-wrap items-center gap-3 text-on-surface-variant font-body-sm pt-1">
                <span className="flex items-center gap-1">
                  <Icon name="videocam" className="text-[18px] text-secondary" />
                  <span>1080p Clinical Recording</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Icon name="science" className="text-[18px] text-tertiary" />
                  <span>Adult Sulcular Technique</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <Icon name="verified_user" className="text-[18px]" />
                  <span>DHA Accredited Guide</span>
                </span>
              </div>

              {/* Quick Toolbar */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-colors ${
                    isSaved
                      ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Icon name={isSaved ? 'bookmark' : 'bookmark_add'} className="text-[20px]" />
                  <span className="font-label-sm mt-1">{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <Icon name="share" className="text-[20px] text-secondary" />
                  <span className="font-label-sm mt-1">Share</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudioMode(!audioMode)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-colors ${
                    audioMode
                      ? 'bg-secondary-container text-on-secondary-container font-bold'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Icon name="headphones" className="text-[20px] text-tertiary" />
                  <span className="font-label-sm mt-1">{audioMode ? 'Audio ON' : 'Audio'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTranscriptOpen(!transcriptOpen)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-colors ${
                    transcriptOpen
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Icon name="subtitles" className="text-[20px]" />
                  <span className="font-label-sm mt-1">Transcript</span>
                </button>
              </div>

              {/* Collapsible Interactive Transcript Drawer */}
              {transcriptOpen && (
                <div className="mt-3 bg-surface-container-low rounded-2xl p-4 space-y-3 border border-outline-variant/30 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Icon name="notes" className="text-secondary text-[20px]" />
                      <span className="font-title-sm font-bold text-on-surface">
                        Interactive Clinical Transcript
                      </span>
                    </div>
                    <span className="font-label-sm text-secondary bg-surface-container-lowest px-2.5 py-0.5 rounded-full font-bold">
                      4 Chapters
                    </span>
                  </div>

                  <p className="font-body-sm text-on-surface-variant">
                    Click any timestamp below to scrub directly to that clinical step:
                  </p>

                  <div className="space-y-2">
                    {chapters.map((chap, idx) => {
                      const isActive = activeChapterIndex === idx;
                      return (
                        <div
                          key={chap.time}
                          onClick={() => {
                            setActiveChapterIndex(idx);
                            setIsPlaying(true);
                          }}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-secondary-container/40 border-secondary shadow-xs'
                              : 'bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container'
                          }`}
                        >
                          <span
                            className={`font-mono text-label-sm px-2 py-0.5 rounded font-bold shrink-0 ${
                              isActive
                                ? 'bg-secondary text-on-secondary'
                                : 'bg-surface-container-high text-primary'
                            }`}
                          >
                            {chap.time}
                          </span>
                          <div className="space-y-0.5 min-w-0">
                            <span
                              className={`font-title-sm block ${
                                isActive ? 'text-secondary font-bold' : 'text-on-surface font-semibold'
                              }`}
                            >
                              {chap.title}
                            </span>
                            <p className="font-body-sm text-on-surface-variant leading-relaxed">
                              {chap.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Clinical Reassurance Callout */}
            <div className="bg-secondary-container/30 p-4 rounded-2xl border border-secondary/20 flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                <Icon name="verified_user" className="text-[20px]" />
              </div>
              <p className="font-body-sm text-on-surface leading-relaxed">
                <strong className="font-title-sm text-secondary">Clinical Reassurance:</strong> All demonstration videos are produced under Nigeria Dental Health Authority clinical guidelines to educate and reassure patients.
              </p>
            </div>
          </div>

          {/* Right Column: Playlists, Queue & Progress (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Learning Streak & Milestone Card */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/15 to-primary-container/10 p-5 rounded-3xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                  <Icon name="verified" className="text-[26px]" />
                </div>
                <div>
                  <h3 className="font-title-md font-bold text-on-surface">Oral Health Scholar</h3>
                  <p className="font-body-sm text-on-surface-variant">
                    3 / 5 preventative technique modules completed
                  </p>
                </div>
              </div>

              {/* Progress Circle SVG */}
              <div className="w-14 h-14 relative flex items-center justify-center shrink-0">
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-high"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="60, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute font-label-sm font-bold text-secondary">60%</span>
              </div>
            </div>

            {/* Up Next & Recommended Queue */}
            <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-title-md font-bold text-on-surface">Up Next &amp; Recommended</h3>
                  <p className="font-body-sm text-on-surface-variant">Curated for your oral care path</p>
                </div>
                <span className="bg-surface-container-high text-primary font-label-sm px-2.5 py-1 rounded-full font-bold">
                  Auto-Play ON
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Flossing Tight Contacts without Gum Snapping',
                    speaker: 'Dr. Layla Haddad',
                    duration: '1:50',
                    badge: 'Hygiene Essentials',
                    badgeColor: 'text-primary',
                    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=400&q=80',
                  },
                  {
                    title: "What Happens During a Child's First Dental Checkup",
                    speaker: 'DHA Pediatric Board',
                    duration: '3:20',
                    badge: 'Family & Kids',
                    badgeColor: 'text-secondary',
                    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
                  },
                  {
                    title: 'How Sonic Toothbrushes Remove Plaque Biofilm',
                    speaker: 'DHA Bio-Research Unit',
                    duration: '2:10',
                    badge: 'Technology & Care',
                    badgeColor: 'text-tertiary',
                    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80',
                  },
                  {
                    title: 'Emergency First Aid for Knocked-Out Teeth',
                    speaker: 'DHA Urgent Trauma Care',
                    duration: '3:05',
                    badge: 'Immediate Protocol',
                    badgeColor: 'text-error font-bold',
                    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
                  },
                ].map((q) => (
                  <div
                    key={q.title}
                    onClick={() => alert(`Now playing: ${q.title}`)}
                    className="p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center gap-3 cursor-pointer group border border-outline-variant/20"
                  >
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-container">
                      <img src={q.image} alt={q.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-white/90 text-primary flex items-center justify-center shadow">
                          <Icon name="play_arrow" className="text-[18px] translate-x-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/75 text-white font-mono text-[10px] px-1 rounded">
                        {q.duration}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <h4 className="font-title-sm text-title-sm text-on-surface font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                        {q.title}
                      </h4>
                      <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-[12px] truncate">
                        <Icon name="stethoscope" className="text-[14px] text-secondary" />
                        <span className="truncate">{q.speaker}</span>
                      </div>
                      <span className={`font-label-sm text-[11px] block ${q.badgeColor}`}>
                        {q.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Playlists Carousel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-title-md font-bold text-on-surface">Clinical Playlists</h3>
                  <p className="font-body-sm text-on-surface-variant">Modules for the whole family</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Brushing Mastery', count: '5 videos', cat: 'Preventive', bg: 'bg-primary-fixed' },
                  { title: 'Kids Dental Fun', count: '6 videos', cat: 'Pediatric', bg: 'bg-secondary-fixed' },
                  { title: 'Orthodontics', count: '4 videos', cat: 'Specialty', bg: 'bg-tertiary-fixed' },
                  { title: 'Procedures', count: '8 videos', cat: 'Clinical', bg: 'bg-surface-container-high' },
                ].map((pl) => (
                  <div
                    key={pl.title}
                    onClick={() => alert(`Opening playlist: ${pl.title}`)}
                    className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary transition-all cursor-pointer space-y-1 shadow-sm"
                  >
                    <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                      {pl.cat}
                    </span>
                    <h4 className="font-title-sm font-bold text-on-surface truncate">{pl.title}</h4>
                    <span className="font-label-sm text-on-surface-variant">{pl.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
