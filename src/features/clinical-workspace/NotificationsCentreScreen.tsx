import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface NotificationItem {
  id: string;
  category: 'approvals' | 'results' | 'appointments' | 'statutory';
  urgency: 'critical' | 'high' | 'normal' | 'low';
  title: string;
  patientName?: string;
  patientId?: string;
  summary: string;
  timestamp: string;
  timeGroup: 'today' | 'yesterday' | 'earlier';
  isRead: boolean;
  actionLabel?: string;
  actionRoute?: string;
  tag?: string;
  details?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'approvals',
    urgency: 'critical',
    title: 'Urgent: Treatment Plan Countersignature Required',
    patientName: 'Amara Okafor',
    patientId: 'DHA-P-44012',
    summary: 'Full arch rehabilitation #TP-2026-089 requires specialist countersignature before 14:00 chairside delivery.',
    timestamp: '18 min ago (09:42)',
    timeGroup: 'today',
    isRead: false,
    actionLabel: 'Review Plan',
    actionRoute: '/treatment-plans/dentist-approval',
    tag: 'Section 13 • Tx Plan',
    details: 'Phase 2: Ceramic abutment placement tooth #14, #16, #24. Total tariff: NGN 14,800. Prior approval granted by NHIA Health.',
  },
  {
    id: 'notif-2',
    category: 'results',
    urgency: 'high',
    title: 'Critical Radiograph Finding Detected by AI',
    patientName: 'Chinedu Okafor',
    patientId: 'DHA-P-20391',
    summary: 'Incipient radiolucency distal #14 detected on bitewing BW-R-1048. Chairside confirmation recommended.',
    timestamp: '1 hour ago (08:50)',
    timeGroup: 'today',
    isRead: false,
    actionLabel: 'Inspect Radiograph',
    actionRoute: '/dentist/patient-overview',
    tag: 'Dexis PACS • AI Alert',
    details: 'Dexis AI Confidence: 89.2%. Radiolucency extends into outer dentinal third. Recurrent margin caries suspected under preexisting DO composite.',
  },
  {
    id: 'notif-3',
    category: 'appointments',
    urgency: 'high',
    title: 'Patient Checked In & Seated in Operatory 02',
    patientName: 'Fatima Bello',
    patientId: 'DHA-P-90812',
    summary: 'Arrived on schedule for Crown Preparation (#21). Vital signs stable: BP 118/76, pulse 72 bpm.',
    timestamp: '32 min ago (09:28)',
    timeGroup: 'today',
    isRead: false,
    actionLabel: 'Open Encounter',
    actionRoute: '/dentist/appointment-details',
    tag: 'Chairside Alert',
    details: 'Allergies: Penicillin (severe anaphylaxis). Local anaesthetic prepared: Mepivacaine 3% without vasoconstrictor.',
  },
  {
    id: 'notif-4',
    category: 'approvals',
    urgency: 'normal',
    title: 'Second Opinion Clinical Request',
    patientName: 'Marcus Vance',
    patientId: 'DHA-P-88421',
    summary: 'Dr. Karim Okoye requested restorative consult for Tooth #22 implant abutment torque validation.',
    timestamp: '3 hours ago (07:15)',
    timeGroup: 'today',
    isRead: false,
    actionLabel: 'View Consultation',
    actionRoute: '/dentist/task-details',
    tag: 'Inter-Colleague Handoff',
    details: 'Implant placed 12 weeks ago (Straumann BLX 3.75x10mm). ISQ value 78. Torqued to 35 Ncm.',
  },
  {
    id: 'notif-5',
    category: 'results',
    urgency: 'normal',
    title: 'Microscopic Pathology Biopsy Report Available',
    patientName: 'Marcus Vance',
    patientId: 'DHA-P-88421',
    summary: 'Lab specimen #BX-904 (Right buccal mucosa): Benign irritation fibroma, margins clean, negative for dysplasia.',
    timestamp: 'Yesterday at 16:40',
    timeGroup: 'yesterday',
    isRead: true,
    actionLabel: 'View Lab Slip',
    actionRoute: '/dentist/patient-overview',
    tag: 'Al Baraha Central Lab',
    details: 'Histopathology sign-off by Dr. H. Qasimi, FRCPath. Suture removal recommended at day 10.',
  },
  {
    id: 'notif-6',
    category: 'appointments',
    urgency: 'normal',
    title: 'Appointment Rescheduled: Tariq Latif',
    patientName: 'Tariq Latif',
    patientId: 'DHA-P-33109',
    summary: 'Root canal obturation #46 moved from Wednesday 10:00 to Thursday 14:00 at patient request via Patient Portal.',
    timestamp: 'Yesterday at 11:20',
    timeGroup: 'yesterday',
    isRead: true,
    actionLabel: 'View Calendar',
    actionRoute: '/dentist/calendar',
    tag: 'Portal Reschedule',
    details: 'Temporary cavit restoration intact. Patient reports asymptomatic status on Ibuprofen 400mg PRN.',
  },
  {
    id: 'notif-7',
    category: 'statutory',
    urgency: 'normal',
    title: 'Annual CME Cycle Milestone Achieved: 38/40 Hours',
    summary: 'Nigeria Dental Health Authority CPD records updated. 2 remaining credit hours needed prior to 24 Oct 2027.',
    timestamp: '3 days ago (11 Nov)',
    timeGroup: 'earlier',
    isRead: true,
    actionLabel: 'View Verification',
    actionRoute: '/dentist/verification',
    tag: 'DHA Licensing Board',
    details: 'Recent accreditation added: International Endodontic Masterclass (4 Category 1 CME credits).',
  },
  {
    id: 'notif-8',
    category: 'statutory',
    urgency: 'low',
    title: 'Operatory 03 Autoclave Cycle Log Validated',
    summary: 'Melag Vacuklav 43B Cycle #ST-992 passed biological spore indicator test (134°C, 3.1 bar, 5.5 min hold).',
    timestamp: '4 days ago (10 Nov)',
    timeGroup: 'earlier',
    isRead: true,
    tag: 'Facility Hygiene',
    details: 'Sterilization technician: Amira K. Next calibration scheduled for 15 December 2026.',
  },
  {
    id: 'notif-9',
    category: 'approvals',
    urgency: 'low',
    title: 'NHIA Pre-Authorisation Approved',
    patientName: 'Elena Rostova',
    patientId: 'DHA-P-77610',
    summary: 'Authorization granted for Ceramic Onlay tooth #36 (Code D7210). Insurer pays 80%, patient copay NGN 240.',
    timestamp: '5 days ago (09 Nov)',
    timeGroup: 'earlier',
    isRead: true,
    actionLabel: 'Open Plan',
    actionRoute: '/treatment-plans/dashboard',
    tag: 'Insurance Approval',
    details: 'Auth Code: DAM-2026-X9921. Valid for 90 days from date of issuance.',
  },
];

export function NotificationsCentreScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'approvals' | 'results' | 'appointments' | 'statutory'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // Category / Tab filter
      if (activeTab === 'unread' && item.isRead) return false;
      if (activeTab === 'approvals' && item.category !== 'approvals') return false;
      if (activeTab === 'results' && item.category !== 'results') return false;
      if (activeTab === 'appointments' && item.category !== 'appointments') return false;
      if (activeTab === 'statutory' && item.category !== 'statutory') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchSummary = item.summary.toLowerCase().includes(query);
        const matchPatient = item.patientName?.toLowerCase().includes(query) ?? false;
        const matchPatientId = item.patientId?.toLowerCase().includes(query) ?? false;
        const matchTag = item.tag?.toLowerCase().includes(query) ?? false;
        return matchTitle || matchSummary || matchPatient || matchPatientId || matchTag;
      }
      return true;
    });
  }, [notifications, activeTab, searchQuery]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  // Grouped by time
  const todayItems = useMemo(() => filteredNotifications.filter((n) => n.timeGroup === 'today'), [filteredNotifications]);
  const yesterdayItems = useMemo(() => filteredNotifications.filter((n) => n.timeGroup === 'yesterday'), [filteredNotifications]);
  const earlierItems = useMemo(() => filteredNotifications.filter((n) => n.timeGroup === 'earlier'), [filteredNotifications]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: !item.isRead } : item))
    );
  };

  const handleDismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    if (selectedNotif?.id === id) {
      setSelectedNotif(null);
    }
  };

  const filterTabs: { id: 'all' | 'unread' | 'approvals' | 'results' | 'appointments' | 'statutory'; label: string; count?: number; icon: string }[] = [
    { id: 'all', label: 'All Alerts', count: notifications.length, icon: 'notifications' },
    { id: 'unread', label: 'Unread', count: unreadCount, icon: 'mark_email_unread' },
    { id: 'approvals', label: 'Approvals', count: notifications.filter((n) => n.category === 'approvals').length, icon: 'fact_check' },
    { id: 'results', label: 'Labs & Imaging', count: notifications.filter((n) => n.category === 'results').length, icon: 'biotech' },
    { id: 'appointments', label: 'Chairside', count: notifications.filter((n) => n.category === 'appointments').length, icon: 'event' },
    { id: 'statutory', label: 'Statutory', count: notifications.filter((n) => n.category === 'statutory').length, icon: 'verified_user' },
  ];

  return (
    <ClinicalWorkspaceShell
      pageTitle="Notifications Centre"
      badgeCode="14.13"
      badgeLabel="Clinical Alarms & Inbox"
      activeNav="dashboard"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Header Banner */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#006194] text-white flex items-center justify-center shadow-md shrink-0">
              <Icon name="notifications_active" className="text-[26px]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e]">Notifications & Clinical Alarms</h1>
                {unreadCount > 0 ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] text-xs font-bold border border-[#ba1a1a]/20 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                    {unreadCount} Unread Alarms
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold border border-[#86f2e4]/50">
                    All Caught Up
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#707881] mt-1">
                Synchronized live with DHA Malaffi/Nigeria Health Information Exchange gateways, Dexis Imaging, and Operatory 02 chairside telemetry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-center">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] transition-colors border border-[#eaedff] flex items-center gap-1.5"
              >
                <Icon name="done_all" className="text-[16px]" />
                <span>Mark all as read</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate('/dentist/customisation')}
              className="p-2 rounded-xl text-[#707881] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors border border-transparent hover:border-[#eaedff]"
              title="Alert Preferences"
            >
              <Icon name="tune" className="text-[20px]" />
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Icon
                name="search"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#707881]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts by patient name, record ID, tooth #, or keyword..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#eaedff] rounded-xl text-sm text-[#131b2e] placeholder-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] hover:text-[#131b2e]"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/dentist/work-queue')}
                className="px-3.5 py-2.5 bg-white hover:bg-[#f2f3ff] border border-[#eaedff] rounded-xl text-xs font-semibold text-[#006194] flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-xs"
              >
                <Icon name="assignment_turned_in" className="text-[16px]" />
                <span>Open Work Queue</span>
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filterTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border ${
                    active
                      ? 'bg-[#006194] text-white border-[#006194] shadow-sm'
                      : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  <Icon name={tab.icon} className="text-[16px]" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        active ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#131b2e]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification Stream & Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Feed Column */}
          <div className="lg:col-span-8 space-y-6">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[#f2f3ff] text-[#707881] flex items-center justify-center mx-auto mb-3">
                  <Icon name="notifications_off" className="text-[28px]" />
                </div>
                <h3 className="text-base font-bold text-[#131b2e]">No notifications found</h3>
                <p className="text-xs text-[#707881] mt-1 max-w-sm mx-auto">
                  {searchQuery
                    ? `No alert matches "${searchQuery}". Clear your search or change the category filter.`
                    : 'There are no notifications matching your active filter criteria.'}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-4 py-2 bg-[#006194] text-white rounded-xl text-xs font-semibold"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* TODAY SECTION */}
                {todayItems.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#006194]">
                        Today
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#006194]"></span>
                      <div className="flex-1 h-px bg-[#eaedff]"></div>
                      <span className="text-[11px] font-mono text-[#707881]">
                        {todayItems.length} {todayItems.length === 1 ? 'alert' : 'alerts'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {todayItems.map((item) => (
                        <NotificationCard
                          key={item.id}
                          item={item}
                          isSelected={selectedNotif?.id === item.id}
                          onSelect={() => setSelectedNotif(item)}
                          onToggleRead={(e) => handleToggleRead(item.id, e)}
                          onDismiss={(e) => handleDismiss(item.id, e)}
                          onNavigate={(route) => navigate(route)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* YESTERDAY SECTION */}
                {yesterdayItems.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                        Yesterday
                      </span>
                      <div className="flex-1 h-px bg-[#eaedff]"></div>
                      <span className="text-[11px] font-mono text-[#707881]">
                        {yesterdayItems.length} {yesterdayItems.length === 1 ? 'alert' : 'alerts'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {yesterdayItems.map((item) => (
                        <NotificationCard
                          key={item.id}
                          item={item}
                          isSelected={selectedNotif?.id === item.id}
                          onSelect={() => setSelectedNotif(item)}
                          onToggleRead={(e) => handleToggleRead(item.id, e)}
                          onDismiss={(e) => handleDismiss(item.id, e)}
                          onNavigate={(route) => navigate(route)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* EARLIER SECTION */}
                {earlierItems.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                        Earlier This Week
                      </span>
                      <div className="flex-1 h-px bg-[#eaedff]"></div>
                      <span className="text-[11px] font-mono text-[#707881]">
                        {earlierItems.length} {earlierItems.length === 1 ? 'alert' : 'alerts'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {earlierItems.map((item) => (
                        <NotificationCard
                          key={item.id}
                          item={item}
                          isSelected={selectedNotif?.id === item.id}
                          onSelect={() => setSelectedNotif(item)}
                          onToggleRead={(e) => handleToggleRead(item.id, e)}
                          onDismiss={(e) => handleDismiss(item.id, e)}
                          onNavigate={(route) => navigate(route)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Rail / Detail Inspection Panel */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            {selectedNotif ? (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006194]"></span>
                    <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                      Alert Detail
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedNotif(null)}
                    className="text-[#707881] hover:text-[#131b2e] p-1 rounded-lg hover:bg-[#f2f3ff]"
                  >
                    <Icon name="close" className="text-[18px]" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedNotif.tag && (
                      <span className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#006194] text-[10px] font-bold border border-[#eaedff]">
                        {selectedNotif.tag}
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-[#707881]">
                      {selectedNotif.timestamp}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#131b2e] leading-snug">
                    {selectedNotif.title}
                  </h3>
                </div>

                {selectedNotif.patientName && (
                  <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">
                        {selectedNotif.patientName}
                      </div>
                      <div className="text-[10px] font-mono text-[#707881]">
                        {selectedNotif.patientId}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/dentist/patient-overview')}
                      className="px-2.5 py-1 rounded-lg bg-white text-xs font-semibold text-[#006194] border border-[#eaedff] hover:bg-[#eaedff]"
                    >
                      Dossier
                    </button>
                  </div>
                )}

                <div className="text-xs text-[#3f4850] leading-relaxed space-y-2">
                  <p>{selectedNotif.summary}</p>
                  {selectedNotif.details && (
                    <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] text-[11px] text-[#3f4850] font-mono">
                      {selectedNotif.details}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#eaedff] flex items-center gap-2">
                  {selectedNotif.actionRoute && (
                    <button
                      type="button"
                      onClick={() => navigate(selectedNotif.actionRoute!)}
                      className="flex-1 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Icon name="arrow_forward" className="text-[16px]" />
                      <span>{selectedNotif.actionLabel || 'Action Item'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => handleToggleRead(selectedNotif.id, e)}
                    className="p-2 rounded-xl border border-[#eaedff] text-[#707881] hover:text-[#131b2e] hover:bg-[#f2f3ff]"
                    title={selectedNotif.isRead ? 'Mark as unread' : 'Mark as read'}
                  >
                    <Icon
                      name={selectedNotif.isRead ? 'mark_email_unread' : 'done'}
                      className="text-[18px]"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                  <Icon name="tune" className="text-[16px] text-[#006194]" />
                  <span>Alert Subscriptions</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: 'Urgent Countersignatures', active: true, icon: 'fact_check' },
                    { label: 'AI Radiograph Alerts', active: true, icon: 'biotech' },
                    { label: 'Operatory Check-Ins', active: true, icon: 'chair' },
                    { label: 'DHA Licensing Reminders', active: true, icon: 'verified_user' },
                    { label: 'Biopsy / Lab Delivery', active: true, icon: 'science' },
                  ].map((sub) => (
                    <div
                      key={sub.label}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] text-xs"
                    >
                      <div className="flex items-center gap-2 text-[#131b2e] font-medium">
                        <Icon name={sub.icon} className="text-[16px] text-[#707881]" />
                        <span>{sub.label}</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-[#cce5ff]/40 border border-[#93ccff]/40 text-xs text-[#004b74] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Icon name="lock" className="text-[14px]" />
                    <span>Nigeria Health Information Exchange Compliance Rule</span>
                  </div>
                  <p className="text-[11px] leading-tight text-[#004b74]/90">
                    Statutory alerts cannot be muted per Nigeria Data Protection Act 2023.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ClinicalWorkspaceShell>
  );
}

function NotificationCard({
  item,
  isSelected,
  onSelect,
  onToggleRead,
  onDismiss,
  onNavigate,
}: {
  item: NotificationItem;
  isSelected: boolean;
  onSelect: () => void;
  onToggleRead: (e: React.MouseEvent) => void;
  onDismiss: (e: React.MouseEvent) => void;
  onNavigate: (route: string) => void;
}) {
  const getUrgencyBorder = () => {
    if (!item.isRead && item.urgency === 'critical') return 'border-l-4 border-l-[#ba1a1a]';
    if (!item.isRead && item.urgency === 'high') return 'border-l-4 border-l-[#ea580c]';
    if (!item.isRead) return 'border-l-4 border-l-[#006194]';
    return 'border-l-4 border-l-transparent';
  };

  const getUrgencyIcon = () => {
    switch (item.category) {
      case 'approvals':
        return { icon: 'fact_check', bg: 'bg-[#006194]/10 text-[#006194]' };
      case 'results':
        return { icon: 'biotech', bg: 'bg-[#93000a]/10 text-[#ba1a1a]' };
      case 'appointments':
        return { icon: 'chair', bg: 'bg-[#006a61]/10 text-[#006a61]' };
      case 'statutory':
        return { icon: 'verified_user', bg: 'bg-[#86f2e4]/30 text-[#006f66]' };
      default:
        return { icon: 'notifications', bg: 'bg-[#f2f3ff] text-[#707881]' };
    }
  };

  const badgeStyle = getUrgencyIcon();

  return (
    <div
      onClick={onSelect}
      className={`group relative p-4 rounded-2xl bg-white border transition-all cursor-pointer shadow-xs hover:shadow-md ${
        isSelected
          ? 'border-[#006194] ring-2 ring-[#006194]/15 bg-[#faf8ff]'
          : item.isRead
          ? 'border-[#eaedff] opacity-85 hover:opacity-100'
          : 'border-[#eaedff] bg-white'
      } ${getUrgencyBorder()}`}
    >
      <div className="flex items-start gap-3.5">
        {/* Category Icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${badgeStyle.bg}`}
        >
          <Icon name={badgeStyle.icon} className="text-[20px]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              {item.tag && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#f2f3ff] text-[#006194] border border-[#eaedff]">
                  {item.tag}
                </span>
              )}
              {item.urgency === 'critical' && !item.isRead && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#ba1a1a] text-white">
                  URGENT
                </span>
              )}
              {!item.isRead && (
                <span className="w-2 h-2 rounded-full bg-[#006194]"></span>
              )}
            </div>

            <span className="text-[11px] font-mono text-[#707881] shrink-0">
              {item.timestamp}
            </span>
          </div>

          <h4
            className={`text-sm font-bold text-[#131b2e] group-hover:text-[#006194] transition-colors leading-snug ${
              !item.isRead ? 'font-bold' : 'font-medium'
            }`}
          >
            {item.title}
          </h4>

          {item.patientName && (
            <div className="flex items-center gap-1.5 text-xs text-[#707881] mt-0.5 font-medium">
              <Icon name="person" className="text-[14px]" />
              <span className="text-[#131b2e] font-semibold">{item.patientName}</span>
              <span className="font-mono text-[10px] text-[#707881]">({item.patientId})</span>
            </div>
          )}

          <p className="text-xs text-[#3f4850] mt-1.5 line-clamp-2 leading-relaxed">
            {item.summary}
          </p>

          {/* Action Row */}
          <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#eaedff]/60">
            {item.actionRoute ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(item.actionRoute!);
                }}
                className="text-xs font-bold text-[#006194] hover:text-[#004e77] flex items-center gap-1 group/btn"
              >
                <span>{item.actionLabel || 'View details'}</span>
                <Icon
                  name="chevron_right"
                  className="text-[16px] group-hover/btn:translate-x-0.5 transition-transform"
                />
              </button>
            ) : (
              <span className="text-[11px] text-[#707881]">Informational Alert</span>
            )}

            <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={onToggleRead}
                className="p-1.5 rounded-lg text-[#707881] hover:text-[#006194] hover:bg-[#f2f3ff] transition-colors"
                title={item.isRead ? 'Mark unread' : 'Mark read'}
              >
                <Icon name={item.isRead ? 'mark_email_unread' : 'done'} className="text-[16px]" />
              </button>
              <button
                type="button"
                onClick={onDismiss}
                className="p-1.5 rounded-lg text-[#707881] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                title="Dismiss"
              >
                <Icon name="delete_outline" className="text-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
