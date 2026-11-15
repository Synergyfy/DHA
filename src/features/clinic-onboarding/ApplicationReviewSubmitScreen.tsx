import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface AccordionSection {
  id: string;
  title: string;
  category: string;
  status: 'valid' | 'attention' | 'pending';
  editRoute: string;
  data: { label: string; value: string; badge?: string }[];
}

export function ApplicationReviewSubmitScreen() {
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    org_info: true,
    rep_details: true,
    reg_details: false,
    profile_infra: false,
    primary_loc: false,
    operating_hours: false,
    verification_docs: false,
    branches: false,
    staff: false,
    scope: false,
  });

  const [attestationChecked, setAttestationChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const sections: AccordionSection[] = [
    {
      id: 'org_info',
      title: 'Organisation Information',
      category: 'Legal Entity',
      status: 'valid',
      editRoute: '/clinic-onboarding/organisation-information',
      data: [
        { label: 'Registered Legal Name', value: 'Greenfield Dental Clinic Limited' },
        { label: 'Public Trading Name', value: 'Greenfield Dental & Implant Centre' },
        { label: 'Year Established', value: '2018' },
        { label: 'Tax Identification (TIN)', value: '21094821-0001' },
        { label: 'Official Email', value: 'info@greenfielddental.ng' },
        { label: 'Registered Address', value: 'Plot 104 Aminu Kano Crescent, Wuse 2, Abuja, FCT' },
      ],
    },
    {
      id: 'rep_details',
      title: 'Organisation Representative',
      category: 'Governance & CMD',
      status: 'valid',
      editRoute: '/clinic-onboarding/organisation-representative',
      data: [
        { label: 'Authorised Representative', value: 'Dr. Amina Bello' },
        { label: 'Official Designation', value: 'Chief Medical Director (CMD) & Co-Owner' },
        { label: 'Professional Licence', value: 'DEN-78421 (MDCN Registered)' },
        { label: 'Direct Phone', value: '+234 803 555 0192' },
        { label: 'Board Authority', value: 'Board Resolution Document Attached & Attested', badge: 'Verified' },
      ],
    },
    {
      id: 'reg_details',
      title: 'Statutory Registration Details',
      category: 'CAC & Regulatory',
      status: 'valid',
      editRoute: '/clinic-onboarding/organisation-registration-details',
      data: [
        { label: 'CAC Registration No.', value: 'RC-1489201' },
        { label: 'Registration Date', value: '14 May 2018' },
        { label: 'HEFAMAA / FCT Licence No.', value: 'FCT-HEFAMAA-DENT-0842' },
        { label: 'Licence Validity', value: 'Valid through 31 Jan 2027', badge: 'Active' },
      ],
    },
    {
      id: 'profile_infra',
      title: 'Clinic Profile & Clinical Infrastructure',
      category: 'Facilities & Equipment',
      status: 'valid',
      editRoute: '/clinic-onboarding/profile-services',
      data: [
        { label: 'Primary Facility Category', value: 'Specialist Dental Outpatient Clinic' },
        { label: 'Clinical Operatories / Suites', value: '4 Operatories (Wuse 2) + 2 Operatories (Garki)' },
        { label: 'Sterilisation Standard', value: 'Class B Vacuum Autoclave with spore test log' },
        { label: 'Power Redundancy', value: '20kVA Solar Inverter + 40kVA Soundproof Backup Gen' },
        { label: 'EHR / Digital Record System', value: 'DHA Electronic Health Platform Integrated' },
      ],
    },
    {
      id: 'primary_loc',
      title: 'Primary Clinic Location (HQ)',
      category: 'Premises',
      status: 'valid',
      editRoute: '/clinic-onboarding/primary-location',
      data: [
        { label: 'Branch Name', value: 'Wuse 2 Main Clinic (HQ #001)' },
        { label: 'Physical Street Address', value: 'Plot 104 Aminu Kano Crescent, Wuse 2, Abuja' },
        { label: 'GPS Geolocation Coordinates', value: '9.0765° N, 7.4722° E (Geoverified)' },
        { label: 'Reception Contact Phone', value: '+234 9 461 8801' },
        { label: 'Premises Ownership', value: 'Commercial Lease Agreement (Valid until 2029)' },
      ],
    },
    {
      id: 'operating_hours',
      title: 'Operating Hours & Coverage',
      category: 'Schedules',
      status: 'valid',
      editRoute: '/clinic-onboarding/operating-hours',
      data: [
        { label: 'Monday – Friday', value: '08:30 – 18:00 (Standard Consultations)' },
        { label: 'Saturday', value: '09:00 – 14:00 (Scheduled & Emergency)' },
        { label: 'Sunday & Public Holidays', value: 'On-Call Emergency Dental Service' },
        { label: '24/7 Dental Emergency Hotline', value: '+234 800 473 3634' },
      ],
    },
    {
      id: 'verification_docs',
      title: 'Verification Documents & Permits',
      category: 'Compliance Dossier',
      status: 'valid',
      editRoute: '/clinic-onboarding/document-review',
      data: [
        { label: 'CAC Incorporation Certificate', value: 'CAC_RC1489201_Cert.pdf', badge: 'Desk Validated' },
        { label: 'FCT Health Facility Operating Licence', value: 'FCT_HEFAMAA_0842.pdf', badge: 'Desk Validated' },
        { label: 'CMD Medical Licence (MDCN)', value: 'DrAmina_MDCN_DEN78421.pdf', badge: 'Desk Validated' },
        { label: 'Tenancy / Lease Deed', value: 'Wuse2_Premises_Deed_Signed.pdf', badge: 'Desk Validated' },
        { label: 'NNRA Radiation Safety Permit', value: 'NNRA_Draft_Scatter_Report.pdf', badge: 'Pending Desk Review' },
      ],
    },
    {
      id: 'branches',
      title: 'Registered Additional Branches',
      category: 'Multi-Site Network',
      status: 'valid',
      editRoute: '/clinic-onboarding/branch-management',
      data: [
        { label: 'Branch #002 (Satellite)', value: 'Greenfield Dental – Garki Satellite Branch' },
        { label: 'Physical Location', value: 'Suite B4, Area 11 Shopping Plaza, Garki 2, Abuja' },
        { label: 'Branch Clinical Lead', value: 'Dr. Tunde Fashola (Lead Associate Dentist)' },
        { label: 'Branch Capacity', value: '2 Operatory Suites, Digital Panoramic X-Ray' },
      ],
    },
    {
      id: 'staff',
      title: 'Professional Staff & Clinical Roster',
      category: 'Workforce',
      status: 'valid',
      editRoute: '/clinic-onboarding/staff-roles',
      data: [
        { label: 'Dr. Amina Bello', value: 'Chief Medical Director (Primary Licensee)', badge: 'CMD' },
        { label: 'Dr. Daniel James', value: 'Senior Orthodontist (Specialist)', badge: 'Full-Time' },
        { label: 'Dr. Tunde Fashola', value: 'Lead Associate Dentist (Garki Lead)', badge: 'Full-Time' },
        { label: 'Nurse Tariq Mansur', value: 'Lead Dental Nurse & Infection Control Officer', badge: 'Staff' },
        { label: 'Fatima Noor', value: 'Dental Hygienist & Radiographer', badge: 'Staff' },
        { label: 'Chidera Eze', value: 'Practice Administrator & Billing Officer', badge: 'Admin' },
      ],
    },
    {
      id: 'scope',
      title: 'Clinical Services & Specialties Scope',
      category: 'Licence Endorsement',
      status: 'valid',
      editRoute: '/clinic-onboarding/profile-services',
      data: [
        { label: 'Class A Restorative & Preventive', value: 'Prophylaxis, Fillings, Endodontics, Veneers' },
        { label: 'Class B Surgical & Implantology', value: 'Surgical Extractions, Bone Grafting, Implants' },
        { label: 'Diagnostic Imaging Scope', value: 'Intraoral Digital Sensors, Cone Beam CT (CBCT)' },
        { label: 'Sedation & Anaesthesia', value: 'Local Anaesthesia, Inhalation Nitrous Oxide Sedation' },
      ],
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    sections.forEach((s) => {
      updated[s.id] = expand;
    });
    setExpandedSections(updated);
  };

  const allExpanded = Object.values(expandedSections).every(Boolean);

  const handleSubmit = () => {
    if (!attestationChecked) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setTimeout(() => {
        navigate('/clinic-onboarding/confirmation');
      }, 800);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/staff-roles')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Return to Staff Roles"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <div>
              <span className="text-xs font-semibold tracking-wider text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded">
                Step 17 of 17 • Comprehensive Audit
              </span>
              <h1 className="text-lg lg:text-xl font-bold text-slate-900 leading-tight">
                Review &amp; Submit Application
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleAll(!allExpanded)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Icon name={allExpanded ? 'unfold_less' : 'unfold_more'} className="text-sm" />
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </button>
            <button
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <Icon name="bookmark_border" className="text-sm" />
              Save Draft
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        {/* Master Summary Banner */}
        <section className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-12 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-teal-500/20 text-teal-200 text-xs px-2.5 py-1 rounded-full font-medium border border-teal-500/30 flex items-center gap-1">
                  <Icon name="verified" className="text-sm text-teal-400" />
                  Pre-Submission Audit Passed
                </span>
                <span className="bg-emerald-500/20 text-emerald-200 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-500/30">
                  10 of 10 Modules Satisfied
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Greenfield Dental Clinic Limited
              </h2>
              <p className="text-sm text-teal-100/90 max-w-2xl leading-relaxed">
                Application Dossier for Private Specialist Outpatient Facility Registration with the Dubai Health Authority (DHA) &amp; FCT Health Services Management Board.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 min-w-[220px] space-y-1.5">
              <div className="text-xs text-teal-200 font-medium">Corporate Identifier</div>
              <div className="text-base font-bold text-white font-mono tracking-wide">CAC RC-1489201</div>
              <div className="text-xs text-teal-100 flex items-center gap-1 pt-1 border-t border-white/10">
                <Icon name="person" className="text-sm" />
                CMD: Dr. Amina Bello (#DEN-78421)
              </div>
            </div>
          </div>
        </section>

        {/* Readiness Checklist Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Icon name="check_circle" className="text-xl" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Corporate Status</div>
              <div className="text-sm font-semibold text-slate-800">CAC Verified</div>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Icon name="domain" className="text-xl" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Premises Registered</div>
              <div className="text-sm font-semibold text-slate-800">2 Active Sites</div>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Icon name="group" className="text-xl" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Clinical Workforce</div>
              <div className="text-sm font-semibold text-slate-800">6 Practitioners</div>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Icon name="description" className="text-xl" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Regulatory Files</div>
              <div className="text-sm font-semibold text-slate-800">5 Attested PDFs</div>
            </div>
          </div>
        </div>

        {/* 10 Accordion Review Sections */}
        <section className="space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Application Sections Audit Checklist
            </h3>
            <span className="text-xs text-slate-500 font-medium">Click any section to verify or modify</span>
          </div>

          <div className="space-y-3">
            {sections.map((section, idx) => {
              const isOpen = !!expandedSections[section.id];
              return (
                <div
                  key={section.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden"
                >
                  {/* Header Bar */}
                  <div
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900">{section.title}</h4>
                          <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            {section.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        <Icon name="check" className="text-sm" /> Ready
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(section.editRoute);
                        }}
                        className="text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline px-2 py-1 flex items-center gap-0.5"
                      >
                        <Icon name="edit" className="text-xs" /> Edit
                      </button>
                      <Icon
                        name={isOpen ? 'expand_less' : 'expand_more'}
                        className="text-slate-400 text-xl transition-transform"
                      />
                    </div>
                  </div>

                  {/* Body Content */}
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                        {section.data.map((item, i) => (
                          <div key={i} className="bg-white p-3 rounded-lg border border-slate-200/80">
                            <div className="text-[11px] font-medium text-slate-400">{item.label}</div>
                            <div className="text-sm font-semibold text-slate-800 mt-0.5 break-words">
                              {item.value}
                            </div>
                            {item.badge && (
                              <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Solemn Declaration & Statutory Undertaking */}
        <section className="bg-white rounded-2xl border-2 border-teal-200 p-6 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="gavel" className="text-xl" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Statutory Solemn Declaration &amp; Legal Undertaking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In accordance with Dubai Health Authority (DHA) Licensing Regulations 2026 and Nigerian Healthcare Facilities Monitoring &amp; Accreditation Act, making false declarations or submitting forged credentials constitutes a federal offence punishable by licence revocation and criminal prosecution.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
            <p>
              I, <strong className="text-slate-900">Dr. Amina Bello</strong>, in my dual capacity as Chief Medical Director and Authorised Corporate Representative of <strong className="text-slate-900">Greenfield Dental Clinic Limited (RC-1489201)</strong>, solemnly affirm that:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>All particulars, certificates, facility leases, and staff credentials provided in this electronic dossier are genuine, accurate, and valid.</li>
              <li>The facility premises at Wuse 2 and Garki comply strictly with radiation protection protocols and biological waste management directives.</li>
              <li>The nominated clinical practitioners are in good standing with the Medical and Dental Council of Nigeria (MDCN).</li>
            </ul>
          </div>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-teal-50/60 border border-teal-200 cursor-pointer hover:bg-teal-50 transition-colors select-none">
            <input
              type="checkbox"
              checked={attestationChecked}
              onChange={(e) => setAttestationChecked(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-teal-400 text-teal-600 focus:ring-teal-500 cursor-pointer"
            />
            <span className="text-xs font-semibold text-slate-800 leading-normal">
              I have read, understood, and accept the statutory declaration. I authorise the DHA Inspection Board to conduct desk reviews and on-site physical audits of the facilities.
            </span>
          </label>
        </section>

        {/* Action Panel */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto">
            <Icon name="lock" className="text-base text-slate-400" />
            <span>Encrypted submission via 256-bit TLS Gateway</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/staff-roles')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Back to Staff Roles
            </button>
            <button
              type="button"
              disabled={!attestationChecked || isSubmitting}
              onClick={handleSubmit}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all w-full sm:w-auto ${
                attestationChecked && !isSubmitting
                  ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Icon name="sync" className="text-base animate-spin" />
                  Transmitting Dossier...
                </>
              ) : submissionSuccess ? (
                <>
                  <Icon name="check_circle" className="text-base text-emerald-300" />
                  Submitted!
                </>
              ) : (
                <>
                  <Icon name="send" className="text-base" />
                  Submit Application to DHA
                </>
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
