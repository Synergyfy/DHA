import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface NotificationItem {
  id: string;
  category: 'critical' | 'clinical' | 'appointments' | 'billing';
  categoryLabel: string;
  categoryBadgeClass: string;
  timeAgo: string;
  title: string;
  description: string;
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  isUnread: boolean;
  statusText?: string;
  actionLabel: string;
  actionIcon: string;
  actionRoute?: string;
  isPrimaryAction?: boolean;
}

export const CentralNotificationsCentreScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'critical' | 'clinical' | 'appointments' | 'billing'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      category: 'critical',
      categoryLabel: 'Bio-Safety',
      categoryBadgeClass: 'bg-[#89f5e7] text-[#00201d]',
      timeAgo: '12m ago',
      title: 'Spore Test Assay Alert',
      description: 'Autoclave Unit 01 completed 48h biological indicator incubation with 100% kill rate (Class B passed).',
      icon: 'verified',
      iconBgClass: 'bg-[#86f2e4] text-[#00201d]',
      iconTextClass: 'text-[#00201d]',
      isUnread: true,
      statusText: 'Sterilization Certified',
      actionLabel: 'View Sterilization Log',
      actionIcon: 'arrow_forward',
      actionRoute: '/clinic-operations/clinical-operations-reports',
      isPrimaryAction: false,
    },
    {
      id: '2',
      category: 'clinical',
      categoryLabel: 'Lab / Pathology',
      categoryBadgeClass: 'bg-[#e2e7ff] text-[#3f4850]',
      timeAgo: '25m ago',
      title: 'Biopsy Histopathology Received',
      description: 'National Hospital Abuja uploaded pathology report for Fatima Garba (#Q-05). Assigned to Dr. Okoro.',
      icon: 'biotech',
      iconBgClass: 'bg-[#cde5ff] text-[#006195]',
      iconTextClass: 'text-[#006195]',
      isUnread: true,
      statusText: 'Ref: #PAT-ABJ-882',
      actionLabel: 'Open Clinical Module',
      actionIcon: 'open_in_new',
      actionRoute: '/clinic-operations/clinical-activity-details',
      isPrimaryAction: true,
    },
    {
      id: '3',
      category: 'appointments',
      categoryLabel: 'Triage Priority',
      categoryBadgeClass: 'bg-[#ffdad6] text-[#ba1a1a]',
      timeAgo: '45m ago',
      title: 'Walk-in Emergency Arrived',
      description: 'Fatima Garba checked in with acute pulpitis (#14). Queue ticket assigned.',
      icon: 'medical_services',
      iconBgClass: 'bg-[#ffdad6] text-[#ba1a1a]',
      iconTextClass: 'text-[#ba1a1a]',
      isUnread: true,
      statusText: 'Allocated Ticket Q-05',
      actionLabel: 'View Queue',
      actionIcon: 'chevron_right',
      actionRoute: '/clinic-operations/walk-in-queue',
      isPrimaryAction: false,
    },
    {
      id: '4',
      category: 'billing',
      categoryLabel: 'Finance',
      categoryBadgeClass: 'bg-[#e2e7ff] text-[#3f4850]',
      timeAgo: '1h ago',
      title: 'MetLife HMO Pre-Authorization Approved',
      description: '₦36,000 approved for Amara Okafor\'s Mesio-occlusal composite restoration.',
      icon: 'account_balance_wallet',
      iconBgClass: 'bg-[#dae2fd] text-[#006194]',
      iconTextClass: 'text-[#006194]',
      isUnread: true,
      statusText: 'ACT-2026-9914',
      actionLabel: 'View Invoice',
      actionIcon: 'receipt_long',
      actionRoute: '/clinic-operations/invoice-details',
      isPrimaryAction: false,
    },
    {
      id: '5',
      category: 'clinical',
      categoryLabel: 'Facility',
      categoryBadgeClass: 'bg-[#eaedff] text-[#3f4850]',
      timeAgo: '2h ago',
      title: 'CBCT Physicist Inspection Notice',
      description: 'Mandatory NNRA annual scatter audit scheduled for Saturday 24 Oct 10:00 WAT.',
      icon: 'precision_manufacturing',
      iconBgClass: 'bg-[#e2e7ff] text-[#3f4850]',
      iconTextClass: 'text-[#3f4850]',
      isUnread: false,
      statusText: 'Calendar Synced',
      actionLabel: 'View Ticket #MT-8840',
      actionIcon: 'link',
      actionRoute: '/clinic-operations/equipment-maintenance',
      isPrimaryAction: false,
    },
    {
      id: '6',
      category: 'critical',
      categoryLabel: 'DHA Statutory',
      categoryBadgeClass: 'bg-[#cde5ff] text-[#004b74]',
      timeAgo: 'Yesterday',
      title: 'DHA Gazetted Clinical Update #2026-09',
      description: 'Mandatory batch recording for all dental implantable biomaterials enacted across all branches.',
      icon: 'policy',
      iconBgClass: 'bg-[#cce5ff] text-[#006194]',
      iconTextClass: 'text-[#006194]',
      isUnread: false,
      statusText: 'Compliance Required',
      actionLabel: 'Read Directive',
      actionIcon: 'menu_book',
      actionRoute: '/clinic-operations/internal-announcements',
      isPrimaryAction: true,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
    showToast('All notifications marked as read');
  };

  const handleItemAction = (item: NotificationItem) => {
    // Mark this specific item as read
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, isUnread: false } : n));
    if (item.actionRoute) {
      navigate(item.actionRoute);
    } else {
      showToast(`Action opened: ${item.actionLabel}`);
    }
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const filteredNotifications = notifications.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return item.isUnread;
    return item.category === activeFilter;
  });

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
                <Icon name="local_hospital" className="text-[22px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Operational Feeds</span>
                  <span className="text-[11px] text-[#707881]">•</span>
                  <span className="text-[11px] font-medium text-[#006194]">Section 16.42</span>
                </div>
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                  Central Notifications Centre
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="done_all" className="text-[16px]" />
              <span>Mark All Read</span>
            </button>
            <button
              onClick={() => navigate('/clinic-operations/clinic-preferences')}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#3f4850] hover:bg-[#e2e7ff] transition-colors"
              title="Notification Settings"
            >
              <Icon name="tune" className="text-[20px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Operational Context Bar */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="text-xs font-bold text-[#006a61] tracking-wide uppercase">Operational Stream Live</span>
              <span className="bg-[#dae2fd] text-[#3f4850] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ml-1">
                Sec. 23 Linked
              </span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg md:text-xl font-bold text-[#131b2e]">
              Wuse 2 Branch & Group Feed
            </h2>
            <p className="text-xs text-[#3f4850] mt-0.5 font-medium">BrightSmile Dental Centre • Central Hub</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#cce5ff] text-[#001d31] px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 border border-[#93ccff]">
              <Icon name="mark_email_unread" className="text-[16px]" />
              <span>{unreadCount} Unread Notifications</span>
            </div>
          </div>
        </div>

        {/* Quick Filter Chips Scroll Zone */}
        <div className="w-full overflow-x-auto pb-1 flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-[#006194] text-white'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>All</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
              {notifications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('unread')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeFilter === 'unread'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Unread</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeFilter === 'unread' ? 'bg-white/20 text-white' : 'bg-[#cce5ff] text-[#006194]'}`}>
              {unreadCount}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('critical')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeFilter === 'critical'
                ? 'bg-[#ba1a1a] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span>Urgent / Critical</span>
            <span className="text-xs font-extrabold ml-0.5">
              {notifications.filter(n => n.category === 'critical').length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('clinical')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeFilter === 'clinical'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Clinical Handover</span>
            <span className="text-[10px] opacity-75">
              ({notifications.filter(n => n.category === 'clinical').length})
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('appointments')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeFilter === 'appointments'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Appointments</span>
            <span className="text-[10px] opacity-75">
              ({notifications.filter(n => n.category === 'appointments').length})
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('billing')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeFilter === 'billing'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Billing & HMO</span>
            <span className="text-[10px] opacity-75">
              ({notifications.filter(n => n.category === 'billing').length})
            </span>
          </button>
        </div>

        {/* Notification Feed Cards Grid (1 col on mobile, 2 cols on lg) */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-[#ffffff] rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-[#dae2fd]/40 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#eaedff] flex items-center justify-center text-[#707881] mb-3">
              <Icon name="checklist_rtl" className="text-[32px]" />
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">All caught up here!</p>
            <p className="text-xs text-[#3f4850] max-w-xs mt-1">No notifications matching this specific category at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredNotifications.map(item => (
              <article
                key={item.id}
                className={`bg-[#ffffff] rounded-2xl p-5 border transition-all hover:shadow-md flex flex-col justify-between ${
                  item.isUnread ? 'border-[#dae2fd] shadow-sm' : 'border-[#dae2fd]/30 shadow-none opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.iconBgClass}`}>
                        <Icon name={item.icon} className="text-[22px]" />
                      </div>
                      {item.isUnread && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#006194] rounded-full ring-2 ring-white"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${item.categoryBadgeClass}`}>
                          {item.categoryLabel}
                        </span>
                        <span className="text-[11px] font-mono text-[#707881]">{item.timeAgo}</span>
                      </div>

                      <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base font-bold text-[#131b2e] flex items-center gap-1.5">
                        <span>{item.title}</span>
                        {item.category === 'critical' && (
                          <Icon name="check_circle" className="text-[16px] text-[#006a61]" />
                        )}
                      </h2>

                      <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#707881] font-medium">
                    {item.statusText && (
                      <span className="bg-[#f2f3ff] text-[#3f4850] px-2 py-0.5 rounded text-[11px] font-mono">
                        {item.statusText}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleItemAction(item)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 ${
                      item.isPrimaryAction
                        ? 'bg-[#006194] text-white hover:bg-[#007bb9]'
                        : 'bg-[#eaedff] text-[#006194] hover:bg-[#e2e7ff]'
                    }`}
                  >
                    <span>{item.actionLabel}</span>
                    <Icon name={item.actionIcon} className="text-[16px]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Administrative Quick Actions Bar */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="notifications_active" className="text-[20px]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#131b2e] block">Notification Dispatch Management</span>
              <p className="text-[11px] text-[#707881]">Realtime triage alerts, bio-safety escalations, and automated doctor chimes</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleMarkAllRead}
              className="flex-1 md:flex-initial h-11 px-4 bg-[#eaedff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Icon name="done_all" className="text-[18px]" />
              <span>Mark All as Read</span>
            </button>
            <button
              onClick={() => navigate('/clinic-operations/clinic-preferences')}
              className="flex-1 md:flex-initial h-11 px-4 bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Icon name="tune" className="text-[18px]" />
              <span>Delivery Preferences</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
