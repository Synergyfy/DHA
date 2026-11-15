import { useState } from 'react';
import { DashboardShell } from './DashboardShell';
import { usePatientStore } from '../../store/patientStore';
import { Icon } from '../../design/Primitives';

type FilterType = 'all' | 'unread' | 'reminders' | 'records';
type ViewState = 'standard' | 'empty' | 'loading' | 'error';

interface NotificationItem {
  id: string;
  category: 'reminders' | 'records' | 'security';
  status: 'unread' | 'read';
  priority?: 'high' | 'critical' | 'standard';
  time: string;
  title: string;
  description: string;
  badge: string;
  badgeTone: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  borderStripe?: string;
  hasMedia?: boolean;
  mediaThumb?: string;
  mediaDetail?: string;
  actions?: {
    primaryText: string;
    primaryIcon?: string;
    secondaryText?: string;
  };
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: 'reminders',
    status: 'unread',
    priority: 'high',
    time: 'In 4 days',
    title: 'Upcoming Dental Hygiene Checkup',
    description:
      'Scheduled for Fri, Jan 24 at 10:30 AM with Dr. Farouk Al-Mansoori at Jumeirah Clinical Center.',
    badge: 'High Priority',
    badgeTone: 'bg-error-container text-on-error-container',
    icon: 'calendar_clock',
    iconBg: 'bg-error-container',
    iconColor: 'text-on-error-container',
    borderStripe: 'bg-error',
    actions: {
      primaryText: 'View Appointment & Directions',
      primaryIcon: 'directions_car',
      secondaryText: 'Reschedule',
    },
  },
  {
    id: 'n2',
    category: 'records',
    status: 'unread',
    time: '2 hours ago',
    title: 'New Diagnostic Radiograph Added',
    description:
      'Al Zahra Dental Clinic encrypted and synchronized 2 Bitewing X-Rays directly to your authenticated Lifecode record.',
    badge: 'Clinical Vault',
    badgeTone: 'bg-secondary-container text-on-secondary-container',
    icon: 'radiology',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-primary',
    borderStripe: 'bg-primary',
    hasMedia: true,
    mediaThumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDn-u6MvzRhZTMXCg5I7TY_lhuAKLX3FfD4g4m5NaLS7AKnxmQCTqsJEP0Ii6qO_kBjG0GBtSzyNv1Du6WsaBG6CqDPm3QtKVkjZezw5nrWQC6im8vhgZn-SKI-n3fr98bmbJN-I0zirJj4vf1NI0S5cUjYfWtvD93TRUVcLkK-BzSGlqxCxzOzFRXpmaQ9g_YxT3RlUf-LqZ2XJeWGcsHBmfS4CN3H9t19VnBpIPYl',
    mediaDetail: 'DHA-RAD-2025-0891 · 3.4 MB DICOM',
    actions: {
      primaryText: 'Open Imaging Viewer',
      primaryIcon: 'visibility',
    },
  },
  {
    id: 'n3',
    category: 'records',
    status: 'unread',
    priority: 'critical',
    time: 'Today, 8:15 AM',
    title: 'Third-Party Record Access Request',
    description:
      'Dr. Tariq Al-Nuaimi (Dubai London Clinic) requests temporary 24-hr access to your complete dental odontogram for a consultation review.',
    badge: 'Action Required',
    badgeTone: 'bg-error-container text-on-error-container',
    icon: 'lock_open',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed',
    borderStripe: 'bg-tertiary',
    actions: {
      primaryText: 'Approve Access',
      primaryIcon: 'check',
      secondaryText: 'Deny',
    },
  },
  {
    id: 'n4',
    category: 'records',
    status: 'read',
    time: 'Yesterday',
    title: 'Oral Health Summary Updated',
    description:
      'Periodontal examination findings and gum pocket charting have been signed off by your attending specialist.',
    badge: 'Signed Record',
    badgeTone: 'bg-surface-container text-on-surface-variant',
    icon: 'assignment_turned_in',
    iconBg: 'bg-surface-container',
    iconColor: 'text-on-surface-variant',
    actions: {
      primaryText: 'View Summary',
      primaryIcon: 'chevron_right',
    },
  },
  {
    id: 'n5',
    category: 'reminders',
    status: 'read',
    time: 'Yesterday',
    title: 'Evening Flossing Routine',
    description:
      'Keep your preventive habit going tonight. Consistent interdental cleaning reduces gum sensitivity by 34%.',
    badge: '🔥 14-Day Streak',
    badgeTone: 'bg-secondary-fixed-dim/30 text-on-secondary-container',
    icon: 'water_drop',
    iconBg: 'bg-surface-container',
    iconColor: 'text-on-surface-variant',
    actions: {
      primaryText: 'Log Activity',
      primaryIcon: 'done',
    },
  },
  {
    id: 'n6',
    category: 'security',
    status: 'read',
    time: 'Jan 18',
    title: 'Lifecode QR Scanned',
    description:
      'Identity verification completed at Dubai Primary Dental Hub reception kiosk (Terminal 4B).',
    badge: 'Access Log',
    badgeTone: 'bg-surface-container text-on-surface-variant',
    icon: 'qr_code_scanner',
    iconBg: 'bg-surface-container',
    iconColor: 'text-on-surface-variant',
  },
  {
    id: 'n7',
    category: 'reminders',
    status: 'read',
    time: 'Jan 12',
    title: '6-Month Scaling & Polish Due',
    description:
      'Recommended preventative cleaning period has arrived based on your last appointment in July.',
    badge: 'Recall Advisory',
    badgeTone: 'bg-surface-container text-on-surface-variant',
    icon: 'dentistry',
    iconBg: 'bg-surface-container',
    iconColor: 'text-on-surface-variant',
    actions: {
      primaryText: 'Schedule Now',
      primaryIcon: 'chevron_right',
    },
  },
];

export function NotificationsScreen() {
  const { clearUnread } = usePatientStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [viewState, setViewState] = useState<ViewState>('standard');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const currentUnread = notifications.filter((n) => n.status === 'unread').length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: 'read', borderStripe: undefined })));
    clearUnread();
    setActionNotice('All clinical notifications marked as read.');
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleApproveAccess = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              status: 'read',
              borderStripe: undefined,
              badge: 'Approved (24h Active)',
              badgeTone: 'bg-secondary-container text-on-secondary-container',
              actions: undefined,
            }
          : n
      )
    );
    setActionNotice('Access approved for Dr. Tariq Al-Nuaimi for 24 hours. Token generated.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleDenyAccess = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              status: 'read',
              borderStripe: undefined,
              badge: 'Access Denied',
              badgeTone: 'bg-surface-container text-on-surface-variant',
              actions: undefined,
            }
          : n
      )
    );
    setActionNotice('Access request denied. No clinic records shared.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleRetry = () => {
    setIsReconnecting(true);
    setTimeout(() => {
      setIsReconnecting(false);
      setViewState('standard');
    }, 1200);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return n.status === 'unread';
    if (filter === 'reminders') return n.category === 'reminders';
    if (filter === 'records') return n.category === 'records';
    return true;
  });

  return (
    <DashboardShell pageTitle="Notifications Centre" showBack>
      {actionNotice && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Icon name="verified" className="text-[20px]" />
          <span className="font-title-sm text-title-sm font-semibold">{actionNotice}</span>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="ml-2 hover:opacity-75"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
        {/* Privacy Shield Banner */}
        <section className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon name="shield_with_heart" filled className="text-secondary text-[22px] shrink-0" />
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                <strong className="text-on-surface font-semibold">HIPAA &amp; DHA Compliant</strong> • Sensitive clinical diagnostics and identity tokens are obfuscated in push alerts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Opening privacy & notification preference controls')}
              className="text-primary font-title-sm text-title-sm font-semibold hover:underline shrink-0 self-start sm:self-center"
            >
              Privacy Settings
            </button>
          </div>
        </section>

        {/* Top Controls: Header, Unread Counter, Mark All Read */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
              Inbox
            </h1>
            <span
              className={`font-label-sm text-label-sm px-2.5 py-0.5 rounded-full inline-flex items-center font-bold ${
                currentUnread > 0
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              {currentUnread} unread
            </span>
          </div>

          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={currentUnread === 0}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-title-sm text-title-sm font-semibold transition-all ${
              currentUnread > 0
                ? 'bg-surface-container-lowest hover:bg-surface-container-low text-primary shadow-xs cursor-pointer'
                : 'text-on-surface-variant opacity-60 cursor-not-allowed'
            }`}
          >
            <Icon name="done_all" className="text-[18px]" />
            <span>Mark all as read</span>
          </button>
        </div>

        {/* Filter Segmented Tabs */}
        <div className="bg-surface-container-low p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto no-scrollbar shadow-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl text-center font-title-sm text-title-sm transition-all font-semibold ${
              filter === 'all'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`flex-1 min-w-[85px] py-2 px-3 rounded-xl text-center font-title-sm text-title-sm transition-all font-semibold ${
              filter === 'unread'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Unread ({currentUnread})
          </button>
          <button
            type="button"
            onClick={() => setFilter('reminders')}
            className={`flex-1 min-w-[105px] py-2 px-3 rounded-xl text-center font-title-sm text-title-sm transition-all font-semibold ${
              filter === 'reminders'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Reminders ({notifications.filter((n) => n.category === 'reminders').length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('records')}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-center font-title-sm text-title-sm transition-all font-semibold ${
              filter === 'records'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Records &amp; Updates ({notifications.filter((n) => n.category === 'records').length})
          </button>
        </div>

        {/* VIEW 1: Standard Notification Feed */}
        {viewState === 'standard' && (
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-10 text-center flex flex-col items-center justify-center border border-outline-variant/30">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant mb-3">
                  <Icon name="inbox" className="text-[32px]" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  No notifications in this filter
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Try switching back to 'All' to review all system activity.
                </p>
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-xl font-title-sm text-title-sm font-semibold"
                >
                  Show All Notifications
                </button>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <article
                  key={notif.id}
                  className={`bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30 relative overflow-hidden transition-all hover:shadow-md ${
                    notif.status === 'read' ? 'opacity-90' : 'bg-surface-container-lowest'
                  }`}
                >
                  {notif.borderStripe && (
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${notif.borderStripe}`}
                    ></div>
                  )}

                  <div className="flex items-start gap-3.5 pl-1 sm:pl-2">
                    <div
                      className={`w-11 h-11 rounded-2xl ${notif.iconBg} ${notif.iconColor} flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      <Icon name={notif.icon} filled className="text-[22px]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`font-label-sm text-label-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${notif.badgeTone}`}
                        >
                          {notif.badge}
                        </span>

                        <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                          {notif.status === 'unread' && (
                            <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse"></span>
                          )}
                          <span>{notif.time}</span>
                        </div>
                      </div>

                      <h3 className="font-headline-sm text-title-md sm:text-headline-sm text-on-surface font-bold mb-1">
                        {notif.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-3">
                        {notif.description}
                      </p>

                      {/* DICOM Media Preview Strip */}
                      {notif.hasMedia && notif.mediaThumb && (
                        <div className="flex items-center gap-3 mb-3 bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 max-w-md">
                          <div className="w-14 h-14 rounded-lg bg-surface-container-highest overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                            <img
                              src={notif.mediaThumb}
                              alt="Radiograph preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 font-label-sm text-label-sm text-secondary font-semibold">
                              <Icon name="verified" filled className="text-[15px]" />
                              <span>Verified by DHA System</span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5 font-mono">
                              {notif.mediaDetail}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {notif.actions && (
                        <div className="flex items-center gap-2.5 flex-wrap pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (notif.id === 'n3') {
                                handleApproveAccess(notif.id);
                              } else {
                                alert(`Action triggered: ${notif.actions?.primaryText}`);
                              }
                            }}
                            className="h-10 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold inline-flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
                          >
                            {notif.actions.primaryIcon && (
                              <Icon name={notif.actions.primaryIcon} className="text-[18px]" />
                            )}
                            <span>{notif.actions.primaryText}</span>
                          </button>

                          {notif.actions.secondaryText && (
                            <button
                              type="button"
                              onClick={() => {
                                if (notif.id === 'n3') {
                                  handleDenyAccess(notif.id);
                                } else {
                                  alert(`Secondary action triggered: ${notif.actions?.secondaryText}`);
                                }
                              }}
                              className={`h-10 px-4 rounded-xl font-title-sm text-title-sm font-semibold transition-all ${
                                notif.id === 'n3'
                                  ? 'text-error hover:bg-error-container/40'
                                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                              }`}
                            >
                              {notif.actions.secondaryText}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {/* VIEW 2: Empty State Showcase */}
        {viewState === 'empty' && (
          <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center border border-outline-variant/30 animate-in fade-in duration-200">
            <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-4 shadow-inner relative">
              <Icon name="notifications_off" className="text-[44px] text-secondary" />
              <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
                <Icon name="check" className="text-[16px]" />
              </div>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-1">
              All caught up!
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6 leading-relaxed">
              No unread clinical updates, appointment alerts, or doctor access requests right now.
            </p>

            <div className="bg-surface-container-low rounded-2xl p-4 max-w-md w-full shadow-xs mb-6 text-left flex items-start gap-3 border border-outline-variant/20">
              <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <Icon name="verified_user" className="text-[20px]" />
              </div>
              <div>
                <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Vault is synchronized
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Your dental chart and diagnostic radiographs are completely up to date with the DHA central registry.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setViewState('standard')}
              className="h-11 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold shadow-sm transition-all"
            >
              Return to Notifications Feed
            </button>
          </div>
        )}

        {/* VIEW 3: Skeleton Loading State */}
        {viewState === 'loading' && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex items-start gap-4 border border-outline-variant/20"
              >
                <div className="w-11 h-11 rounded-2xl bg-surface-container-highest shrink-0"></div>
                <div className="flex-1 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-surface-container-highest rounded-full"></div>
                    <div className="h-3 w-16 bg-surface-container-highest rounded-full"></div>
                  </div>
                  <div className="h-5 w-3/4 bg-surface-container-highest rounded-lg"></div>
                  <div className="h-4 w-full bg-surface-container-highest rounded-lg"></div>
                  <div className="h-4 w-2/3 bg-surface-container-highest rounded-lg"></div>
                  <div className="h-9 w-44 bg-surface-container-highest rounded-xl mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: Network Error with Retry */}
        {viewState === 'error' && (
          <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center border border-outline-variant/30 animate-in fade-in duration-200">
            <div className="w-20 h-20 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-4 shadow-sm">
              <Icon name="wifi_off" className="text-[40px]" />
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-1">
              Connection Disrupted
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6">
              Unable to securely contact the DHA clinical notification gateway. Please check your network connection and retry.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <button
                type="button"
                onClick={handleRetry}
                className="h-12 flex-1 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold shadow-sm inline-flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                {isReconnecting ? (
                  <>
                    <Icon name="progress_activity" className="text-[18px] animate-spin" />
                    <span>Reconnecting...</span>
                  </>
                ) : (
                  <>
                    <Icon name="refresh" className="text-[18px]" />
                    <span>Retry Connection</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setViewState('standard')}
                className="h-12 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-sm text-title-sm font-semibold transition-colors"
              >
                Cached Feed
              </button>
            </div>
          </div>
        )}

        {/* Prototype State Switcher Dock (Clean helper bar for demo and testing) */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-3 shadow-md">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider flex items-center gap-1 font-semibold">
              <Icon name="science" className="text-[15px] text-primary" />
              <span>Prototype State Previewer</span>
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold">
              Current: {viewState.toUpperCase()}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(['standard', 'empty', 'loading', 'error'] as ViewState[]).map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => setViewState(state)}
                className={`py-2 px-2 rounded-xl text-center font-label-sm text-label-sm font-semibold transition-all uppercase tracking-wide ${
                  viewState === state
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
