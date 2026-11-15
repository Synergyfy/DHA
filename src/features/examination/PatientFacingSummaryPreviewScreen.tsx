import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

export function PatientFacingSummaryPreviewScreen() {
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [overviewText, setOverviewText] = useState<string>(
    'Thank you for visiting DHA Dental Care today. We completed a full check-up of your teeth, gums, and oral tissues. Here is what we found and the recommended care plan.'
  );
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      showToast("Report successfully approved and published to Chinedu Okafor's DHA Patient Portal!");
    }, 1000);
  };

  return (
    <ExaminationShell
      pageTitle="Patient-Facing Summary Preview"
      badgeCode="10.17"
      badgeLabel="Patient Portal Gate"
      currentStep="Simplified Plain-Language Report Preview"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Overview Banner / Clinical Gate Notice */}
        <section className="bg-surface-container-low rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>{isPublished ? 'Published to Patient Portal' : 'Awaiting Dentist Sign-off'}</span>
            </span>
            <span className="font-mono text-xs text-primary font-bold">DHA-10482</span>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-on-surface">Patient-Facing Summary Preview</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              Review and approve the simplified, anxiety-free plain-language report before releasing it to Chinedu Okafor&apos;s mobile patient portal.
            </p>
          </div>

          {/* Practitioner & Patient Context Ribbon */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-sm border border-outline-variant/20">
              <Icon name="account_circle" className="text-primary text-sm" />
              <span className="text-on-surface font-semibold">Chinedu Okafor (34y M)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-sm border border-outline-variant/20">
              <Icon name="verified_user" className="text-secondary text-sm" />
              <span className="text-on-surface font-semibold">Dr. Daniel James (#DEN-48912)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-sm border border-outline-variant/20">
              <Icon name="calendar_today" className="text-outline text-sm" />
              <span className="text-on-surface-variant font-medium">16 February 2025</span>
            </div>
          </div>
        </section>

        {/* Toolbar: Language & Edit Plaintext */}
        <div className="flex items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-2xl shadow-sm border border-outline-variant/30">
          {/* Language Pill Switcher */}
          <div className="flex items-center p-1 bg-surface-container-low rounded-xl text-xs">
            <button
              type="button"
              onClick={() => {
                setCurrentLang('en');
                showToast('Switched to English View');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                currentLang === 'en'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="translate" className="text-sm" />
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentLang('ar');
                showToast('Switched to Arabic Translation View');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                currentLang === 'ar'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              العربية
            </button>
          </div>

          {/* Quick Action: Edit Preview Text */}
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="h-9 px-3.5 flex items-center gap-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold transition-colors"
          >
            <Icon name="edit_note" className="text-base" />
            <span>Edit Wording</span>
          </button>
        </div>

        {/* Live Patient Portal Device Simulation Card */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-lg border border-outline-variant/30 overflow-hidden flex flex-col">
          {/* Simulated Patient App Bar */}
          <div className="bg-primary px-5 py-3.5 flex items-center justify-between text-on-primary">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <Icon name="local_hospital" className="text-lg text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/80 uppercase tracking-wider font-semibold">Patient Mobile View</span>
                <span className="text-xs sm:text-sm font-bold text-white">DHA Care Portal</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[11px] font-bold">
              Live Preview
            </span>
          </div>

          {/* Friendly Header Banner with Warm Visual Aesthetic */}
          <div className="p-5 sm:p-6 bg-surface-container-low flex flex-col gap-4 border-b border-outline-variant/20">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">Comprehensive Check-up</span>
                <h3 className="text-lg sm:text-xl font-bold text-on-surface mt-0.5">Your Dental Examination Summary</h3>
                <span className="text-xs text-on-surface-variant block mt-1">Visit Date: 16 February 2025 • Central Branch</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0 shadow-sm">
                <Icon name="sentiment_satisfied" className="text-secondary text-2xl" />
              </div>
            </div>

            <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-sm flex items-center gap-3 border border-outline-variant/20">
              <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center shrink-0">
                DJ
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold text-on-surface truncate">Dr. Daniel James</span>
                <span className="text-xs text-on-surface-variant truncate">Lead Examining Dentist • DHA Dental Care</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-on-surface bg-surface-container-lowest/90 p-4 rounded-2xl leading-relaxed border border-outline-variant/20">
              &ldquo;{overviewText}&rdquo;
            </p>
          </div>

          {/* Section: What We Found (Simplified & Visual) */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
                <Icon name="troubleshoot" className="text-primary text-xl" />
                <span>What We Found</span>
              </h4>
              <span className="text-xs text-secondary bg-secondary-container/40 px-2.5 py-0.5 rounded-full font-bold">
                3 Key Insights
              </span>
            </div>

            {/* Finding 1: Tooth 16 / Sensitivity Explained */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 shadow-sm space-y-2.5 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center text-xs font-mono font-bold">
                    16
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-on-surface block">Upper Right Molar</span>
                    <span className="text-[11px] text-on-surface-variant">Tooth #16 Chewing Surface</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 text-xs font-bold">
                  Needs Filling
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                We identified a small cavity on the chewing surface of your upper right molar. This explains the sensitivity to cold drinks you reported. The nerve of the tooth is healthy and can be protected with a tooth-colored filling.
              </p>
              <div className="flex items-center gap-2 bg-surface-container-lowest p-2.5 rounded-xl text-primary text-xs font-semibold border border-outline-variant/20">
                <Icon name="verified" className="text-base text-secondary" />
                <span>Natural tooth structure is well preserved.</span>
              </div>
            </div>

            {/* Finding 2: Gum Health Status */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 shadow-sm space-y-2.5 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <Icon name="spa" className="text-base text-secondary" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-on-surface block">Gum Health</span>
                    <span className="text-[11px] text-on-surface-variant">Gingival Baseline Evaluation</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                  Overall Good
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                Your overall gums are in good shape with mild, localized surface inflammation. A professional cleaning will restore them to complete health.
              </p>
            </div>

            {/* Finding 3: Other Teeth & X-Rays */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 shadow-sm space-y-2.5 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                    <Icon name="radiology" className="text-base" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-on-surface block">Other Teeth & X-Rays</span>
                    <span className="text-[11px] text-on-surface-variant">Full Mouth Radiography Review</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                  Strong Stability
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                Your existing dental filling on your front tooth looks great, and your X-rays showed healthy bone support throughout.
              </p>
            </div>
          </div>

          {/* Section: Next Steps for You */}
          <div className="px-5 sm:px-6 pb-6 space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
              <Icon name="checklist" className="text-secondary text-xl" />
              <span>Next Steps for You</span>
            </h4>

            <div className="space-y-2.5">
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3.5 bg-surface-container-low rounded-2xl shadow-sm border border-outline-variant/20">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  1
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-on-surface">Tooth #16 Composite Restoration</span>
                  <span className="text-xs text-on-surface-variant leading-relaxed">
                    Schedule an appointment for a tooth-colored filling on tooth #16 (estimated 45 mins).
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3.5 bg-surface-container-low rounded-2xl shadow-sm border border-outline-variant/20">
                <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  2
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-on-surface">Professional Dental Hygiene</span>
                  <span className="text-xs text-on-surface-variant leading-relaxed">
                    Routine hygiene cleaning with our dental hygienist to restore gum vitality.
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-3.5 bg-surface-container-low rounded-2xl shadow-sm border border-outline-variant/20">
                <span className="w-6 h-6 rounded-full bg-surface-variant text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  3
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-on-surface">Daily Care & Next Routine Check</span>
                  <span className="text-xs text-on-surface-variant leading-relaxed">
                    Continue brushing twice daily and remember your 6-month check-up in August 2025.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Safeguard & Communication Privacy Notice */}
          <div className="mx-5 sm:mx-6 mb-6 p-4 bg-surface-container rounded-2xl flex items-start gap-3 text-on-surface-variant border border-outline-variant/30">
            <Icon name="shield_with_heart" className="text-primary text-xl shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              <strong className="text-on-surface font-semibold">Privacy & Clarity Safeguard:</strong> Internal clinical diagnostic notes, periodontal millimeters, and surgical terminology have been omitted from this patient summary to ensure clear, anxiety-free communication.
            </p>
          </div>
        </div>

        {/* Dentist Action / Approval Gate Controls */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant flex items-center gap-1.5 font-medium">
              <Icon name="verified" className="text-secondary text-base" />
              <span>Verified by Dr. Daniel James</span>
            </span>
            <span className="font-mono text-outline">Section 10 • Final Gate</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isPublishing || isPublished}
              onClick={handlePublish}
              className={`h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                isPublished
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-primary hover:bg-primary/90 text-on-primary'
              }`}
            >
              {isPublishing ? (
                <>
                  <Icon name="refresh" className="text-base animate-spin" />
                  <span>Publishing to Portal...</span>
                </>
              ) : isPublished ? (
                <>
                  <Icon name="check_circle" className="text-base" />
                  <span>Published to Patient Portal</span>
                </>
              ) : (
                <>
                  <Icon name="send" className="text-base" />
                  <span>Approve & Publish to Patient Portal</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/examination/review')}
              className="h-12 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="keyboard_backspace" className="text-base" />
              <span>Return to Clinical Summary</span>
            </button>
          </div>
        </div>

        {/* Quick Edit Modal Simulation */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-6 border border-outline-variant/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <h3 className="text-sm sm:text-base font-bold text-on-surface">Adjust Plain Wording</h3>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                >
                  <Icon name="close" className="text-sm" />
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-on-surface block">Patient Overview Text</label>
                <textarea
                  value={overviewText}
                  onChange={(e) => setOverviewText(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface resize-none focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    showToast('Plain text updated successfully');
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/review')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Validation Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/recommendations')}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <span>Follow-up Recommendations</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default PatientFacingSummaryPreviewScreen;

