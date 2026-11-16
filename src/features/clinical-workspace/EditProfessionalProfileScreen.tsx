import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

const ALL_FOCUS_AREAS = [
  'Digital Smile Design (DSD)',
  'Full-Arch Fixed Prosthodontics',
  'Biomimetic Resin Restorations',
  'Guided Implant Surgery',
  'Occlusal Splint Therapy & TMJ',
  'Ceramic Veneers & Onlays',
  'Endodontic Therapy',
  'Periodontal Splinting',
  'Pediatric Restorative Care',
];

export function EditProfessionalProfileScreen() {
  const navigate = useNavigate();

  // Form State
  const [displayName, setDisplayName] = useState('Dr. Daniel James');
  const [tagline, setTagline] = useState('Lead Restorative Dentist & Biomimetic Odontologist');
  const [bio, setBio] = useState(
    'Specializing in complex fixed prosthodontics, adhesive conservative restorations, and digital smile design workflows. Dr. James prioritizes tooth structure preservation through minimally invasive biometric techniques and advanced composite layering protocols.'
  );
  const [languages, setLanguages] = useState(['English', 'Yoruba', 'Hausa']);
  const [newLanguageInput, setNewLanguageInput] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<string[]>([
    'Digital Smile Design (DSD)',
    'Full-Arch Fixed Prosthodontics',
    'Biomimetic Resin Restorations',
    'Ceramic Veneers & Onlays',
  ]);
  const [email, setEmail] = useState('dr.djames@harmonydental.ae');
  const [phone, setPhone] = useState('+234 803 892 4410');
  const [smsAlerts, setSmsAlerts] = useState(true);

  // Amendment modal
  const [showAmendmentModal, setShowAmendmentModal] = useState(false);
  const [amendmentField, setAmendmentField] = useState('Specialist Designation');
  const [amendmentReason, setAmendmentReason] = useState('');
  const [amendmentSubmitted, setAmendmentSubmitted] = useState(false);

  // Toast
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddLanguage = () => {
    if (newLanguageInput.trim() && !languages.includes(newLanguageInput.trim())) {
      setLanguages([...languages, newLanguageInput.trim()]);
      setNewLanguageInput('');
    }
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    setLanguages(languages.filter((l) => l !== langToRemove));
  };

  const toggleFocus = (item: string) => {
    if (selectedFocus.includes(item)) {
      setSelectedFocus(selectedFocus.filter((f) => f !== item));
    } else {
      setSelectedFocus([...selectedFocus, item]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      navigate('/dentist/profile');
    }, 1200);
  };

  const handleSubmitAmendment = () => {
    setAmendmentSubmitted(true);
    setTimeout(() => {
      setAmendmentSubmitted(false);
      setShowAmendmentModal(false);
    }, 1500);
  };

  return (
    <ClinicalWorkspaceShell
      pageTitle="Edit Professional Profile"
      badgeCode="14.15"
      badgeLabel="Profile Configuration"
      activeNav="dashboard"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <button
              type="button"
              onClick={() => navigate('/dentist/profile')}
              className="hover:text-[#006194] transition-colors"
            >
              Professional Profile
            </button>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="font-semibold text-[#131b2e]">Edit Details</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/dentist/profile')}
            className="text-xs font-semibold text-[#006194] hover:underline flex items-center gap-1"
          >
            <Icon name="visibility" className="text-[16px]" />
            <span>Preview Profile</span>
          </button>
        </div>

        {/* Success Toast */}
        {saveSuccess && (
          <div className="p-4 bg-[#86f2e4]/30 border border-[#86f2e4] text-[#006f66] rounded-2xl flex items-center gap-3 animate-in fade-in">
            <Icon name="check_circle" className="text-[20px]" />
            <span className="text-xs font-bold">
              Profile changes saved successfully! Updating clinical registry...
            </span>
          </div>
        )}

        {/* Statutory Safeguard Alert Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#cce5ff]/30 border border-[#93ccff]/50 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0">
            <Icon name="gavel" className="text-[18px]" />
          </div>
          <div className="flex-1 text-xs">
            <h4 className="font-bold text-[#004b74] text-sm">
              Regulated Credential Safeguard (DHA-REG-14.15)
            </h4>
            <p className="text-[#004b74]/90 mt-1 leading-relaxed">
              Biographical data, patient communications, and clinical interests update instantly. Changes to
              official licensing numbers, certified titles, or primary facility affiliations are statutory
              fields and require secondary sign-off by the Nigeria Dental Health Authority Credentialing Board.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Avatar / Photo Management */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="account_box" className="text-[18px] text-[#006194]" />
              <span>Clinician Photo &amp; Avatar</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#006194] to-[#007bb9] text-white flex items-center justify-center font-bold text-3xl shadow-md ring-4 ring-[#eaedff]">
                  DJ
                </div>
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border border-[#eaedff] text-[#006194] flex items-center justify-center shadow-md hover:bg-[#f2f3ff] transition-colors"
                  title="Upload New Photo"
                >
                  <Icon name="photo_camera" className="text-[16px]" />
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#004e77] transition-colors shadow-xs"
                  >
                    Upload New Photo
                  </button>
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-[#eaedff] text-[#ba1a1a] text-xs font-semibold hover:bg-[#ffdad6] transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-[11px] text-[#707881] leading-relaxed">
                  Recommended: Square portrait, minimum 800x800px, white or neutral clinical backdrop. Must adhere to DHA Professional Identification Guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Public Details (Instant Sync) */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h2 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="person" className="text-[18px] text-[#006194]" />
                <span>Public Profile &amp; Bio (Instant Sync)</span>
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66]">
                Instant Sync
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Full Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Professional Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#131b2e]">
                  Clinical Biography &amp; Philosophy
                </label>
                <span className="text-[11px] font-mono text-[#707881]">
                  {bio.length} / 500 characters
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={500}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3.5 bg-white border border-[#eaedff] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194] leading-relaxed resize-none"
              />
            </div>

            {/* Languages Spoken Tag Manager */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#131b2e]">
                Spoken Languages
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-xl bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] border border-[#eaedff] flex items-center gap-1.5"
                  >
                    <span>{lang}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(lang)}
                      className="text-[#707881] hover:text-[#ba1a1a]"
                    >
                      <Icon name="close" className="text-[14px]" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1 max-w-sm">
                <input
                  type="text"
                  value={newLanguageInput}
                  onChange={(e) => setNewLanguageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddLanguage();
                    }
                  }}
                  placeholder="Add another language (e.g. Igbo, Yoruba)..."
                  className="flex-1 px-3 py-1.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] placeholder-[#707881] focus:outline-none focus:border-[#006194]"
                />
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="px-3 py-1.5 rounded-xl bg-[#f2f3ff] text-[#006194] text-xs font-bold hover:bg-[#eaedff] border border-[#eaedff]"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Clinical Focus Toggles */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-[#131b2e]">
                Clinical Focus &amp; Specialisations
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {ALL_FOCUS_AREAS.map((focus) => {
                  const selected = selectedFocus.includes(focus);
                  return (
                    <button
                      key={focus}
                      type="button"
                      onClick={() => toggleFocus(focus)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        selected
                          ? 'bg-[#006194] text-white border-[#006194] shadow-xs'
                          : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      {selected && <Icon name="check" className="text-[13px] inline mr-1" />}
                      <span>{focus}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Regulated Credentials (Locked / Protected) */}
          <div className="bg-[#faf8ff] rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <Icon name="lock" className="text-[18px] text-[#ba1a1a]" />
                <h2 className="text-sm font-bold text-[#131b2e]">
                  Statutory Regulated Credentials (Protected)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAmendmentModal(true)}
                className="px-3 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors flex items-center gap-1.5"
              >
                <Icon name="send" className="text-[14px]" />
                <span>Request Credential Amendment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 bg-white rounded-xl border border-[#eaedff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                    DHA License Number
                  </span>
                  <Icon name="lock" className="text-[13px] text-[#707881]" />
                </div>
                <div className="font-mono text-sm font-bold text-[#131b2e]">#DEN-48912</div>
                <div className="text-[10px] text-[#006a61]">Active through 24 Oct 2027</div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#eaedff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                    Primary Conferred Degree
                  </span>
                  <Icon name="lock" className="text-[13px] text-[#707881]" />
                </div>
                <div className="text-sm font-bold text-[#131b2e]">BDS / DDS Equivalent</div>
                <div className="text-[10px] text-[#006194]">Univ of Lagos (DataFlow Cleared)</div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#eaedff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                    Primary Sponsoring Facility
                  </span>
                  <Icon name="lock" className="text-[13px] text-[#707881]" />
                </div>
                <div className="text-sm font-bold text-[#131b2e]">Harmony Dental Clinic</div>
                <div className="text-[10px] text-[#707881]">Facility #DHA-FAC-88190</div>
              </div>
            </div>
          </div>

          {/* Section 4: Contact & Clinical Dispatch Details */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="contact_phone" className="text-[18px] text-[#006194]" />
              <span>Direct Clinical Dispatch &amp; Duty Contact</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Professional Practice Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Chairside Duty Mobile
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff]">
              <div className="text-xs">
                <div className="font-bold text-[#131b2e]">Urgent SMS Alert Routing</div>
                <div className="text-[11px] text-[#707881]">
                  Receive high-urgency notifications (e.g. Operatory check-ins and critical radiograph findings) via direct SMS.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  smsAlerts ? 'bg-[#006194]' : 'bg-[#bfc7d2]'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    smsAlerts ? 'right-1' : 'left-1'
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/dentist/profile')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#eaedff] bg-white text-xs font-bold text-[#3f4850] hover:bg-[#f2f3ff] transition-colors"
            >
              Cancel &amp; Discard
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Icon name="save" className="text-[16px]" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>

        {/* Credential Amendment Modal */}
        {showAmendmentModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#eaedff] max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="verified_user" className="text-[20px] text-[#006194]" />
                  <span className="text-sm font-bold text-[#131b2e]">
                    Request Statutory Credential Amendment
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAmendmentModal(false)}
                  className="text-[#707881] hover:text-[#131b2e] p-1 rounded-lg"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              {amendmentSubmitted ? (
                <div className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center mx-auto">
                    <Icon name="check" className="text-[24px]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#131b2e]">Dossier Submitted to DHA Board</h4>
                  <p className="text-xs text-[#707881]">
                    Reference ticket #AMD-2026-9041 generated. Review turnaround is typically 48-72 business hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#131b2e] mb-1">
                      Amendment Category
                    </label>
                    <select
                      value={amendmentField}
                      onChange={(e) => setAmendmentField(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                    >
                      <option>Specialist Designation Upgrade</option>
                      <option>Secondary Facility Endorsement</option>
                      <option>Postgraduate Fellowship / Degree Registration</option>
                      <option>Laser / CBCT Extended Privilege</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#131b2e] mb-1">
                      Clinical Justification &amp; Notes
                    </label>
                    <textarea
                      rows={3}
                      value={amendmentReason}
                      onChange={(e) => setAmendmentReason(e.target.value)}
                      placeholder="Outline details of certification, awarding institution, and clinical scope..."
                      className="w-full p-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194] resize-none"
                    />
                  </div>

                  {/* Upload Box */}
                  <div>
                    <label className="block font-bold text-[#131b2e] mb-1">
                      Supporting Document (DataFlow Report / Degree Certificate)
                    </label>
                    <div className="p-4 border-2 border-dashed border-[#eaedff] rounded-2xl text-center hover:bg-[#faf8ff] transition-colors cursor-pointer">
                      <Icon name="upload_file" className="text-[24px] text-[#006194] mx-auto mb-1" />
                      <div className="text-xs font-semibold text-[#131b2e]">
                        Drag and drop certified PDF or image
                      </div>
                      <div className="text-[10px] text-[#707881] mt-0.5">
                        Max file size: 15MB • Must bear official apostille / DataFlow QR
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAmendmentModal(false)}
                      className="px-4 py-2 rounded-xl border border-[#eaedff] text-xs font-bold text-[#3f4850]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitAmendment}
                      className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77]"
                    >
                      Submit for Board Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
