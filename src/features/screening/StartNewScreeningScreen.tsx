import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ScreeningShell } from './ScreeningShell';
import { Icon } from '../../design/Primitives';

export function StartNewScreeningScreen() {
  const [flowMode, setFlowMode] = useState<'record' | 'direct'>('record');
  const [shortcutStatus, setShortcutStatus] = useState<string | null>(null);
  const [activeSymptoms, setActiveSymptoms] = useState<string[]>([
    'toothache',
    'bleeding',
    'chewing',
  ]);
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [duration, setDuration] = useState('2-3');
  const [complaintNotes, setComplaintNotes] = useState(
    'Child reports discomfort when eating crunchy foods on the upper right side. Occasional bleeding noticed during evening toothbrushing.'
  );

  const toggleSymptom = (id: string) => {
    setShortcutStatus(null);
    if (activeSymptoms.includes(id)) {
      setActiveSymptoms(activeSymptoms.filter((s) => s !== id));
    } else {
      setActiveSymptoms([...activeSymptoms, id]);
    }
  };

  const handleShortcut = (val: string) => {
    setShortcutStatus(val);
    setActiveSymptoms([]);
    if (val === 'asymptomatic') {
      setComplaintNotes('Patient explicitly denies pain, sensitivity, or dental discomfort upon screening inquiry.');
    } else if (val === 'unable') {
      setComplaintNotes('Communication or language barrier present; verified verbal complaint unavailable.');
    }
  };

  return (
    <ScreeningShell
      pageTitle="Presenting Complaints & History"
      badgeCode="8.4"
      badgeLabel="Step 3 of 5"
      currentStep={3}
      totalSteps={5}
    >
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Stepper Header */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Step 3 of 5: Presenting Complaint Assessment</span>
            </span>
            <span className="text-on-surface-variant">Subjective Symptoms</span>
          </div>

          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full w-3/5" />
          </div>

          {/* Patient Banner */}
          <div className="p-3 bg-surface-container-low rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center text-xs">
                ZT
              </div>
              <div>
                <span className="font-bold text-on-surface block">Zayd Tariq Okafor</span>
                <span className="text-on-surface-variant font-mono">DHA-P-49102 · Grade 4B</span>
              </div>
            </div>

            <span className="text-primary font-semibold hidden sm:inline">
              Lagos Mainland Community School
            </span>
          </div>
        </section>

        {/* Clinical Note Disclaimer */}
        <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-outline-variant/20 flex items-start gap-2.5 text-xs text-on-surface">
          <Icon name="info" className="text-primary text-[20px] shrink-0 mt-0.5" />
          <p>
            <strong className="text-primary font-semibold">Attribution Protocol:</strong> Patient-reported complaints are distinct from objective screener observations for legal DHA clinical governance.
          </p>
        </div>

        {/* Decision Flow Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFlowMode('record')}
            className={`p-5 rounded-3xl border text-left transition space-y-2 ${
              flowMode === 'record'
                ? 'bg-surface-container-lowest border-primary shadow-sm ring-1 ring-primary'
                : 'bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-sm font-bold text-on-surface">
                1. Record Presenting Complaint
              </span>
              <Icon
                name={flowMode === 'record' ? 'radio_button_checked' : 'radio_button_unchecked'}
                className={`text-[20px] ${flowMode === 'record' ? 'text-primary' : 'text-outline'}`}
              />
            </div>
            <p className="text-xs text-on-surface-variant">
              Patient or guardian reported symptoms prior to visual inspection. Captures history, triggers, and severity.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setFlowMode('direct')}
            className={`p-5 rounded-3xl border text-left transition space-y-2 ${
              flowMode === 'direct'
                ? 'bg-surface-container-lowest border-primary shadow-sm ring-1 ring-primary'
                : 'bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-sm font-bold text-on-surface">
                2. Proceed Direct to Exam
              </span>
              <Icon
                name={flowMode === 'direct' ? 'radio_button_checked' : 'radio_button_unchecked'}
                className={`text-[20px] ${flowMode === 'direct' ? 'text-primary' : 'text-outline'}`}
              />
            </div>
            <p className="text-xs text-on-surface-variant">
              Skip complaint intake if patient self-reports completely asymptomatic. Visual examination begins instantly.
            </p>
          </button>
        </div>

        {/* Active Complaint Form (if flowMode === 'record') */}
        {flowMode === 'record' && (
          <section className="space-y-6">
            {/* Rapid Status Shortcuts */}
            <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Rapid Status Shortcuts:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleShortcut('asymptomatic')}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                    shortcutStatus === 'asymptomatic'
                      ? 'bg-primary-fixed/20 border-primary text-on-surface'
                      : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon name="sentiment_satisfied" className="text-secondary text-[22px]" />
                    <div>
                      <span className="font-bold text-xs text-on-surface block">No complaint reported</span>
                      <span className="text-[11px] text-on-surface-variant">Self-reports comfortable</span>
                    </div>
                  </div>
                  <Icon
                    name={shortcutStatus === 'asymptomatic' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    className="text-[18px] text-primary"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => handleShortcut('unable')}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                    shortcutStatus === 'unable'
                      ? 'bg-primary-fixed/20 border-primary text-on-surface'
                      : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon name="translate" className="text-outline text-[22px]" />
                    <div>
                      <span className="font-bold text-xs text-on-surface block">Unable to obtain</span>
                      <span className="text-[11px] text-on-surface-variant">Language / anxiety barrier</span>
                    </div>
                  </div>
                  <Icon
                    name={shortcutStatus === 'unable' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    className="text-[18px] text-primary"
                  />
                </button>
              </div>
            </div>

            {/* Reported Symptoms Checklist */}
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
                  Reported Symptoms Checklist
                </h3>
                <span className="text-xs font-bold text-primary font-mono">
                  {activeSymptoms.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'toothache', label: 'Toothache', note: 'Upper Right Sector', icon: 'dentistry' },
                  { id: 'bleeding', label: 'Gum bleeding', note: 'During evening brushing', icon: 'water_drop' },
                  { id: 'chewing', label: 'Difficulty chewing', note: 'Right side specific', icon: 'restaurant' },
                  { id: 'swelling', label: 'Swelling', note: 'Localized cheek/jaw', icon: 'bubble_chart' },
                  { id: 'sensitivity', label: 'Tooth sensitivity', note: 'Hot/Cold triggers', icon: 'ac_unit' },
                  { id: 'sores', label: 'Mouth sores', note: 'Aphthous or ulcers', icon: 'radio_button_checked' },
                ].map((symptom) => {
                  const isChecked = activeSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                        isChecked
                          ? 'bg-primary text-on-primary border-primary shadow-xs'
                          : 'bg-surface-container-low border-outline-variant/20 text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={symptom.icon} className={`text-[20px] ${isChecked ? 'text-white' : 'text-primary'}`} />
                        <div>
                          <span className="font-bold text-xs block">{symptom.label}</span>
                          <span className={`text-[10px] ${isChecked ? 'text-white/80' : 'text-on-surface-variant'}`}>
                            {symptom.note}
                          </span>
                        </div>
                      </div>
                      <Icon
                        name={isChecked ? 'check_circle' : 'add_circle'}
                        className={`text-[18px] ${isChecked ? 'text-white' : 'text-outline-variant'}`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Severity & Duration Details */}
              <div className="pt-3 border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface block">
                    Reported Pain Severity
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 bg-surface-container p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setSeverity('mild')}
                      className={`py-2 rounded-lg text-xs font-semibold transition ${
                        severity === 'mild' ? 'bg-secondary-container text-on-secondary-container shadow-xs font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      Mild
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeverity('moderate')}
                      className={`py-2 rounded-lg text-xs font-semibold transition ${
                        severity === 'moderate' ? 'bg-primary text-on-primary shadow-xs font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      Moderate
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeverity('severe')}
                      className={`py-2 rounded-lg text-xs font-semibold transition ${
                        severity === 'severe' ? 'bg-error text-on-error shadow-xs font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      Severe
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface block" htmlFor="duration">
                    Symptom Duration
                  </label>
                  <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-10 px-3 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="under-1">Less than 1 week</option>
                    <option value="1-2">1 to 2 weeks</option>
                    <option value="2-3">2 to 3 weeks</option>
                    <option value="1-month">Over 1 month</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-on-surface block" htmlFor="complaint-notes">
                  Patient's Words & Screener Context Notes
                </label>
                <textarea
                  id="complaint-notes"
                  rows={3}
                  value={complaintNotes}
                  onChange={(e) => setComplaintNotes(e.target.value)}
                  className="w-full p-3 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </section>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <NavLink
            to="/screening/consent"
            className="px-4 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition"
          >
            Back to Consent
          </NavLink>

          <NavLink
            to="/screening/assessment"
            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
          >
            <span>Continue to Visual Exam</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </NavLink>
        </div>
      </div>
    </ScreeningShell>
  );
}

export default StartNewScreeningScreen;

