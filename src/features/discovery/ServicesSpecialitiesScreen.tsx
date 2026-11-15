import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { DiscoverySubNav } from './DiscoverySubNav';
import { Icon } from '../../design/Primitives';

type ActiveTab = 'specialities' | 'procedures';

export function ServicesSpecialitiesScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('specialities');
  const [expandedSpeciality, setExpandedSpeciality] = useState<string>('pediatric');
  const [triageModalOpen, setTriageModalOpen] = useState(false);
  const [triageStep, setTriageStep] = useState(1);
  const [symptomChoice, setSymptomChoice] = useState('');

  const specialitiesData = [
    {
      id: 'general',
      name: 'General Dentistry',
      badge: 'Primary Prevention',
      icon: 'dentistry',
      clinicsCount: '84 Facilities',
      specialistsCount: '210+ Practitioners',
      description:
        'Foundational dental health including routine clinical checkups, caries risk assessments, professional scale and polish, remineralization therapies, and diagnostic x-rays.',
      treatments: ['Oral Exams', 'Digital Bitewings', 'Scaling & Polishing', 'Fluoride Application'],
      feeRange: 'AED 200 – 350',
    },
    {
      id: 'pediatric',
      name: 'Paediatric Dentistry',
      badge: 'Infants & Teens (0–16)',
      icon: 'child_care',
      clinicsCount: '38 Facilities',
      specialistsCount: '45 Specialists',
      description:
        'Dedicated oral healthcare tailored for children and adolescents, focusing on cavity prevention, pit-and-fissure sealants, behavior guidance, and early interceptive orthodontics in sensory-adapted child environments.',
      treatments: ['Baby Teeth Fillings', 'Pit & Fissure Sealants', 'Space Maintainers', 'Nitrous Oxide Sedation'],
      feeRange: 'AED 250 – 400',
      hasHighlightDoctor: true,
    },
    {
      id: 'orthodontics',
      name: 'Orthodontics & Dentofacial Orthopaedics',
      badge: 'Alignment & Occlusion',
      icon: 'sentiment_satisfied',
      clinicsCount: '52 Facilities',
      specialistsCount: '68 Specialists',
      description:
        'Diagnosis, prevention, and correction of misaligned teeth and jaw discrepancies using modern clear aligners (Invisalign), self-ligating ceramic braces, lingual appliances, and functional orthopedic expanders.',
      treatments: ['Invisalign Clear Aligners', 'Ceramic Braces', 'Palatal Expanders', 'Retainers'],
      feeRange: 'AED 12,000 – 24,000 (Full Course)',
    },
    {
      id: 'endodontics',
      name: 'Endodontics',
      badge: 'Root Canal & Pulp Preservation',
      icon: 'medical_information',
      clinicsCount: '29 Facilities',
      specialistsCount: '34 Specialists',
      description:
        'Microscopic preservation of infected or traumatized teeth through precision rotary root canal treatments, apical microsurgery, internal bleaching, and cracked tooth syndrome management.',
      treatments: ['Microscope Root Canal', 'Endodontic Retreatment', 'Apicoectomy', 'Pulp Capping'],
      feeRange: 'AED 1,200 – 2,800',
    },
    {
      id: 'surgery',
      name: 'Oral & Maxillofacial Surgery',
      badge: 'Surgical & Trauma Care',
      icon: 'masks',
      clinicsCount: '24 Facilities',
      specialistsCount: '30 Surgeons',
      description:
        'Surgical management of impacted wisdom teeth, advanced bone grafting, sinus floor elevation, corrective orthognathic jaw alignment, dental cyst enucleation, and emergency facial trauma.',
      treatments: ['Impacted Wisdom Teeth Extraction', 'Sinus Lift Surgery', 'Bone Augmentation', 'Biopsy'],
      feeRange: 'AED 950 – 3,500',
    },
    {
      id: 'restorative',
      name: 'Restorative & Prosthodontic Dentistry',
      badge: 'Rehabilitation & Aesthetics',
      icon: 'auto_fix_high',
      clinicsCount: '41 Facilities',
      specialistsCount: '56 Specialists',
      description:
        'Comprehensive rehabilitation of missing, broken, or worn teeth with digital zirconia crowns, porcelain veneers, fixed implant bridges, and complete dental reconstruction.',
      treatments: ['Titanium Dental Implants', 'E-max Porcelain Veneers', 'Zirconia Crowns', 'All-on-4 Bridges'],
      feeRange: 'AED 1,500 – 7,500',
    },
  ];

  const commonProcedures = [
    {
      category: 'Diagnostic & Prevention',
      items: [
        { name: 'Initial Specialist Consultation & Comprehensive Exam', code: 'DHA-010', range: 'AED 200 – 350', ddr: 'Standard' },
        { name: 'Full-Mouth Ultrasonic Scaling & Plaque Polishing', code: 'DHA-111', range: 'AED 250 – 450', ddr: 'Preventive' },
        { name: 'Digital Panoramic OPG X-Ray', code: 'DHA-022', range: 'AED 150 – 250', ddr: 'Imaging' },
        { name: 'Cone Beam 3D Volumetric CT Scan (Single Jaw)', code: 'DHA-026', range: 'AED 450 – 750', ddr: 'Advanced 3D' },
      ],
    },
    {
      category: 'Restorative & Endodontics',
      items: [
        { name: 'Tooth-Colored Composite Resin Filling (1 Surface)', code: 'DHA-211', range: 'AED 350 – 550', ddr: 'Restorative' },
        { name: 'Anterior Tooth Root Canal Treatment (Single Canal)', code: 'DHA-331', range: 'AED 1,200 – 1,800', ddr: 'Endodontic' },
        { name: 'Molar Tooth Microscopic Root Canal (3-4 Canals)', code: 'DHA-333', range: 'AED 1,800 – 2,800', ddr: 'Endodontic' },
        { name: 'High-Translucency E-max / Zirconia Crown', code: 'DHA-611', range: 'AED 1,500 – 2,500', ddr: 'Prosthetic' },
      ],
    },
    {
      category: 'Surgical & Implantology',
      items: [
        { name: 'Simple Tooth Extraction with Local Anesthesia', code: 'DHA-711', range: 'AED 300 – 500', ddr: 'Surgical' },
        { name: 'Surgical Extraction of Impacted Wisdom Tooth', code: 'DHA-722', range: 'AED 950 – 2,200', ddr: 'Surgical' },
        { name: 'Single Titanium Dental Implant (Fixture + Abutment)', code: 'DHA-681', range: 'AED 4,500 – 7,500', ddr: 'Implantology' },
        { name: 'Localized Bone Grafting with Collagen Membrane', code: 'DHA-791', range: 'AED 1,200 – 2,400', ddr: 'Augmentation' },
      ],
    },
  ];

  return (
    <DashboardShell pageTitle="Dental Services & Specialities">
      <DiscoverySubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero Section */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-fixed text-primary">
                  <Icon name="verified" className="text-[16px]" />
                </span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                  Official Dubai Healthcare Regulations
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                Dental Services &amp; Specialities Directory
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Understand the 6 accredited dental boards recognized by the Dubai Health Authority, compare standardized reference prices, and find qualified specialists.
              </p>
            </div>

            {/* AI Guided Triage Trigger */}
            <div className="bg-secondary-container/30 border border-secondary/30 p-5 rounded-2xl w-full md:w-80 shrink-0 space-y-2">
              <div className="flex items-center gap-2 text-secondary font-bold font-title-sm">
                <Icon name="psychology" className="text-[20px]" />
                <span>Speciality Matcher</span>
              </div>
              <p className="font-body-sm text-on-surface-variant">
                Unsure which specialist is right for your symptoms?
              </p>
              <button
                type="button"
                onClick={() => {
                  setTriageModalOpen(true);
                  setTriageStep(1);
                }}
                className="w-full py-2.5 bg-secondary hover:bg-secondary-fixed text-on-secondary hover:text-on-secondary-fixed rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Start 30-Sec Triage</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </div>
          </div>

          {/* Segmented Switcher Tabs */}
          <div className="pt-4 border-t border-outline-variant/30 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('specialities')}
              className={`px-5 py-2.5 rounded-2xl font-title-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'specialities'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <Icon name="workspace_premium" className="text-[19px]" />
              <span>DHA Speciality Boards (6)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('procedures')}
              className={`px-5 py-2.5 rounded-2xl font-title-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'procedures'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <Icon name="payments" className="text-[19px]" />
              <span>Reference Pricing &amp; Procedures</span>
            </button>
          </div>
        </section>

        {/* View 1: Specialities */}
        {activeTab === 'specialities' && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specialitiesData.map((spec) => {
                const isExpanded = expandedSpeciality === spec.id;
                return (
                  <div
                    key={spec.id}
                    className={`bg-surface-container-lowest rounded-3xl border transition-all p-6 space-y-4 shadow-sm ${
                      isExpanded
                        ? 'border-2 border-primary shadow-md'
                        : 'border-outline-variant/30 hover:border-outline'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                          <Icon name={spec.icon} className="text-[24px]" />
                        </div>
                        <div>
                          <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                            {spec.badge}
                          </span>
                          <h3 className="font-title-md text-title-md font-bold text-on-surface">
                            {spec.name}
                          </h3>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedSpeciality(isExpanded ? '' : spec.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
                        aria-label="Toggle details"
                      >
                        <Icon name={isExpanded ? 'expand_less' : 'expand_more'} className="text-[20px]" />
                      </button>
                    </div>

                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {spec.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {spec.treatments.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30 text-body-sm">
                      <span className="text-on-surface-variant">
                        {spec.clinicsCount} • {spec.specialistsCount}
                      </span>
                      <span className="font-semibold text-primary">{spec.feeRange}</span>
                    </div>

                    {/* Featured Doctor Highlight (e.g. for Paediatric) */}
                    {spec.hasHighlightDoctor && isExpanded && (
                      <div className="bg-secondary-container/20 rounded-2xl p-4 border border-secondary/30 space-y-3 mt-3">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
                            Featured Board Specialist
                          </span>
                          <span className="font-label-sm font-mono text-secondary font-semibold">
                            #DHA-D-72109
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center font-title-sm shrink-0">
                            LH
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-title-sm font-bold text-on-surface">
                              Dr. Layla Haddad
                            </h4>
                            <p className="font-body-sm text-on-surface-variant">
                              Senior Paediatric Dental Consultant • 15 Yrs Experience
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-label-sm text-secondary font-semibold block">
                              Tomorrow 10:15 AM
                            </span>
                            <span className="font-title-sm font-bold text-primary">AED 300</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => navigate('/patient-dashboard/discovery/dentist')}
                            className="flex-1 py-2 bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed rounded-xl font-label-md font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Book Consultation</span>
                            <Icon name="event" className="text-[16px]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate('/patient-dashboard/discovery/results?speciality=pediatric')}
                            className="px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-md font-semibold transition-colors"
                          >
                            View All 45 Specialists
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* View 2: Procedures & Pricing */}
        {activeTab === 'procedures' && (
          <section className="space-y-6">
            <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 flex items-center gap-3">
              <Icon name="info" className="text-secondary text-[22px] shrink-0" />
              <p className="font-body-sm text-on-surface-variant">
                Prices shown are published reference benchmarks collected from DHA-accredited dental clinics in Dubai. Actual treatment costs depend on clinical complexity and diagnostic imaging findings.
              </p>
            </div>

            <div className="space-y-6">
              {commonProcedures.map((cat) => (
                <div
                  key={cat.category}
                  className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4"
                >
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {cat.category}
                  </h3>

                  <div className="divide-y divide-outline-variant/30">
                    {cat.items.map((item) => (
                      <div
                        key={item.code}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-title-sm text-on-surface font-semibold">
                              {item.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-on-surface-variant font-mono">
                              {item.code}
                            </span>
                          </div>
                          <span className="font-body-sm text-on-surface-variant block">
                            Classification: {item.ddr}
                          </span>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <span className="font-title-md font-bold text-primary block">
                            {item.range}
                          </span>
                          <span className="font-label-sm text-secondary font-medium">
                            Standard Private Tariff
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Guided Symptom Triage Modal */}
        {triageModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setTriageModalOpen(false)}
          >
            <div
              className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold font-title-sm">
                    {triageStep}/2
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {triageStep === 1 ? 'What best describes your symptom?' : 'Specialist Recommendation'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setTriageModalOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>

              {triageStep === 1 ? (
                <div className="space-y-2 pt-1">
                  {[
                    { label: 'Deep throbbing toothache or temperature sensitivity', spec: 'Endodontics (Root Canal Specialist)' },
                    { label: 'Crooked, crowded, or gapped teeth', spec: 'Orthodontics (Braces / Aligners)' },
                    { label: 'Bleeding gums, bad breath, or loose teeth', spec: 'Periodontics & General Prevention' },
                    { label: 'Child or teenager tooth pain / checkup', spec: 'Paediatric Dentistry' },
                    { label: 'Broken tooth, missing teeth, or cosmetic renewal', spec: 'Restorative & Prosthodontics' },
                    { label: 'Wisdom tooth swelling or jaw pain', spec: 'Oral & Maxillofacial Surgery' },
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => {
                        setSymptomChoice(s.spec);
                        setTriageStep(2);
                      }}
                      className="w-full p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container text-left transition-colors flex items-center justify-between border border-outline-variant/20"
                    >
                      <span className="font-body-md text-on-surface font-medium">{s.label}</span>
                      <Icon name="chevron_right" className="text-[18px] text-on-surface-variant shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 pt-2 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-primary-fixed text-primary flex items-center justify-center mx-auto shadow-sm">
                    <Icon name="verified" className="text-[32px]" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                      Recommended DHA Discipline
                    </span>
                    <h4 className="font-headline-sm font-bold text-on-surface">{symptomChoice}</h4>
                    <p className="font-body-md text-on-surface-variant">
                      Based on your primary symptom, consulting this licensed board specialist will provide targeted diagnosis and treatment.
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setTriageStep(1)}
                      className="flex-1 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-title-sm font-semibold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTriageModalOpen(false);
                        navigate('/patient-dashboard/discovery/results');
                      }}
                      className="flex-1 py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors shadow-sm"
                    >
                      Find Specialists
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </DashboardShell>
  );
}

