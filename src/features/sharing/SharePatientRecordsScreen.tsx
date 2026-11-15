import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SharingShell } from './SharingShell';
import { Icon } from '../../design/Primitives';

export function SharePatientRecordsScreen() {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<string>('dr-tariq');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('continuing-care');
  const [selectedRecords, setSelectedRecords] = useState<string[]>([
    'screening-outreach',
    'odontogram-chart',
    'perio-index',
    'panoramic-opg',
    'bitewings',
  ]);
  const [instantQrCheckin, setInstantQrCheckin] = useState<boolean>(true);

  const toggleRecord = (recId: string) => {
    if (selectedRecords.includes(recId)) {
      setSelectedRecords(selectedRecords.filter((id) => id !== recId));
    } else {
      setSelectedRecords([...selectedRecords, recId]);
    }
  };

  return (
    <SharingShell
      pageTitle="Share Patient Records"
      badgeCode="7.2"
      badgeLabel="Step 1 of 3: Scoping"
    >
      <div className="space-y-8 lg:space-y-10">
        {/* Wizard Step Indicator */}
        <section className="p-4 sm:p-6 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                1
              </span>
              <span className="font-bold text-primary">Provider & Scope</span>
            </div>
            <div className="h-0.5 flex-1 mx-4 bg-primary-fixed" />
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-bold text-xs">
                2
              </span>
              <span className="text-on-surface-variant">Purpose</span>
            </div>
            <div className="h-0.5 flex-1 mx-4 bg-surface-container" />
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-bold text-xs">
                3
              </span>
              <span className="text-on-surface-variant">Authorise</span>
            </div>
          </div>
        </section>

        {/* Section 1: Select DHA Provider */}
        <section className="p-6 sm:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="badge" className="text-primary text-[22px]" />
              <h2 className="text-lg sm:text-xl font-bold text-on-surface font-display">
                1. Select Verified DHA Healthcare Provider
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center gap-1">
              <Icon name="verified" className="text-[14px]" />
              <span>DHA Verified</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low text-xs text-on-surface-variant flex items-start gap-3">
            <Icon name="shield" className="text-secondary text-[20px] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Only licensed DHA network clinicians and clinics with verified digital certificates can decrypt and inspect clinical pediatric and adult dental records.
            </p>
          </div>

          {/* Provider Radio Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label
              onClick={() => setSelectedProvider('dr-tariq')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedProvider === 'dr-tariq'
                  ? 'bg-primary-fixed/20 border-primary shadow-sm'
                  : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwuRDH3MqA2CzUzCC71DOZqwkklgWWv5RW9LxOjlTfMD0IwydvTgm3nWmthSYcPIpcQLDs3hQ0xECYaVW0DL5Jp7SXaTdm8-2-RmfQRUPjB9M0V-6MvEg90yUoGykq3GqiFAmHTP-UVA7ueXMqzihWOmOmvUiISYnehT2VOlhSR0mot6MoOHA6wFUE_7tRDRJQedWVc-FQTjCnmuvPnGwtzDXzbW8DBDIppsXwiXU8"
                    alt="Dr. Tariq Mansoor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-on-surface truncate">Dr. Tariq Mansoor</div>
                  <div className="text-[11px] font-mono text-primary font-bold">DHA #48912</div>
                  <div className="text-xs text-on-surface-variant truncate">Jumeirah Dental Care</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-secondary font-semibold">
                <span>General & Pediatric</span>
                <Icon name={selectedProvider === 'dr-tariq' ? 'check_circle' : 'radio_button_unchecked'} />
              </div>
            </label>

            <label
              onClick={() => setSelectedProvider('dr-reem')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedProvider === 'dr-reem'
                  ? 'bg-primary-fixed/20 border-primary shadow-sm'
                  : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT29w4UPCEdUb025eB_vRAldTwQ7Pj2XD6567lus6vU0yyUw-Un9eoQITxeZVKwi5FINkFp_PRaVRNFpqz2yqNOYAIyDX5uGtwAUbKih4aIjz-TAVGmOhDTtRY-ggY0EOG-lKhE1lizGGf0JbkIELquqyR3MHA1jqFW6b5_ojEPnz85tMc5vj6aXqUC0oWdnAa5SaBY3yo0Q0TAmX16Qf4EuQL0C63BuwJM6BNKpfl"
                    alt="Dr. Reem Al-Nuaimi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-on-surface truncate">Dr. Reem Al-Nuaimi</div>
                  <div className="text-[11px] font-mono text-primary font-bold">DHA #51204</div>
                  <div className="text-xs text-on-surface-variant truncate">Downtown Specialists</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-secondary font-semibold">
                <span>Orthodontist Specialist</span>
                <Icon name={selectedProvider === 'dr-reem' ? 'check_circle' : 'radio_button_unchecked'} />
              </div>
            </label>

            <label
              onClick={() => setSelectedProvider('al-zahra')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedProvider === 'al-zahra'
                  ? 'bg-primary-fixed/20 border-primary shadow-sm'
                  : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-highest text-primary flex items-center justify-center shrink-0">
                  <Icon name="local_hospital" className="text-[26px]" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-on-surface truncate">Al Zahra Dental Hub</div>
                  <div className="text-[11px] font-mono text-primary font-bold">Facility #CL-8849</div>
                  <div className="text-xs text-on-surface-variant truncate">Al Barsha Branch</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-secondary font-semibold">
                <span>Multi-Chair Polyclinic</span>
                <Icon name={selectedProvider === 'al-zahra' ? 'check_circle' : 'radio_button_unchecked'} />
              </div>
            </label>
          </div>
        </section>

        {/* Section 2: Purpose of Sharing */}
        <section className="p-6 sm:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Icon name="assignment_turned_in" className="text-primary text-[22px]" />
            <h2 className="text-lg sm:text-xl font-bold text-on-surface font-display">
              2. Select Purpose of Sharing
            </h2>
          </div>

          <p className="text-xs text-on-surface-variant">
            Dubai Health Authority regulations mandate documenting specific purpose for audit trails and clinical consent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'continuing-care', label: 'Continuing Dental Care', desc: 'Routine check-up, prophylaxis, ongoing pediatric hygiene' },
              { id: 'second-opinion', label: 'Second Opinion', desc: 'Independent diagnosis review for proposed orthodontic or operative care' },
              { id: 'specialist-consult', label: 'Specialist Consultation', desc: 'Targeted orthodontic, endodontic, or pediatric surgical evaluation' },
              { id: 'referral-sync', label: 'Referral Follow-up', desc: 'Post-referral clinical report sync back to primary dentist' },
            ].map((purpose) => (
              <label
                key={purpose.id}
                onClick={() => setSelectedPurpose(purpose.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPurpose === purpose.id
                    ? 'bg-primary-fixed/20 border-primary shadow-sm'
                    : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-on-surface">{purpose.label}</span>
                    <Icon name={selectedPurpose === purpose.id ? 'check_circle' : 'radio_button_unchecked'} className="text-primary text-[18px]" />
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{purpose.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Section 3: Granular Record Selection */}
        <section className="p-6 sm:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="folder_shared" className="text-primary text-[22px]" />
              <h2 className="text-lg sm:text-xl font-bold text-on-surface font-display">
                3. Choose Granular Records to Include
              </h2>
            </div>
            <span className="text-xs font-bold text-primary bg-primary-fixed/30 px-3 py-1 rounded-full">
              {selectedRecords.length} Items Selected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Record 1 */}
            <div
              onClick={() => toggleRecord('screening-outreach')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                selectedRecords.includes('screening-outreach')
                  ? 'bg-surface-container-low border-primary'
                  : 'bg-surface-container-lowest border-outline-variant/30 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name="badge" className="text-primary text-[22px]" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-on-surface">Screening Outreach Report (PDF)</div>
                  <div className="text-[11px] text-on-surface-variant">12 Jan 2025 · Annual Check</div>
                </div>
              </div>
              <Icon
                name={selectedRecords.includes('screening-outreach') ? 'check_box' : 'check_box_outline_blank'}
                className="text-primary text-[22px]"
              />
            </div>

            {/* Record 2 */}
            <div
              onClick={() => toggleRecord('odontogram-chart')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                selectedRecords.includes('odontogram-chart')
                  ? 'bg-surface-container-low border-primary'
                  : 'bg-surface-container-lowest border-outline-variant/30 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name="grid_view" className="text-secondary text-[22px]" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-on-surface">FDI 32-Tooth Digital Odontogram</div>
                  <div className="text-[11px] text-on-surface-variant">v1.2 · Restorations & Sealants</div>
                </div>
              </div>
              <Icon
                name={selectedRecords.includes('odontogram-chart') ? 'check_box' : 'check_box_outline_blank'}
                className="text-primary text-[22px]"
              />
            </div>

            {/* Record 3 */}
            <div
              onClick={() => toggleRecord('perio-index')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                selectedRecords.includes('perio-index')
                  ? 'bg-surface-container-low border-primary'
                  : 'bg-surface-container-lowest border-outline-variant/30 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name="monitor_heart" className="text-secondary text-[22px]" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-on-surface">Periodontal PSR Probing Report</div>
                  <div className="text-[11px] text-on-surface-variant">Plaque & Gingival indices</div>
                </div>
              </div>
              <Icon
                name={selectedRecords.includes('perio-index') ? 'check_box' : 'check_box_outline_blank'}
                className="text-primary text-[22px]"
              />
            </div>

            {/* Record 4 */}
            <div
              onClick={() => toggleRecord('panoramic-opg')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                selectedRecords.includes('panoramic-opg')
                  ? 'bg-surface-container-low border-primary'
                  : 'bg-surface-container-lowest border-outline-variant/30 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name="panorama" className="text-primary text-[22px]" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-on-surface">Full Arch Panoramic OPG (DICOM)</div>
                  <div className="text-[11px] text-on-surface-variant">15 Dec 2024 · High Res Scans</div>
                </div>
              </div>
              <Icon
                name={selectedRecords.includes('panoramic-opg') ? 'check_box' : 'check_box_outline_blank'}
                className="text-primary text-[22px]"
              />
            </div>

            {/* Record 5 */}
            <div
              onClick={() => toggleRecord('bitewings')}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                selectedRecords.includes('bitewings')
                  ? 'bg-surface-container-low border-primary'
                  : 'bg-surface-container-lowest border-outline-variant/30 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name="radiology" className="text-primary text-[22px]" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-on-surface">Posterior Bitewing Set (4 Views)</div>
                  <div className="text-[11px] text-on-surface-variant">10 Oct 2024 · Caries Diagnostic</div>
                </div>
              </div>
              <Icon
                name={selectedRecords.includes('bitewings') ? 'check_box' : 'check_box_outline_blank'}
                className="text-primary text-[22px]"
              />
            </div>
          </div>
        </section>

        {/* QR Check-in Add-on */}
        <section className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Icon name="qr_code_2" className="text-[22px]" />
            </div>
            <div>
              <div className="font-bold text-sm text-on-surface">Generate In-Clinic Instant Check-in QR</div>
              <div className="text-xs text-on-surface-variant">
                Allows scanning directly at the clinic reception desk (30-minute encrypted token)
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setInstantQrCheckin(!instantQrCheckin)}
            className={`w-12 h-7 rounded-full transition-colors relative p-1 shrink-0 ${
              instantQrCheckin ? 'bg-secondary' : 'bg-surface-container-highest'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                instantQrCheckin ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </section>

        {/* Continue Action */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <div>
            <div className="text-sm font-bold text-on-surface">
              Ready to verify scope and review declaration?
            </div>
            <div className="text-xs text-on-surface-variant">
              {selectedRecords.length} records selected for transmission
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition"
            >
              Cancel
            </button>
            <NavLink
              to="/patient-dashboard/sharing/review-authorise"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-sm flex items-center justify-center gap-2"
            >
              <span>Continue to Step 2: Review & Authorise</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>
      </div>
    </SharingShell>
  );
}

export default SharePatientRecordsScreen;

