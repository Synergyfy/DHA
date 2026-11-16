import { useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { LandingPage } from './features/landing/LandingPage';
import { LifecodeScreen } from './features/onboarding/LifecodeScreen';
import { GetStartedScreen } from './features/onboarding/GetStartedScreen';
import { RoleSelectionScreen } from './features/onboarding/RoleSelectionScreen';
import { PlaceholderScreen } from './features/onboarding/PlaceholderScreen';
import { RegisterEntryScreen } from './features/registration/RegisterEntryScreen';
import { ContactDetailsScreen } from './features/registration/ContactDetailsScreen';
import { VerifyOtpScreen } from './features/registration/VerifyOtpScreen';
import { PersonalDetailsScreen } from './features/registration/PersonalDetailsScreen';
import { HealthProfileScreen } from './features/registration/HealthProfileScreen';
import { RegistrationCompleteScreen } from './features/registration/RegistrationCompleteScreen';
import { LoginScreen } from './features/auth/LoginScreen';

// Section 2 — Patient Dashboard & Navigation Suite
import { PatientHomeScreen } from './features/dashboard/PatientHomeScreen';
import { NotificationsScreen } from './features/dashboard/NotificationsScreen';
import { OralHealthScreen } from './features/dashboard/OralHealthScreen';
import { QuickActionsScreen } from './features/dashboard/QuickActionsScreen';
import { FirstTimeDashboardScreen } from './features/dashboard/FirstTimeDashboardScreen';
import { GuardianSwitcherScreen } from './features/dashboard/GuardianSwitcherScreen';

// Section 3 — Patient Records & History Suite
import { RecordsTimelineScreen } from './features/records/RecordsTimelineScreen';
import { ScreeningHistoryScreen } from './features/records/ScreeningHistoryScreen';
import { DentalExaminationScreen } from './features/records/DentalExaminationScreen';
import { ClinicalSummaryScreen } from './features/records/ClinicalSummaryScreen';
import { InvestigationsScreen } from './features/records/InvestigationsScreen';
import { TreatmentHistoryScreen } from './features/records/TreatmentHistoryScreen';

// Section 4 — Patient Reminders & Appointments Suite
import { RemindersOverviewScreen } from './features/reminders/RemindersOverviewScreen';
import { AppointmentRemindersScreen } from './features/reminders/AppointmentRemindersScreen';
import { DailyCareRemindersScreen } from './features/reminders/DailyCareRemindersScreen';
import { CheckupRemindersScreen } from './features/reminders/CheckupRemindersScreen';
import { PendingTreatmentRemindersScreen } from './features/reminders/PendingTreatmentRemindersScreen';
import { ReminderDetailsScreen } from './features/reminders/ReminderDetailsScreen';

// Section 5 — Clinic Discovery & Provider Directory Suite
import { DiscoverHomeScreen } from './features/discovery/DiscoverHomeScreen';
import { SearchResultsScreen } from './features/discovery/SearchResultsScreen';
import { NearbyClinicsMapScreen } from './features/discovery/NearbyClinicsMapScreen';
import { DentistProfileScreen } from './features/discovery/DentistProfileScreen';
import { ClinicProfileScreen } from './features/discovery/ClinicProfileScreen';
import { ServicesSpecialitiesScreen } from './features/discovery/ServicesSpecialitiesScreen';

// Section 6 — Patient Education & Oral Health Guides Suite
import { EducationHomeScreen } from './features/education/EducationHomeScreen';
import { OralHealthTopicsScreen } from './features/education/OralHealthTopicsScreen';
import { DentalVideosScreen } from './features/education/DentalVideosScreen';
import { DailyCareGuidesScreen } from './features/education/DailyCareGuidesScreen';
import { KidsInteractiveLearningScreen } from './features/education/KidsInteractiveLearningScreen';
import { SavedEducationScreen } from './features/education/SavedEducationScreen';

// Section 7 — Record Sharing & Referrals Suite
import { RecordSharingOverviewScreen } from './features/sharing/RecordSharingOverviewScreen';
import { SharePatientRecordsScreen } from './features/sharing/SharePatientRecordsScreen';
import { ReviewAuthoriseAccessScreen } from './features/sharing/ReviewAuthoriseAccessScreen';
import { AccessRequestsScreen } from './features/sharing/AccessRequestsScreen';
import { ManageSharedAccessScreen } from './features/sharing/ManageSharedAccessScreen';
import { PatientReferralsScreen } from './features/sharing/PatientReferralsScreen';
import { ReferralDetailsScreen } from './features/sharing/ReferralDetailsScreen';
import { SharingHistoryScreen } from './features/sharing/SharingHistoryScreen';

// Section 8 — Clinical Screening Operations Suite
import { ScreeningDashboardScreen } from './features/screening/ScreeningDashboardScreen';
import { PatientIdentificationScreen } from './features/screening/PatientIdentificationScreen';
import { PatientConfirmationConsentScreen } from './features/screening/PatientConfirmationConsentScreen';
import { StartNewScreeningScreen } from './features/screening/StartNewScreeningScreen';
import { QuickScreeningAssessmentScreen } from './features/screening/QuickScreeningAssessmentScreen';
import { ScreeningOutcomeScreen } from './features/screening/ScreeningOutcomeScreen';
import { ReviewSubmitScreeningScreen } from './features/screening/ReviewSubmitScreeningScreen';

// Section 9 — Patient Odontogram, Charting & Diagnostic Findings Suite (9.1 - 9.10)
import { PatientOdontogramOverviewScreen } from './features/odontogram/PatientOdontogramOverviewScreen';
import { GeneralOralFindingsScreen } from './features/odontogram/GeneralOralFindingsScreen';
import { InvestigationReferencesScreen } from './features/odontogram/InvestigationReferencesScreen';
import { ReviewClinicalSummaryScreen } from './features/odontogram/ReviewClinicalSummaryScreen';
import { SubmissionConfirmationScreen } from './features/odontogram/SubmissionConfirmationScreen';
import { OdontogramHistoryScreen } from './features/odontogram/OdontogramHistoryScreen';
import { OdontogramComparisonScreen } from './features/odontogram/OdontogramComparisonScreen';

// Section 10 — Detailed Clinical Examination & Diagnostic Suite (10.2 - 10.24)
import { PatientSelectionConfirmationScreen } from './features/examination/PatientSelectionConfirmationScreen';
import { ExaminationTypeTemplateScreen } from './features/examination/ExaminationTypeTemplateScreen';
import { ExaminationWorkspaceOverviewScreen } from './features/examination/ExaminationWorkspaceOverviewScreen';
import { PatientHistoryComplaintScreen } from './features/examination/PatientHistoryComplaintScreen';
import { ExtraoralExaminationScreen } from './features/examination/ExtraoralExaminationScreen';
import { IntraoralSoftTissueScreen } from './features/examination/IntraoralSoftTissueScreen';
import { PeriodontalExaminationScreen } from './features/examination/PeriodontalExaminationScreen';
import { OcclusionAssessmentScreen } from './features/examination/OcclusionAssessmentScreen';
import { OdontogramIntegrationScreen } from './features/examination/OdontogramIntegrationScreen';
import { InvestigationIntegrationScreen } from './features/examination/InvestigationIntegrationScreen';
import { ClinicalAssessmentImpressionScreen } from './features/examination/ClinicalAssessmentImpressionScreen';
import { ClinicalAttachmentsScreen } from './features/examination/ClinicalAttachmentsScreen';
import { ExaminationHistoryScreen } from './features/examination/ExaminationHistoryScreen';
import { ExaminationReviewValidationScreen } from './features/examination/ExaminationReviewValidationScreen';
import { PatientFacingSummaryPreviewScreen } from './features/examination/PatientFacingSummaryPreviewScreen';
import { ExaminationAmendmentScreen } from './features/examination/ExaminationAmendmentScreen';
import { FollowUpRecommendationsScreen } from './features/examination/FollowUpRecommendationsScreen';
import { ExaminationTemplateLibraryScreen } from './features/examination/ExaminationTemplateLibraryScreen';
import { CreateEditTemplateScreen } from './features/examination/CreateEditTemplateScreen';
import { TemplatePreviewVersionHistoryScreen } from './features/examination/TemplatePreviewVersionHistoryScreen';
import { ClinicTemplatePermissionsScreen } from './features/examination/ClinicTemplatePermissionsScreen';

// Section 11 — Clinical Investigations, Radiology & Laboratory Suite (11.1 - 11.6)
import { InvestigationDashboardScreen } from './features/investigations/InvestigationDashboardScreen';
import { InvestigationRequestsTableScreen } from './features/investigations/InvestigationRequestsTableScreen';
import { CreateInvestigationRequestScreen } from './features/investigations/CreateInvestigationRequestScreen';
import { InvestigationRequestDetailsScreen } from './features/investigations/InvestigationRequestDetailsScreen';
import { InvestigationAppointmentSchedulingScreen } from './features/investigations/InvestigationAppointmentSchedulingScreen';
import { PatientInvestigationRequestsQueueScreen } from './features/investigations/PatientInvestigationRequestsQueueScreen';

// Section 11 — Clinical Investigations (11.7 - 11.12)
import { InvestigationRequestConfirmationScreen } from './features/investigations/InvestigationRequestConfirmationScreen';
import { InvestigationAwaitingResultsScreen } from './features/investigations/InvestigationAwaitingResultsScreen';
import { UploadInvestigationScreen } from './features/investigations/UploadInvestigationScreen';
import { InvestigationCategoryDetailsScreen } from './features/investigations/InvestigationCategoryDetailsScreen';
import { InvestigationAssociationScreen } from './features/investigations/InvestigationAssociationScreen';
import { InvestigationReviewConfirmationScreen } from './features/investigations/InvestigationReviewConfirmationScreen';

// Section 11 — Clinical Investigations, Viewers & Library (11.13 - 11.18)
import { InvestigationLibraryScreen } from './features/investigations/InvestigationLibraryScreen';
import { InvestigationRecordDetailsScreen } from './features/investigations/InvestigationRecordDetailsScreen';
import { DentalXRayViewerScreen } from './features/investigations/DentalXRayViewerScreen';
import { OpgViewerScreen } from './features/investigations/OpgViewerScreen';
import { CbctViewerScreen } from './features/investigations/CbctViewerScreen';
import { LaboratoryResultsViewerScreen } from './features/investigations/LaboratoryResultsViewerScreen';

// Section 11 — Clinical Investigations, Review, Comparison & Reports (11.19 - 11.24)
import { ClinicalPhotographViewerScreen } from './features/investigations/ClinicalPhotographViewerScreen';
import { ClinicalReviewInterpretationScreen } from './features/investigations/ClinicalReviewInterpretationScreen';
import { InvestigationComparisonScreen } from './features/investigations/InvestigationComparisonScreen';
import { InvestigationFollowUpScreen } from './features/investigations/InvestigationFollowUpScreen';
import { InvestigationHistoryVersionScreen } from './features/investigations/InvestigationHistoryVersionScreen';
import { InvestigationReportsPdfScreen } from './features/investigations/InvestigationReportsPdfScreen';

// Section 11 — Activity, Directory, Templates, Billing & Analytics (11.25 - 11.30)
import { InvestigationActivityAccessScreen } from './features/investigations/InvestigationActivityAccessScreen';
import { InvestigationProviderDirectoryScreen } from './features/investigations/InvestigationProviderDirectoryScreen';
import { InvestigationTemplateLibraryScreen } from './features/investigations/InvestigationTemplateLibraryScreen';
import { InvestigationCreateTemplateScreen } from './features/investigations/InvestigationCreateTemplateScreen';
import { InvestigationBillingScreen } from './features/investigations/InvestigationBillingScreen';
import { InvestigationAnalyticsScreen } from './features/investigations/InvestigationAnalyticsScreen';

// Section 12 — Clinical Summary & AI Dashboard Suite (12.1 - 12.20)
import { ClinicalSummaryDashboardScreen } from './features/summaries/ClinicalSummaryDashboardScreen';
import { SummaryPatientSelectionScreen } from './features/summaries/SummaryPatientSelectionScreen';
import { SummaryDataSourceSelectionScreen } from './features/summaries/SummaryDataSourceSelectionScreen';
import { SummaryGenerationConfigScreen } from './features/summaries/SummaryGenerationConfigScreen';
import { SummaryWorkspaceScreen } from './features/summaries/SummaryWorkspaceScreen';
import { OdontogramSummaryScreen } from './features/summaries/OdontogramSummaryScreen';
import { InvestigationSummaryScreen } from './features/summaries/InvestigationSummaryScreen';
import { CombinedOralHealthSummaryScreen } from './features/summaries/CombinedOralHealthSummaryScreen';
import { AIClinicalInterpretationScreen } from './features/summaries/AIClinicalInterpretationScreen';
import { AIImageReviewScreen } from './features/summaries/AIImageReviewScreen';
import { TreatmentRecommendationDraftScreen } from './features/summaries/TreatmentRecommendationDraftScreen';
import { EditCustomiseAIOutputScreen } from './features/summaries/EditCustomiseAIOutputScreen';
import { PatientFriendlySummaryEditorScreen } from './features/summaries/PatientFriendlySummaryEditorScreen';
import { VisualOralHealthSummaryScreen } from './features/summaries/VisualOralHealthSummaryScreen';
import { SummaryReviewApprovalScreen } from './features/summaries/SummaryReviewApprovalScreen';
import { ApprovalConfirmationScreen } from './features/summaries/ApprovalConfirmationScreen';
import { SummaryHistoryVersionScreen } from './features/summaries/SummaryHistoryVersionScreen';
import { AIActivitySourceHistoryScreen } from './features/summaries/AIActivitySourceHistoryScreen';
import { AISummaryTemplateLibraryScreen } from './features/summaries/AISummaryTemplateLibraryScreen';
import { CreateEditAISummaryTemplateScreen } from './features/summaries/CreateEditAISummaryTemplateScreen';

// Section 13 — Treatment Planning & Follow-up Suite (13.1 - 13.30)
import { TreatmentPlanningDashboardScreen } from './features/treatment-plans/TreatmentPlanningDashboardScreen';
import { PlanPatientSelectionScreen } from './features/treatment-plans/PlanPatientSelectionScreen';
import { PatientTreatmentOverviewScreen } from './features/treatment-plans/PatientTreatmentOverviewScreen';
import { CreateTreatmentPlanScreen } from './features/treatment-plans/CreateTreatmentPlanScreen';
import { TreatmentPlanBuilderScreen } from './features/treatment-plans/TreatmentPlanBuilderScreen';
import { TreatmentPhaseManagementScreen } from './features/treatment-plans/TreatmentPhaseManagementScreen';
import { AddEditTreatmentItemScreen } from './features/treatment-plans/AddEditTreatmentItemScreen';
import { AlternativeTreatmentOptionsScreen } from './features/treatment-plans/AlternativeTreatmentOptionsScreen';
import { TreatmentPriorityRationaleScreen } from './features/treatment-plans/TreatmentPriorityRationaleScreen';
import { DentistReviewApprovalScreen } from './features/treatment-plans/DentistReviewApprovalScreen';
import { PatientTreatmentPreviewScreen } from './features/treatment-plans/PatientTreatmentPreviewScreen';
import { PatientTreatmentDecisionScreen } from './features/treatment-plans/PatientTreatmentDecisionScreen';
import { TreatmentConsentManagementScreen } from './features/treatment-plans/TreatmentConsentManagementScreen';
import { TreatmentDecisionConsentHistoryScreen } from './features/treatment-plans/TreatmentDecisionConsentHistoryScreen';
import { TreatmentSchedulingScreen } from './features/treatment-plans/TreatmentSchedulingScreen';
import { TreatmentAppointmentDetailsScreen } from './features/treatment-plans/TreatmentAppointmentDetailsScreen';
import { TreatmentProgressWorkspaceScreen } from './features/treatment-plans/TreatmentProgressWorkspaceScreen';
import { RecordTreatmentCompletionScreen } from './features/treatment-plans/RecordTreatmentCompletionScreen';
import { TreatmentOutcomeReviewScreen } from './features/treatment-plans/TreatmentOutcomeReviewScreen';
import { FollowUpManagementScreen } from './features/treatment-plans/FollowUpManagementScreen';
import { FollowUpDetailsScreen } from './features/treatment-plans/FollowUpDetailsScreen';
import { TreatmentPlanHistoryScreen } from './features/treatment-plans/TreatmentPlanHistoryScreen';
import { PlanVersionComparisonScreen } from './features/treatment-plans/PlanVersionComparisonScreen';
import { DeferredIncompleteCareScreen } from './features/treatment-plans/DeferredIncompleteCareScreen';
import { TreatmentCostEstimateScreen } from './features/treatment-plans/TreatmentCostEstimateScreen';
import { TreatmentPaymentTrackingScreen } from './features/treatment-plans/TreatmentPaymentTrackingScreen';
import { ProcedureCatalogueScreen } from './features/treatment-plans/ProcedureCatalogueScreen';
import { CreateEditProcedureScreen } from './features/treatment-plans/CreateEditProcedureScreen';
import { TreatmentTemplateLibraryScreen } from './features/treatment-plans/TreatmentTemplateLibraryScreen';
import { TreatmentAnalyticsDashboardScreen } from './features/treatment-plans/TreatmentAnalyticsDashboardScreen';

// Section 14 — Dentist / Professional Workspace & Appointment Management (14.1 - 14.24)
import { ProfessionalDashboardScreen } from './features/clinical-workspace/ProfessionalDashboardScreen';
import { ClinicalWorkspaceLauncherScreen } from './features/clinical-workspace/ClinicalWorkspaceLauncherScreen';
import { ProfessionalSettingsScreen } from './features/clinical-workspace/ProfessionalSettingsScreen';
import { DashboardCustomisationScreen } from './features/clinical-workspace/DashboardCustomisationScreen';
import { AppointmentsCalendarScreen } from './features/clinical-workspace/AppointmentsCalendarScreen';
import { AppointmentsListScreen } from './features/clinical-workspace/AppointmentsListScreen';
import { AppointmentDetailsScreen } from './features/clinical-workspace/AppointmentDetailsScreen';
import { MyPatientsScreen } from './features/clinical-workspace/MyPatientsScreen';
import { PatientSearchSelectionScreen } from './features/clinical-workspace/PatientSearchSelectionScreen';
import { PatientProfessionalOverviewScreen } from './features/clinical-workspace/PatientProfessionalOverviewScreen';
import { MyTasksWorkQueueScreen } from './features/clinical-workspace/MyTasksWorkQueueScreen';
import { TaskDetailsAssignmentScreen } from './features/clinical-workspace/TaskDetailsAssignmentScreen';
import { ProfessionalActivityOverviewScreen } from './features/clinical-workspace/ProfessionalActivityOverviewScreen';
import { PersonalActivityReportsScreen } from './features/clinical-workspace/PersonalActivityReportsScreen';
import { NotificationsCentreScreen } from './features/clinical-workspace/NotificationsCentreScreen';
import { ProfessionalProfileScreen } from './features/clinical-workspace/ProfessionalProfileScreen';
import { EditProfessionalProfileScreen } from './features/clinical-workspace/EditProfessionalProfileScreen';
import { ProfessionalVerificationStatusScreen } from './features/clinical-workspace/ProfessionalVerificationStatusScreen';
import { WorkingScheduleAvailabilityScreen } from './features/clinical-workspace/WorkingScheduleAvailabilityScreen';
import { LeaveUnavailabilityManagementScreen } from './features/clinical-workspace/LeaveUnavailabilityManagementScreen';
import { ClinicBranchSwitcherScreen } from './features/clinical-workspace/ClinicBranchSwitcherScreen';
import { ProfessionalCollaborationWorkspaceScreen } from './features/clinical-workspace/ProfessionalCollaborationWorkspaceScreen';
import { ClinicalReviewSecondOpinionScreen } from './features/clinical-workspace/ClinicalReviewSecondOpinionScreen';
import { PatientCommunicationWorkspaceScreen } from './features/clinical-workspace/PatientCommunicationWorkspaceScreen';
import { ProfessionalResourcesAnnouncementsScreen } from './features/clinical-workspace/ProfessionalResourcesAnnouncementsScreen';
import { ProfessionalHelpSupportScreen } from './features/clinical-workspace/ProfessionalHelpSupportScreen';

// Section 15 — Organisation Registration & Clinic Onboarding (15.1 - 15.32)
import { OrganisationEntryScreen } from './features/clinic-onboarding/OrganisationEntryScreen';
import { ClinicAccountRegistrationScreen } from './features/clinic-onboarding/ClinicAccountRegistrationScreen';
import { OrganisationTypeSelectionScreen } from './features/clinic-onboarding/OrganisationTypeSelectionScreen';
import { OrganisationInformationScreen } from './features/clinic-onboarding/OrganisationInformationScreen';
import { OrganisationRepresentativeDetailsScreen } from './features/clinic-onboarding/OrganisationRepresentativeDetailsScreen';
import { OrganisationRegistrationDetailsScreen } from './features/clinic-onboarding/OrganisationRegistrationDetailsScreen';
import { ClinicProfileServicesScreen } from './features/clinic-onboarding/ClinicProfileServicesScreen';
import { PrimaryClinicLocationScreen } from './features/clinic-onboarding/PrimaryClinicLocationScreen';
import { OperatingHoursScreen } from './features/clinic-onboarding/OperatingHoursScreen';
import { VerificationDocumentUploadScreen } from './features/clinic-onboarding/VerificationDocumentUploadScreen';
import { DocumentReviewScreen } from './features/clinic-onboarding/DocumentReviewScreen';
import { AdditionalBranchRegistrationScreen } from './features/clinic-onboarding/AdditionalBranchRegistrationScreen';
import { BranchDetailsScreen } from './features/clinic-onboarding/BranchDetailsScreen';
import { BranchManagementScreen } from './features/clinic-onboarding/BranchManagementScreen';
import { ProfessionalInvitationScreen } from './features/clinic-onboarding/ProfessionalInvitationScreen';
import { StaffRoleAssignmentScreen } from './features/clinic-onboarding/StaffRoleAssignmentScreen';
import { ApplicationReviewSubmitScreen } from './features/clinic-onboarding/ApplicationReviewSubmitScreen';
import { RegistrationConfirmationScreen } from './features/clinic-onboarding/RegistrationConfirmationScreen';
import { ApplicationStatusScreen } from './features/clinic-onboarding/ApplicationStatusScreen';
import { MoreInformationRequiredScreen } from './features/clinic-onboarding/MoreInformationRequiredScreen';
import { VerificationRejectionDetailsScreen } from './features/clinic-onboarding/VerificationRejectionDetailsScreen';
import { ClinicOnboardingDashboardScreen } from './features/clinic-onboarding/ClinicOnboardingDashboardScreen';
import { OrganisationProfileManagementScreen } from './features/clinic-onboarding/OrganisationProfileManagementScreen';
import { OrganisationStructureScreen } from './features/clinic-onboarding/OrganisationStructureScreen';
import { BranchApprovalStatusScreen } from './features/clinic-onboarding/BranchApprovalStatusScreen';
import { StaffProfessionalManagementScreen } from './features/clinic-onboarding/StaffProfessionalManagementScreen';
import { ClinicOnboardingSupportScreen } from './features/clinic-onboarding/ClinicOnboardingSupportScreen';
import { DHAClinicAdminDashboardScreen } from './features/clinic-onboarding/DHAClinicAdminDashboardScreen';
import { DHAApplicationReviewWorkspaceScreen } from './features/clinic-onboarding/DHAApplicationReviewWorkspaceScreen';
import { DHADocumentVerificationScreen } from './features/clinic-onboarding/DHADocumentVerificationScreen';
import { DHARequestInformationScreen } from './features/clinic-onboarding/DHARequestInformationScreen';
import { DHAApplicationDecisionScreen } from './features/clinic-onboarding/DHAApplicationDecisionScreen';
import { DHABranchReviewScreen } from './features/clinic-onboarding/DHABranchReviewScreen';
import { DHAOrganisationManagementScreen } from './features/clinic-onboarding/DHAOrganisationManagementScreen';
import { DHAOrganisationProfileScreen } from './features/clinic-onboarding/DHAOrganisationProfileScreen';
import { DHAVerificationHistoryScreen } from './features/clinic-onboarding/DHAVerificationHistoryScreen';
import { DHAOrganisationSuspensionScreen } from './features/clinic-onboarding/DHAOrganisationSuspensionScreen';
import { DHAOrganisationChangeRequestsScreen } from './features/clinic-onboarding/DHAOrganisationChangeRequestsScreen';
import { DHAOnboardingSupportManagementScreen } from './features/clinic-onboarding/DHAOnboardingSupportManagementScreen';

// Section 16 — Clinic Operations & Branch Management
import { ClinicOperationsDashboardScreen } from './features/clinic-operations/ClinicOperationsDashboardScreen';
import { DashboardCustomisationScreen as OpsDashboardCustomisationScreen } from './features/clinic-operations/DashboardCustomisationScreen';
import { OrganisationWideOverviewScreen } from './features/clinic-operations/OrganisationWideOverviewScreen';
import { BranchOperationsOverviewScreen } from './features/clinic-operations/BranchOperationsOverviewScreen';
import { BranchSwitcherScreen } from './features/clinic-operations/BranchSwitcherScreen';
import { AppointmentCalendarScreen } from './features/clinic-operations/AppointmentCalendarScreen';
import { AppointmentListScreen } from './features/clinic-operations/AppointmentListScreen';
import { AppointmentDetailsScreen as OpsAppointmentDetailsScreen } from './features/clinic-operations/AppointmentDetailsScreen';
import { CreateEditAppointmentScreen } from './features/clinic-operations/CreateEditAppointmentScreen';
import { WalkInPatientRegistrationScreen } from './features/clinic-operations/WalkInPatientRegistrationScreen';
import { WalkInManagementScreen } from './features/clinic-operations/WalkInManagementScreen';
import { PatientOperationsDirectoryScreen } from './features/clinic-operations/PatientOperationsDirectoryScreen';
import { ReceptionCheckInWorkspaceScreen } from './features/clinic-operations/ReceptionCheckInWorkspaceScreen';
import { WaitingRoomQueueScreen } from './features/clinic-operations/WaitingRoomQueueScreen';
import { StaffOperationsOverviewScreen } from './features/clinic-operations/StaffOperationsOverviewScreen';
import { ShiftTimetableStreamScreen } from './features/clinic-operations/ShiftTimetableStreamScreen';
import { ClinicTasksAssignmentScreen } from './features/clinic-operations/ClinicTasksAssignmentScreen';
import { ClinicalOperationsOverviewScreen } from './features/clinic-operations/ClinicalOperationsOverviewScreen';
import { ClinicalWorkflowMonitoringScreen } from './features/clinic-operations/ClinicalWorkflowMonitoringScreen';
import { ReferralOperationsOverviewScreen } from './features/clinic-operations/ReferralOperationsOverviewScreen';
import { BranchManagementOverviewScreen } from './features/clinic-operations/BranchManagementOverviewScreen';
import { EquipmentRegisterScreen } from './features/clinic-operations/EquipmentRegisterScreen';
import { ClinicalActivityDetailsScreen } from './features/clinic-operations/ClinicalActivityDetailsScreen';
import { BranchOperationalDetailsScreen } from './features/clinic-operations/BranchOperationalDetailsScreen';
import { EquipmentDetailsScreen } from './features/clinic-operations/EquipmentDetailsScreen';
import { EquipmentMaintenanceScreen } from './features/clinic-operations/EquipmentMaintenanceScreen';
import { SuppliesInventoryOverviewScreen } from './features/clinic-operations/SuppliesInventoryOverviewScreen';
import { AddEditInventoryItemScreen } from './features/clinic-operations/AddEditInventoryItemScreen';
import { InventoryItemDetailsScreen } from './features/clinic-operations/InventoryItemDetailsScreen';
import { FinancialOperationsDashboardScreen } from './features/clinic-operations/FinancialOperationsDashboardScreen';
import { BillingInvoicesScreen } from './features/clinic-operations/BillingInvoicesScreen';
import { InvoiceDetailsScreen } from './features/clinic-operations/InvoiceDetailsScreen';
import { PaymentRecordingScreen } from './features/clinic-operations/PaymentRecordingScreen';
import { PaymentHistoryReceiptsScreen } from './features/clinic-operations/PaymentHistoryReceiptsScreen';
import { RefundAdjustmentRecordsScreen } from './features/clinic-operations/RefundAdjustmentRecordsScreen';
import { OperationalReportsDashboardScreen } from './features/clinic-operations/OperationalReportsDashboardScreen';
import { AppointmentAttendanceReportsScreen } from './features/clinic-operations/AppointmentAttendanceReportsScreen';
import { PatientActivityReportsScreen } from './features/clinic-operations/PatientActivityReportsScreen';
import { ClinicalOperationsReportsScreen } from './features/clinic-operations/ClinicalOperationsReportsScreen';
import { FinancialReportsScreen } from './features/clinic-operations/FinancialReportsScreen';
import { BranchComparisonReportsScreen } from './features/clinic-operations/BranchComparisonReportsScreen';
import { CentralNotificationsCentreScreen } from './features/clinic-operations/CentralNotificationsCentreScreen';
import { InternalAnnouncementsScreen } from './features/clinic-operations/InternalAnnouncementsScreen';
import { CreateAnnouncementScreen } from './features/clinic-operations/CreateAnnouncementScreen';
import { ClinicPreferencesScreen } from './features/clinic-operations/ClinicPreferencesScreen';
import { DashboardSettingsScreen } from './features/clinic-operations/DashboardSettingsScreen';

// Section 17 — Staff Management & Practice Affiliations Suite
import { StaffManagementDashboardScreen } from './features/staff-management/StaffManagementDashboardScreen';
import { StaffDirectoryScreen } from './features/staff-management/StaffDirectoryScreen';
import { StaffProfileDetailsScreen } from './features/staff-management/StaffProfileDetailsScreen';
import { AddStaffWizardScreen } from './features/staff-management/AddStaffWizardScreen';
import { InviteExistingProfessionalScreen } from './features/staff-management/InviteExistingProfessionalScreen';
import { InviteNewStaffScreen } from './features/staff-management/InviteNewStaffScreen';
import { InvitationDetailsStatusScreen } from './features/staff-management/InvitationDetailsStatusScreen';
import { PendingInvitationsScreen } from './features/staff-management/PendingInvitationsScreen';
import { StaffRoleAssignmentScreen as StaffRoleAssignmentScreen17 } from './features/staff-management/StaffRoleAssignmentScreen';
import { RolePermissionMatrixScreen } from './features/staff-management/RolePermissionMatrixScreen';
import { CreateCustomRoleScreen } from './features/staff-management/CreateCustomRoleScreen';
import { EditCustomRoleScreen } from './features/staff-management/EditCustomRoleScreen';
import { RoleDetailsAssignedStaffScreen } from './features/staff-management/RoleDetailsAssignedStaffScreen';
import { StaffPermissionDetailsScreen } from './features/staff-management/StaffPermissionDetailsScreen';
import { BranchAssignmentScreen } from './features/staff-management/BranchAssignmentScreen';
import { StaffBranchManagementScreen } from './features/staff-management/StaffBranchManagementScreen';
import { StaffResponsibilitiesDutiesScreen } from './features/staff-management/StaffResponsibilitiesDutiesScreen';
import { ProfessionalVerificationAffiliationScreen } from './features/staff-management/ProfessionalVerificationAffiliationScreen';
import { StaffStatusManagementScreen } from './features/staff-management/StaffStatusManagementScreen';
import { SuspendDeactivateStaffScreen } from './features/staff-management/SuspendDeactivateStaffScreen';
import { StaffTransferBranchChangesScreen } from './features/staff-management/StaffTransferBranchChangesScreen';
import { StaffEmploymentDetailsScreen } from './features/staff-management/StaffEmploymentDetailsScreen';
import { StaffRequestsApprovalsScreen } from './features/staff-management/StaffRequestsApprovalsScreen';
import { StaffActivityAccessHistoryScreen } from './features/staff-management/StaffActivityAccessHistoryScreen';
import { StaffManagementReportsScreen } from './features/staff-management/StaffManagementReportsScreen';
import { StaffManagementSettingsScreen } from './features/staff-management/StaffManagementSettingsScreen';

// Section 0 — Onboarding & Public Portal Suite
import PortalHeroScreen from './features/portal/PortalHeroScreen';
import BetterWayScreen from './features/portal/BetterWayScreen';
import { JourneyScreen } from './features/portal/JourneyScreen';
import { FamilyCareScreen } from './features/portal/FamilyCareScreen';
import { FindCareScreen } from './features/portal/FindCareScreen';
import CommunityPartnersScreen from './features/portal/CommunityPartnersScreen';
import { GettingStartedStepsScreen } from './features/portal/GettingStartedStepsScreen';
import { EducationGuidesPortalScreen } from './features/portal/EducationGuidesPortalScreen';
import TrustPrivacyScreen from './features/portal/TrustPrivacyScreen';
import { AboutDHAScreen } from './features/portal/AboutDHAScreen';
import { ForProfessionalsScreen } from './features/portal/ForProfessionalsScreen';
import { OralHealthGuidesScreen } from './features/portal/OralHealthGuidesScreen';
import { ClinicianOnboardingScreen } from './features/onboarding/ClinicianOnboardingScreen';
import { ScreenerOnboardingScreen } from './features/onboarding/ScreenerOnboardingScreen';

// Section 0B — Professional & Organisations Suite
import { ProfessionalHeroScreen } from './features/professional/ProfessionalHeroScreen';
import { ProfessionalIntroScreen } from './features/professional/ProfessionalIntroScreen';
import { ServicesForDentistsScreen } from './features/professional/ServicesForDentistsScreen';
import { ServicesForClinicsScreen } from './features/professional/ServicesForClinicsScreen';
import { ServicesForSchoolsScreen } from './features/professional/ServicesForSchoolsScreen';
import { CarePathwayContinuumScreen } from './features/professional/CarePathwayContinuumScreen';
import { WhoCanJoinScreen } from './features/professional/WhoCanJoinScreen';
import { VerificationAndTrustScreen } from './features/professional/VerificationAndTrustScreen';
import { JoiningStepsScreen } from './features/professional/JoiningStepsScreen';

/** Resets scroll position on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * DHA patient-facing routes.
 *
 * Base patient dashboard route is /patient-dashboard with side menu on desktop
 * and 4-item bottom navigation with 'More' action drawer on mobile.
 */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Onboarding / entry */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding/lifecode" element={<LifecodeScreen />} />
        <Route path="/onboarding/get-started" element={<GetStartedScreen />} />
        <Route path="/onboarding/clinician" element={<ClinicianOnboardingScreen />} />
        <Route path="/onboarding/screener" element={<ScreenerOnboardingScreen />} />
        <Route path="/join-role" element={<RoleSelectionScreen />} />
        <Route path="/about" element={<AboutDHAScreen />} />
        <Route path="/about-dha" element={<AboutDHAScreen />} />
        <Route path="/for-professionals" element={<ForProfessionalsScreen />} />
        <Route path="/oral-health-guides" element={<OralHealthGuidesScreen />} />
        <Route path="/clinician-onboarding" element={<Navigate to="/onboarding/clinician" replace />} />
        <Route path="/screener-onboarding" element={<Navigate to="/onboarding/screener" replace />} />
        <Route path="/professionals" element={<Navigate to="/for-professionals" replace />} />
        <Route path="/dental-care" element={<Navigate to="/for-professionals" replace />} />
        <Route path="/guides" element={<Navigate to="/oral-health-guides" replace />} />

        {/* Section 0 — Onboarding & Public Portal Suite (0.1 - 0.9) */}
        <Route path="/portal" element={<PortalHeroScreen />} />
        <Route path="/portal/hero" element={<PortalHeroScreen />} />
        <Route path="/portal/better-way" element={<BetterWayScreen />} />
        <Route path="/portal/journey" element={<JourneyScreen />} />
        <Route path="/portal/family-care" element={<FamilyCareScreen />} />
        <Route path="/portal/find-care" element={<FindCareScreen />} />
        <Route path="/portal/partners" element={<CommunityPartnersScreen />} />
        <Route path="/portal/getting-started" element={<GettingStartedStepsScreen />} />
        <Route path="/portal/guides" element={<EducationGuidesPortalScreen />} />
        <Route path="/portal/privacy" element={<TrustPrivacyScreen />} />

        {/* Section 0 Top-Level Short Link Aliases */}
        <Route path="/family" element={<Navigate to="/portal/family-care" replace />} />
        <Route path="/family-care" element={<Navigate to="/portal/family-care" replace />} />
        <Route path="/find-care" element={<Navigate to="/portal/find-care" replace />} />
        <Route path="/partners" element={<Navigate to="/portal/partners" replace />} />
        <Route path="/privacy" element={<Navigate to="/portal/privacy" replace />} />
        <Route path="/portal-guides" element={<Navigate to="/portal/guides" replace />} />

        {/* Section 0B — Professional & Organisations Suite (0B.1 - 0B.9) */}
        <Route path="/professional" element={<Navigate to="/professional/hero" replace />} />
        <Route path="/professional/hero" element={<ProfessionalHeroScreen />} />
        <Route path="/professional/intro" element={<ProfessionalIntroScreen />} />
        <Route path="/professional/services-dentists" element={<ServicesForDentistsScreen />} />
        <Route path="/professional/services-clinics" element={<ServicesForClinicsScreen />} />
        <Route path="/professional/services-schools" element={<ServicesForSchoolsScreen />} />
        <Route path="/professional/pathway" element={<CarePathwayContinuumScreen />} />
        <Route path="/professional/who-can-join" element={<WhoCanJoinScreen />} />
        <Route path="/professional/verification-trust" element={<VerificationAndTrustScreen />} />
        <Route path="/professional/joining-steps" element={<JoiningStepsScreen />} />

        {/* Section 0B Top-Level Aliases */}
        <Route path="/dentists-portal" element={<Navigate to="/professional/services-dentists" replace />} />
        <Route path="/clinics-portal" element={<Navigate to="/professional/services-clinics" replace />} />
        <Route path="/schools-portal" element={<Navigate to="/professional/services-schools" replace />} />
        <Route path="/pathway" element={<Navigate to="/professional/pathway" replace />} />
        <Route path="/who-can-join" element={<Navigate to="/professional/who-can-join" replace />} />
        <Route path="/joining-steps" element={<Navigate to="/professional/joining-steps" replace />} />

        {/* Section 1 — Patient registration (Journey 1) */}
        <Route path="/register" element={<RegisterEntryScreen />} />
        <Route path="/register/contact" element={<ContactDetailsScreen />} />
        <Route path="/register/verify" element={<VerifyOtpScreen />} />
        <Route path="/register/details" element={<PersonalDetailsScreen />} />
        <Route path="/register/health" element={<HealthProfileScreen />} />
        <Route path="/register/complete" element={<RegistrationCompleteScreen />} />

        {/* Section 1 — Patient login */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Section 2 — Patient Dashboard Suite (Primary Route: /patient-dashboard) */}
        <Route path="/patient-dashboard" element={<PatientHomeScreen />} />
        <Route path="/patient-dashboard/notifications" element={<NotificationsScreen />} />
        <Route path="/patient-dashboard/oral-health" element={<OralHealthScreen />} />
        <Route path="/patient-dashboard/quick-actions" element={<QuickActionsScreen />} />
        <Route path="/patient-dashboard/first-time" element={<FirstTimeDashboardScreen />} />
        <Route path="/patient-dashboard/guardian" element={<GuardianSwitcherScreen />} />

        {/* Section 3 — Patient Records & History Suite */}
        <Route path="/patient-dashboard/records" element={<Navigate to="/patient-dashboard/records/timeline" replace />} />
        <Route path="/patient-dashboard/records/timeline" element={<RecordsTimelineScreen />} />
        <Route path="/patient-dashboard/records/screenings" element={<ScreeningHistoryScreen />} />
        <Route path="/patient-dashboard/records/examinations" element={<DentalExaminationScreen />} />
        <Route path="/patient-dashboard/records/clinical-summary" element={<ClinicalSummaryScreen />} />
        <Route path="/patient-dashboard/records/investigations" element={<InvestigationsScreen />} />
        <Route path="/patient-dashboard/records/treatments" element={<TreatmentHistoryScreen />} />

        {/* Section 4 — Patient Reminders & Appointments Suite */}
        <Route path="/patient-dashboard/reminders" element={<RemindersOverviewScreen />} />
        <Route path="/patient-dashboard/reminders/appointments" element={<AppointmentRemindersScreen />} />
        <Route path="/patient-dashboard/reminders/daily-care" element={<DailyCareRemindersScreen />} />
        <Route path="/patient-dashboard/reminders/checkups" element={<CheckupRemindersScreen />} />
        <Route path="/patient-dashboard/reminders/treatments" element={<PendingTreatmentRemindersScreen />} />
        <Route path="/patient-dashboard/reminders/details" element={<ReminderDetailsScreen />} />

        {/* Section 5 — Clinic Discovery & Provider Directory Suite */}
        <Route path="/patient-dashboard/discovery" element={<DiscoverHomeScreen />} />
        <Route path="/patient-dashboard/discovery/results" element={<SearchResultsScreen />} />
        <Route path="/patient-dashboard/discovery/map" element={<NearbyClinicsMapScreen />} />
        <Route path="/patient-dashboard/discovery/dentist" element={<DentistProfileScreen />} />
        <Route path="/patient-dashboard/discovery/clinic" element={<ClinicProfileScreen />} />
        <Route path="/patient-dashboard/discovery/services" element={<ServicesSpecialitiesScreen />} />

        {/* Section 6 — Patient Education & Oral Health Guides Suite */}
        <Route path="/patient-dashboard/education" element={<EducationHomeScreen />} />
        <Route path="/patient-dashboard/education/topics" element={<OralHealthTopicsScreen />} />
        <Route path="/patient-dashboard/education/videos" element={<DentalVideosScreen />} />
        <Route path="/patient-dashboard/education/daily-care" element={<DailyCareGuidesScreen />} />
        <Route path="/patient-dashboard/education/kids" element={<KidsInteractiveLearningScreen />} />
        <Route path="/patient-dashboard/education/saved" element={<SavedEducationScreen />} />

        {/* Section 7 — Record Sharing & Referrals Suite (7.1 - 7.8) */}
        <Route path="/patient-dashboard/sharing" element={<Navigate to="/patient-dashboard/sharing/overview" replace />} />
        <Route path="/patient-dashboard/sharing/overview" element={<RecordSharingOverviewScreen />} />
        <Route path="/patient-dashboard/sharing/share-records" element={<SharePatientRecordsScreen />} />
        <Route path="/patient-dashboard/sharing/review-authorise" element={<ReviewAuthoriseAccessScreen />} />
        <Route path="/patient-dashboard/sharing/access-requests" element={<AccessRequestsScreen />} />
        <Route path="/patient-dashboard/sharing/manage-access" element={<ManageSharedAccessScreen />} />
        <Route path="/patient-dashboard/sharing/referrals" element={<PatientReferralsScreen />} />
        <Route path="/patient-dashboard/sharing/referral-details" element={<ReferralDetailsScreen />} />
        <Route path="/patient-dashboard/sharing/history" element={<SharingHistoryScreen />} />

        {/* Section 7 Top-Level Aliases */}
        <Route path="/sharing" element={<Navigate to="/patient-dashboard/sharing/overview" replace />} />
        <Route path="/share-records" element={<Navigate to="/patient-dashboard/sharing/share-records" replace />} />
        <Route path="/referrals" element={<Navigate to="/patient-dashboard/sharing/referrals" replace />} />
        <Route path="/referral-details" element={<Navigate to="/patient-dashboard/sharing/referral-details" replace />} />

        {/* Section 8 — Clinical Screening Operations Suite (8.1 - 8.7) */}
        <Route path="/screening" element={<Navigate to="/screening/dashboard" replace />} />
        <Route path="/screening/dashboard" element={<ScreeningDashboardScreen />} />
        <Route path="/screening/identification" element={<PatientIdentificationScreen />} />
        <Route path="/screening/consent" element={<PatientConfirmationConsentScreen />} />
        <Route path="/screening/start" element={<StartNewScreeningScreen />} />
        <Route path="/screening/assessment" element={<QuickScreeningAssessmentScreen />} />
        <Route path="/screening/outcome" element={<ScreeningOutcomeScreen />} />
        <Route path="/screening/review" element={<ReviewSubmitScreeningScreen />} />

        {/* Section 8 Aliases */}
        <Route path="/screening-dashboard" element={<Navigate to="/screening/dashboard" replace />} />
        <Route path="/patient-identification" element={<Navigate to="/screening/identification" replace />} />

        {/* Section 9 — Patient Odontogram, Charting & Diagnostic Findings Suite (9.1 - 9.10) */}
        <Route path="/odontogram" element={<Navigate to="/odontogram/overview" replace />} />
        <Route path="/odontogram/overview" element={<PatientOdontogramOverviewScreen />} />
        <Route path="/odontogram/findings" element={<GeneralOralFindingsScreen />} />
        <Route path="/odontogram/investigations" element={<InvestigationReferencesScreen />} />
        <Route path="/odontogram/summary" element={<ReviewClinicalSummaryScreen />} />
        <Route path="/odontogram/confirmation" element={<SubmissionConfirmationScreen />} />
        <Route path="/odontogram/history" element={<OdontogramHistoryScreen />} />
        <Route path="/odontogram/compare" element={<OdontogramComparisonScreen />} />

        {/* Section 9 Top-Level Aliases */}
        <Route path="/odontogram-overview" element={<Navigate to="/odontogram/overview" replace />} />
        <Route path="/odontogram-findings" element={<Navigate to="/odontogram/findings" replace />} />
        <Route path="/odontogram-investigations" element={<Navigate to="/odontogram/investigations" replace />} />
        <Route path="/odontogram-summary" element={<Navigate to="/odontogram/summary" replace />} />
        <Route path="/odontogram-history" element={<Navigate to="/odontogram/history" replace />} />
        <Route path="/odontogram-compare" element={<Navigate to="/odontogram/compare" replace />} />

        {/* Section 10 — Detailed Clinical Examination & Diagnostic Suite (10.2 - 10.24) */}
        <Route path="/examination" element={<Navigate to="/examination/confirmation" replace />} />
        <Route path="/examination/confirmation" element={<PatientSelectionConfirmationScreen />} />
        <Route path="/examination/templates" element={<ExaminationTypeTemplateScreen />} />
        <Route path="/examination/workspace" element={<ExaminationWorkspaceOverviewScreen />} />
        <Route path="/examination/history-complaint" element={<PatientHistoryComplaintScreen />} />
        <Route path="/examination/extraoral" element={<ExtraoralExaminationScreen />} />
        <Route path="/examination/soft-tissue" element={<IntraoralSoftTissueScreen />} />
        <Route path="/examination/periodontal" element={<PeriodontalExaminationScreen />} />
        <Route path="/examination/occlusion" element={<OcclusionAssessmentScreen />} />
        <Route path="/examination/odontogram-integration" element={<OdontogramIntegrationScreen />} />
        <Route path="/examination/investigations" element={<InvestigationIntegrationScreen />} />
        <Route path="/examination/assessment" element={<ClinicalAssessmentImpressionScreen />} />
        <Route path="/examination/attachments" element={<ClinicalAttachmentsScreen />} />
        <Route path="/examination/review" element={<ExaminationReviewValidationScreen />} />
        <Route path="/examination/patient-summary" element={<PatientFacingSummaryPreviewScreen />} />
        <Route path="/examination/history" element={<ExaminationHistoryScreen />} />
        <Route path="/examination/amendment" element={<ExaminationAmendmentScreen />} />
        <Route path="/examination/recommendations" element={<FollowUpRecommendationsScreen />} />
        <Route path="/examination/templates/library" element={<ExaminationTemplateLibraryScreen />} />
        <Route path="/examination/templates/create" element={<CreateEditTemplateScreen />} />
        <Route path="/examination/templates/preview" element={<TemplatePreviewVersionHistoryScreen />} />
        <Route path="/examination/templates/permissions" element={<ClinicTemplatePermissionsScreen />} />

        {/* Section 10 Top-Level Aliases */}
        <Route path="/clinical-examination" element={<Navigate to="/examination/workspace" replace />} />
        <Route path="/patient-confirmation" element={<Navigate to="/examination/confirmation" replace />} />
        <Route path="/examination-templates" element={<Navigate to="/examination/templates" replace />} />
        <Route path="/examination-workspace" element={<Navigate to="/examination/workspace" replace />} />
        <Route path="/patient-history" element={<Navigate to="/examination/history-complaint" replace />} />
        <Route path="/extraoral-exam" element={<Navigate to="/examination/extraoral" replace />} />
        <Route path="/soft-tissue-exam" element={<Navigate to="/examination/soft-tissue" replace />} />
        <Route path="/periodontal-exam" element={<Navigate to="/examination/periodontal" replace />} />
        <Route path="/occlusion-assessment" element={<Navigate to="/examination/occlusion" replace />} />
        <Route path="/odontogram-integration" element={<Navigate to="/examination/odontogram-integration" replace />} />
        <Route path="/examination-investigations" element={<Navigate to="/examination/investigations" replace />} />
        <Route path="/clinical-assessment" element={<Navigate to="/examination/assessment" replace />} />
        <Route path="/clinical-attachments" element={<Navigate to="/examination/attachments" replace />} />
        <Route path="/examination-review" element={<Navigate to="/examination/review" replace />} />
        <Route path="/patient-summary" element={<Navigate to="/examination/patient-summary" replace />} />
        <Route path="/examination-history" element={<Navigate to="/examination/history" replace />} />
        <Route path="/examination-amendment" element={<Navigate to="/examination/amendment" replace />} />
        <Route path="/followup-recommendations" element={<Navigate to="/examination/recommendations" replace />} />
        <Route path="/template-library" element={<Navigate to="/examination/templates/library" replace />} />
        <Route path="/create-template" element={<Navigate to="/examination/templates/create" replace />} />
        <Route path="/template-preview" element={<Navigate to="/examination/templates/preview" replace />} />
        <Route path="/template-permissions" element={<Navigate to="/examination/templates/permissions" replace />} />

        {/* Section 11 — Clinical Investigations, Radiology & Laboratory Suite (11.1 - 11.6) */}
        <Route path="/investigations" element={<Navigate to="/investigations/dashboard" replace />} />
        <Route path="/investigations/dashboard" element={<InvestigationDashboardScreen />} />
        <Route path="/investigations/requests" element={<InvestigationRequestsTableScreen />} />
        <Route path="/investigations/create" element={<CreateInvestigationRequestScreen />} />
        <Route path="/investigations/details" element={<InvestigationRequestDetailsScreen />} />
        <Route path="/investigations/schedule" element={<InvestigationAppointmentSchedulingScreen />} />
        <Route path="/investigations/queue" element={<PatientInvestigationRequestsQueueScreen />} />
        <Route path="/investigations/confirmation" element={<InvestigationRequestConfirmationScreen />} />
        <Route path="/investigations/awaiting-results" element={<InvestigationAwaitingResultsScreen />} />
        <Route path="/investigations/upload" element={<UploadInvestigationScreen />} />
        <Route path="/investigations/upload/details" element={<InvestigationCategoryDetailsScreen />} />
        <Route path="/investigations/upload/association" element={<InvestigationAssociationScreen />} />
        <Route path="/investigations/upload/review" element={<InvestigationReviewConfirmationScreen />} />
        <Route path="/investigations/library" element={<InvestigationLibraryScreen />} />
        <Route path="/investigations/record-details" element={<InvestigationRecordDetailsScreen />} />
        <Route path="/investigations/viewer/xray" element={<DentalXRayViewerScreen />} />
        <Route path="/investigations/viewer/opg" element={<OpgViewerScreen />} />
        <Route path="/investigations/viewer/cbct" element={<CbctViewerScreen />} />
        <Route path="/investigations/viewer/lab" element={<LaboratoryResultsViewerScreen />} />
        <Route path="/investigations/viewer/photo" element={<ClinicalPhotographViewerScreen />} />
        <Route path="/investigations/review" element={<ClinicalReviewInterpretationScreen />} />
        <Route path="/investigations/compare" element={<InvestigationComparisonScreen />} />
        <Route path="/investigations/follow-up" element={<InvestigationFollowUpScreen />} />
        <Route path="/investigations/history" element={<InvestigationHistoryVersionScreen />} />
        <Route path="/investigations/reports" element={<InvestigationReportsPdfScreen />} />
        <Route path="/investigations/activity-access" element={<InvestigationActivityAccessScreen />} />
        <Route path="/investigations/directory" element={<InvestigationProviderDirectoryScreen />} />
        <Route path="/investigations/templates" element={<InvestigationTemplateLibraryScreen />} />
        <Route path="/investigations/templates/create" element={<InvestigationCreateTemplateScreen />} />
        <Route path="/investigations/billing" element={<InvestigationBillingScreen />} />
        <Route path="/investigations/analytics" element={<InvestigationAnalyticsScreen />} />

        {/* Section 11 Top-Level Clean Aliases */}
        <Route path="/investigation-dashboard" element={<Navigate to="/investigations/dashboard" replace />} />
        <Route path="/investigation-requests" element={<Navigate to="/investigations/requests" replace />} />
        <Route path="/new-investigation-request" element={<Navigate to="/investigations/create" replace />} />
        <Route path="/create-investigation" element={<Navigate to="/investigations/create" replace />} />
        <Route path="/investigation-request-details" element={<Navigate to="/investigations/details" replace />} />
        <Route path="/investigation-details" element={<Navigate to="/investigations/details" replace />} />
        <Route path="/investigation-scheduling" element={<Navigate to="/investigations/schedule" replace />} />
        <Route path="/investigation-queue" element={<Navigate to="/investigations/queue" replace />} />
        <Route path="/investigation-confirmation" element={<Navigate to="/investigations/confirmation" replace />} />
        <Route path="/awaiting-results" element={<Navigate to="/investigations/awaiting-results" replace />} />
        <Route path="/upload-investigation" element={<Navigate to="/investigations/upload" replace />} />
        <Route path="/investigation-category" element={<Navigate to="/investigations/upload/details" replace />} />
        <Route path="/investigation-association" element={<Navigate to="/investigations/upload/association" replace />} />
        <Route path="/investigation-review" element={<Navigate to="/investigations/upload/review" replace />} />
        <Route path="/investigation-library" element={<Navigate to="/investigations/library" replace />} />
        <Route path="/investigation-record-details" element={<Navigate to="/investigations/record-details" replace />} />
        <Route path="/xray-viewer" element={<Navigate to="/investigations/viewer/xray" replace />} />
        <Route path="/opg-viewer" element={<Navigate to="/investigations/viewer/opg" replace />} />
        <Route path="/cbct-viewer" element={<Navigate to="/investigations/viewer/cbct" replace />} />
        <Route path="/lab-viewer" element={<Navigate to="/investigations/viewer/lab" replace />} />
        <Route path="/photo-viewer" element={<Navigate to="/investigations/viewer/photo" replace />} />
        <Route path="/clinical-photo-viewer" element={<Navigate to="/investigations/viewer/photo" replace />} />
        <Route path="/investigation-clinical-review" element={<Navigate to="/investigations/review" replace />} />
        <Route path="/clinical-interpretation" element={<Navigate to="/investigations/review" replace />} />
        <Route path="/investigation-comparison" element={<Navigate to="/investigations/compare" replace />} />
        <Route path="/compare-investigations" element={<Navigate to="/investigations/compare" replace />} />
        <Route path="/investigation-follow-up" element={<Navigate to="/investigations/follow-up" replace />} />
        <Route path="/investigation-history-version" element={<Navigate to="/investigations/history" replace />} />
        <Route path="/investigation-ledger" element={<Navigate to="/investigations/history" replace />} />
        <Route path="/investigation-reports" element={<Navigate to="/investigations/reports" replace />} />
        <Route path="/investigation-pdf" element={<Navigate to="/investigations/reports" replace />} />
        <Route path="/investigation-activity-access" element={<Navigate to="/investigations/activity-access" replace />} />
        <Route path="/investigation-access-history" element={<Navigate to="/investigations/activity-access" replace />} />
        <Route path="/investigation-directory" element={<Navigate to="/investigations/directory" replace />} />
        <Route path="/provider-directory" element={<Navigate to="/investigations/directory" replace />} />
        <Route path="/investigation-templates" element={<Navigate to="/investigations/templates" replace />} />
        <Route path="/investigation-template-library" element={<Navigate to="/investigations/templates" replace />} />
        <Route path="/create-investigation-template" element={<Navigate to="/investigations/templates/create" replace />} />
        <Route path="/investigation-billing" element={<Navigate to="/investigations/billing" replace />} />
        <Route path="/investigation-payments" element={<Navigate to="/investigations/billing" replace />} />
        <Route path="/investigation-analytics" element={<Navigate to="/investigations/analytics" replace />} />

        {/* Section 12 — Clinical Summary & AI Dashboard Suite (12.1 - 12.20) */}
        <Route path="/summaries" element={<Navigate to="/summaries/dashboard" replace />} />
        <Route path="/summaries/dashboard" element={<ClinicalSummaryDashboardScreen />} />
        <Route path="/summaries/patient-selection" element={<SummaryPatientSelectionScreen />} />
        <Route path="/summaries/sources" element={<SummaryDataSourceSelectionScreen />} />
        <Route path="/summaries/generate" element={<SummaryGenerationConfigScreen />} />
        <Route path="/summaries/workspace" element={<SummaryWorkspaceScreen />} />
        <Route path="/summaries/odontogram" element={<OdontogramSummaryScreen />} />
        <Route path="/summaries/investigations" element={<InvestigationSummaryScreen />} />
        <Route path="/summaries/combined-oral-health" element={<CombinedOralHealthSummaryScreen />} />
        <Route path="/summaries/interpretation-assistance" element={<AIClinicalInterpretationScreen />} />
        <Route path="/summaries/image-review" element={<AIImageReviewScreen />} />
        <Route path="/summaries/treatment-recommendations" element={<TreatmentRecommendationDraftScreen />} />
        <Route path="/summaries/edit-output" element={<EditCustomiseAIOutputScreen />} />
        <Route path="/summaries/patient-editor" element={<PatientFriendlySummaryEditorScreen />} />
        <Route path="/summaries/visual-summary" element={<VisualOralHealthSummaryScreen />} />
        <Route path="/summaries/review-approval" element={<SummaryReviewApprovalScreen />} />
        <Route path="/summaries/approval-confirmation" element={<ApprovalConfirmationScreen />} />
        <Route path="/summaries/history" element={<SummaryHistoryVersionScreen />} />
        <Route path="/summaries/audit" element={<AIActivitySourceHistoryScreen />} />
        <Route path="/summaries/templates" element={<AISummaryTemplateLibraryScreen />} />
        <Route path="/summaries/templates/create" element={<CreateEditAISummaryTemplateScreen />} />

        {/* Section 12 Top-Level Clean Aliases */}
        <Route path="/clinical-summary-dashboard" element={<Navigate to="/summaries/dashboard" replace />} />
        <Route path="/ai-summary-dashboard" element={<Navigate to="/summaries/dashboard" replace />} />
        <Route path="/summary-patient-selection" element={<Navigate to="/summaries/patient-selection" replace />} />
        <Route path="/ai-patient-selection" element={<Navigate to="/summaries/patient-selection" replace />} />
        <Route path="/summary-data-sources" element={<Navigate to="/summaries/sources" replace />} />
        <Route path="/ai-data-sources" element={<Navigate to="/summaries/sources" replace />} />
        <Route path="/summary-generation" element={<Navigate to="/summaries/generate" replace />} />
        <Route path="/ai-summary-generate" element={<Navigate to="/summaries/generate" replace />} />
        <Route path="/summary-workspace" element={<Navigate to="/summaries/workspace" replace />} />
        <Route path="/clinical-summary-workspace" element={<Navigate to="/summaries/workspace" replace />} />
        <Route path="/odontogram-summary" element={<Navigate to="/summaries/odontogram" replace />} />
        <Route path="/summary-odontogram" element={<Navigate to="/summaries/odontogram" replace />} />
        <Route path="/investigation-summary" element={<Navigate to="/summaries/investigations" replace />} />
        <Route path="/summary-investigations" element={<Navigate to="/summaries/investigations" replace />} />
        <Route path="/combined-oral-health" element={<Navigate to="/summaries/combined-oral-health" replace />} />
        <Route path="/summary-combined" element={<Navigate to="/summaries/combined-oral-health" replace />} />
        <Route path="/ai-interpretation-assistance" element={<Navigate to="/summaries/interpretation-assistance" replace />} />
        <Route path="/clinical-interpretation-assistance" element={<Navigate to="/summaries/interpretation-assistance" replace />} />
        <Route path="/ai-image-review" element={<Navigate to="/summaries/image-review" replace />} />
        <Route path="/clinical-image-review" element={<Navigate to="/summaries/image-review" replace />} />
        <Route path="/treatment-recommendations" element={<Navigate to="/summaries/treatment-recommendations" replace />} />
        <Route path="/summary-treatment-recommendations" element={<Navigate to="/summaries/treatment-recommendations" replace />} />
        <Route path="/edit-ai-output" element={<Navigate to="/summaries/edit-output" replace />} />
        <Route path="/summary-edit-output" element={<Navigate to="/summaries/edit-output" replace />} />
        <Route path="/patient-friendly-summary" element={<Navigate to="/summaries/patient-editor" replace />} />
        <Route path="/patient-summary-editor" element={<Navigate to="/summaries/patient-editor" replace />} />
        <Route path="/visual-oral-health-summary" element={<Navigate to="/summaries/visual-summary" replace />} />
        <Route path="/visual-summary" element={<Navigate to="/summaries/visual-summary" replace />} />
        <Route path="/summary-review-approval" element={<Navigate to="/summaries/review-approval" replace />} />
        <Route path="/clinical-summary-review" element={<Navigate to="/summaries/review-approval" replace />} />
        <Route path="/ai-case-verification" element={<Navigate to="/summaries/review-approval" replace />} />
        <Route path="/approval-confirmation" element={<Navigate to="/summaries/approval-confirmation" replace />} />
        <Route path="/summary-approval-confirmation" element={<Navigate to="/summaries/approval-confirmation" replace />} />
        <Route path="/summary-history" element={<Navigate to="/summaries/history" replace />} />
        <Route path="/summary-version-control" element={<Navigate to="/summaries/history" replace />} />
        <Route path="/summary-history-version" element={<Navigate to="/summaries/history" replace />} />
        <Route path="/ai-activity-history" element={<Navigate to="/summaries/audit" replace />} />
        <Route path="/ai-source-history" element={<Navigate to="/summaries/audit" replace />} />
        <Route path="/summary-audit-trail" element={<Navigate to="/summaries/audit" replace />} />
        <Route path="/summary-templates" element={<Navigate to="/summaries/templates" replace />} />
        <Route path="/ai-summary-template-library" element={<Navigate to="/summaries/templates" replace />} />
        <Route path="/summary-template-library" element={<Navigate to="/summaries/templates" replace />} />
        <Route path="/create-summary-template" element={<Navigate to="/summaries/templates/create" replace />} />
        <Route path="/edit-summary-template" element={<Navigate to="/summaries/templates/create" replace />} />
        <Route path="/create-ai-summary-template" element={<Navigate to="/summaries/templates/create" replace />} />

        {/* Section 13 — Treatment Planning & Follow-up Suite (13.1 - 13.12) */}
        <Route path="/treatment-plans" element={<Navigate to="/treatment-plans/dashboard" replace />} />
        <Route path="/treatment-plans/dashboard" element={<TreatmentPlanningDashboardScreen />} />
        <Route path="/treatment-plans/patient-selection" element={<PlanPatientSelectionScreen />} />
        <Route path="/treatment-plans/patient-overview" element={<PatientTreatmentOverviewScreen />} />
        <Route path="/treatment-plans/create" element={<CreateTreatmentPlanScreen />} />
        <Route path="/treatment-plans/builder" element={<TreatmentPlanBuilderScreen />} />
        <Route path="/treatment-plans/phases" element={<TreatmentPhaseManagementScreen />} />
        <Route path="/treatment-plans/item-config" element={<AddEditTreatmentItemScreen />} />
        <Route path="/treatment-plans/alternatives" element={<AlternativeTreatmentOptionsScreen />} />
        <Route path="/treatment-plans/priority-rationale" element={<TreatmentPriorityRationaleScreen />} />
        <Route path="/treatment-plans/dentist-approval" element={<DentistReviewApprovalScreen />} />
        <Route path="/treatment-plans/patient-preview" element={<PatientTreatmentPreviewScreen />} />
        <Route path="/treatment-plans/patient-decision" element={<PatientTreatmentDecisionScreen />} />
        <Route path="/treatment-plans/consent" element={<TreatmentConsentManagementScreen />} />
        <Route path="/treatment-plans/decision-history" element={<TreatmentDecisionConsentHistoryScreen />} />
        <Route path="/treatment-plans/scheduling" element={<TreatmentSchedulingScreen />} />
        <Route path="/treatment-plans/appointment-details" element={<TreatmentAppointmentDetailsScreen />} />
        <Route path="/treatment-plans/progress-workspace" element={<TreatmentProgressWorkspaceScreen />} />
        <Route path="/treatment-plans/record-completion" element={<RecordTreatmentCompletionScreen />} />
        <Route path="/treatment-plans/outcome-review" element={<TreatmentOutcomeReviewScreen />} />
        <Route path="/treatment-plans/follow-up-management" element={<FollowUpManagementScreen />} />
        <Route path="/treatment-plans/follow-up-details" element={<FollowUpDetailsScreen />} />
        <Route path="/treatment-plans/history" element={<TreatmentPlanHistoryScreen />} />
        <Route path="/treatment-plans/version-comparison" element={<PlanVersionComparisonScreen />} />
        <Route path="/treatment-plans/deferred-care" element={<DeferredIncompleteCareScreen />} />
        <Route path="/treatment-plans/cost-estimate" element={<TreatmentCostEstimateScreen />} />
        <Route path="/treatment-plans/payment-tracking" element={<TreatmentPaymentTrackingScreen />} />
        <Route path="/treatment-plans/procedure-catalogue" element={<ProcedureCatalogueScreen />} />
        <Route path="/treatment-plans/procedure-editor" element={<CreateEditProcedureScreen />} />
        <Route path="/treatment-plans/template-library" element={<TreatmentTemplateLibraryScreen />} />
        <Route path="/treatment-plans/analytics-dashboard" element={<TreatmentAnalyticsDashboardScreen />} />

        {/* Section 13 Top-Level Clean Aliases */}
        <Route path="/treatment-planning" element={<Navigate to="/treatment-plans/dashboard" replace />} />
        <Route path="/treatment-dashboard" element={<Navigate to="/treatment-plans/dashboard" replace />} />
        <Route path="/plan-patient-selection" element={<Navigate to="/treatment-plans/patient-selection" replace />} />
        <Route path="/patient-treatment-overview" element={<Navigate to="/treatment-plans/patient-overview" replace />} />
        <Route path="/create-treatment-plan" element={<Navigate to="/treatment-plans/create" replace />} />
        <Route path="/treatment-plan-builder" element={<Navigate to="/treatment-plans/builder" replace />} />
        <Route path="/plan-builder" element={<Navigate to="/treatment-plans/builder" replace />} />
        <Route path="/treatment-phases" element={<Navigate to="/treatment-plans/phases" replace />} />
        <Route path="/phase-management" element={<Navigate to="/treatment-plans/phases" replace />} />
        <Route path="/treatment-item-config" element={<Navigate to="/treatment-plans/item-config" replace />} />
        <Route path="/alternative-treatments" element={<Navigate to="/treatment-plans/alternatives" replace />} />
        <Route path="/treatment-priority" element={<Navigate to="/treatment-plans/priority-rationale" replace />} />
        <Route path="/dentist-approval" element={<Navigate to="/treatment-plans/dentist-approval" replace />} />
        <Route path="/patient-plan-preview" element={<Navigate to="/treatment-plans/patient-preview" replace />} />
        <Route path="/patient-treatment-decision" element={<Navigate to="/treatment-plans/patient-decision" replace />} />
        <Route path="/treatment-consent" element={<Navigate to="/treatment-plans/consent" replace />} />
        <Route path="/treatment-decision-history" element={<Navigate to="/treatment-plans/decision-history" replace />} />
        <Route path="/treatment-scheduling" element={<Navigate to="/treatment-plans/scheduling" replace />} />
        <Route path="/treatment-appointment-details" element={<Navigate to="/treatment-plans/appointment-details" replace />} />
        <Route path="/treatment-progress-workspace" element={<Navigate to="/treatment-plans/progress-workspace" replace />} />
        <Route path="/record-treatment-completion" element={<Navigate to="/treatment-plans/record-completion" replace />} />
        <Route path="/treatment-outcome-review" element={<Navigate to="/treatment-plans/outcome-review" replace />} />
        <Route path="/treatment-outcome" element={<Navigate to="/treatment-plans/outcome-review" replace />} />
        <Route path="/follow-up-management" element={<Navigate to="/treatment-plans/follow-up-management" replace />} />
        <Route path="/treatment-follow-ups" element={<Navigate to="/treatment-plans/follow-up-management" replace />} />
        <Route path="/follow-up-details" element={<Navigate to="/treatment-plans/follow-up-details" replace />} />
        <Route path="/treatment-plan-history" element={<Navigate to="/treatment-plans/history" replace />} />
        <Route path="/plan-version-comparison" element={<Navigate to="/treatment-plans/version-comparison" replace />} />
        <Route path="/deferred-incomplete-care" element={<Navigate to="/treatment-plans/deferred-care" replace />} />
        <Route path="/deferred-care" element={<Navigate to="/treatment-plans/deferred-care" replace />} />
        <Route path="/treatment-cost-estimate" element={<Navigate to="/treatment-plans/cost-estimate" replace />} />
        <Route path="/treatment-quotation" element={<Navigate to="/treatment-plans/cost-estimate" replace />} />
        <Route path="/treatment-payment-tracking" element={<Navigate to="/treatment-plans/payment-tracking" replace />} />
        <Route path="/treatment-payments" element={<Navigate to="/treatment-plans/payment-tracking" replace />} />
        <Route path="/procedure-catalogue" element={<Navigate to="/treatment-plans/procedure-catalogue" replace />} />
        <Route path="/procedures" element={<Navigate to="/treatment-plans/procedure-catalogue" replace />} />
        <Route path="/create-procedure" element={<Navigate to="/treatment-plans/procedure-editor" replace />} />
        <Route path="/edit-procedure" element={<Navigate to="/treatment-plans/procedure-editor" replace />} />
        <Route path="/procedure-editor" element={<Navigate to="/treatment-plans/procedure-editor" replace />} />
        <Route path="/treatment-template-library" element={<Navigate to="/treatment-plans/template-library" replace />} />
        <Route path="/treatment-templates" element={<Navigate to="/treatment-plans/template-library" replace />} />
        <Route path="/treatment-analytics-dashboard" element={<Navigate to="/treatment-plans/analytics-dashboard" replace />} />
        <Route path="/treatment-analytics" element={<Navigate to="/treatment-plans/analytics-dashboard" replace />} />

        {/* Section 14 — Dentist / Professional Workspace & Appointment Management (14.1 - 14.18) */}
        <Route path="/dentist" element={<Navigate to="/dentist/dashboard" replace />} />
        <Route path="/dentist/dashboard" element={<ProfessionalDashboardScreen />} />
        <Route path="/dentist/clinical-workspace" element={<ClinicalWorkspaceLauncherScreen />} />
        <Route path="/dentist/settings" element={<ProfessionalSettingsScreen />} />
        <Route path="/dentist/customisation" element={<DashboardCustomisationScreen />} />
        <Route path="/dentist/calendar" element={<AppointmentsCalendarScreen />} />
        <Route path="/dentist/appointments-list" element={<AppointmentsListScreen />} />
        <Route path="/dentist/appointment-details" element={<AppointmentDetailsScreen />} />
        <Route path="/dentist/patients" element={<MyPatientsScreen />} />
        <Route path="/dentist/patient-search" element={<PatientSearchSelectionScreen />} />
        <Route path="/dentist/patient-overview" element={<PatientProfessionalOverviewScreen />} />
        <Route path="/dentist/work-queue" element={<MyTasksWorkQueueScreen />} />
        <Route path="/dentist/task-details" element={<TaskDetailsAssignmentScreen />} />
        <Route path="/dentist/activity-overview" element={<ProfessionalActivityOverviewScreen />} />
        <Route path="/dentist/activity-reports" element={<PersonalActivityReportsScreen />} />
        <Route path="/dentist/notifications" element={<NotificationsCentreScreen />} />
        <Route path="/dentist/profile" element={<ProfessionalProfileScreen />} />
        <Route path="/dentist/profile/edit" element={<EditProfessionalProfileScreen />} />
        <Route path="/dentist/verification" element={<ProfessionalVerificationStatusScreen />} />
        <Route path="/dentist/schedule" element={<WorkingScheduleAvailabilityScreen />} />
        <Route path="/dentist/leave" element={<LeaveUnavailabilityManagementScreen />} />
        <Route path="/dentist/branch-switcher" element={<ClinicBranchSwitcherScreen />} />
        <Route path="/dentist/collaboration" element={<ProfessionalCollaborationWorkspaceScreen />} />
        <Route path="/dentist/second-opinions" element={<ClinicalReviewSecondOpinionScreen />} />
        <Route path="/dentist/patient-comms" element={<PatientCommunicationWorkspaceScreen />} />
        <Route path="/dentist/resources" element={<ProfessionalResourcesAnnouncementsScreen />} />
        <Route path="/dentist/help-support" element={<ProfessionalHelpSupportScreen />} />

        {/* Section 14 Top-Level Clean Aliases */}
        <Route path="/professional-dashboard" element={<Navigate to="/dentist/dashboard" replace />} />
        <Route path="/clinical-dashboard" element={<Navigate to="/dentist/dashboard" replace />} />
        <Route path="/dashboard-customisation" element={<Navigate to="/dentist/customisation" replace />} />
        <Route path="/appointments-calendar" element={<Navigate to="/dentist/calendar" replace />} />
        <Route path="/appointments-list" element={<Navigate to="/dentist/appointments-list" replace />} />
        <Route path="/appointment-details" element={<Navigate to="/dentist/appointment-details" replace />} />
        <Route path="/my-patients" element={<Navigate to="/dentist/patients" replace />} />
        <Route path="/patient-search" element={<Navigate to="/dentist/patient-search" replace />} />
        <Route path="/patient-selection" element={<Navigate to="/dentist/patient-search" replace />} />
        <Route path="/patient-professional-overview" element={<Navigate to="/dentist/patient-overview" replace />} />
        <Route path="/my-tasks" element={<Navigate to="/dentist/work-queue" replace />} />
        <Route path="/work-queue" element={<Navigate to="/dentist/work-queue" replace />} />
        <Route path="/task-details" element={<Navigate to="/dentist/task-details" replace />} />
        <Route path="/professional-activity" element={<Navigate to="/dentist/activity-overview" replace />} />
        <Route path="/activity-overview" element={<Navigate to="/dentist/activity-overview" replace />} />
        <Route path="/personal-activity-reports" element={<Navigate to="/dentist/activity-reports" replace />} />
        <Route path="/activity-reports" element={<Navigate to="/dentist/activity-reports" replace />} />
        <Route path="/notifications-centre" element={<Navigate to="/dentist/notifications" replace />} />
        <Route path="/professional-profile" element={<Navigate to="/dentist/profile" replace />} />
        <Route path="/edit-profile" element={<Navigate to="/dentist/profile/edit" replace />} />
        <Route path="/edit-professional-profile" element={<Navigate to="/dentist/profile/edit" replace />} />
        <Route path="/verification-status" element={<Navigate to="/dentist/verification" replace />} />
        <Route path="/professional-verification" element={<Navigate to="/dentist/verification" replace />} />
        <Route path="/working-schedule" element={<Navigate to="/dentist/schedule" replace />} />
        <Route path="/schedule-availability" element={<Navigate to="/dentist/schedule" replace />} />
        <Route path="/leave-management" element={<Navigate to="/dentist/leave" replace />} />
        <Route path="/leave-unavailability" element={<Navigate to="/dentist/leave" replace />} />
        <Route path="/branch-switcher" element={<Navigate to="/dentist/branch-switcher" replace />} />
        <Route path="/clinic-switcher" element={<Navigate to="/dentist/branch-switcher" replace />} />
        <Route path="/collaboration-workspace" element={<Navigate to="/dentist/collaboration" replace />} />
        <Route path="/collab-workspace" element={<Navigate to="/dentist/collaboration" replace />} />
        <Route path="/second-opinions" element={<Navigate to="/dentist/second-opinions" replace />} />
        <Route path="/clinical-review" element={<Navigate to="/dentist/second-opinions" replace />} />
        <Route path="/patient-communication" element={<Navigate to="/dentist/patient-comms" replace />} />
        <Route path="/patient-comms" element={<Navigate to="/dentist/patient-comms" replace />} />
        <Route path="/dha-resources" element={<Navigate to="/dentist/resources" replace />} />
        <Route path="/professional-resources" element={<Navigate to="/dentist/resources" replace />} />
        <Route path="/professional-support" element={<Navigate to="/dentist/help-support" replace />} />
        <Route path="/help-support" element={<Navigate to="/dentist/help-support" replace />} />

        {/* Section 15 — Organisation Registration & Clinic Onboarding (15.1 - 15.16) */}
        <Route path="/clinic-onboarding" element={<Navigate to="/clinic-onboarding/entry" replace />} />
        <Route path="/clinic-onboarding/entry" element={<OrganisationEntryScreen />} />
        <Route path="/clinic-onboarding/register" element={<ClinicAccountRegistrationScreen />} />
        <Route path="/clinic-onboarding/type-selection" element={<OrganisationTypeSelectionScreen />} />
        <Route path="/clinic-onboarding/organisation-info" element={<OrganisationInformationScreen />} />
        <Route path="/clinic-onboarding/representative-details" element={<OrganisationRepresentativeDetailsScreen />} />
        <Route path="/clinic-onboarding/registration-details" element={<OrganisationRegistrationDetailsScreen />} />
        <Route path="/clinic-onboarding/profile-services" element={<ClinicProfileServicesScreen />} />
        <Route path="/clinic-onboarding/primary-location" element={<PrimaryClinicLocationScreen />} />
        <Route path="/clinic-onboarding/operating-hours" element={<OperatingHoursScreen />} />
        <Route path="/clinic-onboarding/verification-documents" element={<VerificationDocumentUploadScreen />} />
        <Route path="/clinic-onboarding/document-review" element={<DocumentReviewScreen />} />
        <Route path="/clinic-onboarding/additional-branches" element={<AdditionalBranchRegistrationScreen />} />
        <Route path="/clinic-onboarding/branch-details" element={<BranchDetailsScreen />} />
        <Route path="/clinic-onboarding/branch-management" element={<BranchManagementScreen />} />
        <Route path="/clinic-onboarding/professional-invitation" element={<ProfessionalInvitationScreen />} />
        <Route path="/clinic-onboarding/staff-roles" element={<StaffRoleAssignmentScreen />} />
        <Route path="/clinic-onboarding/review-submit" element={<ApplicationReviewSubmitScreen />} />
        <Route path="/clinic-onboarding/confirmation" element={<RegistrationConfirmationScreen />} />
        <Route path="/clinic-onboarding/application-status" element={<ApplicationStatusScreen />} />
        <Route path="/clinic-onboarding/more-information" element={<MoreInformationRequiredScreen />} />
        <Route path="/clinic-onboarding/rejection-details" element={<VerificationRejectionDetailsScreen />} />
        <Route path="/clinic-onboarding/dashboard" element={<ClinicOnboardingDashboardScreen />} />
        <Route path="/clinic-onboarding/profile-management" element={<OrganisationProfileManagementScreen />} />
        <Route path="/clinic-onboarding/organisation-structure" element={<OrganisationStructureScreen />} />
        <Route path="/clinic-onboarding/branch-approval" element={<BranchApprovalStatusScreen />} />
        <Route path="/clinic-onboarding/staff-management" element={<StaffProfessionalManagementScreen />} />
        <Route path="/clinic-onboarding/support" element={<ClinicOnboardingSupportScreen />} />
        <Route path="/clinic-onboarding/admin-dashboard" element={<DHAClinicAdminDashboardScreen />} />
        <Route path="/clinic-onboarding/review-workspace" element={<DHAApplicationReviewWorkspaceScreen />} />
        <Route path="/clinic-onboarding/document-verification" element={<DHADocumentVerificationScreen />} />
        <Route path="/clinic-onboarding/request-information" element={<DHARequestInformationScreen />} />
        <Route path="/clinic-onboarding/application-decision" element={<DHAApplicationDecisionScreen />} />
        <Route path="/clinic-onboarding/branch-review" element={<DHABranchReviewScreen />} />
        <Route path="/clinic-onboarding/organisation-management" element={<DHAOrganisationManagementScreen />} />
        <Route path="/clinic-onboarding/dha-profile" element={<DHAOrganisationProfileScreen />} />
        <Route path="/clinic-onboarding/verification-history" element={<DHAVerificationHistoryScreen />} />
        <Route path="/clinic-onboarding/organisation-suspension" element={<DHAOrganisationSuspensionScreen />} />
        <Route path="/clinic-onboarding/change-requests" element={<DHAOrganisationChangeRequestsScreen />} />
        <Route path="/clinic-onboarding/support-management" element={<DHAOnboardingSupportManagementScreen />} />

        {/* Section 15 Top-Level Clean Aliases */}
        <Route path="/organisation-entry" element={<Navigate to="/clinic-onboarding/entry" replace />} />
        <Route path="/facility-registration" element={<Navigate to="/clinic-onboarding/entry" replace />} />
        <Route path="/clinic-registration" element={<Navigate to="/clinic-onboarding/register" replace />} />
        <Route path="/clinic-account" element={<Navigate to="/clinic-onboarding/register" replace />} />
        <Route path="/organisation-type" element={<Navigate to="/clinic-onboarding/type-selection" replace />} />
        <Route path="/organisation-info" element={<Navigate to="/clinic-onboarding/organisation-info" replace />} />
        <Route path="/representative-details" element={<Navigate to="/clinic-onboarding/representative-details" replace />} />
        <Route path="/registration-details" element={<Navigate to="/clinic-onboarding/registration-details" replace />} />
        <Route path="/clinic-services" element={<Navigate to="/clinic-onboarding/profile-services" replace />} />
        <Route path="/clinic-location" element={<Navigate to="/clinic-onboarding/primary-location" replace />} />
        <Route path="/clinic-operating-hours" element={<Navigate to="/clinic-onboarding/operating-hours" replace />} />
        <Route path="/operating-hours" element={<Navigate to="/clinic-onboarding/operating-hours" replace />} />
        <Route path="/verification-documents" element={<Navigate to="/clinic-onboarding/verification-documents" replace />} />
        <Route path="/document-review" element={<Navigate to="/clinic-onboarding/document-review" replace />} />
        <Route path="/additional-branches" element={<Navigate to="/clinic-onboarding/additional-branches" replace />} />
        <Route path="/branch-details" element={<Navigate to="/clinic-onboarding/branch-details" replace />} />
        <Route path="/branch-management" element={<Navigate to="/clinic-onboarding/branch-management" replace />} />
        <Route path="/branch-roster" element={<Navigate to="/clinic-onboarding/branch-management" replace />} />
        <Route path="/professional-invitation" element={<Navigate to="/clinic-onboarding/professional-invitation" replace />} />
        <Route path="/invite-professional" element={<Navigate to="/clinic-onboarding/professional-invitation" replace />} />
        <Route path="/staff-roles" element={<Navigate to="/clinic-onboarding/staff-roles" replace />} />
        <Route path="/staff-roster" element={<Navigate to="/clinic-onboarding/staff-roles" replace />} />
        <Route path="/review-submit" element={<Navigate to="/clinic-onboarding/review-submit" replace />} />
        <Route path="/application-review" element={<Navigate to="/clinic-onboarding/review-submit" replace />} />
        <Route path="/registration-confirmation" element={<Navigate to="/clinic-onboarding/confirmation" replace />} />
        <Route path="/application-confirmation" element={<Navigate to="/clinic-onboarding/confirmation" replace />} />
        <Route path="/application-status" element={<Navigate to="/clinic-onboarding/application-status" replace />} />
        <Route path="/clinic-application-status" element={<Navigate to="/clinic-onboarding/application-status" replace />} />
        <Route path="/more-info-required" element={<Navigate to="/clinic-onboarding/more-information" replace />} />
        <Route path="/more-information" element={<Navigate to="/clinic-onboarding/more-information" replace />} />
        <Route path="/rejection-details" element={<Navigate to="/clinic-onboarding/rejection-details" replace />} />
        <Route path="/verification-rejection" element={<Navigate to="/clinic-onboarding/rejection-details" replace />} />
        <Route path="/clinic-dashboard" element={<Navigate to="/clinic-onboarding/dashboard" replace />} />
        <Route path="/onboarding-dashboard" element={<Navigate to="/clinic-onboarding/dashboard" replace />} />
        <Route path="/organisation-profile" element={<Navigate to="/clinic-onboarding/profile-management" replace />} />
        <Route path="/profile-management" element={<Navigate to="/clinic-onboarding/profile-management" replace />} />
        <Route path="/organisation-structure" element={<Navigate to="/clinic-onboarding/organisation-structure" replace />} />
        <Route path="/corporate-structure" element={<Navigate to="/clinic-onboarding/organisation-structure" replace />} />
        <Route path="/branch-approval" element={<Navigate to="/clinic-onboarding/branch-approval" replace />} />
        <Route path="/branch-status" element={<Navigate to="/clinic-onboarding/branch-approval" replace />} />
        <Route path="/staff-management" element={<Navigate to="/clinic-onboarding/staff-management" replace />} />
        <Route path="/clinic-support" element={<Navigate to="/clinic-onboarding/support" replace />} />
        <Route path="/onboarding-support" element={<Navigate to="/clinic-onboarding/support" replace />} />
        <Route path="/admin-dashboard" element={<Navigate to="/clinic-onboarding/admin-dashboard" replace />} />
        <Route path="/dha-admin" element={<Navigate to="/clinic-onboarding/admin-dashboard" replace />} />
        <Route path="/review-workspace" element={<Navigate to="/clinic-onboarding/review-workspace" replace />} />
        <Route path="/application-review-workspace" element={<Navigate to="/clinic-onboarding/review-workspace" replace />} />
        <Route path="/document-verification" element={<Navigate to="/clinic-onboarding/document-verification" replace />} />
        <Route path="/dha-document-verification" element={<Navigate to="/clinic-onboarding/document-verification" replace />} />
        <Route path="/request-information" element={<Navigate to="/clinic-onboarding/request-information" replace />} />
        <Route path="/dha-request-information" element={<Navigate to="/clinic-onboarding/request-information" replace />} />
        <Route path="/rfi-notice" element={<Navigate to="/clinic-onboarding/request-information" replace />} />

        {/* Section 15.33 - 15.40 Aliases */}
        <Route path="/application-decision" element={<Navigate to="/clinic-onboarding/application-decision" replace />} />
        <Route path="/dha-decision" element={<Navigate to="/clinic-onboarding/application-decision" replace />} />
        <Route path="/branch-review" element={<Navigate to="/clinic-onboarding/branch-review" replace />} />
        <Route path="/dha-branch-review" element={<Navigate to="/clinic-onboarding/branch-review" replace />} />
        <Route path="/organisation-management" element={<Navigate to="/clinic-onboarding/organisation-management" replace />} />
        <Route path="/dha-orgs" element={<Navigate to="/clinic-onboarding/organisation-management" replace />} />
        <Route path="/dha-profile" element={<Navigate to="/clinic-onboarding/dha-profile" replace />} />
        <Route path="/dha-organisation-profile" element={<Navigate to="/clinic-onboarding/dha-profile" replace />} />
        <Route path="/dha-clinic-profile" element={<Navigate to="/clinic-onboarding/dha-profile" replace />} />
        <Route path="/verification-history" element={<Navigate to="/clinic-onboarding/verification-history" replace />} />
        <Route path="/dha-verification-history" element={<Navigate to="/clinic-onboarding/verification-history" replace />} />
        <Route path="/organisation-suspension" element={<Navigate to="/clinic-onboarding/organisation-suspension" replace />} />
        <Route path="/dha-suspension" element={<Navigate to="/clinic-onboarding/organisation-suspension" replace />} />
        <Route path="/change-requests" element={<Navigate to="/clinic-onboarding/change-requests" replace />} />
        <Route path="/dha-change-requests" element={<Navigate to="/clinic-onboarding/change-requests" replace />} />
        <Route path="/support-management" element={<Navigate to="/clinic-onboarding/support-management" replace />} />
        <Route path="/dha-support-management" element={<Navigate to="/clinic-onboarding/support-management" replace />} />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* Section 16 — Clinic Operations & Branch Management            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Route path="/clinic-operations/dashboard" element={<ClinicOperationsDashboardScreen />} />
        <Route path="/clinic-operations/customise" element={<OpsDashboardCustomisationScreen />} />
        <Route path="/clinic-operations/org-overview" element={<OrganisationWideOverviewScreen />} />
        <Route path="/clinic-operations/branch-overview" element={<BranchOperationsOverviewScreen />} />
        <Route path="/clinic-operations/branch-switcher" element={<BranchSwitcherScreen />} />
        <Route path="/clinic-operations/calendar" element={<AppointmentCalendarScreen />} />
        <Route path="/clinic-operations/appointment-list" element={<AppointmentListScreen />} />
        <Route path="/clinic-operations/appointment-details" element={<OpsAppointmentDetailsScreen />} />
        <Route path="/clinic-operations/create-appointment" element={<CreateEditAppointmentScreen />} />
        <Route path="/clinic-operations/walk-in-registration" element={<WalkInPatientRegistrationScreen />} />
        <Route path="/clinic-operations/walk-in-queue" element={<WalkInManagementScreen />} />
        <Route path="/clinic-operations/patient-directory" element={<PatientOperationsDirectoryScreen />} />
        <Route path="/clinic-operations/reception-desk" element={<ReceptionCheckInWorkspaceScreen />} />
        <Route path="/clinic-operations/waiting-queue" element={<WaitingRoomQueueScreen />} />
        <Route path="/clinic-operations/staff-roster" element={<StaffOperationsOverviewScreen />} />
        <Route path="/clinic-operations/shift-timetable" element={<ShiftTimetableStreamScreen />} />
        <Route path="/clinic-operations/tasks" element={<ClinicTasksAssignmentScreen />} />
        <Route path="/clinic-operations/clinical-overview" element={<ClinicalOperationsOverviewScreen />} />
        <Route path="/clinic-operations/workflow-monitoring" element={<ClinicalWorkflowMonitoringScreen />} />
        <Route path="/clinic-operations/referrals" element={<ReferralOperationsOverviewScreen />} />
        <Route path="/clinic-operations/branch-management" element={<BranchManagementOverviewScreen />} />
        <Route path="/clinic-operations/equipment-register" element={<EquipmentRegisterScreen />} />
        <Route path="/clinic-operations/clinical-activity-details" element={<ClinicalActivityDetailsScreen />} />
        <Route path="/clinic-operations/branch-operational-details" element={<BranchOperationalDetailsScreen />} />
        <Route path="/clinic-operations/equipment-details" element={<EquipmentDetailsScreen />} />
        <Route path="/clinic-operations/equipment-maintenance" element={<EquipmentMaintenanceScreen />} />
        <Route path="/clinic-operations/supplies-overview" element={<SuppliesInventoryOverviewScreen />} />
        <Route path="/clinic-operations/add-inventory-item" element={<AddEditInventoryItemScreen />} />
        <Route path="/clinic-operations/inventory-item-details" element={<InventoryItemDetailsScreen />} />
        <Route path="/clinic-operations/financial-dashboard" element={<FinancialOperationsDashboardScreen />} />
        <Route path="/clinic-operations/billing-invoices" element={<BillingInvoicesScreen />} />
        <Route path="/clinic-operations/invoice-details" element={<InvoiceDetailsScreen />} />
        <Route path="/clinic-operations/payment-recording" element={<PaymentRecordingScreen />} />
        <Route path="/clinic-operations/payment-history" element={<PaymentHistoryReceiptsScreen />} />
        <Route path="/clinic-operations/refund-adjustments" element={<RefundAdjustmentRecordsScreen />} />
        <Route path="/clinic-operations/operational-reports" element={<OperationalReportsDashboardScreen />} />
        <Route path="/clinic-operations/appointment-attendance-reports" element={<AppointmentAttendanceReportsScreen />} />
        <Route path="/clinic-operations/patient-activity-reports" element={<PatientActivityReportsScreen />} />
        <Route path="/clinic-operations/clinical-operations-reports" element={<ClinicalOperationsReportsScreen />} />
        <Route path="/clinic-operations/financial-reports" element={<FinancialReportsScreen />} />
        <Route path="/clinic-operations/branch-comparison-reports" element={<BranchComparisonReportsScreen />} />
        <Route path="/clinic-operations/notifications-centre" element={<CentralNotificationsCentreScreen />} />
        <Route path="/clinic-operations/internal-announcements" element={<InternalAnnouncementsScreen />} />
        <Route path="/clinic-operations/create-announcement" element={<CreateAnnouncementScreen />} />
        <Route path="/clinic-operations/clinic-preferences" element={<ClinicPreferencesScreen />} />
        <Route path="/clinic-operations/dashboard-settings" element={<DashboardSettingsScreen />} />

        {/* Section 17 — Staff Management & Practice Affiliations Suite */}
        <Route path="/staff-management/dashboard" element={<StaffManagementDashboardScreen />} />
        <Route path="/staff-management/directory" element={<StaffDirectoryScreen />} />
        <Route path="/staff-management/profile/:id" element={<StaffProfileDetailsScreen />} />
        <Route path="/staff-management/profile" element={<StaffProfileDetailsScreen />} />
        <Route path="/staff-management/add" element={<AddStaffWizardScreen />} />
        <Route path="/staff-management/wizard" element={<AddStaffWizardScreen />} />
        <Route path="/staff-management/invite-existing" element={<InviteExistingProfessionalScreen />} />
        <Route path="/staff-management/invite-new" element={<InviteNewStaffScreen />} />
        <Route path="/staff-management/invitation/:id" element={<InvitationDetailsStatusScreen />} />
        <Route path="/staff-management/invitation" element={<InvitationDetailsStatusScreen />} />
        <Route path="/staff-management/pending-invitations" element={<PendingInvitationsScreen />} />
        <Route path="/staff-management/role-assignment" element={<StaffRoleAssignmentScreen17 />} />
        <Route path="/staff-management/roles" element={<RolePermissionMatrixScreen />} />
        <Route path="/staff-management/roles/matrix" element={<RolePermissionMatrixScreen />} />
        <Route path="/staff-management/roles/create" element={<CreateCustomRoleScreen />} />
        <Route path="/staff-management/create-custom-role" element={<CreateCustomRoleScreen />} />
        <Route path="/staff-management/roles/edit/:id" element={<EditCustomRoleScreen />} />
        <Route path="/staff-management/roles/edit" element={<EditCustomRoleScreen />} />
        <Route path="/staff-management/edit-custom-role" element={<EditCustomRoleScreen />} />
        <Route path="/staff-management/roles/details/:id" element={<RoleDetailsAssignedStaffScreen />} />
        <Route path="/staff-management/roles/details" element={<RoleDetailsAssignedStaffScreen />} />
        <Route path="/staff-management/permissions/:id" element={<StaffPermissionDetailsScreen />} />
        <Route path="/staff-management/permissions" element={<StaffPermissionDetailsScreen />} />
        <Route path="/staff-management/branch-assignment" element={<BranchAssignmentScreen />} />
        <Route path="/staff-management/branches" element={<StaffBranchManagementScreen />} />
        <Route path="/staff-management/branch-management" element={<StaffBranchManagementScreen />} />
        <Route path="/staff-management/duties" element={<StaffResponsibilitiesDutiesScreen />} />
        <Route path="/staff-management/responsibilities" element={<StaffResponsibilitiesDutiesScreen />} />
        <Route path="/staff-management/verification" element={<ProfessionalVerificationAffiliationScreen />} />
        <Route path="/staff-management/affiliations" element={<ProfessionalVerificationAffiliationScreen />} />
        <Route path="/staff-management/status" element={<StaffStatusManagementScreen />} />
        <Route path="/staff-management/suspend" element={<SuspendDeactivateStaffScreen />} />
        <Route path="/staff-management/deactivate" element={<SuspendDeactivateStaffScreen />} />
        <Route path="/staff-management/transfer" element={<StaffTransferBranchChangesScreen />} />
        <Route path="/staff-management/employment" element={<StaffEmploymentDetailsScreen />} />
        <Route path="/staff-management/requests" element={<StaffRequestsApprovalsScreen />} />
        <Route path="/staff-management/approvals" element={<StaffRequestsApprovalsScreen />} />
        <Route path="/staff-management/activity" element={<StaffActivityAccessHistoryScreen />} />
        <Route path="/staff-management/audit" element={<StaffActivityAccessHistoryScreen />} />
        <Route path="/staff-management/history" element={<StaffActivityAccessHistoryScreen />} />
        <Route path="/staff-management/reports" element={<StaffManagementReportsScreen />} />
        <Route path="/staff-management/settings" element={<StaffManagementSettingsScreen />} />

        {/* Section 16 Top-Level Clean Aliases */}
        <Route path="/clinic-operations" element={<Navigate to="/clinic-operations/dashboard" replace />} />
        <Route path="/operations-dashboard" element={<Navigate to="/clinic-operations/dashboard" replace />} />
        <Route path="/clinic-ops" element={<Navigate to="/clinic-operations/dashboard" replace />} />
        <Route path="/operations-customise" element={<Navigate to="/clinic-operations/customise" replace />} />
        <Route path="/dashboard-customise" element={<Navigate to="/clinic-operations/customise" replace />} />
        <Route path="/operations-org-overview" element={<Navigate to="/clinic-operations/org-overview" replace />} />
        <Route path="/org-operations" element={<Navigate to="/clinic-operations/org-overview" replace />} />
        <Route path="/operations-branch-overview" element={<Navigate to="/clinic-operations/branch-overview" replace />} />
        <Route path="/branch-operations" element={<Navigate to="/clinic-operations/branch-overview" replace />} />
        <Route path="/branch-switcher" element={<Navigate to="/clinic-operations/branch-switcher" replace />} />
        <Route path="/switch-branch" element={<Navigate to="/clinic-operations/branch-switcher" replace />} />
        <Route path="/operations-calendar" element={<Navigate to="/clinic-operations/calendar" replace />} />
        <Route path="/appointment-calendar" element={<Navigate to="/clinic-operations/calendar" replace />} />
        <Route path="/appointments-list" element={<Navigate to="/clinic-operations/appointment-list" replace />} />
        <Route path="/operations-appointments" element={<Navigate to="/clinic-operations/appointment-list" replace />} />
        <Route path="/appointment-list" element={<Navigate to="/clinic-operations/appointment-list" replace />} />
        <Route path="/appointment-details" element={<Navigate to="/clinic-operations/appointment-details" replace />} />
        <Route path="/patient-intake-details" element={<Navigate to="/clinic-operations/appointment-details" replace />} />
        <Route path="/create-appointment" element={<Navigate to="/clinic-operations/create-appointment" replace />} />
        <Route path="/new-appointment" element={<Navigate to="/clinic-operations/create-appointment" replace />} />
        <Route path="/walk-in-registration" element={<Navigate to="/clinic-operations/walk-in-registration" replace />} />
        <Route path="/walk-in-intake" element={<Navigate to="/clinic-operations/walk-in-registration" replace />} />
        <Route path="/walk-in-queue" element={<Navigate to="/clinic-operations/walk-in-queue" replace />} />
        <Route path="/walk-in-management" element={<Navigate to="/clinic-operations/walk-in-queue" replace />} />
        <Route path="/patient-directory" element={<Navigate to="/clinic-operations/patient-directory" replace />} />
        <Route path="/patients-directory" element={<Navigate to="/clinic-operations/patient-directory" replace />} />
        <Route path="/reception-desk" element={<Navigate to="/clinic-operations/reception-desk" replace />} />
        <Route path="/check-in-desk" element={<Navigate to="/clinic-operations/reception-desk" replace />} />
        <Route path="/waiting-queue" element={<Navigate to="/clinic-operations/waiting-queue" replace />} />
        <Route path="/waiting-room" element={<Navigate to="/clinic-operations/waiting-queue" replace />} />
        <Route path="/staff-roster" element={<Navigate to="/clinic-operations/staff-roster" replace />} />
        <Route path="/staff-operations" element={<Navigate to="/clinic-operations/staff-roster" replace />} />
        <Route path="/shift-timetable" element={<Navigate to="/clinic-operations/shift-timetable" replace />} />
        <Route path="/shift-roster" element={<Navigate to="/clinic-operations/shift-timetable" replace />} />
        <Route path="/operatory-allocation" element={<Navigate to="/clinic-operations/shift-timetable" replace />} />
        <Route path="/clinic-tasks" element={<Navigate to="/clinic-operations/tasks" replace />} />
        <Route path="/work-orders" element={<Navigate to="/clinic-operations/tasks" replace />} />
        <Route path="/clinical-overview" element={<Navigate to="/clinic-operations/clinical-overview" replace />} />
        <Route path="/clinical-ops-overview" element={<Navigate to="/clinic-operations/clinical-overview" replace />} />
        <Route path="/workflow-monitoring" element={<Navigate to="/clinic-operations/workflow-monitoring" replace />} />
        <Route path="/patient-pipeline" element={<Navigate to="/clinic-operations/workflow-monitoring" replace />} />
        <Route path="/referral-operations" element={<Navigate to="/clinic-operations/referrals" replace />} />
        <Route path="/referrals-overview" element={<Navigate to="/clinic-operations/referrals" replace />} />
        <Route path="/branch-management" element={<Navigate to="/clinic-operations/branch-management" replace />} />
        <Route path="/facility-management" element={<Navigate to="/clinic-operations/branch-management" replace />} />
        <Route path="/equipment-register" element={<Navigate to="/clinic-operations/equipment-register" replace />} />
        <Route path="/asset-register" element={<Navigate to="/clinic-operations/equipment-register" replace />} />
        <Route path="/clinical-activity-details" element={<Navigate to="/clinic-operations/clinical-activity-details" replace />} />
        <Route path="/activity-details" element={<Navigate to="/clinic-operations/clinical-activity-details" replace />} />
        <Route path="/branch-operational-details" element={<Navigate to="/clinic-operations/branch-operational-details" replace />} />
        <Route path="/branch-details" element={<Navigate to="/clinic-operations/branch-operational-details" replace />} />
        <Route path="/equipment-details" element={<Navigate to="/clinic-operations/equipment-details" replace />} />
        <Route path="/equipment-maintenance" element={<Navigate to="/clinic-operations/equipment-maintenance" replace />} />
        <Route path="/maintenance-management" element={<Navigate to="/clinic-operations/equipment-maintenance" replace />} />
        <Route path="/supplies-overview" element={<Navigate to="/clinic-operations/supplies-overview" replace />} />
        <Route path="/supplies-inventory" element={<Navigate to="/clinic-operations/supplies-overview" replace />} />
        <Route path="/add-inventory-item" element={<Navigate to="/clinic-operations/add-inventory-item" replace />} />
        <Route path="/new-inventory-item" element={<Navigate to="/clinic-operations/add-inventory-item" replace />} />
        <Route path="/inventory-item-details" element={<Navigate to="/clinic-operations/inventory-item-details" replace />} />
        <Route path="/item-details" element={<Navigate to="/clinic-operations/inventory-item-details" replace />} />
        <Route path="/financial-dashboard" element={<Navigate to="/clinic-operations/financial-dashboard" replace />} />
        <Route path="/financial-operations" element={<Navigate to="/clinic-operations/financial-dashboard" replace />} />
        <Route path="/billing-invoices" element={<Navigate to="/clinic-operations/billing-invoices" replace />} />
        <Route path="/invoices" element={<Navigate to="/clinic-operations/billing-invoices" replace />} />
        <Route path="/invoice-details" element={<Navigate to="/clinic-operations/invoice-details" replace />} />
        <Route path="/payment-recording" element={<Navigate to="/clinic-operations/payment-recording" replace />} />
        <Route path="/record-payment" element={<Navigate to="/clinic-operations/payment-recording" replace />} />
        <Route path="/payment-history" element={<Navigate to="/clinic-operations/payment-history" replace />} />
        <Route path="/receipts" element={<Navigate to="/clinic-operations/payment-history" replace />} />
        <Route path="/refund-adjustments" element={<Navigate to="/clinic-operations/refund-adjustments" replace />} />
        <Route path="/refunds" element={<Navigate to="/clinic-operations/refund-adjustments" replace />} />
        <Route path="/operational-reports" element={<Navigate to="/clinic-operations/operational-reports" replace />} />
        <Route path="/operations-reports" element={<Navigate to="/clinic-operations/operational-reports" replace />} />
        <Route path="/appointment-attendance-reports" element={<Navigate to="/clinic-operations/appointment-attendance-reports" replace />} />
        <Route path="/attendance-reports" element={<Navigate to="/clinic-operations/appointment-attendance-reports" replace />} />
        <Route path="/patient-activity-reports" element={<Navigate to="/clinic-operations/patient-activity-reports" replace />} />
        <Route path="/activity-reports" element={<Navigate to="/clinic-operations/patient-activity-reports" replace />} />
        <Route path="/clinical-operations-reports" element={<Navigate to="/clinic-operations/clinical-operations-reports" replace />} />
        <Route path="/clinical-reports" element={<Navigate to="/clinic-operations/clinical-operations-reports" replace />} />
        <Route path="/financial-reports" element={<Navigate to="/clinic-operations/financial-reports" replace />} />
        <Route path="/branch-comparison-reports" element={<Navigate to="/clinic-operations/branch-comparison-reports" replace />} />
        <Route path="/branch-comparison" element={<Navigate to="/clinic-operations/branch-comparison-reports" replace />} />
        <Route path="/central-notifications-centre" element={<Navigate to="/clinic-operations/notifications-centre" replace />} />
        <Route path="/notifications-centre" element={<Navigate to="/clinic-operations/notifications-centre" replace />} />
        <Route path="/clinic-notifications" element={<Navigate to="/clinic-operations/notifications-centre" replace />} />
        <Route path="/internal-announcements" element={<Navigate to="/clinic-operations/internal-announcements" replace />} />
        <Route path="/staff-bulletin" element={<Navigate to="/clinic-operations/internal-announcements" replace />} />
        <Route path="/staff-notices" element={<Navigate to="/clinic-operations/internal-announcements" replace />} />
        <Route path="/create-announcement" element={<Navigate to="/clinic-operations/create-announcement" replace />} />
        <Route path="/broadcast-announcement" element={<Navigate to="/clinic-operations/create-announcement" replace />} />
        <Route path="/clinic-preferences" element={<Navigate to="/clinic-operations/clinic-preferences" replace />} />
        <Route path="/operations-preferences" element={<Navigate to="/clinic-operations/clinic-preferences" replace />} />
        <Route path="/dashboard-settings" element={<Navigate to="/clinic-operations/dashboard-settings" replace />} />
        <Route path="/operations-dashboard-settings" element={<Navigate to="/clinic-operations/dashboard-settings" replace />} />

        {/* Section 17 Top-Level Clean Aliases */}
        <Route path="/staff-management" element={<Navigate to="/staff-management/dashboard" replace />} />
        <Route path="/staff-dashboard" element={<Navigate to="/staff-management/dashboard" replace />} />
        <Route path="/staff-directory" element={<Navigate to="/staff-management/directory" replace />} />
        <Route path="/staff-profile" element={<Navigate to="/staff-management/profile" replace />} />
        <Route path="/add-staff" element={<Navigate to="/staff-management/add" replace />} />
        <Route path="/invite-staff" element={<Navigate to="/staff-management/add" replace />} />
        <Route path="/invite-professional" element={<Navigate to="/staff-management/invite-existing" replace />} />
        <Route path="/invite-new-staff" element={<Navigate to="/staff-management/invite-new" replace />} />
        <Route path="/pending-invitations" element={<Navigate to="/staff-management/pending-invitations" replace />} />
        <Route path="/invitation-details" element={<Navigate to="/staff-management/invitation" replace />} />
        <Route path="/role-assignment" element={<Navigate to="/staff-management/role-assignment" replace />} />
        <Route path="/role-matrix" element={<Navigate to="/staff-management/roles" replace />} />
        <Route path="/roles-permissions" element={<Navigate to="/staff-management/roles" replace />} />
        <Route path="/create-role" element={<Navigate to="/staff-management/create-custom-role" replace />} />
        <Route path="/edit-role" element={<Navigate to="/staff-management/edit-custom-role" replace />} />
        <Route path="/role-details" element={<Navigate to="/staff-management/roles/details" replace />} />
        <Route path="/staff-permissions" element={<Navigate to="/staff-management/permissions" replace />} />
        <Route path="/branch-assignment" element={<Navigate to="/staff-management/branch-assignment" replace />} />
        <Route path="/staff-branches" element={<Navigate to="/staff-management/branches" replace />} />
        <Route path="/staff-duties" element={<Navigate to="/staff-management/duties" replace />} />
        <Route path="/staff-responsibilities" element={<Navigate to="/staff-management/responsibilities" replace />} />
        <Route path="/staff-verification" element={<Navigate to="/staff-management/verification" replace />} />
        <Route path="/staff-affiliations" element={<Navigate to="/staff-management/affiliations" replace />} />
        <Route path="/staff-status" element={<Navigate to="/staff-management/status" replace />} />
        <Route path="/suspend-staff" element={<Navigate to="/staff-management/suspend" replace />} />
        <Route path="/deactivate-staff" element={<Navigate to="/staff-management/deactivate" replace />} />
        <Route path="/staff-transfer" element={<Navigate to="/staff-management/transfer" replace />} />
        <Route path="/employment-details" element={<Navigate to="/staff-management/employment" replace />} />
        <Route path="/staff-requests" element={<Navigate to="/staff-management/requests" replace />} />
        <Route path="/staff-approvals" element={<Navigate to="/staff-management/approvals" replace />} />
        <Route path="/staff-activity" element={<Navigate to="/staff-management/activity" replace />} />
        <Route path="/staff-audit" element={<Navigate to="/staff-management/audit" replace />} />
        <Route path="/staff-reports" element={<Navigate to="/staff-management/reports" replace />} />
        <Route path="/staff-settings" element={<Navigate to="/staff-management/settings" replace />} />

        {/* Backward Compatibility: Redirect /dashboard to /patient-dashboard */}
        <Route path="/dashboard" element={<Navigate to="/patient-dashboard" replace />} />
        <Route path="/dashboard/notifications" element={<Navigate to="/patient-dashboard/notifications" replace />} />
        <Route path="/dashboard/oral-health" element={<Navigate to="/patient-dashboard/oral-health" replace />} />
        <Route path="/dashboard/quick-actions" element={<Navigate to="/patient-dashboard/quick-actions" replace />} />
        <Route path="/dashboard/first-time" element={<Navigate to="/patient-dashboard/first-time" replace />} />
        <Route path="/dashboard/guardian" element={<Navigate to="/patient-dashboard/guardian" replace />} />
        <Route path="/dashboard/records/*" element={<Navigate to="/patient-dashboard/records/timeline" replace />} />
        <Route path="/dashboard/reminders/*" element={<Navigate to="/patient-dashboard/reminders" replace />} />
        <Route path="/dashboard/discovery/*" element={<Navigate to="/patient-dashboard/discovery" replace />} />
        <Route path="/dashboard/education/*" element={<Navigate to="/patient-dashboard/education" replace />} />
        <Route path="/dashboard/*" element={<Navigate to="/patient-dashboard" replace />} />

        {/* Clean top-level aliases */}
        <Route path="/notifications" element={<Navigate to="/patient-dashboard/notifications" replace />} />
        <Route path="/oral-health" element={<Navigate to="/patient-dashboard/oral-health" replace />} />
        <Route path="/quick-actions" element={<Navigate to="/patient-dashboard/quick-actions" replace />} />
        <Route path="/first-time" element={<Navigate to="/patient-dashboard/first-time" replace />} />
        <Route path="/guardian" element={<Navigate to="/patient-dashboard/guardian" replace />} />
        <Route path="/records" element={<Navigate to="/patient-dashboard/records/timeline" replace />} />
        <Route path="/records/timeline" element={<Navigate to="/patient-dashboard/records/timeline" replace />} />
        <Route path="/records/screenings" element={<Navigate to="/patient-dashboard/records/screenings" replace />} />
        <Route path="/records/examinations" element={<Navigate to="/patient-dashboard/records/examinations" replace />} />
        <Route path="/records/clinical-summary" element={<Navigate to="/patient-dashboard/records/clinical-summary" replace />} />
        <Route path="/records/investigations" element={<Navigate to="/patient-dashboard/records/investigations" replace />} />
        <Route path="/records/treatments" element={<Navigate to="/patient-dashboard/records/treatments" replace />} />
        <Route path="/treatments" element={<Navigate to="/patient-dashboard/records/treatments" replace />} />
        <Route path="/reminders" element={<Navigate to="/patient-dashboard/reminders" replace />} />
        <Route path="/reminders/appointments" element={<Navigate to="/patient-dashboard/reminders/appointments" replace />} />
        <Route path="/reminders/daily-care" element={<Navigate to="/patient-dashboard/reminders/daily-care" replace />} />
        <Route path="/reminders/checkups" element={<Navigate to="/patient-dashboard/reminders/checkups" replace />} />
        <Route path="/reminders/treatments" element={<Navigate to="/patient-dashboard/reminders/treatments" replace />} />
        <Route path="/reminders/details" element={<Navigate to="/patient-dashboard/reminders/details" replace />} />
        <Route path="/appointments" element={<Navigate to="/patient-dashboard/reminders/appointments" replace />} />

        {/* Section 5 Discovery Aliases */}
        <Route path="/discovery" element={<Navigate to="/patient-dashboard/discovery" replace />} />
        <Route path="/discovery/results" element={<Navigate to="/patient-dashboard/discovery/results" replace />} />
        <Route path="/discovery/map" element={<Navigate to="/patient-dashboard/discovery/map" replace />} />
        <Route path="/discovery/dentist" element={<Navigate to="/patient-dashboard/discovery/dentist" replace />} />
        <Route path="/discovery/clinic" element={<Navigate to="/patient-dashboard/discovery/clinic" replace />} />
        <Route path="/discovery/services" element={<Navigate to="/patient-dashboard/discovery/services" replace />} />
        <Route path="/clinics" element={<Navigate to="/patient-dashboard/discovery" replace />} />
        <Route path="/dentists" element={<Navigate to="/patient-dashboard/discovery" replace />} />
        <Route path="/dentist" element={<Navigate to="/patient-dashboard/discovery/dentist" replace />} />
        <Route path="/clinic" element={<Navigate to="/patient-dashboard/discovery/clinic" replace />} />
        <Route path="/map" element={<Navigate to="/patient-dashboard/discovery/map" replace />} />
        <Route path="/specialities" element={<Navigate to="/patient-dashboard/discovery/services" replace />} />
        <Route path="/services" element={<Navigate to="/patient-dashboard/discovery/services" replace />} />

        {/* Section 6 Education Aliases */}
        <Route path="/education" element={<Navigate to="/patient-dashboard/education" replace />} />
        <Route path="/education/topics" element={<Navigate to="/patient-dashboard/education/topics" replace />} />
        <Route path="/education/videos" element={<Navigate to="/patient-dashboard/education/videos" replace />} />
        <Route path="/education/daily-care" element={<Navigate to="/patient-dashboard/education/daily-care" replace />} />
        <Route path="/education/kids" element={<Navigate to="/patient-dashboard/education/kids" replace />} />
        <Route path="/education/saved" element={<Navigate to="/patient-dashboard/education/saved" replace />} />
        <Route path="/videos" element={<Navigate to="/patient-dashboard/education/videos" replace />} />
        <Route path="/daily-care" element={<Navigate to="/patient-dashboard/education/daily-care" replace />} />
        <Route path="/kids" element={<Navigate to="/patient-dashboard/education/kids" replace />} />
        <Route path="/topics" element={<Navigate to="/patient-dashboard/education/topics" replace />} />

        <Route
          path="*"
          element={
            <PlaceholderScreen
              title="Page not found"
              description="This screen does not exist yet in the DHA patient app."
            />
          }
        />
      </Routes>
    </>
  );
}
