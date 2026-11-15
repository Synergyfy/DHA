import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { AuthAside, AuthShell } from '../../design/AuthShell';
import { Button } from '../../design/Button';
import { SelectField, TextField } from '../../design/Form';
import { Icon } from '../../design/Primitives';
import { useRegistrationDraft, type AccountType } from '../../store/registrationDraft';
import { GENDER_OPTIONS } from './registrationData';

interface Errors {
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  nin?: string;
}

/**
 * Step 3 of 5 — personal details & demographics.
 * Route: `/register/details`
 *
 * Collects the minimum identity information needed for safe profile matching
 * (Product Blueprint §4.2). The NIN is optional and no identity claim is made
 * about it — nothing is verified in this frontend build.
 */
export function PersonalDetailsScreen() {
  const navigate = useNavigate();
  const identity = useRegistrationDraft(
    useShallow((s) => ({
      firstName: s.firstName,
      middleName: s.middleName,
      lastName: s.lastName,
      dob: s.dob,
      gender: s.gender,
      nin: s.nin,
      accountType: s.accountType,
    })),
  );
  const setIdentity = useRegistrationDraft((s) => s.setIdentity);

  const [errors, setErrors] = useState<Errors>({});

  const clearError = (key: keyof Errors) => {
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!identity.firstName.trim()) next.firstName = 'First name is required.';
    if (!identity.lastName.trim()) next.lastName = 'Last name is required.';
    if (!identity.dob) next.dob = 'Date of birth is required.';
    if (!identity.gender) next.gender = 'Select an option.';
    if (identity.nin && !/^\d{11}$/.test(identity.nin)) next.nin = 'A NIN has 11 digits.';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    navigate('/register/health');
  };

  const accountOptions: { value: AccountType; title: string; text: string; icon: string; badge?: string }[] = [
    {
      value: 'self',
      title: 'Self (adult patient)',
      text: 'I am registering my own profile and Lifecode.',
      icon: 'person',
    },
    {
      value: 'guardian',
      title: 'Parent / guardian',
      text: "I'm registering on behalf of a child in my care.",
      icon: 'family_restroom',
      badge: 'Child profile',
    },
  ];

  return (
    <AuthShell
      title="Personal Details"
      step={3}
      stepCaption="Identity details for safe profile matching"
      onBack={() => navigate('/register/verify')}
      aside={
        <AuthAside
          heading="Why we ask for these details"
          points={[
            {
              icon: 'badge',
              title: 'Minimum needed to match you',
              text: 'Name, date of birth and gender are what clinics need to find the right profile.',
            },
            {
              icon: 'lock',
              title: 'The NIN stays optional',
              text: 'Leave it out now and add it later — it is never used as a password or token.',
            },
            {
              icon: 'history',
              title: 'Edits never rewrite records',
              text: 'Updating your profile later does not change entries a clinician has already made.',
            },
          ]}
        />
      }
    >
      {/* Intro */}
      <div className="flex flex-col gap-space-2xs">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-secondary-container/30 px-2 py-0.5 font-label-sm font-semibold uppercase tracking-wide text-secondary">
          <Icon name="badge" className="text-[14px]" />
          Lifecode oral passport
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-on-surface">
          Personal Details
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Provide your identity details so the system can create a profile that matches you safely.
        </p>
      </div>

      <form onSubmit={submit} noValidate className="flex flex-col gap-space-md">
        {/* Legal name */}
        <section className="flex flex-col gap-space-3 rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex items-center justify-between pb-1">
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                <Icon name="person" className="text-[18px]" />
              </span>
              <h2 className="font-title-sm text-title-sm text-on-surface">Full legal name</h2>
            </span>
            <span className="rounded-full bg-secondary-container/20 px-2 py-0.5 font-label-sm text-secondary">
              Required
            </span>
          </div>

          <TextField
            id="first-name"
            label="First name"
            required
            autoComplete="given-name"
            placeholder="e.g. Amara"
            value={identity.firstName}
            error={errors.firstName}
            onValueChange={(value) => {
              setIdentity({ firstName: value });
              clearError('firstName');
            }}
            trailing={
              identity.firstName.trim() ? (
                <Icon name="check_circle" filled className="text-[18px] text-secondary" />
              ) : null
            }
          />
          <TextField
            id="middle-name"
            label="Middle name"
            labelAside="Optional"
            autoComplete="additional-name"
            placeholder="e.g. Chioma"
            value={identity.middleName}
            onValueChange={(value) => setIdentity({ middleName: value })}
          />
          <TextField
            id="last-name"
            label="Last name"
            required
            autoComplete="family-name"
            placeholder="e.g. Okafor"
            value={identity.lastName}
            error={errors.lastName}
            onValueChange={(value) => {
              setIdentity({ lastName: value });
              clearError('lastName');
            }}
            trailing={
              identity.lastName.trim() ? (
                <Icon name="check_circle" filled className="text-[18px] text-secondary" />
              ) : null
            }
          />

          <div className="mt-1 flex items-start gap-2 rounded-lg bg-surface-container-low p-2.5">
            <Icon name="info" className="mt-0.5 shrink-0 text-[18px] text-primary" />
            <p className="font-body-sm leading-snug text-on-surface-variant">
              Use the name on your NIN or other official ID so a clinic can match your profile to
              your records.
            </p>
          </div>
        </section>

        {/* Demographics */}
        <section className="flex flex-col gap-space-3 rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex items-center gap-2 pb-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container-high text-primary">
              <Icon name="fingerprint" className="text-[18px]" />
            </span>
            <h2 className="font-title-sm text-title-sm text-on-surface">Demographics &amp; identity</h2>
          </div>

          <TextField
            id="dob-field"
            label="Date of birth"
            required
            type="date"
            value={identity.dob}
            error={errors.dob}
            onValueChange={(value) => {
              setIdentity({ dob: value });
              clearError('dob');
            }}
          />

          <SelectField
            id="gender-identity"
            label="Gender"
            required
            labelAside="Clinical requirement"
            placeholder="Select gender"
            options={GENDER_OPTIONS}
            value={identity.gender}
            error={errors.gender}
            onValueChange={(value) => {
              setIdentity({ gender: value });
              clearError('gender');
            }}
          />

          <TextField
            id="nin"
            label="NIN (National Identification Number)"
            labelAside="Optional"
            inputMode="numeric"
            maxLength={11}
            placeholder="e.g. 12345678901"
            hint="Optional — you can add it before your first visit. It is used only to help match your profile."
            value={identity.nin}
            error={errors.nin}
            onValueChange={(value) => {
              setIdentity({ nin: value.replace(/\D/g, '') });
              clearError('nin');
            }}
          />
        </section>

        {/* Account type */}
        <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container-high text-primary">
              <Icon name="manage_accounts" className="text-[18px]" />
            </span>
            <h2 className="font-title-sm text-title-sm text-on-surface">Registering for</h2>
          </div>

          <div role="radiogroup" aria-label="Registering for" className="flex flex-col gap-2.5">
            {accountOptions.map((option) => {
              const selected = identity.accountType === option.value;
              return (
                <label key={option.value} className="block cursor-pointer">
                  <input
                    type="radio"
                    name="account-type"
                    value={option.value}
                    className="peer sr-only"
                    checked={selected}
                    onChange={() => setIdentity({ accountType: option.value })}
                  />
                  <div
                    className={[
                      'flex items-start gap-3 rounded-xl p-3.5 transition-all',
                      'peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2',
                      selected
                        ? 'bg-surface-container-low ring-1 ring-primary'
                        : 'bg-surface-container-lowest shadow-sm hover:bg-surface-container-low',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                        selected ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant',
                      ].join(' ')}
                    >
                      <Icon name={selected ? 'check' : 'radio_button_unchecked'} className="text-[18px]" />
                    </span>
                    <span className="flex flex-col">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-title-sm text-title-sm text-on-surface">{option.title}</span>
                        {option.badge ? (
                          <span className="rounded bg-tertiary-fixed px-1.5 py-0.5 font-label-sm text-tertiary">
                            {option.badge}
                          </span>
                        ) : null}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {option.text}
                      </span>
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {identity.accountType === 'guardian' ? (
            <p className="flex items-start gap-2 rounded-lg bg-surface-container-low p-space-sm font-body-sm leading-snug text-on-surface-variant">
              <Icon name="info" className="mt-0.5 shrink-0 text-[16px] text-primary" />
              After verification you will be guided through guardian setup to link your child&apos;s
              profile. Children&apos;s records are kept strictly separate from adult profiles and
              are never shown unless you are acting for that child.
            </p>
          ) : null}
        </section>

        {/* Data-handling note */}
        <div className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container/40 text-secondary">
            <Icon name="lock" className="text-[18px]" />
          </span>
          <p className="font-body-sm leading-snug text-on-surface-variant">
            These details are stored with your account. Changing them later never alters entries a
            clinician has already recorded.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <Button
            id="save-details-btn"
            type="submit"
            size="lg"
            icon={<Icon name="arrow_forward" className="text-[20px]" />}
          >
            Save &amp; Continue to Health Profile
          </Button>
          <span className="flex items-center justify-center gap-1.5 text-center text-on-surface-variant">
            <Icon name="verified" className="text-[16px] text-secondary" />
            <span className="font-label-sm">
              Step 3 of 5 · the minimum details needed for safe profile matching
            </span>
          </span>
        </div>
      </form>
    </AuthShell>
  );
}
