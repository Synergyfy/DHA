import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

interface OperatorySuite {
  id: number;
  name: string;
  type: string;
  equipment: string;
}

export function PrimaryClinicLocationScreen() {
  const navigate = useNavigate();

  // Branch info
  const [branchName, setBranchName] = useState('Greenfield Dental Clinic — Wuse 2 Main Branch');
  const [branchCode, setBranchCode] = useState('HQ-001');
  const [district, setDistrict] = useState('Wuse 2, Cadastral Zone A07');
  const [landmark, setLandmark] = useState('Opposite Transcorp Hilton Annex, adjacent to Zenith Bank');
  const [fullAddress, setFullAddress] = useState('Plot 1482, Ademola Adetokunbo Crescent, 2nd Floor Suite 204, Wuse 2, Abuja');

  // Operatory count & dynamic suites
  const [operatoryCount, setOperatoryCount] = useState<number>(4);

  // Contacts
  const [receptionPhone, setReceptionPhone] = useState('+234 803 555 0192');
  const [emergencyPhone, setEmergencyPhone] = useState('+234 812 900 4421');
  const [appointmentEmail, setAppointmentEmail] = useState('appointments@greenfielddental.ng');

  // Photo uploads
  const [operatoryPhoto, setOperatoryPhoto] = useState(true);
  const [receptionPhoto, setReceptionPhoto] = useState(true);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  const operatorySuites: OperatorySuite[] = [
    {
      id: 1,
      name: 'Operatory Suite 1',
      type: 'General & Restorative',
      equipment: 'A-Dec 500 Dental Chair, High-Speed Handpieces, Curing LED',
    },
    {
      id: 2,
      name: 'Operatory Suite 2',
      type: 'Surgical & Implant Suite',
      equipment: 'Kavo Primus Surgical Chair, Physiodispenser, O2 & N2O Sedation',
    },
    {
      id: 3,
      name: 'Operatory Suite 3',
      type: 'Orthodontics & Hygiene Bay',
      equipment: 'Planmeca Compact Chair, Piezon Scaler, Airflow Prophylaxis',
    },
    {
      id: 4,
      name: 'Operatory Suite 4',
      type: 'Digital Scanning & Aesthetic Consultation',
      equipment: 'iTero Element 5D Scanner, Dual HD Monitors, Intraoral Camera',
    },
    {
      id: 5,
      name: 'Operatory Suite 5',
      type: 'Pediatric Care Room',
      equipment: 'Belmont Clesta Pediatric Unit, Ceil-Mounted Display, Fluoride Tray',
    },
    {
      id: 6,
      name: 'Operatory Suite 6',
      type: 'Endodontic Suite',
      equipment: 'Zeiss Surgical Microscope, WaveOne Gold Rotary Motor, Apex Locator',
    },
  ];

  const displayedSuites = operatorySuites.slice(0, operatoryCount);

  const handleIncrement = () => {
    if (operatoryCount < 6) {
      setOperatoryCount(operatoryCount + 1);
    }
  };

  const handleDecrement = () => {
    if (operatoryCount > 1) {
      setOperatoryCount(operatoryCount - 1);
    }
  };

  const handleCompleteEnrollment = () => {
    setIsCompletedModalOpen(true);
  };

  return (
    <ClinicOnboardingShell
      currentStep={6}
      totalSteps={6}
      stepTitle="Primary Practice Location"
      stepCategory="Facility Physical Site"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Title Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <span>Stage 15.8</span> &bull; <span>Establish Physical Site</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
            Primary Practice Site &amp; Operatory Configuration
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Configure your registered headquarters location, operatory suites, and physical emergency access points.
          </p>
        </div>

        {/* Model A/B Practice Site Advisory */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
          <Icon name="domain" className="text-primary text-xl shrink-0 mt-0.5" />
          <div className="text-xs text-on-surface-variant leading-relaxed">
            <span className="font-bold text-on-surface">Model A Primary Practice Site:</span> This facility operates as your registered flagship anchor. Inpatient admitting rights, pharmacy nodes, and satellite community branches can be linked to this root ID (#HQ-001).
          </div>
        </div>

        {/* Card 1: Branch Designation & Physical Address */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
          <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
            <Icon name="place" className="text-primary text-base" />
            Branch Identification &amp; Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Branch Display Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">Site Ref Code</label>
              <input
                type="text"
                required
                value={branchCode}
                onChange={(e) => setBranchCode(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Cadastral Zone &amp; District <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Prominent Landmark / Proximity Guide
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5">
              Full Physical Street Address &amp; Floor Unit <span className="text-error">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Card 2: Interactive Map & Geopoint Preview */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
              <Icon name="explore" className="text-primary text-base" />
              Geographic Coordinates &amp; Map Pin
            </h3>
            <span className="text-[11px] font-semibold text-secondary flex items-center gap-1">
              <Icon name="my_location" className="text-xs" /> GPS Synced &bull; &plusmn;1.2m
            </span>
          </div>

          <div className="relative h-44 rounded-xl bg-gradient-to-tr from-surface-container-high to-surface-container-highest border border-outline-variant/40 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#006194_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 animate-bounce mb-2">
                <Icon name="location_on" className="text-2xl" />
              </div>
              <div className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/40 shadow-sm text-xs font-mono font-bold text-on-surface">
                9.0765&deg; N, 7.4925&deg; E
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1">
                Wuse 2 Medical Corridor &bull; Abuja Cadastral Authority Validated
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Dental Operatories Stepper & Suites Grid */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
                <Icon name="airline_seat_flat" className="text-primary text-base" />
                Active Dental Operatories &amp; Chairs
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                Configured dental operatories determine your permitted booking velocity and concurrent patient slots.
              </p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-3 bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/40 shrink-0">
              <span className="text-xs font-semibold text-on-surface-variant">Operatories:</span>
              <button
                type="button"
                onClick={handleDecrement}
                disabled={operatoryCount <= 1}
                className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40"
              >
                <Icon name="remove" className="text-sm" />
              </button>
              <span className="font-heading font-bold text-base text-primary w-5 text-center">
                {operatoryCount}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                disabled={operatoryCount >= 6}
                className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40"
              >
                <Icon name="add" className="text-sm" />
              </button>
            </div>
          </div>

          {/* Dynamic Operatories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {displayedSuites.map((suite) => (
              <div
                key={suite.id}
                className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <Icon name="dentistry" className="text-primary text-sm" />
                    {suite.name}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-secondary px-2 py-0.5 rounded bg-secondary-container/50">
                    Active
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-primary">{suite.type}</p>
                <p className="text-[10px] text-on-surface-variant line-clamp-1">{suite.equipment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Practice Direct Contacts */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
          <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
            <Icon name="dialer_sip" className="text-primary text-base" />
            Branch Direct Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-on-surface mb-1">Reception Line</label>
              <input
                type="tel"
                value={receptionPhone}
                onChange={(e) => setReceptionPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-on-surface mb-1">24/7 Dental Emergency</label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-on-surface mb-1">Appointment Desk Email</label>
              <input
                type="email"
                value={appointmentEmail}
                onChange={(e) => setAppointmentEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Card 5: Verification Photos */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-3 shadow-sm">
          <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
            <Icon name="photo_library" className="text-primary text-base" />
            Operatory Verification Photography
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Photo 1 */}
            {operatoryPhoto ? (
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon name="airline_seat_flat" className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">suite_a_operatory.jpg</p>
                    <p className="text-[10px] text-on-surface-variant">2.1 MB &bull; Sterility Validated</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOperatoryPhoto(false)}
                  className="text-[11px] text-error hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onClick={() => setOperatoryPhoto(true)}
                className="cursor-pointer border-2 border-dashed border-outline-variant rounded-xl p-3 text-center bg-surface-container-low/50"
              >
                <p className="text-xs font-semibold text-on-surface">+ Upload Operatory Suite Photo</p>
              </div>
            )}

            {/* Photo 2 */}
            {receptionPhoto ? (
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-secondary-container/60 text-secondary flex items-center justify-center">
                    <Icon name="meeting_room" className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">reception_lounge.jpg</p>
                    <p className="text-[10px] text-on-surface-variant">1.9 MB &bull; Waiting Area</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReceptionPhoto(false)}
                  className="text-[11px] text-error hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onClick={() => setReceptionPhoto(true)}
                className="cursor-pointer border-2 border-dashed border-outline-variant rounded-xl p-3 text-center bg-surface-container-low/50"
              >
                <p className="text-xs font-semibold text-on-surface">+ Upload Reception Lounge Photo</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/profile-services')}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleCompleteEnrollment}
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <span>Complete Facility Enrollment</span>
            <Icon name="check_circle" className="text-base" />
          </button>
        </div>
      </div>

      {/* Completion Modal */}
      {isCompletedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-outline-variant/30 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-secondary-container text-secondary mx-auto flex items-center justify-center shadow-lg shadow-secondary/20">
              <Icon name="task_alt" className="text-3xl" />
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold text-secondary tracking-wider block">
                Statutory Submission Complete
              </span>
              <h3 className="text-xl font-heading font-bold text-on-surface mt-1">
                Facility Enrolled Successfully
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                <strong>Greenfield Dental Clinics Limited</strong> (HQ-001) has been provisionally registered on the DHA Clinical Portal. Your credentials are now active.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-left space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Facility Code:</span>
                <span className="font-mono font-bold text-on-surface">DHA-FAC-2026-9021</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Principal Director:</span>
                <span className="font-semibold text-on-surface">Dr. Amina Bello (#DEN-78421)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Accreditation Audit:</span>
                <span className="font-semibold text-secondary">Pre-Approved / Active</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => navigate('/dentist/dashboard')}
                className="w-full py-3 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span>Launch Clinical Workspace</span>
                <Icon name="dashboard" className="text-base" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/clinic-onboarding/entry')}
                className="w-full py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs font-semibold hover:bg-surface-container transition-colors"
              >
                Back to Gateway
              </button>
            </div>
          </div>
        </div>
      )}
    </ClinicOnboardingShell>
  );
}
