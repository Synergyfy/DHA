import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

type AssessmentStatus = 'normal' | 'abnormal' | 'not_assessed';

export function ExtraoralExaminationScreen() {
  const navigate = useNavigate();
  const [openCards, setOpenCards] = useState<string[]>(['card-1', 'card-4']);
  const [symmetryStatus, setSymmetryStatus] = useState<AssessmentStatus>('normal');
  const [swellingStatus, setSwellingStatus] = useState<AssessmentStatus>('normal');
  const [lymphStatus, setLymphStatus] = useState<AssessmentStatus>('normal');
  const [tmjStatus, setTmjStatus] = useState<AssessmentStatus>('normal');
  const [lipStatus, setLipStatus] = useState<AssessmentStatus>('normal');
  const [openingMm, setOpeningMm] = useState<number>(45);
  const [photoAttached, setPhotoAttached] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    if (openCards.includes(id)) {
      setOpenCards(openCards.filter((c) => c !== id));
    } else {
      setOpenCards([...openCards, id]);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <ExaminationShell
      pageTitle="Extraoral Examination"
      badgeCode="10.6"
      badgeLabel="Module 2 of 8"
      currentStep="Module 2: Head, Neck & TMJ Assessment"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Module Progress Pill Bar */}
        <section className="bg-surface-container-high px-4 py-3 rounded-2xl shadow-sm flex items-center justify-between text-xs border border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-secondary">Module 2 of 8</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-primary">
            <span>Extraoral Assessment</span>
            <Icon name="health_and_safety" className="text-base" />
          </div>
        </section>

        {/* Patient Summary Card */}
        <section className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-surface-variant flex items-center justify-center text-primary font-bold text-base shrink-0">
                CO
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-on-surface">Chinedu Okafor</h3>
                <p className="text-xs text-on-surface-variant">DHA-10482 • 34y Male</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-secondary bg-secondary-container px-2.5 py-0.5 rounded-full">
                Verified Clinical
              </span>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Dr. Daniel James</p>
            </div>
          </div>

          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden flex">
            <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '25%' }} />
          </div>
        </section>

        {/* 6 Collapsible Extraoral Assessment Cards */}
        <div className="space-y-3.5">
          {/* Card 1: Facial Symmetry & Proportions */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleCard('card-1')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="face" className="text-lg" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-on-surface truncate">Facial Symmetry & Proportions</span>
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                  </div>
                  <span className="text-xs text-secondary font-medium">Status: {symmetryStatus === 'normal' ? 'Normal' : symmetryStatus}</span>
                </div>
              </div>
              <Icon
                name="expand_more"
                className={`text-outline transition-transform duration-200 ${openCards.includes('card-1') ? 'rotate-180' : ''}`}
              />
            </button>

            {openCards.includes('card-1') && (
              <div className="px-5 pb-5 pt-1 space-y-4 border-t border-outline-variant/20">
                {/* Status Toggle */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container rounded-xl text-center text-xs">
                  {(['normal', 'abnormal', 'not_assessed'] as AssessmentStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSymmetryStatus(st)}
                      className={`py-2 rounded-lg font-bold transition-all capitalize ${
                        symmetryStatus === st
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="bg-surface-container-low rounded-xl p-3.5 text-xs space-y-1.5 text-on-surface">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                    Clinical Observation
                  </span>
                  <p className="leading-relaxed">
                    Symmetrical facial contours. Bilateral nasolabial folds normal. No visible swelling, gross facial asymmetry, or muscle hypertrophy.
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 text-secondary font-semibold text-[11px]">
                    <Icon name="verified" className="text-xs" />
                    <span>Midface & Mandibular Plane: Level</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Facial Swelling & Cutaneous Lesions */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleCard('card-2')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="dermatology" className="text-lg" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm text-on-surface truncate block">Facial Swelling & Cutaneous Lesions</span>
                  <span className="text-xs text-secondary font-medium">Status: {swellingStatus}</span>
                </div>
              </div>
              <Icon
                name="expand_more"
                className={`text-outline transition-transform duration-200 ${openCards.includes('card-2') ? 'rotate-180' : ''}`}
              />
            </button>

            {openCards.includes('card-2') && (
              <div className="px-5 pb-5 pt-1 space-y-4 border-t border-outline-variant/20">
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container rounded-xl text-center text-xs">
                  {(['normal', 'abnormal', 'not_assessed'] as AssessmentStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSwellingStatus(st)}
                      className={`py-2 rounded-lg font-bold transition-all capitalize ${
                        swellingStatus === st
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="bg-surface-container-low rounded-xl p-3.5 text-xs text-on-surface space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                    Inspection & Palpation Findings
                  </span>
                  <p className="leading-relaxed">
                    Skin intact, no draining sinus tract, no erythema or localized submandibular induration.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Lymph Nodes */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleCard('card-3')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="adjust" className="text-lg" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm text-on-surface truncate block">Lymph Nodes (Cervical, Submandibular, Submental)</span>
                  <span className="text-xs text-secondary font-medium">Status: {lymphStatus}</span>
                </div>
              </div>
              <Icon
                name="expand_more"
                className={`text-outline transition-transform duration-200 ${openCards.includes('card-3') ? 'rotate-180' : ''}`}
              />
            </button>

            {openCards.includes('card-3') && (
              <div className="px-5 pb-5 pt-1 space-y-4 border-t border-outline-variant/20">
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container rounded-xl text-center text-xs">
                  {(['normal', 'abnormal', 'not_assessed'] as AssessmentStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setLymphStatus(st)}
                      className={`py-2 rounded-lg font-bold transition-all capitalize ${
                        lymphStatus === st
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="bg-surface-container-low rounded-xl p-3.5 text-xs text-on-surface space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                    Palpation Assessment
                  </span>
                  <p className="leading-relaxed">
                    Bilateral submandibular and cervical lymph chain non-palpable, mobile, non-tender to manual palpation.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card 4: TMJ & Jaw Function */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleCard('card-4')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="record_voice_over" className="text-lg" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm text-on-surface truncate block">TMJ & Jaw Function</span>
                  <span className="text-xs text-secondary font-medium">Status: {tmjStatus} ({openingMm} mm opening)</span>
                </div>
              </div>
              <Icon
                name="expand_more"
                className={`text-outline transition-transform duration-200 ${openCards.includes('card-4') ? 'rotate-180' : ''}`}
              />
            </button>

            {openCards.includes('card-4') && (
              <div className="px-5 pb-5 pt-1 space-y-4 border-t border-outline-variant/20">
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container rounded-xl text-center text-xs">
                  {(['normal', 'abnormal', 'not_assessed'] as AssessmentStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setTmjStatus(st)}
                      className={`py-2 rounded-lg font-bold transition-all capitalize ${
                        tmjStatus === st
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {/* Opening Range Metric Dial */}
                <div className="p-3.5 bg-surface-container rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-on-surface uppercase tracking-wider text-[11px] block">
                      Max Interincisal Opening
                    </span>
                    <span className="text-secondary font-semibold">Within normal limits (40–50 mm)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOpeningMm(Math.max(30, openingMm - 1))}
                      className="w-7 h-7 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-base text-primary font-mono w-10 text-center">
                      {openingMm}mm
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpeningMm(Math.min(60, openingMm + 1))}
                      className="w-7 h-7 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-3.5 text-xs text-on-surface space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                    Deviations & Joint Sounds
                  </span>
                  <p className="leading-relaxed">
                    Smooth midline opening path without S-curve deviation. Absence of clicking, reciprocal pop, or crepitus on lateral pole palpation.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card 5: Lips & Perioral Tissues */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleCard('card-5')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="sentiment_satisfied" className="text-lg" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm text-on-surface truncate block">Lips & Perioral Tissues</span>
                  <span className="text-xs text-secondary font-medium">Status: {lipStatus}</span>
                </div>
              </div>
              <Icon
                name="expand_more"
                className={`text-outline transition-transform duration-200 ${openCards.includes('card-5') ? 'rotate-180' : ''}`}
              />
            </button>

            {openCards.includes('card-5') && (
              <div className="px-5 pb-5 pt-1 space-y-4 border-t border-outline-variant/20">
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container rounded-xl text-center text-xs">
                  {(['normal', 'abnormal', 'not_assessed'] as AssessmentStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setLipStatus(st)}
                      className={`py-2 rounded-lg font-bold transition-all capitalize ${
                        lipStatus === st
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="bg-surface-container-low rounded-xl p-3.5 text-xs text-on-surface space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                    Observations
                  </span>
                  <p className="leading-relaxed">
                    Vermilion borders distinct and intact bilaterally. Competent lip seal established at rest. No angular cheilitis, herpetic crusting, or mucosal fissuring.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card 6: Clinical Photography */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="photo_camera" className="text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">Clinical Photography</h3>
                  <span className="text-xs text-secondary font-medium">
                    {photoAttached ? '1 Media Asset Attached' : 'No photo attached'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full">
                Consent Verified
              </span>
            </div>

            {photoAttached && (
              <div className="relative bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20">
                <div className="w-full h-44 sm:h-52 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                    alt="Facial Frontal Neutral"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 text-white text-xs">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold">Facial Frontal Neutral</span>
                      <span className="font-mono text-[11px] opacity-80">RAW_0028.DNG</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between text-xs bg-surface-container-lowest">
                  <span className="text-secondary font-semibold flex items-center gap-1 text-[11px]">
                    <Icon name="verified_user" className="text-xs" />
                    <span>DHA / GDPR Signed Patient Record</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoAttached(false);
                      showToast('Photo asset removed.');
                    }}
                    className="text-error hover:text-on-error-container p-1 rounded-lg"
                    title="Remove Asset"
                  >
                    <Icon name="delete" className="text-base" />
                  </button>
                </div>
              </div>
            )}

            {!photoAttached && (
              <button
                type="button"
                onClick={() => {
                  setPhotoAttached(true);
                  showToast('Captured extraoral frontal photo.');
                }}
                className="w-full py-3 bg-surface-container-high hover:bg-surface-variant text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="add_a_photo" className="text-base" />
                <span>+ Capture / Attach Extraoral Photo</span>
              </button>
            )}
          </div>
        </div>

        {/* Clinical Protocol Disclaimer */}
        <div className="p-4 rounded-2xl bg-surface-container-low flex items-start gap-3 text-xs text-on-surface-variant border border-outline-variant/20">
          <Icon name="info" className="text-secondary text-lg shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Structured extraoral findings reflect preliminary clinical evaluation options pending final Dr. Daniel James validation.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate('/examination/soft-tissue')}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <span>Proceed to Intraoral Soft Tissue (Section 3)</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => showToast('Extraoral assessment progress saved.')}
              className="h-10 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Icon name="save" className="text-sm text-secondary" />
              <span>Save Progress</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/examination/workspace')}
              className="h-10 bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span>Back to Workspace</span>
            </button>
          </div>
        </div>
      </div>
    </ExaminationShell>
  );
}
export default ExtraoralExaminationScreen;

