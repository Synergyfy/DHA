import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

export function ProfessionalProfileScreen() {
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyProfile = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <ClinicalWorkspaceShell
      pageTitle="Professional Profile"
      badgeCode="14.14"
      badgeLabel="Clinician Master Dossier"
      activeNav="dashboard"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Breadcrumb & Quick Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <button
              type="button"
              onClick={() => navigate('/dentist/dashboard')}
              className="hover:text-[#006194] transition-colors"
            >
              Clinical Workspace
            </button>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="font-semibold text-[#131b2e]">Clinician Profile</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#006194] font-bold">
              #DEN-48912
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#3f4850] text-xs font-semibold border border-[#eaedff] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Icon name="qr_code_2" className="text-[16px]" />
              <span>Digital Badge</span>
            </button>

            <button
              type="button"
              onClick={handleCopyProfile}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#3f4850] text-xs font-semibold border border-[#eaedff] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Icon name={copiedLink ? 'done' : 'share'} className="text-[16px]" />
              <span>{copiedLink ? 'Profile Copied!' : 'Share Profile'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/dentist/profile/edit')}
              className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#004e77] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Icon name="edit" className="text-[16px]" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-8 shadow-sm relative overflow-hidden">
          {/* Background Ambient Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#cce5ff]/30 via-transparent to-transparent pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            {/* Clinician Avatar with DHA Badge */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#006194] to-[#007bb9] text-white flex items-center justify-center font-bold text-3xl shadow-lg ring-4 ring-[#eaedff]">
                DJ
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-md ring-2 ring-white"
                title="Verified Practitioner"
              >
                <Icon name="verified" className="text-[18px]" />
              </div>
            </div>

            {/* Core Credentials & Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#131b2e]">
                  Dr. Daniel James
                </h1>
                <span className="text-sm font-semibold text-[#707881]">DDS, FICOI</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold border border-[#86f2e4]/50 flex items-center gap-1">
                  <Icon name="verified_user" className="text-[14px]" />
                  <span>DHA Tier 1 Verified</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#cce5ff]/60 text-[#004b74] text-xs font-bold">
                  Good Standing
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-[#006194]">
                Lead Restorative Dentist &amp; Biomimetic Odontologist
              </p>

              <div className="flex items-center gap-y-1 gap-x-4 text-xs text-[#707881] flex-wrap pt-1">
                <span className="flex items-center gap-1">
                  <Icon name="badge" className="text-[15px] text-[#006194]" />
                  <span>License: <strong className="font-mono text-[#131b2e]">#DEN-48912</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="domain" className="text-[15px] text-[#006194]" />
                  <span>Harmony Dental Clinic (Wuse 2)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="location_on" className="text-[15px] text-[#006194]" />
                  <span>Dubai, UAE</span>
                </span>
              </div>
            </div>

            {/* Quick Gateways */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#eaedff]">
              <button
                type="button"
                onClick={() => navigate('/dentist/verification')}
                className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-bold flex items-center justify-center gap-2 border border-[#eaedff] transition-colors"
              >
                <Icon name="verified_user" className="text-[16px]" />
                <span>Verification Passport</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dentist/schedule')}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#3f4850] text-xs font-semibold flex items-center justify-center gap-2 border border-[#eaedff] transition-colors"
              >
                <Icon name="schedule" className="text-[16px]" />
                <span>Manage Schedule</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#eaedff]">
            <div className="p-3 bg-[#f2f3ff] rounded-2xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                Clinical Experience
              </div>
              <div className="text-xl font-bold text-[#131b2e] mt-0.5">12 Years</div>
              <div className="text-[10px] text-[#006a61] font-medium flex items-center gap-0.5 mt-0.5">
                <Icon name="check_circle" className="text-[12px]" />
                <span>Since 2014</span>
              </div>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-2xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                Total Encounters
              </div>
              <div className="text-xl font-bold text-[#131b2e] mt-0.5">4,280+</div>
              <div className="text-[10px] text-[#006194] font-medium">Chairside Audited</div>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-2xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                NABIDH Quality Score
              </div>
              <div className="text-xl font-bold text-[#006a61] mt-0.5">98.4%</div>
              <div className="text-[10px] text-[#006a61] font-medium">Tier 1 Compliance</div>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-2xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                Patient Rating
              </div>
              <div className="text-xl font-bold text-[#131b2e] mt-0.5 flex items-center gap-1">
                <span>4.9</span>
                <span className="text-[#006194] text-sm">/ 5.0</span>
              </div>
              <div className="text-[10px] text-[#707881] font-medium">342 Verified Reviews</div>
            </div>
          </div>
        </div>

        {/* Main Grid: Biography & Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Bio, Specialities, Credentials */}
          <div className="lg:col-span-8 space-y-6">
            {/* Clinical Biography */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                  <Icon name="article" className="text-[20px] text-[#006194]" />
                  <span>Clinical Biography &amp; Practice Philosophy</span>
                </h2>
                <button
                  type="button"
                  onClick={() => navigate('/dentist/profile/edit')}
                  className="text-xs font-semibold text-[#006194] hover:underline flex items-center gap-1"
                >
                  <Icon name="edit" className="text-[14px]" />
                  <span>Edit Bio</span>
                </button>
              </div>

              <div className="text-sm text-[#3f4850] leading-relaxed space-y-3">
                <p>
                  Dr. Daniel James is a Senior Specialist in Restorative Dentistry and Biomimetic Odontology
                  with over a decade of dedicated clinical practice across premier dental hospitals and private
                  surgical centers in Nigeria and the United Arab Emirates.
                </p>
                <p>
                  Specializing in complex fixed prosthodontics, adhesive conservative restorations, and digital
                  smile design workflows, Dr. James prioritizes tooth structure preservation through minimally
                  invasive biometric techniques and advanced composite layering protocols. He works in close
                  collaboration with multidisciplinary surgical teams for full-mouth rehabilitation cases under
                  computer-guided implantology.
                </p>
              </div>

              {/* Languages Spoken */}
              <div className="pt-4 border-t border-[#eaedff] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Spoken Languages
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { lang: 'English', level: 'Native / Bilingual' },
                    { lang: 'Yoruba', level: 'Fluent' },
                    { lang: 'Arabic', level: 'Clinical Proficiency (B2)' },
                  ].map((l) => (
                    <span
                      key={l.lang}
                      className="px-3 py-1 rounded-xl bg-[#f2f3ff] text-xs font-medium text-[#131b2e] border border-[#eaedff] flex items-center gap-1.5"
                    >
                      <Icon name="translate" className="text-[14px] text-[#006194]" />
                      <span>{l.lang}</span>
                      <span className="text-[10px] text-[#707881]">({l.level})</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialisation Pills */}
              <div className="pt-3 border-t border-[#eaedff] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Clinical Focus Areas
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    'Digital Smile Design (DSD)',
                    'Full-Arch Fixed Prosthodontics',
                    'Biomimetic Resin Restorations',
                    'Guided Implant Surgery',
                    'Occlusal Splint Therapy & TMJ',
                    'Ceramic Veneers & Onlays',
                  ].map((focus) => (
                    <span
                      key={focus}
                      className="px-3 py-1 rounded-full bg-[#cce5ff]/40 text-[#004b74] text-xs font-semibold border border-[#93ccff]/40"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verified Qualifications & Registrations */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                  <Icon name="school" className="text-[20px] text-[#006194]" />
                  <span>Statutory Qualifications &amp; Accreditations</span>
                </h2>
                <button
                  type="button"
                  onClick={() => navigate('/dentist/verification')}
                  className="text-xs font-semibold text-[#006194] hover:underline flex items-center gap-1"
                >
                  <Icon name="verified_user" className="text-[14px]" />
                  <span>Audit Trail</span>
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'DHA Specialist Dentist — Restorative Dentistry',
                    issuer: 'Dubai Health Authority (Health Regulation Sector)',
                    licNo: '#DEN-48912',
                    status: 'Active (Valid through 24 Oct 2027)',
                    psv: 'DataFlow Primary Cleared',
                    icon: 'verified',
                  },
                  {
                    title: 'Fellow of the International Congress of Oral Implantologists (FICOI)',
                    issuer: 'International Congress of Oral Implantologists (ICOI, USA)',
                    licNo: '#FICOI-2019-892',
                    status: 'Good Standing',
                    psv: 'Direct Institution Cleared',
                    icon: 'workspace_premium',
                  },
                  {
                    title: 'Bachelor of Dental Surgery (BDS / DDS Equivalent)',
                    issuer: 'College of Medicine, University of Lagos (2014)',
                    licNo: '#MED-DDS-2014-041',
                    status: 'Degree Conferred with Honours',
                    psv: 'DataFlow Report #DFW-99420-NG',
                    icon: 'school',
                  },
                  {
                    title: 'Advanced CBCT 3D Radiography & Diagnostics License',
                    issuer: 'Federal Authority for Nuclear Regulation (FANR) / DHA',
                    licNo: '#FANR-DHA-9081',
                    status: 'Operator Endorsement Active',
                    psv: 'Verified Radiation Safety Certified',
                    icon: 'biotech',
                  },
                ].map((cred, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-4 hover:border-[#006194]/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#006194]/10 text-[#006194] flex items-center justify-center shrink-0">
                      <Icon name={cred.icon} className="text-[20px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-[#131b2e]">{cred.title}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-[10px] font-bold">
                          {cred.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#707881] mt-0.5">{cred.issuer}</div>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-[#006194] mt-2 flex-wrap">
                        <span>Ref: {cred.licNo}</span>
                        <span>•</span>
                        <span className="text-[#006a61] flex items-center gap-0.5 font-sans font-semibold">
                          <Icon name="check" className="text-[12px]" />
                          {cred.psv}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Affiliations, Schedule Summary, Governance */}
          <div className="lg:col-span-4 space-y-6">
            {/* Practice Affiliations */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="apartment" className="text-[18px] text-[#006194]" />
                <span>Practice Affiliations</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">Harmony Dental Clinic</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#006194] text-white text-[10px] font-bold">
                      Primary
                    </span>
                  </div>
                  <div className="text-xs text-[#707881]">
                    Wuse 2 Medical Corridor, Facility #DHA-FAC-88190
                  </div>
                  <div className="text-[11px] font-medium text-[#006194] flex items-center gap-1">
                    <Icon name="chair" className="text-[13px]" />
                    <span>Dedicated Operatory 02</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#eaedff] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">Harmony Specialists Clinic</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-[10px] font-bold">
                      Secondary
                    </span>
                  </div>
                  <div className="text-xs text-[#707881]">
                    Jumeirah Healthcare Hub, Facility #DHA-FAC-99211
                  </div>
                  <div className="text-[11px] font-medium text-[#006194] flex items-center gap-1">
                    <Icon name="chair" className="text-[13px]" />
                    <span>Suite 402 (Wed &amp; Thu)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Schedule Overview */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                  <Icon name="calendar_month" className="text-[18px] text-[#006194]" />
                  <span>Clinical Schedule</span>
                </h3>
                <button
                  type="button"
                  onClick={() => navigate('/dentist/schedule')}
                  className="text-xs font-semibold text-[#006194] hover:underline"
                >
                  Roster
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { day: 'Sun - Tue', time: '08:30 - 17:00', loc: 'Harmony Wuse 2 (Op 02)', active: true },
                  { day: 'Wed - Thu', time: '09:00 - 17:00', loc: 'Harmony Jumeirah (Ste 402)', active: true },
                  { day: 'Friday', time: '08:30 - 12:30', loc: 'Harmony Wuse 2 (Half Day)', active: true },
                  { day: 'Saturday', time: 'Off-Duty', loc: 'Rest Day / On-Call Only', active: false },
                ].map((s) => (
                  <div
                    key={s.day}
                    className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#131b2e]">{s.day}</div>
                      <div className="text-[11px] text-[#707881]">{s.loc}</div>
                    </div>
                    <span
                      className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        s.active ? 'bg-[#cce5ff]/50 text-[#004b74]' : 'bg-[#eaedff] text-[#707881]'
                      }`}
                    >
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#eaedff] flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/dentist/leave')}
                  className="w-full py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Icon name="event_busy" className="text-[16px]" />
                  <span>Request Leave</span>
                </button>
              </div>
            </div>

            {/* Medicolegal Governance Seal */}
            <div className="bg-[#f2f3ff] rounded-2xl border border-[#eaedff] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="verified_user" className="text-[18px] text-[#006194]" />
                <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                  DHA Medicolegal Seal
                </span>
              </div>
              <p className="text-[11px] text-[#707881] leading-relaxed">
                Profile records are digitally linked with the Dubai Health Authority Central Registry
                and NABIDH Health Information Exchange under Law No. (32) of 2015.
              </p>
              <div className="pt-2 border-t border-[#eaedff] text-[10px] font-mono text-[#707881] flex items-center justify-between">
                <span>Verification Hash:</span>
                <span className="text-[#006194] font-bold">DHA#9920-A1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Badge Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#eaedff] max-w-sm w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="qr_code_2" className="text-[20px] text-[#006194]" />
                  <span className="text-sm font-bold text-[#131b2e]">Clinician Digital ID</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="text-[#707881] hover:text-[#131b2e] p-1 rounded-lg"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              {/* QR Code Graphic Mock */}
              <div className="p-6 bg-[#f2f3ff] rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-44 h-44 bg-white rounded-2xl p-3 shadow-inner flex items-center justify-center border border-[#eaedff]">
                  <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-[#131b2e] rounded-lg opacity-90">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i * 7 + 3) % 2 === 0 ? 'bg-white' : 'bg-transparent'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="text-xs font-bold text-[#131b2e]">Dr. Daniel James, DDS</div>
                <div className="text-[11px] font-mono text-[#006194]">
                  DHA-DEN-48912 • Tier 1 Verified
                </div>
              </div>

              <div className="text-center text-[11px] text-[#707881]">
                Scan with any DHA patient or hospital terminal to verify license standing and chairside credentials.
              </div>

              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors"
              >
                Close Badge
              </button>
            </div>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
