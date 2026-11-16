import { useState } from 'react';
import { DashboardShell } from '../dashboard/DashboardShell';
import { EducationSubNav } from './EducationSubNav';
import { Icon } from '../../design/Primitives';

type RoutineTrack = 'morning' | 'evening' | 'ortho' | 'kids';

export function DailyCareGuidesScreen() {
  const [activeTrack, setActiveTrack] = useState<RoutineTrack>('morning');
  const [reminderActive, setReminderActive] = useState(true);
  const [streakCount, setStreakCount] = useState(14);
  const [searchQuery, setSearchQuery] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    floss: true,
    mouthwash: false,
    aligner: false,
    travel: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleReminder = () => {
    if (reminderActive) {
      setReminderActive(false);
    } else {
      setReminderActive(true);
      setStreakCount((s) => s + 1);
    }
  };

  return (
    <DashboardShell pageTitle="Daily Oral Care Guides" showBack>
      <EducationSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top App Sub-Bar & Audio Assist */}
        <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Daily Oral Care Protocols
            </h1>
            <div className="flex items-center gap-2">
              <Icon name="verified" className="text-secondary text-[16px]" />
              <span className="font-label-sm text-on-surface-variant font-medium">
                Personalized Care Routine for Ngozi Eze (Primary)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Audio Guide Assist Button */}
            <button
              type="button"
              onClick={() => setAudioPlaying(!audioPlaying)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-title-sm font-semibold transition-all shadow-xs cursor-pointer ${
                audioPlaying
                  ? 'bg-secondary text-on-secondary animate-pulse'
                  : 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed'
              }`}
            >
              <Icon name={audioPlaying ? 'volume_up' : 'headphones'} className="text-[20px]" />
              <span>{audioPlaying ? 'Narrating Protocol...' : 'Audio Guide Assist'}</span>
            </button>

            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search habits, aligners..."
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm border border-outline-variant/30 focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Clinical Advisory Banner */}
        <section className="rounded-3xl bg-primary text-on-primary p-6 shadow-md relative overflow-hidden flex items-center justify-between">
          <div className="relative z-10 max-w-2xl space-y-1.5">
            <div className="flex items-center gap-2">
              <Icon name="health_and_safety" className="text-[20px] text-primary-fixed" />
              <span className="font-label-sm uppercase tracking-wider text-primary-fixed font-bold">
                DHA Clinical Advisory Standard
              </span>
            </div>
            <p className="font-body-md text-on-primary font-medium leading-relaxed">
              Practical, evidence-backed daily routines to preserve tooth enamel and eliminate sulcular gum inflammation between biannual clinic examinations.
            </p>
          </div>
          <div className="hidden sm:block opacity-15 pointer-events-none pr-4">
            <Icon name="dentistry" className="text-[96px] text-on-primary" />
          </div>
        </section>

        {/* Habit Track Switcher Pills */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-title-sm font-bold text-on-surface">Select Care Track</span>
            <span className="font-label-sm text-primary font-bold">Synced with DHA Lifecode</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-label-md">
            {[
              { id: 'morning', label: 'Morning Routine (8:00 AM)', icon: 'wb_sunny' },
              { id: 'evening', label: 'Evening Routine (9:30 PM)', icon: 'bedtime' },
              { id: 'ortho', label: 'Braces & Clear Aligners', icon: 'dentistry' },
              { id: 'kids', label: "Children's Hygiene", icon: 'child_care' },
            ].map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveTrack(track.id as RoutineTrack)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold transition-all border ${
                  activeTrack === track.id
                    ? 'bg-primary text-on-primary border-primary shadow-xs'
                    : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant border-outline-variant/30'
                }`}
              >
                <Icon name={track.icon} className="text-[18px]" />
                <span>{track.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Main Routine & Additional Protocols (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Featured Morning Sulcular Routine (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 overflow-hidden">
              {/* Media Header Card */}
              <div className="relative w-full h-44 sm:h-52 bg-surface-container">
                <img
                  src="https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1000&q=80"
                  alt="Morning Sulcular Brushing Protocol"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-bold uppercase mb-1">
                      <Icon name="verified" className="text-[14px]" />
                      <span>Recommended by Dr. Ifeanyi Nwosu</span>
                    </span>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-white">
                      Morning Sulcular Brushing Protocol
                    </h2>
                  </div>
                </div>
              </div>

              {/* Routine Body Content */}
              <div className="p-6 space-y-5">
                {/* What the Habit Is */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-primary font-bold">
                    <Icon name="info" className="text-[18px]" />
                    <span className="font-label-md uppercase tracking-wider">What the Habit Is</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    Morning 2-minute sulcular plaque removal using 1450 ppm fluoride toothpaste before or 30 minutes after breakfast.
                  </p>
                </div>

                {/* Clinical Rationale */}
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-secondary font-bold">
                    <Icon name="science" className="text-[18px]" />
                    <span className="font-label-md uppercase tracking-wider">Clinical Rationale</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Overnight salivary flow decreases significantly, allowing rapid bacterial biofilm multiplication. Morning sulcular brushing halts acid demineralization and cleans nocturnal stagnation.
                  </p>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm font-bold text-on-surface">Step-by-Step Protocol</span>
                    <span className="font-label-sm text-primary font-semibold">2 Minutes Total (30s / Quad)</span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        num: 1,
                        title: 'Clear nocturnal debris',
                        desc: 'Rinse mouth thoroughly with plain water to wash away thick morning saliva and surface debris.',
                      },
                      {
                        num: 2,
                        title: 'Pea-sized paste dosage',
                        desc: 'Apply a pea-sized dot of 1450 ppm fluoride paste directly on dry soft bristles (do not wet the brush).',
                      },
                      {
                        num: 3,
                        title: '45° Sulcular micro-vibration',
                        desc: 'Angle bristles at 45° directly toward the gumline; vibrate in tiny gentle circular strokes for 30s per quadrant.',
                      },
                      {
                        num: 4,
                        title: "Spit, don't rinse protocol",
                        desc: 'Spit excess foam into the sink without rinsing with water, allowing the protective fluoride shield to bond to enamel.',
                      },
                    ].map((step) => (
                      <div
                        key={step.num}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20"
                      >
                        <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-bold font-title-sm shadow-xs">
                          {step.num}
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-title-sm font-bold text-on-surface block">
                            {step.title}
                          </span>
                          <p className="font-body-sm text-on-surface-variant leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Pitfalls to Avoid */}
                <div className="p-4 rounded-2xl bg-error-container/30 border border-error/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-error font-bold">
                    <Icon name="warning" className="text-[18px]" />
                    <span className="font-label-md uppercase tracking-wider">Common Pitfalls to Avoid</span>
                  </div>
                  <ul className="space-y-2 text-body-sm text-on-surface">
                    <li className="flex items-start gap-2">
                      <span className="text-error font-bold shrink-0">❌</span>
                      <span><strong>Rinsing with water immediately:</strong> Flushes away active fluoride before it can bind.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-error font-bold shrink-0">❌</span>
                      <span><strong>Scrubbing horizontally like a saw:</strong> Causes irreversible cervical gum recession and enamel abrasion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-error font-bold shrink-0">❌</span>
                      <span><strong>Brushing right after citrus juices:</strong> Softens enamel; rinse with water and wait 30 minutes.</span>
                    </li>
                  </ul>
                </div>

                {/* Daily Reminder Hub Sync Button */}
                <div className="pt-2 border-t border-outline-variant/30 space-y-2">
                  <button
                    type="button"
                    onClick={handleToggleReminder}
                    className={`w-full py-3.5 px-4 rounded-2xl shadow-sm flex items-center justify-between font-title-sm font-semibold transition-all cursor-pointer ${
                      reminderActive
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon name={reminderActive ? 'alarm_on' : 'alarm_add'} className="text-[20px]" />
                      <span>{reminderActive ? 'Morning Reminder Active (8:00 AM)' : 'Set Morning Reminder'}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-label-sm font-bold ${
                        reminderActive
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {reminderActive ? 'Synced' : 'Paused'}
                    </span>
                  </button>

                  <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-body-sm">
                    <div className="flex items-center gap-2 text-on-surface">
                      <Icon name="verified" className="text-primary text-[18px]" />
                      <span>Synced with DHA Lifecode Reminders</span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary font-bold font-title-sm">
                      <Icon name="local_fire_department" className="text-[18px] text-amber-500 fill-current" />
                      <span>{streakCount}-Day Streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Additional Care Protocols (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-title-sm font-bold text-on-surface">Additional Care Protocols</span>
              <span className="font-label-sm text-on-surface-variant">Tap to inspect steps</span>
            </div>

            {/* Accordion 1: Evening Interdental Flossing */}
            <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('floss')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                    <Icon name="clean_hands" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm font-bold text-on-surface">
                      Evening Interdental Flossing
                    </h3>
                    <p className="font-body-sm text-on-surface-variant">
                      Cleans 35% of tooth surfaces missed by brushing
                    </p>
                  </div>
                </div>
                <Icon
                  name={openAccordions.floss ? 'expand_less' : 'expand_more'}
                  className="text-[20px] text-on-surface-variant"
                />
              </button>

              {openAccordions.floss && (
                <div className="px-5 pb-5 pt-1 space-y-3 bg-surface-container-lowest border-t border-outline-variant/20">
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Biofilm builds up inside tight interproximal contacts where saliva cannot penetrate. Flossing disrupts anaerobic bacteria colonies before sleep.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-on-surface font-body-sm">
                    <div className="p-2.5 rounded-xl bg-surface-container">1. Use 45cm waxed string</div>
                    <div className="p-2.5 rounded-xl bg-surface-container">2. Hug C-shape curve</div>
                    <div className="p-2.5 rounded-xl bg-surface-container">3. Slide sub-gingivally</div>
                    <div className="p-2.5 rounded-xl bg-surface-container">4. Clean fresh segment</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Evening 9:30 PM reminder set.')}
                    className="w-full py-2.5 rounded-xl bg-surface-container-high text-primary font-title-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors"
                  >
                    <Icon name="alarm_add" className="text-[18px]" />
                    <span>Set Reminder (9:30 PM)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 2: Fluoride Mouthwash */}
            <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('mouthwash')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                    <Icon name="medication_liquid" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm font-bold text-on-surface">
                      Fluoride Mouthwash Protocol
                    </h3>
                    <p className="font-body-sm text-secondary font-semibold">
                      Rx Remineralization Synced
                    </p>
                  </div>
                </div>
                <Icon
                  name={openAccordions.mouthwash ? 'expand_less' : 'expand_more'}
                  className="text-[20px] text-on-surface-variant"
                />
              </button>

              {openAccordions.mouthwash && (
                <div className="px-5 pb-5 pt-1 space-y-3 bg-surface-container-lowest border-t border-outline-variant/20">
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Prescribed therapeutic rinse for remineralizing micro-cavities. Use at midday, completely separated from your toothbrushing routine.
                  </p>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container text-body-sm">
                    <span className="font-medium text-on-surface">Dosage: 10ml for 1 minute</span>
                    <span className="text-error font-bold">Do not swallow</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Midday 2:00 PM rinse reminder set.')}
                    className="w-full py-2.5 rounded-xl bg-surface-container-high text-primary font-title-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors"
                  >
                    <Icon name="alarm_add" className="text-[18px]" />
                    <span>Set Midday Reminder (2:00 PM)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 3: Clear Aligner Cadence */}
            <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('aligner')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                    <Icon name="dentistry" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm font-bold text-on-surface">
                      Invisalign &amp; Aligner Cadence
                    </h3>
                    <p className="font-body-sm text-on-surface-variant">
                      Daily tray sanitization &amp; soaking
                    </p>
                  </div>
                </div>
                <Icon
                  name={openAccordions.aligner ? 'expand_less' : 'expand_more'}
                  className="text-[20px] text-on-surface-variant"
                />
              </button>

              {openAccordions.aligner && (
                <div className="px-5 pb-5 pt-1 space-y-3 bg-surface-container-lowest border-t border-outline-variant/20">
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Soak aligners in lukewarm effervescent crystal bath while eating meals. Never use boiling water as heat permanently warps polymer tooth tracking.
                  </p>
                  <button
                    type="button"
                    onClick={() => alert('Aligner cleaning reminder activated.')}
                    className="w-full py-2.5 rounded-xl bg-surface-container-high text-primary font-title-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors"
                  >
                    <Icon name="alarm_add" className="text-[18px]" />
                    <span>Set Aligner Soak Reminder</span>
                  </button>
                </div>
              )}
            </div>

            {/* Reassurance Footer Quote */}
            <div className="p-5 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-3.5 shadow-xs">
              <div className="w-11 h-11 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="favorite" className="text-[22px]" />
              </div>
              <p className="font-title-sm text-title-sm text-on-surface-variant leading-relaxed">
                “Consistency beats intensity. 2 minutes twice a day maintains lifelong oral health.”
              </p>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}

