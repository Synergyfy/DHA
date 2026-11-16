import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const CreateAnnouncementScreen: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('Midday Specialist Rotation Handover: Dr. Sarah Bello to Maitama');
  const [category, setCategory] = useState('Rota & Shift Handover');
  const [priority, setPriority] = useState<'normal' | 'important' | 'urgent'>('important');
  const [targetBranch, setTargetBranch] = useState('Wuse 2 Main Branch & Maitama Outpost');
  const [selectedCadres, setSelectedCadres] = useState<string[]>([
    'Dentists / Specialists',
    'Chairside Nurses',
    'Front-Desk Reception',
  ]);
  const [mandatoryAck, setMandatoryAck] = useState(true);
  const [messageBody, setMessageBody] = useState(
    'Please note that Dr. Bello will conclude morning aligner appointments at Wuse 2 at 14:00 and transition to Maitama Outpost for 3 surgical root canal cases. Nurse Fatima Noor is designated triage standby from 14:00 to 17:00.'
  );
  const [attachments, setAttachments] = useState<string[]>([
    'Shift_Handover_Matrix_Oct22.pdf',
  ]);
  const [publishMode, setPublishMode] = useState<'immediate' | 'scheduled'>('immediate');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const allCadres = [
    'All Staff',
    'Dentists / Specialists',
    'Chairside Nurses',
    'Front-Desk Reception',
    'Finance & Billing',
    'Dental Lab Technicians',
  ];

  const toggleCadre = (cadre: string) => {
    if (cadre === 'All Staff') {
      if (selectedCadres.length === allCadres.length - 1) {
        setSelectedCadres([]);
      } else {
        setSelectedCadres(allCadres.filter(c => c !== 'All Staff'));
      }
      return;
    }

    if (selectedCadres.includes(cadre)) {
      setSelectedCadres(prev => prev.filter(c => c !== cadre));
    } else {
      setSelectedCadres(prev => [...prev, cadre]);
    }
  };

  const handleSelectAllCadres = () => {
    setSelectedCadres(allCadres.filter(c => c !== 'All Staff'));
  };

  const formatText = (type: 'bold' | 'italic' | 'list') => {
    if (type === 'bold') {
      setMessageBody(prev => prev + ' **[Bold Note]**');
    } else if (type === 'italic') {
      setMessageBody(prev => prev + ' *[Priority Info]*');
    } else if (type === 'list') {
      setMessageBody(prev => prev + '\n- Item 1\n- Item 2');
    }
  };

  const insertCallout = () => {
    setMessageBody(prev => prev + '\n\n[TRIAGE PROTOCOL]: Verify sterilisation packets prior to patient arrival.');
    showToast('Triage Protocol callout inserted');
  };

  const handlePublish = () => {
    setIsPublishing(true);
    showToast('Publishing announcement to clinic roster devices...');
    setTimeout(() => {
      setIsPublishing(false);
      showToast('Announcement Published: Dispatched to 24 duty staff members.');
      setTimeout(() => {
        navigate('/clinic-operations/internal-announcements');
      }, 1200);
    }, 1500);
  };

  const handleSaveDraft = () => {
    showToast('Draft preserved in administrative pending roster drafts.');
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                <Icon name="edit_note" className="text-[22px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Internal Broadcast</span>
                </div>
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                  Create Announcement
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraft}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="bookmark_added" className="text-[16px]" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006194] text-xs font-bold text-white hover:bg-[#007bb9] shadow-sm transition-all active:scale-95"
            >
              <Icon name={isPublishing ? 'refresh' : 'send'} className={`text-[16px] ${isPublishing ? 'animate-spin' : ''}`} />
              <span>Publish Now</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Context Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 border border-[#dae2fd]/50 shadow-sm flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0">
            <Icon name="campaign" className="text-[22px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006194]">Internal Clinic Broadcast</span>
              <span className="bg-[#86f2e4] text-[#00201d] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                Active Rosters
              </span>
            </div>
            <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
              Broadcast official updates to clinic staff, chairside teams, and duty rosters across Wuse 2, Maitama, and Garki.
            </p>
          </div>
        </div>

        {/* Section 1: Announcement Details */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center text-xs font-bold">
                1
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Announcement Details
              </h2>
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-[#eaedff] text-[#3f4850] px-2.5 py-0.5 rounded-full">
              Required
            </span>
          </div>

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#131b2e]" htmlFor="announcement-title">
              Announcement Title
            </label>
            <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#006194] transition-all border border-[#dae2fd]/40">
              <input
                id="announcement-title"
                className="w-full bg-transparent text-xs md:text-sm text-[#131b2e] outline-none font-medium placeholder:text-[#707881]"
                placeholder="e.g. Sterilisation Protocol Update"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <span className="text-[11px] text-[#707881] block">
              Displayed as header banner across staff dashboard feeds.
            </span>
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#131b2e]" htmlFor="announcement-category">
                Category
              </label>
              <div className="relative bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/40">
                <select
                  id="announcement-category"
                  className="w-full bg-transparent text-xs font-semibold text-[#131b2e] outline-none appearance-none pr-8 cursor-pointer"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option>Rota & Shift Handover</option>
                  <option>Clinical Standard & Operatory Protocol</option>
                  <option>Facility Notice & Chair Maintenance</option>
                  <option>Emergency Triage Protocol</option>
                  <option>Administrative Directive</option>
                  <option>Clinical Compliance & Policy</option>
                </select>
                <Icon name="expand_more" className="text-[#3f4850] text-[20px] absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Priority Level */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#131b2e] block">Priority Classification</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPriority('normal')}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all border ${
                    priority === 'normal'
                      ? 'bg-[#cce5ff] text-[#001d31] border-[#93ccff] shadow-sm'
                      : 'bg-[#f2f3ff] text-[#3f4850] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <Icon name="info" className="text-[18px] mb-0.5" />
                  <span>Normal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('important')}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all border ${
                    priority === 'important'
                      ? 'bg-[#006194] text-white border-[#006194] shadow-sm'
                      : 'bg-[#f2f3ff] text-[#3f4850] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <Icon name="priority_high" className="text-[18px] mb-0.5" />
                  <span>Important</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('urgent')}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all border ${
                    priority === 'urgent'
                      ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6] shadow-sm'
                      : 'bg-[#f2f3ff] text-[#3f4850] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <Icon name="emergency_home" className="text-[18px] mb-0.5" />
                  <span>Urgent / Red</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Target Audience & Distribution Scope */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Target Audience & Scope
              </h2>
            </div>
            <Icon name="verified_user" className="text-[#006a61] text-[20px]" />
          </div>

          {/* Target Branch */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#131b2e]" htmlFor="branch-selector">
              Target Branch / Operatory Hub
            </label>
            <div className="relative bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/40">
              <select
                id="branch-selector"
                className="w-full bg-transparent text-xs font-semibold text-[#131b2e] outline-none appearance-none pr-8 cursor-pointer"
                value={targetBranch}
                onChange={e => setTargetBranch(e.target.value)}
              >
                <option>Wuse 2 Main Branch & Maitama Outpost</option>
                <option>All Branches Consolidated (Wuse, Maitama, Garki)</option>
                <option>Wuse 2 Clinic Only (General & Orthodontics)</option>
                <option>Maitama Outpost Only (Surgical Suites)</option>
                <option>Garki Clinical Facility Only</option>
              </select>
              <Icon name="corporate_fare" className="text-[#3f4850] text-[20px] absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Staff Category Multi-select Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#131b2e]">Professional Cadre Allocation</span>
              <button
                type="button"
                onClick={handleSelectAllCadres}
                className="text-xs font-bold text-[#006194] hover:underline"
              >
                Select All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allCadres.map(cadre => {
                const isSelected = cadre === 'All Staff'
                  ? selectedCadres.length === allCadres.length - 1
                  : selectedCadres.includes(cadre);
                return (
                  <button
                    key={cadre}
                    type="button"
                    onClick={() => toggleCadre(cadre)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#86f2e4] text-[#00201d] shadow-sm'
                        : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
                    }`}
                  >
                    {isSelected && <Icon name="check" className="text-[14px]" />}
                    <span>{cadre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mandatory Acknowledgement Toggle */}
          <div className="bg-[#f2f3ff] rounded-xl p-4 flex items-center justify-between border border-[#dae2fd]/30">
            <div className="flex items-start gap-3 pr-2">
              <Icon name="how_to_reg" className="text-[#006a61] text-[22px] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">Mandatory Receipt Acknowledgement</span>
                <span className="text-[11px] text-[#3f4850] block mt-0.5 leading-relaxed">
                  Requires recipients to press 'Acknowledge Receipt' upon opening. Roster audit logs tracking enabled.
                </span>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={mandatoryAck}
              onClick={() => setMandatoryAck(!mandatoryAck)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                mandatoryAck ? 'bg-[#006a61]' : 'bg-[#dae2fd]'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                  mandatoryAck ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Section 3: Announcement Message */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center text-xs font-bold">
                3
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Message & Body
              </h2>
            </div>
            <span className="text-[11px] text-[#707881] font-semibold">Markdown Supported</span>
          </div>

          {/* Formatting Micro-Toolbar */}
          <div className="flex items-center gap-1 bg-[#eaedff] p-1.5 rounded-xl border border-[#dae2fd]/40">
            <button
              type="button"
              onClick={() => formatText('bold')}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#131b2e] hover:bg-white transition-colors"
              title="Bold"
            >
              <Icon name="format_bold" className="text-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => formatText('italic')}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#131b2e] hover:bg-white transition-colors"
              title="Italic"
            >
              <Icon name="format_italic" className="text-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => formatText('list')}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#131b2e] hover:bg-white transition-colors"
              title="List"
            >
              <Icon name="format_list_bulleted" className="text-[18px]" />
            </button>
            <div className="h-4 w-px bg-[#bfc7d2] mx-1"></div>
            <button
              type="button"
              onClick={insertCallout}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#006194] hover:bg-white transition-colors"
              title="Insert Clinical Alert"
            >
              <Icon name="add_alert" className="text-[18px]" />
            </button>
            <span className="ml-auto text-[11px] text-[#707881] font-mono pr-2">
              Chars: {messageBody.length}
            </span>
          </div>

          {/* Rich Textarea */}
          <div className="bg-[#f2f3ff] rounded-xl p-3.5 border border-[#dae2fd]/40 focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#006194] transition-all">
            <textarea
              className="w-full bg-transparent text-xs md:text-sm text-[#131b2e] outline-none resize-none placeholder:text-[#707881] leading-relaxed"
              placeholder="Type clinic broadcast message here..."
              rows={5}
              value={messageBody}
              onChange={e => setMessageBody(e.target.value)}
            />
          </div>

          {/* Auto-linked Context Card */}
          <div className="bg-[#eaedff] p-3.5 rounded-xl flex items-center gap-3 border border-[#dae2fd]/30">
            <div className="w-9 h-9 rounded-xl bg-[#006194] flex items-center justify-center text-white shrink-0">
              <Icon name="medical_services" className="text-[20px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#131b2e] truncate">
                Auto-linked: Roster Shift ID #RO-8820
              </span>
              <span className="text-[11px] text-[#3f4850] truncate">
                Dr. Sarah Bello (Lead Endodontist) • 4 Patients impacted
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Attachments & Publishing Schedule */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center text-xs font-bold">
                4
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Attachments & Schedule
              </h2>
            </div>
            <Icon name="attachment" className="text-[#3f4850] text-[20px]" />
          </div>

          {/* Attached Files List */}
          <div className="space-y-2">
            {attachments.map((file, idx) => (
              <div key={idx} className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between border border-[#dae2fd]/30">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                    <Icon name="picture_as_pdf" className="text-[20px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#131b2e] truncate">{file}</span>
                    <span className="text-[11px] text-[#707881]">240 KB • Uploaded • Antivirus verified</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAttachments(prev => prev.filter((_, i) => i !== idx));
                    showToast('Attachment removed');
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#707881] hover:text-[#ba1a1a] hover:bg-[#eaedff] transition-colors"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                setAttachments(prev => [...prev, 'Lab_Slip_Addendum_Oct22.pdf']);
                showToast('Lab slip addendum attached');
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#eaedff] text-[#006194] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#e2e7ff] transition-colors"
            >
              <Icon name="cloud_upload" className="text-[18px]" />
              <span>Attach Additional File / Lab Slip (PDF, PNG up to 10MB)</span>
            </button>
          </div>

          {/* Publishing Schedule Options */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-[#131b2e] block">Publication Mode</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setPublishMode('immediate')}
                className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                  publishMode === 'immediate'
                    ? 'bg-[#cce5ff] border-[#006194] shadow-sm'
                    : 'bg-[#f2f3ff] border-[#dae2fd]/30 hover:bg-[#eaedff]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="publish-mode"
                    checked={publishMode === 'immediate'}
                    onChange={() => setPublishMode('immediate')}
                    className="w-4 h-4 text-[#006194] accent-[#006194]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">Publish Immediately</span>
                    <span className="text-[11px] text-[#3f4850]">Instant push to roster devices</span>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-[#006a61] bg-[#86f2e4] px-2 py-0.5 rounded-full">
                  Live Now
                </span>
              </label>

              <label
                onClick={() => setPublishMode('scheduled')}
                className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                  publishMode === 'scheduled'
                    ? 'bg-[#cce5ff] border-[#006194] shadow-sm'
                    : 'bg-[#f2f3ff] border-[#dae2fd]/30 hover:bg-[#eaedff]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="publish-mode"
                    checked={publishMode === 'scheduled'}
                    onChange={() => setPublishMode('scheduled')}
                    className="w-4 h-4 text-[#006194] accent-[#006194]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">Schedule for Later</span>
                    <span className="text-[11px] text-[#3f4850]">Choose calendar slot & shift</span>
                  </div>
                </div>
                <Icon name="calendar_today" className="text-[#707881] text-[20px]" />
              </label>
            </div>
          </div>
        </section>

        {/* Governance Notice */}
        <div className="bg-[#eaedff] p-4 rounded-2xl flex items-start gap-3 border border-[#dae2fd]/60 text-[#3f4850]">
          <Icon name="gavel" className="text-[#006194] text-[20px] mt-0.5 shrink-0" />
          <p className="text-xs leading-relaxed">
            <strong className="text-[#131b2e] font-bold">Internal Staff Communication Policy:</strong> Announcements are permanently logged in the DHA immutable administrative ledger and visible only to authenticated organisation personnel.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <Icon name={isPublishing ? 'refresh' : 'send'} className={`text-[18px] ${isPublishing ? 'animate-spin' : ''}`} />
            <span>Publish Announcement Now</span>
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="h-12 px-6 bg-[#ffffff] hover:bg-[#f2f3ff] text-[#131b2e] border border-[#dae2fd] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Icon name="bookmark_added" className="text-[18px]" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-12 px-6 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#707881] rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
          >
            <span>Cancel</span>
          </button>
        </div>
      </main>
    </div>
  );
};
