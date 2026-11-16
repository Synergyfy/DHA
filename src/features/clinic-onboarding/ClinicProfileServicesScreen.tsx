import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

const ALL_SPECIALTIES = [
  { id: 'general', name: 'General Dentistry', category: 'Primary' },
  { id: 'restorative', name: 'Restorative & Aesthetic', category: 'Primary' },
  { id: 'endodontics', name: 'Endodontics (Root Canal)', category: 'Specialist' },
  { id: 'orthodontics', name: 'Orthodontics & Clear Aligners', category: 'Specialist' },
  { id: 'pediatric', name: 'Pediatric Dentistry', category: 'Specialist' },
  { id: 'periodontics', name: 'Periodontics & Gum Care', category: 'Specialist' },
  { id: 'oral_surgery', name: 'Oral & Maxillofacial Surgery', category: 'Surgical' },
  { id: 'implantology', name: 'Dental Implantology', category: 'Surgical' },
  { id: 'prosthodontics', name: 'Prosthodontics (Bridges & Dentures)', category: 'Specialist' },
  { id: 'sedation', name: 'Sedation & Sleep Dentistry', category: 'Surgical' },
  { id: 'preventive', name: 'Preventive & Dental Hygiene', category: 'Primary' },
  { id: 'tmj', name: 'TMJ & Orofacial Pain Management', category: 'Specialist' },
];

const ALL_EQUIPMENT = [
  { id: 'cbct', name: 'Cone Beam CT (CBCT 3D)', icon: 'biotech', desc: 'High-resolution volumetric 3D imaging' },
  { id: 'opg', name: 'Digital Panoramic OPG', icon: 'perm_media', desc: 'Full-arch diagnostic orthopantomograph' },
  { id: 'scanner', name: 'Intraoral 3D Digital Scanner', icon: 'camera_indoor', desc: 'Optical impressions without putty' },
  { id: 'cadcam', name: 'CAD/CAM Chairside Milling', icon: 'precision_manufacturing', desc: 'Same-day crowns & ceramic restorations' },
  { id: 'autoclave', name: 'Class B Vacuum Autoclave', icon: 'sanitizer', desc: 'Hospital-grade International EN13060 standard' },
  { id: 'microscope', name: 'Dental Operating Microscope', icon: 'search', desc: 'High magnification root canal navigation' },
  { id: 'laser', name: 'Soft-Tissue Surgical Laser', icon: 'flare', desc: 'Bloodless gingival recontouring' },
  { id: 'rvg', name: 'Digital Intraoral RVG Sensors', icon: 'scanner', desc: 'Instant low-dose localized periapical X-rays' },
];

export function ClinicProfileServicesScreen() {
  const navigate = useNavigate();

  const [bio, setBio] = useState(
    'Premier multidisciplinary dental clinic providing advanced implantology, digital smile design, clear aligners, and gentle pediatric dentistry in a state-of-the-art sterile clinical environment.'
  );

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
    'general',
    'restorative',
    'endodontics',
    'orthodontics',
    'implantology',
    'preventive',
  ]);

  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [customSpecialty, setCustomSpecialty] = useState('');

  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([
    'cbct',
    'scanner',
    'autoclave',
    'rvg',
  ]);

  const toggleSpecialty = (id: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleEquipment = (id: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomSpecialty = () => {
    if (!customSpecialty.trim()) return;
    const newId = 'custom_' + Date.now();
    ALL_SPECIALTIES.push({
      id: newId,
      name: customSpecialty.trim(),
      category: 'Specialist',
    });
    setSelectedSpecialties((prev) => [...prev, newId]);
    setCustomSpecialty('');
  };

  const filteredSpecialties = useMemo(() => {
    if (!searchSpecialty.trim()) return ALL_SPECIALTIES;
    return ALL_SPECIALTIES.filter((s) =>
      s.name.toLowerCase().includes(searchSpecialty.toLowerCase())
    );
  }, [searchSpecialty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/clinic-onboarding/primary-location');
  };

  return (
    <ClinicOnboardingShell
      currentStep={5}
      totalSteps={6}
      stepTitle="Profile & Clinical Services"
      stepCategory="Clinical Services"
    >
      <div className="max-w-3xl mx-auto">
        {/* Title Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <span>Stage 15.7</span> &bull; <span>Clinical Offering</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
            Clinic Profile &amp; Clinical Offerings
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Publish your clinical capabilities, accredited dental subspecialties, and diagnostic instrumentation for verified network referrals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Practice Overview & Public Bio */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
                <Icon name="notes" className="text-primary text-base" />
                Practice Public Overview
              </h3>
              <span className={`text-[11px] ${bio.length > 300 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                {bio.length} / 300 chars
              </span>
            </div>

            <textarea
              rows={3}
              maxLength={300}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Provide a concise patient-facing summary of your clinic's services and values..."
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none leading-relaxed"
            />
          </div>

          {/* Card 2: Clinical Specialties */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
                  <Icon name="medical_services" className="text-primary text-base" />
                  Clinical Specialties &amp; Treatments
                </h3>
                <p className="text-[11px] text-on-surface-variant">
                  Select all services provided at this facility ({selectedSpecialties.length} selected)
                </p>
              </div>

              {/* Filter */}
              <div className="relative w-full sm:w-56">
                <Icon name="search" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
                <input
                  type="text"
                  placeholder="Filter specialties..."
                  value={searchSpecialty}
                  onChange={(e) => setSearchSpecialty(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Specialties Chips Grid */}
            <div className="flex flex-wrap gap-2 pt-1">
              {filteredSpecialties.map((specialty) => {
                const isSelected = selectedSpecialties.includes(specialty.id);
                return (
                  <button
                    key={specialty.id}
                    type="button"
                    onClick={() => toggleSpecialty(specialty.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-sm shadow-primary/20'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant border border-outline-variant/40'
                    }`}
                  >
                    <Icon name={isSelected ? 'check' : 'add'} className="text-xs" />
                    <span>{specialty.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Add Custom Specialty */}
            <div className="flex gap-2 pt-2 border-t border-outline-variant/30">
              <input
                type="text"
                placeholder="Add other dental subspecialty..."
                value={customSpecialty}
                onChange={(e) => setCustomSpecialty(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomSpecialty}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
              >
                Add Specialty
              </button>
            </div>
          </div>

          {/* Card 3: Diagnostic Equipment & In-House Technologies */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <div>
              <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
                <Icon name="biotech" className="text-primary text-base" />
                In-House Diagnostic Equipment &amp; Technologies
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                Equipment listed is cross-referenced with your radiation permits and sterilization audit checks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_EQUIPMENT.map((item) => {
                const isSelected = selectedEquipment.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleEquipment(item.id)}
                    className={`cursor-pointer p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-outline-variant/30 bg-surface-container-low hover:border-outline-variant'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      <Icon name={item.icon} className="text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-on-surface truncate">{item.name}</p>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-1.5 ${
                            isSelected
                              ? 'border-primary bg-primary text-white'
                              : 'border-outline-variant'
                          }`}
                        >
                          {isSelected && <Icon name="check" className="text-[10px]" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/registration-details')}
              className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
            >
              Back
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
            >
              <span>Continue to Primary Location</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </form>
      </div>
    </ClinicOnboardingShell>
  );
}
