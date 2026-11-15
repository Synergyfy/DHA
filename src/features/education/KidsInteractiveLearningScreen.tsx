import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { EducationSubNav } from './EducationSubNav';
import { Icon } from '../../design/Primitives';

type KidsTab = 'quiz' | 'teeth' | 'snacks' | 'steps';

interface ToothMember {
  id: string;
  title: string;
  speech: string;
  icon: string;
  letter: string;
}

export function KidsInteractiveLearningScreen() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<KidsTab>('quiz');
  const [stars, setStars] = useState(12);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quizSelected, setQuizSelected] = useState<number | null>(2);
  const [activeToothId, setActiveToothId] = useState('incisor');
  const [sparkleAnim, setSparkleAnim] = useState(false);

  const teethMembers: ToothMember[] = [
    {
      id: 'molar-left',
      title: 'Molar Max (Back Tooth)',
      speech: 'Crunch crunch! I am your wide Molar! I grind healthy nuts, seeds, and broccoli into smooth bites for easy tummy digestion!',
      icon: 'grain',
      letter: 'M',
    },
    {
      id: 'canine-left',
      title: 'Canine Captain (Corner Tooth)',
      speech: 'Arrr! I am your pointy Canine! I grip yummy whole-wheat pita bread and crunchy apples firmly so you can bite cleanly!',
      icon: 'change_history',
      letter: 'C',
    },
    {
      id: 'incisor',
      title: 'The Sharp Incisor (Front Tooth)',
      speech: 'Hi Tariq! I am your Incisor! I cut your apples, cucumbers, and carrots like tiny sharp scissors! 🥕',
      icon: 'content_cut',
      letter: 'I',
    },
    {
      id: 'canine-right',
      title: 'Canine Captain (Right Corner)',
      speech: 'Captain Canine reporting! I hold onto food while you chew so nothing slips away!',
      icon: 'change_history',
      letter: 'C',
    },
    {
      id: 'molar-right',
      title: 'Molar Max (Right Molar)',
      speech: 'Molar Max here! Together we mash up yummy dinners so you grow big and strong!',
      icon: 'grain',
      letter: 'M',
    },
  ];

  const currentTooth = teethMembers.find((t) => t.id === activeToothId) || teethMembers[2];

  const triggerSparkleReward = () => {
    setStars((s) => s + 1);
    setSparkleAnim(true);
    setTimeout(() => setSparkleAnim(false), 800);
  };

  const handleToothClick = (id: string) => {
    setActiveToothId(id);
    triggerSparkleReward();
  };

  const cycleNextTooth = () => {
    const currentIndex = teethMembers.findIndex((t) => t.id === activeToothId);
    const nextIndex = (currentIndex + 1) % teethMembers.length;
    setActiveToothId(teethMembers[nextIndex].id);
    triggerSparkleReward();
  };

  return (
    <DashboardShell pageTitle="Children's Interactive Dental Quest" showBack>
      <EducationSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Kid Navigation Top Bar */}
        <section className="bg-surface-container-lowest shadow-sm rounded-3xl p-4 border border-outline-variant/30 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/patient-dashboard/education')}
            className="flex items-center gap-1.5 text-secondary font-title-sm px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
          >
            <Icon name="arrow_back" className="text-[18px]" />
            <span>Back to Education</span>
          </button>

          {/* Tariq's Avatar & Live Star Counter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md font-bold">
              <Icon name="face" className="text-[17px] text-secondary" />
              <span>Tariq (Age 6)</span>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all shadow-xs"
              aria-label="Toggle Sound"
            >
              <Icon name={soundEnabled ? 'volume_up' : 'volume_off'} className="text-[20px]" />
            </button>

            {/* Sparkle Star Counter */}
            <div
              className={`flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shadow-xs transition-transform ${
                sparkleAnim ? 'scale-125' : ''
              }`}
            >
              <Icon name="star" className="text-amber-500 text-[20px] fill-current" />
              <span className="font-headline-sm font-bold text-amber-800">{stars}</span>
              <span className="font-label-sm font-semibold text-amber-700 hidden sm:inline">Stars</span>
            </div>
          </div>
        </section>

        {/* Adventure Mission Banner */}
        <section className="relative overflow-hidden bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-bold uppercase tracking-wide">
                Daily Mission
              </span>
              <span className="text-secondary font-title-sm font-bold">Ready to sparkle?</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
              Tariq's Interactive Dental Quest
            </h1>
            <p className="font-body-md text-on-surface-variant">
              Explore 4 fun mini-games to master brushing habits and earn your daily Super Tooth shield badge!
            </p>
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-primary-fixed text-primary flex items-center justify-center shrink-0 shadow-sm">
            <Icon name="auto_awesome" className="text-[36px] sm:text-[44px]" />
          </div>
        </section>

        {/* 4 Activity Thumb Tabs */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container p-1.5 rounded-2xl">
          {[
            { id: 'quiz', label: 'Dental Quiz', icon: 'quiz' },
            { id: 'teeth', label: 'Teeth Team', icon: 'sentiment_satisfied' },
            { id: 'snacks', label: 'Super Snacks', icon: 'nutrition' },
            { id: 'steps', label: 'Brush Steps', icon: 'checklist' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as KidsTab)}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl font-title-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name={tab.icon} className="text-[20px]" />
              <span>{tab.label}</span>
            </button>
          ))}
        </section>

        {/* Dynamic Activity Panels */}
        <section>
          {/* ACTIVITY A: DENTAL QUIZ */}
          {activeTab === 'quiz' && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center font-title-sm">
                    A
                  </span>
                  <h2 className="font-headline-sm font-bold text-on-surface">The 2-Minute Quest</h2>
                </div>
                <span className="font-label-md px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                  Toothbrush Mastery
                </span>
              </div>

              {/* Question Box */}
              <div className="bg-surface-container-low rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                  <Icon name="cleaning_services" className="text-[28px]" />
                </div>
                <div>
                  <span className="font-label-sm text-secondary uppercase tracking-wider font-bold block">
                    Question 1 of 1
                  </span>
                  <h3 className="font-title-md font-bold text-on-surface">
                    How many times should you brush your teeth every day? 🩺
                  </h3>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {[
                  { num: 1, text: 'Once a day', correct: false },
                  { num: 2, text: 'Twice a day (Morning & Night)', subtitle: 'Super tooth shield activated!', correct: true },
                  { num: 3, text: 'Five times a day', correct: false },
                ].map((opt) => {
                  const isChosen = quizSelected === opt.num;
                  return (
                    <button
                      key={opt.num}
                      type="button"
                      onClick={() => {
                        setQuizSelected(opt.num);
                        if (opt.correct) triggerSparkleReward();
                      }}
                      className={`w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all border cursor-pointer ${
                        isChosen && opt.correct
                          ? 'bg-secondary-container border-secondary text-on-secondary-container shadow-sm scale-[1.01]'
                          : isChosen
                          ? 'bg-surface-container border-primary text-on-surface'
                          : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/20 text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-title-sm font-bold ${
                            isChosen && opt.correct
                              ? 'bg-secondary text-on-secondary'
                              : 'bg-surface-container-highest text-on-surface'
                          }`}
                        >
                          {opt.num}
                        </span>
                        <div>
                          <span className="font-title-md font-bold block">{opt.text}</span>
                          {opt.subtitle && (
                            <span className="font-body-sm opacity-90">{opt.subtitle}</span>
                          )}
                        </div>
                      </div>

                      <Icon
                        name={isChosen && opt.correct ? 'check_circle' : 'radio_button_unchecked'}
                        className={`text-[24px] ${
                          isChosen && opt.correct ? 'text-secondary' : 'text-outline-variant'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Feedback Card */}
              {quizSelected === 2 && (
                <div className="bg-surface-container-high rounded-2xl p-5 space-y-3 shadow-xs border border-secondary/30">
                  <div className="flex items-center gap-2 text-secondary font-bold font-title-md">
                    <Icon name="celebration" className="text-[24px]" />
                    <span>Hooray, Tariq! 🎉 +1 Sparkle Star</span>
                  </div>
                  <p className="font-body-md text-on-surface leading-relaxed">
                    Brushing once right after waking up and once right before sweet dreams keeps the plaque bugs away! You protect your enamel armor all night long!
                  </p>
                  <div className="flex items-center gap-2 bg-surface-container-lowest p-3 rounded-xl text-primary font-label-md font-semibold">
                    <Icon name="timer" className="text-[20px]" />
                    <span>Pro Tip: Brush for a full 2 minutes — hum your favorite song twice!</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ACTIVITY B: MEET THE MOUTH TEAM */}
          {activeTab === 'teeth' && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center font-title-sm">
                    B
                  </span>
                  <h2 className="font-headline-sm font-bold text-on-surface">Meet the Mouth Team</h2>
                </div>
                <span className="font-label-md px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                  Interactive Dental Arch
                </span>
              </div>

              {/* Interactive Dental Arch Graphic */}
              <div className="bg-surface-container-low rounded-3xl p-6 flex flex-col items-center space-y-4">
                <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
                  Tariq's Upper &amp; Lower Teeth Friends
                </span>

                <div className="flex items-center justify-center gap-3 py-2 flex-wrap">
                  {teethMembers.map((tooth) => {
                    const isSelected = activeToothId === tooth.id;
                    return (
                      <button
                        key={tooth.id}
                        type="button"
                        onClick={() => handleToothClick(tooth.id)}
                        className={`w-12 h-16 rounded-2xl flex flex-col items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-on-primary scale-110 shadow-md ring-4 ring-primary-fixed'
                            : 'bg-surface-container-highest hover:bg-primary-fixed text-on-surface'
                        }`}
                        title={tooth.title}
                      >
                        <Icon name={tooth.icon} className="text-[20px]" />
                        <span className="font-title-sm font-bold mt-0.5">{tooth.letter}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="w-48 h-2.5 rounded-full bg-secondary-container"></div>
                <p className="font-body-sm text-on-surface-variant text-center">
                  Tap any tooth friend above to learn their special superpower!
                </p>
              </div>

              {/* Tooth Speech Bubble */}
              <div className="relative bg-secondary-container text-on-secondary-container rounded-3xl p-5 shadow-sm space-y-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-xs">
                    <Icon name={currentTooth.icon} className="text-[26px]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-title-md font-bold">{currentTooth.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm font-semibold">
                        Superpower Active
                      </span>
                    </div>
                    <p className="font-body-md text-[15px] leading-relaxed italic">
                      “{currentTooth.speech}”
                    </p>
                  </div>
                </div>
              </div>

              {/* Cycle Button */}
              <button
                type="button"
                onClick={cycleNextTooth}
                className="w-full py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-title-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Icon name="smart_toy" className="text-[20px]" />
                <span>Next Tooth Superpower (+1 Star)</span>
              </button>
            </div>
          )}

          {/* ACTIVITY C: SUPER SNACKS */}
          {activeTab === 'snacks' && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center font-title-sm">
                    C
                  </span>
                  <h2 className="font-headline-sm font-bold text-on-surface">Super Snacks</h2>
                </div>
                <span className="font-label-md px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                  Food Choices
                </span>
              </div>

              <div className="bg-surface-container-low rounded-2xl p-4">
                <p className="font-title-sm text-primary font-bold">
                  Which snack makes your teeth happy and strong?
                </p>
              </div>

              {/* Snack Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Super Strong Snack */}
                <div className="bg-surface-container-lowest rounded-3xl p-5 border-2 border-secondary shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-3xl">
                      <span>🍎</span>
                      <span>🥛</span>
                    </div>
                    <Icon name="health_and_safety" className="text-secondary text-[28px]" />
                  </div>
                  <div>
                    <h4 className="font-title-md font-bold text-on-surface">
                      Crisp Crunchy Apple &amp; Milk Cup
                    </h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Natural water crunch + rich calcium enamel shield
                    </p>
                  </div>
                  <div className="w-full py-2.5 px-3 rounded-xl bg-secondary-container text-on-secondary-container font-label-md font-bold text-center">
                    Super Strong Food! Enamel Approved! ✨
                  </div>
                </div>

                {/* Sticky Snack Caution */}
                <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-3xl">
                      <span>🍬</span>
                      <span>🍭</span>
                    </div>
                    <Icon name="water_drop" className="text-amber-600 text-[28px]" />
                  </div>
                  <div>
                    <h4 className="font-title-md font-bold text-on-surface">
                      Sticky Sour Gummy Candy
                    </h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Tends to linger deep inside tooth grooves
                    </p>
                  </div>
                  <div className="w-full py-2.5 px-3 rounded-xl bg-surface-container-high text-on-surface font-label-md font-semibold text-center">
                    Sugar Bugs Love This! Swish water right after! 💧
                  </div>
                </div>
              </div>

              {/* Non-shaming Friendly Coaching Notice */}
              <div className="bg-surface-container-low rounded-2xl p-4 flex items-start gap-3 border border-outline-variant/20">
                <div className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                  <Icon name="favorite" className="text-[20px]" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-title-sm font-bold text-secondary">
                    Every snack has a smart secret!
                  </h5>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Crunchy apples and cool milk wipe teeth naturally like miniature toothbrooms. When you enjoy sticky celebration treats, just swish with fresh water right after to wash away sneaky sugars!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVITY D: BRUSH STEPS */}
          {activeTab === 'steps' && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center font-title-sm">
                    D
                  </span>
                  <h2 className="font-headline-sm font-bold text-on-surface">Brushing Steps in Order</h2>
                </div>
                <span className="font-label-md px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                  Routine Mastery
                </span>
              </div>

              <p className="font-body-md text-on-surface-variant">
                Follow Tariq's 4 secret steps every morning and evening:
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: 'Pea-Sized Paste',
                    desc: 'Squeeze just a tiny pea-sized drop of fluoride toothpaste on soft bristles.',
                    icon: 'sanitizer',
                  },
                  {
                    step: 2,
                    title: 'Tiny Gentle Circles',
                    desc: 'Brush at a 45° angle in small playful round circles for two full minutes.',
                    icon: 'sync',
                  },
                  {
                    step: 3,
                    title: 'Gently Sweep Tongue',
                    desc: 'Give your tongue a gentle brush tickle to keep fresh clean breath all day.',
                    icon: 'sentiment_very_satisfied',
                  },
                  {
                    step: 4,
                    title: 'Spit Out Bubbles',
                    desc: 'Spit all foam bubbles into the sink — no swallowing! Leave a shield on your teeth.',
                    icon: 'bubble_chart',
                  },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="flex items-start gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-title-md flex items-center justify-center shrink-0 font-bold">
                      {s.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-title-sm font-bold text-on-surface">{s.title}</h5>
                        <Icon name={s.icon} className="text-secondary text-[22px]" />
                      </div>
                      <p className="font-body-sm text-on-surface-variant mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Activity Completion Bar & Reward Tracker */}
        <section className="bg-secondary-container text-on-secondary-container rounded-3xl p-5 shadow-sm space-y-2 border border-secondary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="verified" className="text-secondary text-[26px]" />
              <span className="font-title-md font-bold">Activity Progress Synced!</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-lowest text-secondary px-3 py-1 rounded-full font-label-md font-bold">
              <span>+1 Sparkle Star Earned</span>
              <span className="text-amber-500">🌟</span>
            </div>
          </div>

          <div className="w-full bg-surface-container-lowest/60 rounded-full h-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full transition-all duration-700 w-[85%]"></div>
          </div>

          <div className="flex items-center justify-between font-label-sm text-on-secondary-container opacity-90 pt-0.5">
            <span>Quest Progress: 3 of 4 Mini-Games completed</span>
            <span className="font-bold">Goal: Super Dentist Badge 🏆</span>
          </div>
        </section>

        {/* Guardian Notice & Privacy Badge */}
        <footer className="text-center space-y-1 pt-2 pb-4">
          <div className="flex items-center justify-center gap-1.5 text-outline font-label-sm font-bold">
            <Icon name="lock" className="text-[16px]" />
            <span>DHA Child Safety &amp; Preventive Health Certified</span>
          </div>
          <p className="font-body-sm text-on-surface-variant max-w-md mx-auto">
            Activities logged to Tariq's preventive learning profile. No data shared publicly.
          </p>
        </footer>
      </main>
    </DashboardShell>
  );
}

