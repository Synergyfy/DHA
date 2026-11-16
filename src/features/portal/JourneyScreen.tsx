import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalShell } from './PortalShell';
import { Icon } from '../../design/Primitives';

export function JourneyScreen() {
  const navigate = useNavigate();
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  return (
    <PortalShell pageTitle="Dental Health Journey">
      {/* Support Chat Modal */}
      {supportModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSupportModalOpen(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                  <Icon name="support_agent" className="text-[18px]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-on-surface">DHA Care Navigator</h3>
              </div>
              <button
                type="button"
                onClick={() => setSupportModalOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Our certified care navigators assist Lagos patients with record interpretation, insurance pre-authorizations, and clinic discovery.
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Live Hotline:</span>
                <span className="font-bold text-primary font-mono">0800-000-0000 (DHA)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Support Hours:</span>
                <span className="text-on-surface">7:30 AM – 9:00 PM (WAT)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSupportModalOpen(false);
                alert('Connecting to live navigator session...');
              }}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold shadow-xs"
            >
              Start Live Support Session
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-8">
        {/* Top Ambient Banner / Authority Anchor */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/20">
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full self-start">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[11px] text-secondary tracking-wider uppercase font-bold">
              Nigeria Dental Health Authority
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-medium">
            <Icon name="verified_user" className="text-[16px] text-secondary" />
            <span>Official Unified Portal</span>
          </div>
        </div>

        {/* Hero Narrative Block */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold uppercase tracking-wider self-start">
            <Icon name="auto_awesome" className="text-[14px]" />
            <span>Empowering Tools</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-background tracking-tight">
              Everything You Need for Your Dental Health Journey
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-1">
              Empowering tools built to make dental visits clearer, less stressful, and completely transparent across all Nigeria clinics.
            </p>
          </div>

          {/* Care Journey Metric Bar */}
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
                <Icon name="family_restroom" className="text-[20px]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-on-surface">Family Care Hub Active</p>
                <p className="text-xs text-on-surface-variant">4 Profiles Linked &amp; Protected Under Guardian Credentials</p>
              </div>
            </div>
            <Icon name="format_image_left" className="text-primary text-[20px] hidden sm:block" />
          </div>
        </div>

        {/* 4 Interactive Pillar Cards (Responsive 2x2 Grid on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature Card 1: Your Dental Records */}
          <article className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-primary/5 pointer-events-none transition-transform group-hover:scale-125" />
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-xs">
                  <Icon name="browse_gallery" className="text-[26px]" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold">
                  EHR Synced
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-on-surface">
                  Your Dental Records
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Keep your screening results, dental examinations, approved clinical summaries, investigations and treatment history organised in one interactive timeline.
                </p>
              </div>

              {/* Mini Odontogram preview */}
              <div className="bg-surface-container-low/80 rounded-xl p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-on-surface font-medium">
                  <Icon name="dentistry" className="text-[18px] text-secondary" />
                  <span>FDI 32-Tooth Digital Odontogram</span>
                </div>
                <span className="text-[10px] text-secondary font-semibold bg-surface-container-lowest px-2 py-0.5 rounded shadow-2xs">
                  Updated Today
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/portal/better-way')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors"
            >
              <span>Explore Records &amp; Odontogram</span>
              <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" />
            </button>
          </article>

          {/* Feature Card 2: Find Dentists and Clinics */}
          <article className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-secondary/5 pointer-events-none transition-transform group-hover:scale-125" />
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-secondary shadow-xs">
                  <Icon name="domain_verification" className="text-[26px]" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold">
                  <Icon name="verified" className="text-[12px]" />
                  <span>Verified Licensure</span>
                </div>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-on-surface">
                  Find Dentists and Clinics
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Discover DHA providers, explore services and specialities, view verified credentials and request real-time appointments.
                </p>
              </div>

              {/* Clinic Trust Badges Preview */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl bg-surface-container-low flex items-center gap-2">
                  <Icon name="distance" className="text-[16px] text-primary" />
                  <span className="text-xs text-on-surface">Nearest: 1.4 km</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-low flex items-center gap-2">
                  <Icon name="medical_services" className="text-[16px] text-secondary" />
                  <span className="text-xs text-on-surface">184 Clinics</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/portal/find-care')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors"
            >
              <span>Browse Accredited Clinics</span>
              <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" />
            </button>
          </article>

          {/* Feature Card 3: Reminders and Follow-ups */}
          <article className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-tertiary/5 pointer-events-none transition-transform group-hover:scale-125" />
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-tertiary shadow-xs">
                  <Icon name="notifications_active" className="text-[26px]" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold">
                  Auto Alerts
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-on-surface">
                  Reminders and Follow-ups
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Stay informed about oral care habits, check-ups, appointments and dentist-recommended follow-ups with automatic notifications.
                </p>
              </div>

              {/* Next Scheduled Micro Cue */}
              <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <Icon name="event_repeat" className="text-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-on-surface truncate">Semi-Annual Hygiene Recall</p>
                  <p className="text-[11px] text-on-surface-variant">Recommended in 3 weeks</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/portal/family-care')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors"
            >
              <span>View Care Timelines</span>
              <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" />
            </button>
          </article>

          {/* Feature Card 4: Learn About Oral Health */}
          <article className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-secondary-container/20 pointer-events-none transition-transform group-hover:scale-125" />
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-xs">
                  <Icon name="menu_book" className="text-[26px]" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold">
                  Family Edition
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-on-surface">
                  Learn About Oral Health
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Explore helpful articles, clinician videos, interactive guides and age-appropriate educational content for children.
                </p>
              </div>

              {/* Kid-friendly & Media Snippet Bar */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl bg-surface-container-low flex items-center gap-1.5">
                  <Icon name="videocam" className="text-[16px] text-primary" />
                  <span className="text-xs text-on-surface">Doctor Videos</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-low flex items-center gap-1.5">
                  <Icon name="smart_toy" className="text-[16px] text-secondary" />
                  <span className="text-xs text-on-surface">Kids Quizzes</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/oral-health-guides')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors"
            >
              <span>Access Free Health Guides</span>
              <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" />
            </button>
          </article>
        </div>

        {/* Reassuring Bottom Support Strip */}
        <div className="bg-surface-container rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 border border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
              <Icon name="support_agent" className="text-[22px]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-on-surface">Need help understanding records?</p>
              <p className="text-xs text-on-surface-variant">Connect with a DHA Dental Care Navigator</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSupportModalOpen(true)}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 active:scale-95 transition-transform shadow-sm hover:bg-primary-container"
            aria-label="Support chat"
          >
            <Icon name="chat" className="text-[20px]" />
          </button>
        </div>
      </div>
    </PortalShell>
  );
}

