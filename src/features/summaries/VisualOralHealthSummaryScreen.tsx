import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

type SegmentView = 'chart' | 'spotlight' | 'comparison';

export function VisualOralHealthSummaryScreen() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState<SegmentView>('spotlight');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <SummaryShell
      pageTitle="Visual Oral-Health Summary"
      badgeCode="12.14"
      badgeLabel="Visual Patient Summary"
      currentStep="Visual Summary"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Patient Context Badge & Subtitle */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]" />
              <span className="font-bold text-sm text-[#131b2e]">Amara Okafor</span>
              <span className="text-xs text-[#707881]">34y Female • DHA-2026-00451</span>
            </div>
            <div className="bg-[#faf8ff] border border-[#eaedff] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs text-[#006194] font-medium">
              <Icon name="verified" className="text-[14px]" />
              <span>Dr. Daniel James (#DEN-48912)</span>
            </div>
          </div>
          <p className="text-xs text-[#707881]">
            Visual summary generated from approved clinical records (12 Oct 2026)
          </p>
        </section>

        {/* Segmented View Selector Pills */}
        <div className="bg-[#eaedff] p-1 rounded-xl flex items-center gap-1 text-center">
          <button
            type="button"
            onClick={() => setActiveSegment('chart')}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
              activeSegment === 'chart'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            Dental Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveSegment('spotlight')}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
              activeSegment === 'spotlight'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            Tooth #16 Spotlight
          </button>
          <button
            type="button"
            onClick={() => setActiveSegment('comparison')}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
              activeSegment === 'comparison'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            Before &amp; After
          </button>
        </div>

        {/* Tooth #16 Spotlight Visual Breakdown Card */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-bold text-base">
                16
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#131b2e] leading-tight">
                  Tooth #16 Anatomy Breakdown
                </h3>
                <p className="text-xs text-[#707881]">Upper Right First Molar • Localized Dentin Lesion</p>
              </div>
            </div>
            <span className="bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold px-3 py-1 rounded-full uppercase">
              Needs Filling
            </span>
          </div>

          {/* Anatomical Cross-Section Graphic SVG */}
          <div className="bg-[#faf8ff] rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden border border-[#eaedff]">
            <div className="w-full max-w-[320px] aspect-[4/3] relative">
              <svg
                className="w-full h-full drop-shadow-sm"
                fill="none"
                viewBox="0 0 280 210"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Bone base */}
                <path d="M20 185 Q 140 205 260 185 L 260 210 L 20 210 Z" fill="#E2E7FF" />
                <text className="text-[10px] fill-[#707881] font-sans" textAnchor="middle" x="140" y="202">
                  Healthy Bone &amp; Periodontal Ligament
                </text>
                {/* Gum Line */}
                <path
                  d="M15 145 C 55 125, 95 160, 140 148 C 185 136, 225 155, 265 142 L 265 185 L 15 185 Z"
                  fill="#FFDAD6"
                  opacity="0.6"
                />
                {/* Roots & Crown (Outer Enamel Shell) */}
                <path
                  d="M 80 175 C 75 140, 60 100, 60 70 C 60 30, 95 20, 140 20 C 185 20, 220 30, 220 70 C 220 100, 205 140, 200 175 C 190 180, 175 180, 165 160 C 155 140, 145 135, 140 135 C 135 135, 125 140, 115 160 C 105 180, 90 180, 80 175 Z"
                  fill="#FFFFFF"
                  stroke="#BFC7D2"
                  strokeWidth="2"
                />
                {/* Dentin Layer (Protective Zone) */}
                <path
                  d="M 90 160 C 86 130, 78 95, 78 72 C 78 40, 105 32, 140 32 C 175 32, 202 40, 202 72 C 202 95, 194 130, 190 160 C 180 165, 170 150, 162 135 C 152 118, 145 115, 140 115 C 135 115, 128 118, 118 135 C 110 150, 100 165, 90 160 Z"
                  fill="#89F5E7"
                  opacity="0.35"
                />
                {/* Pulp Chamber & Root Canals (Healthy Nerve cyan zone) */}
                <path
                  d="M 120 155 C 118 135, 110 105, 110 85 C 110 65, 122 55, 140 55 C 158 55, 170 65, 170 85 C 170 105, 162 135, 160 155 C 155 145, 148 110, 140 110 C 132 110, 125 145, 120 155 Z"
                  fill="#287AB3"
                />
                {/* Active Cavity / Decay (Red highlight in Dentin) */}
                <ellipse cx="178" cy="54" fill="#BA1A1A" rx="14" ry="11" />
                <ellipse cx="178" cy="54" fill="#93000A" rx="9" ry="7" />
                {/* Callout pointer 1: Cavity */}
                <line
                  stroke="#BA1A1A"
                  strokeDasharray="2 2"
                  strokeWidth="1.5"
                  x1="192"
                  x2="235"
                  y1="52"
                  y2="40"
                />
                <circle cx="235" cy="40" fill="#BA1A1A" r="3" />
                {/* Callout pointer 2: Pulp chamber safety buffer */}
                <line
                  stroke="#006194"
                  strokeDasharray="2 2"
                  strokeWidth="1.5"
                  x1="140"
                  x2="60"
                  y1="80"
                  y2="95"
                />
                <circle cx="60" cy="95" fill="#006194" r="3" />
              </svg>

              {/* Floating Annotation Labels */}
              <div className="absolute top-4 right-1 bg-white shadow-xs border border-[#eaedff] rounded-lg p-2 max-w-[120px] text-right pointer-events-none">
                <p className="text-xs text-[#ba1a1a] font-bold leading-tight">Dentin Cavity</p>
                <p className="text-[10px] text-[#707881] leading-tight">Confined decay</p>
              </div>
              <div className="absolute top-16 left-0 bg-white shadow-xs border border-[#eaedff] rounded-lg p-2 max-w-[130px] pointer-events-none">
                <p className="text-xs text-[#006194] font-bold leading-tight">2.1mm Buffer</p>
                <p className="text-[10px] text-[#707881] leading-tight">Pulp safely protected</p>
              </div>
            </div>

            {/* Micro Callouts List */}
            <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="bg-white p-3 rounded-xl border border-[#eaedff] flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#ba1a1a] shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-bold text-[#131b2e]">Active Lesion</p>
                  <p className="text-[11px] text-[#707881]">Cleaned comfortably in ~15 mins</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#eaedff] flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#006a61] shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-bold text-[#131b2e]">Living Pulp</p>
                  <p className="text-[11px] text-[#707881]">Zero nerve involvement confirmed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Legend Bar */}
          <div className="bg-[#faf8ff] rounded-xl p-3 flex items-center justify-around gap-2 text-xs border border-[#eaedff]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ba1a1a]" />
              <span className="font-medium text-[#131b2e]">Decay Spot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#86f2e4]" />
              <span className="font-medium text-[#131b2e]">Sound Dentin</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#006194]" />
              <span className="font-medium text-[#131b2e]">Pulp (Nerve)</span>
            </div>
          </div>
        </section>

        {/* Simplified Full-Mouth Oral Health Overview */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#131b2e] leading-tight">
                Oral Health Overview
              </h3>
              <p className="text-xs text-[#707881]">Dual-arch status mapping</p>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-bold text-[#006194]">31 / 32</span>
              <p className="text-xs text-[#707881]">Sound Teeth</p>
            </div>
          </div>

          {/* Dental Arch Matrix Visual */}
          <div className="bg-[#faf8ff] rounded-2xl p-4 border border-[#eaedff] space-y-4">
            {/* Upper Arch */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="uppercase text-[#707881]">Upper Arch (Maxillary)</span>
                <span className="text-[#ba1a1a] font-bold">Tooth #16 Active</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
                {[18, 17].map((num) => (
                  <div
                    key={num}
                    className="w-7 h-9 rounded-lg bg-white border border-[#eaedff] flex items-center justify-center font-mono text-xs text-[#707881]"
                  >
                    {num}
                  </div>
                ))}
                {/* 16 Highlighted Error */}
                <div className="w-7 h-9 rounded-lg bg-[#ba1a1a] text-white flex flex-col items-center justify-center font-mono text-xs font-bold shadow-xs">
                  <span>16</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
                </div>
                {/* 15 Watch Blue */}
                <div className="w-7 h-9 rounded-lg bg-[#eaedff] text-[#006194] border border-[#006194]/30 flex flex-col items-center justify-center font-mono text-xs font-bold">
                  <span>15</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006194] mt-0.5" />
                </div>
                {[14, 13, 12, 11, 21, 22, 23].map((num) => (
                  <div
                    key={num}
                    className="w-7 h-9 rounded-lg bg-white border border-[#eaedff] flex items-center justify-center font-mono text-xs text-[#707881]"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Lower Arch */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="uppercase text-[#707881]">Lower Arch (Mandibular)</span>
                <span className="text-[#006a61] font-bold">#46 Intact (2023)</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
                {[48, 47].map((num) => (
                  <div
                    key={num}
                    className="w-7 h-9 rounded-lg bg-white border border-[#eaedff] flex items-center justify-center font-mono text-xs text-[#707881]"
                  >
                    {num}
                  </div>
                ))}
                {/* 46 Restored Teal */}
                <div className="w-7 h-9 rounded-lg bg-[#86f2e4] text-[#006a61] flex flex-col items-center justify-center font-mono text-xs font-bold">
                  <span>46</span>
                  <Icon name="check" className="text-[10px] text-[#006a61]" />
                </div>
                {[45, 44, 43, 42, 41, 31, 32, 33].map((num) => (
                  <div
                    key={num}
                    className="w-7 h-9 rounded-lg bg-white border border-[#eaedff] flex items-center justify-center font-mono text-xs text-[#707881]"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arch Key Badges */}
          <div className="flex items-center flex-wrap gap-2 pt-1 text-xs">
            <span className="bg-[#ffdad6] text-[#ba1a1a] px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" /> 1 Needs Filling (#16)
            </span>
            <span className="bg-[#eaedff] text-[#006194] px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006194]" /> 1 Watch &amp; Protect (#15)
            </span>
            <span className="bg-[#86f2e4]/40 text-[#006a61] px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006a61]" /> 1 Sound Restored (#46)
            </span>
          </div>
        </section>

        {/* Proposed Treatment Visual Explanation */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006194] flex items-center justify-center">
              <Icon name="medical_services" className="text-[22px]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#131b2e] leading-tight">
                How Your Filling Works
              </h3>
              <p className="text-xs text-[#707881]">Simple, pain-free 3-step restorative process</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#006194] text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#131b2e]">Micro-Cleaning</h4>
                <p className="text-xs text-[#707881] mt-0.5 leading-relaxed">
                  Gentle removal of softened bacteria under comfortable local numbing. Only the affected tooth zone is touched.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#006194] text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#131b2e]">Biomimetic Layering</h4>
                <p className="text-xs text-[#707881] mt-0.5 leading-relaxed">
                  Application of tooth-colored ceramic composite resin that seamlessly bonds and replicates natural enamel strength.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#006194] text-white flex items-center justify-center text-xs font-bold shrink-0">
                3
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#131b2e]">Light Cure &amp; Polish</h4>
                <p className="text-xs text-[#707881] mt-0.5 leading-relaxed">
                  A safe blue light hardens the restoration in seconds, followed by micro-polishing to match your original natural bite.
                </p>
              </div>
            </div>
          </div>

          {/* Reassuring Patient Callout */}
          <div className="bg-[#86f2e4]/30 rounded-xl p-3.5 flex items-center gap-3 border border-[#86f2e4]/50">
            <div className="w-9 h-9 rounded-full bg-[#006a61] text-white flex items-center justify-center shrink-0">
              <Icon name="sentiment_satisfied" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[#131b2e] leading-tight">
                Anticipated Time: 35 Minutes
              </p>
              <p className="text-xs text-[#707881]">
                Normal chewing restored immediately after appointment.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md p-4 -mx-4 sm:mx-0 rounded-t-2xl sm:rounded-2xl border-t sm:border border-[#eaedff] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => showToast('Opening patient mobile app view simulator')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#c2d1e0] text-[#131b2e] hover:bg-[#f2f3ff] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="smartphone" className="text-[16px]" />
              <span>App Preview</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Downloading patient infographic PDF')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#c2d1e0] text-[#131b2e] hover:bg-[#f2f3ff] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-[16px]" />
              <span>Download PDF</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate('/summaries/review-approval')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#006194] hover:bg-[#004e78] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#006194]/20 transition-all hover:scale-[1.02]"
          >
            <span>Attach to Final Review (12.15)</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>
      </div>
    </SummaryShell>
  );
}
