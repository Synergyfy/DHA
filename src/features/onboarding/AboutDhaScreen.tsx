import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../design/Button';
import { ScreenHeader } from '../../design/ScreenHeader';
import { Icon } from '../../design/Primitives';
import { useToast } from '../../design/Toast';
import { aboutFaqs, aboutPillars, aboutStats, aboutSteps } from './aboutContent';

const VIDEO_THUMBNAIL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBJn_rqZLXKYzwKfIt3NIKGdRKltc1VoBH9NOC6lpleeojZxeKIuvnyasckuozuaSMxFqbBI777WLgn0W0UN7sqca9951tztMwXkkSouXQhMRySxUnJIl74dRFzaS1Z3YV2UMBLhG205evr1QBr0BetLNxOlwwb_4s2RZU0NbkjhH2RXgavS4IvAAA66u8IDaZEj3p8gWRrHQu4y-hq2oz0EAyajYB3PxvW98ll8VW0';

/**
 * About DHA — overview & video guide.
 * Route: `/about`
 *
 * Publicly accessible education/about content (no patient context required).
 * The FAQ accordion is interactive; the video is presented as a demonstration
 * placeholder since no media service is connected in this frontend build.
 */
export function AboutDhaScreen() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoStarted, setVideoStarted] = useState(false);

  return (
    <div className="min-h-dvh bg-surface pb-safe">
      <ScreenHeader title="About DHA" />

      <main className="mx-auto flex w-full max-w-content flex-col px-gutter pb-10 pt-header md:px-gutter-tablet lg:px-gutter-desktop xl:max-w-[80rem]">
        {/* Intro */}
        <div className="mx-auto w-full max-w-4xl pb-space-md pt-space-xs">
          <span className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-secondary-container/50 px-space-xs py-1">
            <Icon name="verified" filled className="text-[14px] text-secondary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-secondary-container">
              Official Oral Health Record
            </span>
          </span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface lg:text-headline-lg">
            About DHA
          </h2>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant lg:max-w-2xl">
            The unified oral-health ecosystem connecting clinics, schools and families.
          </p>
        </div>

        {/* Video (demonstration placeholder) */}
        <div className="mb-space-lg mx-auto w-full max-w-5xl">
          <div className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-inverse-surface shadow-md">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${VIDEO_THUMBNAIL}')` }}
              role="img"
              aria-label="Dental team consulting a family in a modern clinic"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent" />

            <div className="pointer-events-none absolute inset-x-space-xs top-space-xs flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-full bg-inverse-surface/85 px-space-xs py-1 font-label-sm text-label-sm text-inverse-on-surface backdrop-blur-md">
                <Icon name="shield" className="text-[14px] text-secondary-fixed" />
                DHA Official
              </span>
              <div className="flex items-center gap-1">
                <span className="rounded-full bg-surface/85 px-space-xs py-1 font-label-sm text-label-sm text-on-surface backdrop-blur-md">
                  CC
                </span>
                <span className="rounded-full bg-on-surface/70 px-space-xs py-1 font-label-sm text-label-sm text-surface backdrop-blur-md">
                  2:45 min
                </span>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {!videoStarted && (
                  <span className="absolute h-16 w-16 animate-ping rounded-full bg-primary/30" />
                )}
                <button
                  type="button"
                  aria-label={videoStarted ? 'Pause video' : 'Play video'}
                  aria-pressed={videoStarted}
                  onClick={() => {
                    setVideoStarted((v) => !v);
                    showToast(
                      videoStarted
                        ? 'Video paused — demonstration only'
                        : 'Video playback is simulated in this frontend build',
                      'success',
                    );
                  }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-lowest/95 text-primary shadow-lg backdrop-blur-md transition-all active:scale-95 group-hover:scale-110"
                >
                  <Icon
                    name={videoStarted ? 'pause' : 'play_arrow'}
                    filled
                    className={`text-[32px] ${videoStarted ? '' : 'ml-1'}`}
                  />
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-on-background via-on-background/70 to-transparent p-space-sm">
              <p className="flex items-center gap-1 font-title-sm text-title-sm text-surface-bright">
                <span>Watch: How DHA Protects Your Smile</span>
                <Icon name="arrow_forward" className="text-[16px] text-secondary-fixed" />
              </p>
              <div className="mt-space-2xs h-1 w-full overflow-hidden rounded-full bg-surface-container-highest/40">
                <div
                  className={`h-full rounded-full bg-secondary-fixed transition-all duration-1000 ${
                    videoStarted ? 'w-3/4' : 'w-2/5'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Intro card */}
        <div className="mb-space-lg mx-auto w-full max-w-4xl">
          <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm">
            <div className="flex items-start gap-space-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                <Icon name="account_balance" className="text-[24px]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-title-md text-title-md text-on-surface">
                  The Unified Oral Health Standard
                </h3>
                <p className="mt-1 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                  DHA unites licensed private clinics, public healthcare centres, school screening
                  units and diagnostic services under one connected record — so your history is
                  available where you need it, with its source and date intact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Four Core Pillars */}
        <div className="mb-space-lg mx-auto w-full max-w-4xl">
          <div className="mb-space-xs flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Four Core Pillars</h3>
            <span className="font-label-sm font-bold uppercase tracking-wider text-primary">
              Verified Care
            </span>
          </div>
          <div className="grid grid-cols-1 gap-space-xs sm:grid-cols-2">
            {aboutPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex items-start gap-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${pillar.iconClass}`}
                >
                  <Icon name={pillar.icon} filled className="text-[20px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-title-sm text-title-sm text-on-surface">{pillar.title}</h4>
                    <span
                      className={`rounded-full px-2 py-0.5 font-label-sm font-semibold ${pillar.badgeClass}`}
                    >
                      {pillar.badge}
                    </span>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network reach */}
        <div className="mb-space-lg mx-auto w-full max-w-4xl">
          <div className="rounded-xl bg-surface-container-high p-space-md">
            <div className="mb-space-xs flex items-center gap-space-2xs">
              <Icon name="insights" className="text-[20px] text-primary" />
              <h3 className="font-title-md text-title-md text-on-surface">Network Reach at a Glance</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-space-xs text-center">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-lg bg-surface-container-lowest p-2"
                >
                  <span
                    className={`font-headline-sm text-headline-sm ${
                      stat.tone === 'primary' ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-center font-label-sm text-label-sm text-outline">
              Clinic and screening figures are demonstration data for this frontend build.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-space-lg mx-auto w-full max-w-4xl">
          <h3 className="mb-space-xs font-headline-sm text-headline-sm text-on-surface">
            How It Works
          </h3>
          <div className="grid grid-cols-1 gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm md:grid-cols-3">
            {aboutSteps.map((step, i) => (
              <div key={step.title} className="flex items-start gap-space-sm md:flex-col">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-container font-label-md text-label-md text-on-primary-container">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-title-sm text-title-sm text-on-surface">{step.title}</h4>
                  <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-space-lg mx-auto w-full max-w-reading">
            <div className="mb-space-xs flex items-center gap-space-2xs">
              <Icon name="help_center" className="text-[20px] text-primary" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Frequently Asked Questions
              </h3>
            </div>
            <div className="space-y-space-xs">
            {aboutFaqs.map((faq, i) => {
              const expanded = openFaq === i;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-content-${i}`}
                    onClick={() => setOpenFaq(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-space-xs p-space-md text-left"
                  >
                    <span className="font-title-sm text-title-sm text-on-surface">
                      {faq.question}
                    </span>
                    <Icon
                      name="expand_more"
                      className={`shrink-0 text-outline transition-transform duration-200 ${
                        expanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-content-${i}`}
                    hidden={!expanded}
                    className="px-space-md pb-space-md"
                  >
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
            </div>
        </div>

        {/* Actions */}
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-space-xs">
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            icon={<Icon name="arrow_forward" className="text-[18px]" />}
          >
            Get Started with DHA
          </Button>
          <Button variant="neutral" size="lg" onClick={() => navigate('/')}>
            Back to Welcome Tour
          </Button>
          <div className="pb-space-md text-center">
            <div className="flex items-center justify-center gap-1 text-on-surface-variant">
              <Icon name="gavel" className="text-[14px]" />
              <span className="font-label-sm text-label-sm">
                Your records remain private until you authorise sharing
              </span>
            </div>
            <p className="mt-0.5 font-label-sm text-label-sm text-outline">
              Source, author and date are preserved on every clinical entry
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
