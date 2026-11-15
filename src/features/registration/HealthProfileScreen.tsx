import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { AuthAside, AuthShell } from '../../design/AuthShell';
import { Button } from '../../design/Button';
import { SelectField, TextField } from '../../design/Form';
import { Icon } from '../../design/Primitives';
import { useToast } from '../../design/Toast';
import { useRegistrationDraft } from '../../store/registrationDraft';
import {
  ALLERGY_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  BRUSHING_OPTIONS,
  CONDITION_OPTIONS,
  FLOSSING_OPTIONS,
  MEDICATION_OPTIONS,
  TOBACCO_OPTIONS,
  habitsAnswered,
  healthLabel,
} from './registrationData';

interface SectionConfig {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  summary: (health: ReturnType<typeof useHealth>) => string;
  content: ReactNode;
}

function useHealth() {
  return useRegistrationDraft(useShallow((s) => s.health));
}

/**
 * Step 4 of 5 — general health profile (optional, patient-reported).
 * Route: `/register/health`
 *
 * Every answer here is patient-reported and labelled as such (Blueprint §4.3).
 * Nothing is pre-selected: defaults would invent health information the
 * patient never gave.
 */
export function HealthProfileScreen() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const health = useHealth();
  const setHealth = useRegistrationDraft((s) => s.setHealth);
  const setFlags = useRegistrationDraft((s) => s.setFlags);

  const [open, setOpen] = useState<Record<string, boolean>>({ conditions: true });

  const toggle = (id: string) => setOpen((state) => ({ ...state, [id]: !state[id] }));

  const answeredBadge = (value: string, fallback = 'Not answered') => ({
    text: value || fallback,
    done: Boolean(value),
  });

  const sections: SectionConfig[] = [
    {
      id: 'conditions',
      icon: 'cardiology',
      title: 'Medical conditions',
      subtitle: 'Relevant to anaesthesia and treatment',
      summary: () => healthLabel('condition', health.condition),
      content: (
        <SelectField
          id="select-conditions"
          label="Primary medical condition"
          placeholder="Select a condition"
          options={CONDITION_OPTIONS}
          value={health.condition}
          onValueChange={(value) => setHealth({ condition: value })}
        />
      ),
    },
    {
      id: 'allergies',
      icon: 'vaccines',
      title: 'Allergies & sensitivities',
      subtitle: 'Important for prescriptions and anaesthetics',
      summary: () => healthLabel('allergy', health.allergy),
      content: (
        <SelectField
          id="select-allergies"
          label="Known drug or material allergy"
          placeholder="Select an allergy"
          options={ALLERGY_OPTIONS}
          value={health.allergy}
          onValueChange={(value) => setHealth({ allergy: value })}
        />
      ),
    },
    {
      id: 'medications',
      icon: 'medication',
      title: 'Current medications',
      subtitle: 'Prescriptions and supplements you take now',
      summary: () => healthLabel('medication', health.medication),
      content: (
        <SelectField
          id="select-medications"
          label="Primary medication category"
          placeholder="Select a category"
          options={MEDICATION_OPTIONS}
          value={health.medication}
          onValueChange={(value) => setHealth({ medication: value })}
        />
      ),
    },
    {
      id: 'habits',
      icon: 'clean_hands',
      title: 'Dental habits & lifestyle',
      subtitle: 'Hygiene routines and habits',
      summary: () => {
        const answered = habitsAnswered(health);
        return answered === 0 ? 'Not answered' : `${answered} of 3 answered`;
      },
      content: (
        <div className="flex flex-col gap-space-sm">
          <SelectField
            id="select-brushing"
            label="Brushing frequency"
            placeholder="Select frequency"
            options={BRUSHING_OPTIONS}
            value={health.brushing}
            onValueChange={(value) => setHealth({ brushing: value })}
          />
          <SelectField
            id="select-flossing"
            label="Flossing frequency"
            placeholder="Select frequency"
            options={FLOSSING_OPTIONS}
            value={health.flossing}
            onValueChange={(value) => setHealth({ flossing: value })}
          />
          <SelectField
            id="select-tobacco"
            label="Tobacco or nicotine use"
            placeholder="Select an option"
            options={TOBACCO_OPTIONS}
            value={health.tobacco}
            onValueChange={(value) => setHealth({ tobacco: value })}
          />
        </div>
      ),
    },
    {
      id: 'emergency',
      icon: 'emergency',
      title: 'Blood group & emergency contact',
      subtitle: 'Recommended for clinical readiness',
      summary: () => health.bloodGroup || 'Not set',
      content: (
        <div className="flex flex-col gap-space-sm">
          <SelectField
            id="select-blood-group"
            label="Blood group"
            placeholder="Select blood group"
            options={BLOOD_GROUP_OPTIONS}
            value={health.bloodGroup}
            onValueChange={(value) => setHealth({ bloodGroup: value })}
            hint="Only if you know it — you can leave this blank."
          />
          <TextField
            id="emergency-name"
            label="Emergency contact person"
            placeholder="Full name"
            value={health.emergencyName}
            onValueChange={(value) => setHealth({ emergencyName: value })}
          />
          <TextField
            id="emergency-phone"
            label="Emergency phone number"
            type="tel"
            inputMode="tel"
            placeholder="+234 801 234 5678"
            value={health.emergencyPhone}
            onValueChange={(value) => setHealth({ emergencyPhone: value })}
          />
        </div>
      ),
    },
  ];

  const save = () => {
    setFlags({ healthSaved: true, healthSkipped: false });
    showToast('Health profile saved in this demo session.', 'success');
    navigate('/register/complete');
  };

  const skip = () => {
    setFlags({ healthSaved: false, healthSkipped: true });
    navigate('/register/complete');
  };

  return (
    <AuthShell
      title="General Health Profile"
      step={4}
      stepCaption="Optional · patient-reported"
      onBack={() => navigate('/register/details')}
      aside={
        <AuthAside
          heading="Your history, clearly labelled"
          points={[
            {
              icon: 'edit_note',
              title: 'Optional and skippable',
              text: 'Complete it now, later from your profile, or not at all — registration still works.',
            },
            {
              icon: 'badge',
              title: 'Patient-reported, not verified',
              text: 'Anything you enter here is labelled as reported by you until a clinician confirms it.',
            },
            {
              icon: 'update',
              title: 'Update without overwriting',
              text: 'Changing an answer later records the update — it never silently rewrites earlier entries.',
            },
          ]}
        />
      }
    >
      {/* Intro */}
      <div className="flex flex-col gap-space-xs">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-secondary-container/50 px-3 py-1 font-label-sm font-semibold uppercase tracking-wide text-on-secondary-container">
          <Icon name="edit_note" className="text-[14px]" />
          Optional &amp; skippable
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-on-surface">
          General Health Profile
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Help dentists understand your medical background. This step is optional and can be
          completed or updated any time from your profile.
        </p>
      </div>

      {/* Patient-reported notice */}
      <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md shadow-sm">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-primary">
          <Icon name="info" className="text-[20px]" />
        </span>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-title-sm font-semibold text-on-surface">Self-reported profile</span>
            <span className="rounded-full bg-surface-container px-2 py-0.5 font-label-sm uppercase text-on-surface-variant">
              Draft
            </span>
          </div>
          <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
            Patient-reported information — not clinically verified by a dental practitioner.
          </p>
        </div>
      </div>

      {/* Accordions */}
      <div className="flex flex-col gap-space-md">
        {sections.map((section) => {
          const isOpen = Boolean(open[section.id]);
          const badge =
            section.id === 'habits'
              ? { text: section.summary(health), done: habitsAnswered(health) > 0 }
              : section.id === 'emergency'
                ? { text: health.bloodGroup || 'Not set', done: Boolean(health.bloodGroup) }
                : answeredBadge(section.summary(health));

          return (
            <section
              key={section.id}
              className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
            >
              <button
                type="button"
                id={`accordion-${section.id}`}
                aria-expanded={isOpen}
                aria-controls={`panel-${section.id}`}
                onClick={() => toggle(section.id)}
                className="flex w-full items-center justify-between gap-space-sm p-space-md text-left transition-colors hover:bg-surface-container-low"
              >
                <span className="flex min-w-0 items-center gap-space-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container text-primary">
                    <Icon name={section.icon} className="text-[22px]" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-title-md text-title-md text-on-surface">
                        {section.title}
                      </span>
                      <span
                        className={[
                          'rounded-full px-2 py-0.5 font-label-sm',
                          badge.done
                            ? 'bg-secondary-container/40 text-on-secondary-container'
                            : 'bg-surface-container text-on-surface-variant',
                        ].join(' ')}
                      >
                        {badge.text}
                      </span>
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {section.subtitle}
                    </span>
                  </span>
                </span>
                <Icon
                  name={isOpen ? 'expand_less' : 'expand_more'}
                  className="shrink-0 text-[22px] text-outline"
                />
              </button>
              {isOpen ? (
                <div
                  id={`panel-${section.id}`}
                  className="flex flex-col gap-space-sm px-space-md pb-space-md pt-1"
                >
                  {section.content}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      {/* Handling note */}
      <p className="flex items-center justify-center gap-2 text-center font-body-sm text-on-surface-variant">
        <Icon name="lock" className="text-[18px] text-secondary" />
        Patient-reported entries stay labelled as yours. A clinician can add verified details at
        your visit — your original entries are kept, not overwritten.
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          id="save-health-btn"
          size="lg"
          onClick={save}
          icon={<Icon name="arrow_forward" className="text-[20px]" />}
        >
          Save &amp; Finish Registration
        </Button>
        <Button
          id="skip-health-btn"
          size="lg"
          variant="neutral"
          onClick={skip}
          className="text-primary"
        >
          Skip for now <span className="font-body-sm font-normal text-on-surface-variant">(I&apos;ll do this later)</span>
        </Button>
      </div>
    </AuthShell>
  );
}
