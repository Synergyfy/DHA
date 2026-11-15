import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

interface FacilityTypeOption {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  description: string;
  regulatoryScope: string;
}

const facilityTypes: FacilityTypeOption[] = [
  {
    id: 'dental_clinic',
    title: 'Dental Clinic',
    subtitle: 'Primary Outpatient Facility',
    badge: 'Standard OPD',
    icon: 'local_hospital',
    description: 'Outpatient general and family dentistry, preventive hygiene, and routine operative dentistry under primary clinical governance.',
    regulatoryScope: 'Requires: MDCN Principal Practitioner, Infection Control Officer, HEFAMAA/State Permit.',
  },
  {
    id: 'dental_hospital',
    title: 'Dental Hospital',
    subtitle: 'Full-Scale Secondary/Tertiary',
    badge: 'Inpatient & 24/7 ER',
    icon: 'domain',
    description: 'Comprehensive inpatient care, 24/7 dental emergency unit, dedicated general anaesthesia operating theatres, and oral-maxillofacial ward.',
    regulatoryScope: 'Requires: Tertiary Hospital Licensure, Anesthesia Registry, Inpatient Beds & Pharmacist.',
  },
  {
    id: 'specialist_centre',
    title: 'Specialist Dental Centre',
    subtitle: 'Consultant-Led Advanced Care',
    badge: 'Tertiary Referral',
    icon: 'medical_services',
    description: 'Consultant-directed advanced specialist care including surgical implantology, fixed prosthodontics, periodontics, and orthodontics.',
    regulatoryScope: 'Requires: Board-Certified Specialists, Peer Review Committee, Multi-Specialty Protocol.',
  },
  {
    id: 'dental_practice',
    title: 'Dental Practice',
    subtitle: 'Community & Solo/Associate',
    badge: 'Community Practice',
    icon: 'home_health',
    description: 'Community-based dental practice operating 1 to 3 operatory suites, focused on holistic family dental wellness and routine consultations.',
    regulatoryScope: 'Requires: Registered Solo/Associate Licensure, Annual Waste Disposal Contract.',
  },
  {
    id: 'diagnostic_centre',
    title: 'Dental Diagnostic Centre',
    subtitle: 'Dedicated Radiology & Lab',
    badge: 'Imaging & Pathology',
    icon: 'biotech',
    description: 'Specialized facility providing Cone Beam CT (CBCT), Digital Orthopantomography (OPG), cephalometry, and dental histology services.',
    regulatoryScope: 'Requires: NNRA Radiation Safety Officer, Lead-Lined Operatories, QA Dosimetry Logs.',
  },
  {
    id: 'other_organisation',
    title: 'Other Dental Organisation',
    subtitle: 'Academic, Corporate, or NGO',
    badge: 'Institutional / Mobile',
    icon: 'hub',
    description: 'University dental teaching faculty, corporate multi-branch dental network, mobile community dental bus, or charitable dental foundation.',
    regulatoryScope: 'Requires: Custom Institutional Charter, Specific Operations MoA, Mobile Unit Permits.',
  },
];

export function OrganisationTypeSelectionScreen() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('dental_clinic');
  const [otherDescription, setOtherDescription] = useState<string>('');

  const handleContinue = () => {
    navigate('/clinic-onboarding/organisation-info', {
      state: { facilityType: selectedType, otherDescription },
    });
  };

  return (
    <ClinicOnboardingShell
      currentStep={2}
      totalSteps={6}
      stepTitle="Organisation Structure"
      stepCategory="Entity Classification"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Title */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="verified" className="text-sm" />
            SEC-15.3 &bull; Statutory Classification
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-on-surface tracking-tight">
            Select Organisation Structure
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-2xl">
            Choose the statutory classification that matches your facility's registered operating license. This customises the regulatory checklist and staffing requirements.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
          {facilityTypes.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`cursor-pointer relative rounded-2xl p-5 sm:p-6 transition-all duration-200 border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'border-primary bg-surface-container-lowest shadow-md ring-4 ring-primary/10'
                    : 'border-outline-variant/40 bg-surface-container-low hover:border-outline-variant hover:bg-surface-container-lowest'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-primary text-white shadow-sm shadow-primary/30'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        <Icon name={type.icon} className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">
                          {type.title}
                        </h3>
                        <p className="text-[11px] text-on-surface-variant">{type.subtitle}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                        isSelected
                          ? 'bg-primary-container/20 text-primary border border-primary/20'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {type.badge}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {type.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between text-[11px]">
                  <span className="text-on-surface-variant/80 italic line-clamp-1">{type.regulatoryScope}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${
                      isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-outline-variant bg-transparent'
                    }`}
                  >
                    {isSelected && <Icon name="check" className="text-xs font-bold" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom description if Other is selected */}
        {selectedType === 'other_organisation' && (
          <div className="mb-8 p-5 rounded-2xl bg-surface-container-lowest border border-primary/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <Icon name="edit_note" className="text-base" />
              Describe Specific Institutional Model
            </div>
            <textarea
              rows={3}
              required
              placeholder="Provide full description of your organisation (e.g. mobile dental outreach van, university faculty clinic, corporate workplace dental hub)..."
              value={otherDescription}
              onChange={(e) => setOtherDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        )}

        {/* Regulatory Governance Callout */}
        <div className="mb-8 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-start gap-3">
          <Icon name="info" className="text-primary text-lg shrink-0 mt-0.5" />
          <div className="text-xs text-on-surface-variant leading-relaxed">
            <span className="font-semibold text-on-surface">Statutory Compliance Advisory:</span> Facility classifications are audited against physical operatory size, sterilization autoclaves (Class B Vacuum), and licensed personnel ratios under the National Health Act and DHA Dental Guidelines.
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/register')}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <span>Continue to Organisation Info</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </div>
    </ClinicOnboardingShell>
  );
}
