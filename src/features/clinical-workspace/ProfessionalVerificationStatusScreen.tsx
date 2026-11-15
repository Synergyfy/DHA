import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface PrivilegeItem {
  id: string;
  name: string;
  tier: string;
  status: 'active' | 'approved' | 'eligible' | 'under_review';
  authority: string;
  scope: string;
  renewDate: string;
}

const PRIVILEGES: PrivilegeItem[] = [
  {
    id: 'priv-1',
    name: 'General & Restorative Dental Surgery',
    tier: 'Tier 1 Core',
    status: 'active',
    authority: 'DHA Health Regulation Sector',
    scope: 'All direct restorations, indirect ceramic restorations, endodontic therapy, simple extractions.',
    renewDate: '24 Oct 2027',
  },
  {
    id: 'priv-2',
    name: 'Conscious Inhalation Sedation (Nitrous Oxide)',
    tier: 'Tier 2 Clinical',
    status: 'active',
    authority: 'DHA Specialist Endorsement',
    scope: 'Administration of N2O/O2 for adult and pediatric dental anxiety management. Resuscitation protocol certified.',
    renewDate: '15 Jan 2027',
  },
  {
    id: 'priv-3',
    name: 'Cone Beam Computed Tomography (CBCT) Operator',
    tier: 'Tier 2 Imaging',
    status: 'active',
    authority: 'FANR & DHA Radiation Safety',
    scope: 'Operation of 3D maxillofacial CBCT scanner, FOV up to 12x10cm, volumetric diagnosis and planning.',
    renewDate: '30 Aug 2027',
  },
  {
    id: 'priv-4',
    name: 'Advanced Surgical Implantology & Sinus Augmentation',
    tier: 'Tier 3 Surgical',
    status: 'active',
    authority: 'DHA Board of Implantology',
    scope: 'Single and multiple fixture placement, guided osteotomy, transcrestal sinus floor elevation, bone graft harvest.',
    renewDate: '24 Oct 2027',
  },
  {
    id: 'priv-5',
    name: 'Soft-Tissue Laser Surgical Therapy (Diode / Nd:YAG)',
    tier: 'Tier 3 Specialist',
    status: 'eligible',
    authority: 'Laser Safety Committee',
    scope: 'Gingivectomy, troughing for impressions, frenectomy, and peri-implantitis decontamination using certified class 4 dental lasers.',
    renewDate: 'Pending Application',
  },
];

export function ProfessionalVerificationStatusScreen() {
  const navigate = useNavigate();
  const [selectedPrivilege, setSelectedPrivilege] = useState<PrivilegeItem>(PRIVILEGES[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [downloadingPassport, setDownloadingPassport] = useState(false);
  const [passportDownloaded, setPassportDownloaded] = useState(false);

  const handleDownloadPassport = () => {
    setDownloadingPassport(true);
    setTimeout(() => {
      setDownloadingPassport(false);
      setPassportDownloaded(true);
      setTimeout(() => setPassportDownloaded(false), 3000);
    }, 1500);
  };

  return (
    <ClinicalWorkspaceShell
      pageTitle="Professional Verification Status"
      badgeCode="14.16"
      badgeLabel="Statutory Credential Audit"
      activeNav="dashboard"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <button
              type="button"
              onClick={() => navigate('/dentist/profile')}
              className="hover:text-[#006194] transition-colors"
            >
              Professional Profile
            </button>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="font-semibold text-[#131b2e]">Statutory Verification Audit</span>
          </div>

          <button
            type="button"
            onClick={handleDownloadPassport}
            disabled={downloadingPassport}
            className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#004e77] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
          >
            <Icon
              name={downloadingPassport ? 'sync' : passportDownloaded ? 'check' : 'picture_as_pdf'}
              className={`text-[16px] ${downloadingPassport ? 'animate-spin' : ''}`}
            />
            <span>
              {downloadingPassport
                ? 'Generating Credential Passport...'
                : passportDownloaded
                ? 'Passport PDF Downloaded'
                : 'Download DHA Credential Passport (PDF)'}
            </span>
          </button>
        </div>

        {/* Tier 1 Clinician Master Verification Hero Card */}
        <div className="bg-gradient-to-br from-[#006194] via-[#00507a] to-[#003b5c] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Decorative watermarks */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Icon name="verified_user" className="text-[280px]" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/15">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-white/30 shadow-inner">
                  <Icon name="verified" className="text-[36px] text-[#86f2e4]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-bold">DHA Tier 1 Verified Practitioner</h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4]/20 text-[#86f2e4] text-xs font-mono font-bold border border-[#86f2e4]/30">
                      Active Standing
                    </span>
                  </div>
                  <div className="text-xs text-white/80 mt-1 font-mono">
                    Official License: #DEN-48912 • UAE Unified ID: 784-1988-1293810-1
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-right">
                <div className="text-[10px] uppercase font-bold tracking-wider text-white/70">
                  License Expiration
                </div>
                <div className="text-lg font-bold text-white mt-0.5">24 October 2027</div>
                <div className="text-[11px] text-[#86f2e4] font-medium">371 Days Remaining</div>
              </div>
            </div>

            {/* Verification Highlights Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#86f2e4] shrink-0">
                  <Icon name="fingerprint" className="text-[22px]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
                    UAE Pass Identity
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">Level 3 Authenticated</div>
                  <div className="text-[10px] text-white/80">Biometrics on Record</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#86f2e4] shrink-0">
                  <Icon name="verified_user" className="text-[22px]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
                    DataFlow PSV Report
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">Direct Cleared</div>
                  <div className="text-[10px] text-white/80">#DFW-99420-NG (Primary)</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#86f2e4] shrink-0">
                  <Icon name="security" className="text-[22px]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
                    Malpractice Indemnity
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">AED 5,000,000 Coverage</div>
                  <div className="text-[10px] text-white/80">Orient Insurance (Dec 2027)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Point Credential Audit Checklist & CME Bar */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eaedff]">
            <div>
              <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="checklist_rtl" className="text-[20px] text-[#006194]" />
                <span>Statutory 5-Point Verification Audit</span>
              </h2>
              <p className="text-xs text-[#707881] mt-0.5">
                Real-time validation against the Dubai Health Regulation Sector central registry.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold border border-[#86f2e4]/50 self-start sm:self-auto">
              5 of 5 Standards Cleared
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Legal Identity & Emirates ID',
                detail: 'Emirates ID #784-1988-1293810-1 verified with Federal Authority for Identity, Citizenship, Customs and Port Security.',
                status: '100% Cleared',
                date: 'Valid through 18 May 2029',
                icon: 'badge',
              },
              {
                title: 'Primary Dental Degree (BDS / DDS)',
                detail: 'University of Lagos Primary Source Verified by DataFlow Group. Conferred degree authenticated with apostille.',
                status: '100% Cleared',
                date: 'PSV #DFW-99420-NG',
                icon: 'school',
              },
              {
                title: 'DHA Specialist Licensure',
                detail: 'Restorative Dentistry & Odontology specialist register. Good Standing Certificate #DHA-GS-2026-8812 active.',
                status: '100% Active',
                date: 'Renewed Oct 2026',
                icon: 'workspace_premium',
              },
              {
                title: 'Facility Clinical Privileges',
                detail: 'Endorsed attending practitioner at Harmony Dental Clinic (Facility #88190) and Harmony Specialists Jumeirah (#99211).',
                status: '100% Endorsed',
                date: '2 Operatories Active',
                icon: 'domain',
              },
            ].map((audit, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-3.5 hover:border-[#006194]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#006194]/10 text-[#006194] flex items-center justify-center shrink-0">
                  <Icon name={audit.icon} className="text-[20px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#131b2e]">{audit.title}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-[10px] font-bold">
                      {audit.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">{audit.detail}</p>
                  <div className="text-[10px] font-mono text-[#707881] mt-2">{audit.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 5th Standard: CME Credit Cycle Progress */}
          <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Icon name="menu_book" className="text-[18px] text-[#006194]" />
                <h4 className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                  5. Annual Continuous Medical Education (CME) 2026 Cycle
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#006194]">
                  38 / 40 Credit Hours Completed (95%)
                </span>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-white text-[#006194] text-xs font-bold border border-[#eaedff] hover:bg-[#eaedff] transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Icon name="upload" className="text-[14px]" />
                  <span>Upload Certificate</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#eaedff] h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#006194] to-[#006a61] h-full rounded-full transition-all duration-500"
                style={{ width: '95%' }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#707881] pt-1">
              <span>Category 1 Accredited Credits</span>
              <span>2 hours needed before 24 Oct 2027 cycle close</span>
            </div>
          </div>
        </div>

        {/* Clinical Privilege Scope & Extension Studio */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eaedff]">
            <div>
              <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="military_tech" className="text-[20px] text-[#006194]" />
                <span>Clinical Privilege Scope &amp; Extension Studio</span>
              </h2>
              <p className="text-xs text-[#707881] mt-0.5">
                Procedures authorized under Dr. Daniel James&apos;s specialist licensure across DHA healthcare facilities.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/dentist/profile/edit')}
              className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
            >
              <span>Apply for Privilege Extension</span>
              <Icon name="arrow_forward" className="text-[14px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Privilege List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {PRIVILEGES.map((priv) => {
                const isSelected = selectedPrivilege.id === priv.id;
                return (
                  <div
                    key={priv.id}
                    onClick={() => setSelectedPrivilege(priv)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#006194] bg-[#faf8ff] ring-2 ring-[#006194]/15 shadow-sm'
                        : 'border-[#eaedff] bg-white hover:bg-[#f2f3ff]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-[#131b2e]">{priv.name}</span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#f2f3ff] text-[#006194] border border-[#eaedff]">
                            {priv.tier}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#707881] mt-0.5">{priv.authority}</div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          priv.status === 'active'
                            ? 'bg-[#86f2e4]/30 text-[#006f66]'
                            : 'bg-[#ffdcc2] text-[#9a4500]'
                        }`}
                      >
                        {priv.status === 'active' ? 'Active' : 'Eligible to Apply'}
                      </span>
                    </div>

                    <p className="text-xs text-[#3f4850] mt-2 line-clamp-1">{priv.scope}</p>
                  </div>
                );
              })}
            </div>

            {/* Selected Privilege Detail Panel (5 cols) */}
            <div className="lg:col-span-5 bg-[#faf8ff] rounded-2xl border border-[#eaedff] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Privilege Inspection
                </span>
                <span className="font-mono text-[10px] text-[#006194] font-bold">
                  {selectedPrivilege.tier}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#131b2e]">{selectedPrivilege.name}</h3>
                <div className="text-xs text-[#707881] mt-0.5">{selectedPrivilege.authority}</div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-[#131b2e]">Authorized Scope of Practice:</div>
                <p className="text-[#3f4850] leading-relaxed p-3 bg-white rounded-xl border border-[#eaedff]">
                  {selectedPrivilege.scope}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#eaedff] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#707881]">Authority Board:</span>
                  <span className="font-bold text-[#131b2e]">{selectedPrivilege.authority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707881]">Status / Validity:</span>
                  <span className="font-bold text-[#006a61]">
                    {selectedPrivilege.status === 'active'
                      ? `Active (Due ${selectedPrivilege.renewDate})`
                      : 'Eligible for Verification'}
                  </span>
                </div>
              </div>

              {selectedPrivilege.status === 'eligible' && (
                <button
                  type="button"
                  onClick={() => navigate('/dentist/profile/edit')}
                  className="w-full py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors"
                >
                  Submit Laser Privilege Application
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Upload Certificate Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#eaedff] max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="upload_file" className="text-[20px] text-[#006194]" />
                  <span className="text-sm font-bold text-[#131b2e]">
                    Upload CME Certificate
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="text-[#707881] hover:text-[#131b2e] p-1 rounded-lg"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">Activity Title</label>
                  <input
                    type="text"
                    placeholder="e.g. 8th Emirates International Dental Congress"
                    className="w-full px-3 py-2 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#131b2e] mb-1">CME Hours</label>
                    <input
                      type="number"
                      placeholder="e.g. 2.0"
                      className="w-full px-3 py-2 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#131b2e] mb-1">Accrediting Body</label>
                    <input
                      type="text"
                      defaultValue="DHA CPD / CPQ"
                      className="w-full px-3 py-2 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                    />
                  </div>
                </div>

                <div className="p-4 border-2 border-dashed border-[#eaedff] rounded-2xl text-center hover:bg-[#faf8ff] transition-colors cursor-pointer">
                  <Icon name="cloud_upload" className="text-[24px] text-[#006194] mx-auto mb-1" />
                  <div className="text-xs font-semibold text-[#131b2e]">Upload Certificate PDF / Image</div>
                  <div className="text-[10px] text-[#707881]">Official DHA CPD certificate QR code required</div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#eaedff] text-xs font-bold text-[#3f4850]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77]"
                  >
                    Submit for CPD Indexing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
