# **Complete Frontend Specification Structure**

## **Part A — Public and Patient Platform**

Patient-facing experience

| No. | Section | What we will specify |
| ----- | ----- | ----- |
| 1 | Patient Registration & Profile | Welcome, registration, login, verification, guardian registration, personal profile, general health profile and patient ID/Lifecode. |
| 2 | Patient Dashboard & Navigation | Home dashboard, navigation, oral-health overview, quick actions, notifications and first-time user experience. |
| 3 | Patient Records & Oral Health History | Screening history, dental examination records, clinical summaries, investigations, treatment history, documents and chronological timeline. |
| 4 | Patient Reminders & Engagement | Brushing reminders, six-month dental check-up reminders, pending-treatment reminders, appointments and notifications. |
| 5 | Dentist & Clinic Discovery | Search dentists and clinics, location filters, professional profiles, clinic profiles, invitations and provider discovery. |
| 6 | Patient Education & Children's Experience | Oral-health education, articles, videos, brushing guidance, children's educational games, rewards and engagement activities. |
| 7 | Patient Record Sharing & Referrals | Sharing authorisation, referral notifications, referral details, receiving-provider information and referral status tracking. |

## **Part B — Screening and Clinical Platform**

Clinical experience

| No. | Section | What we will specify |
| ----- | ----- | ----- |
| 8 | Quick Screening Interface | Patient selection, screening type, presenting complaint, screening findings, basic odontogram, notes and submission. |
| 9 | Odontogram & Tooth Findings | Adult/deciduous/mixed dentition, tooth selection, tooth numbering systems, surfaces, findings, periodontal information and automatic summary updates. |
| 10 | Detailed Clinical Examination | Medical and dental history, clinical examination, dentition information, TMJ, soft tissues, bony findings and additional clinical notes. |
| 11 | Investigations & Clinical Documents | X-rays, OPG, CBCT, blood tests, image uploads, investigation results, tooth-specific attachments and document management. |
| 12 | Clinical Summary & AI Assistance | Consolidated findings, clinical summary, patient-friendly visual summary, AI-assisted findings and proposed treatment suggestions requiring clinician approval. |
| 13 | Treatment Planning & Follow-up | Proposed treatment, treatment approval, pending treatment, completed treatment, treatment history, follow-up and patient reminders. |

## **Part C — Professional and Clinic Platform**

Provider-facing experience

| No. | Section | What we will specify |
| ----- | ----- | ----- |
| 14 | Dentist & Professional Dashboard | Professional registration, folio number, verification status, patient search, appointments, assigned patients, clinical workspace and professional profile. |
| 15 | Clinic Registration & Onboarding | Clinic registration, clinic information, locations, owner profile, verification, subscription status and activation. |
| 16 | Clinic Dashboard & Operations | Overview, patients, appointments, screenings, clinical records, staff, referrals, reports and clinic settings. |
| 17 | Clinic Staff & Role Management | Staff invitations, receptionists, nurses, dentists, role assignments, permissions and staff access status. |

## **Part D — Screening Programmes and Platform Administration**

Operations and administration

| No. | Section | What we will specify |
| ----- | ----- | ----- |
| 18 | School & Community Screening Management | Screening programmes, schools, communities, assigned screeners, patient registration, quick screening and programme reports. |
| 19 | Screener Dashboard & Interface | Screener login, assigned locations, patient search, new screening, screening history and submission status. |
| 20 | Referral Management Workspace | Referrals received and sent, provider selection, urgency, appointment status, follow-up and referral outcomes. |
| 21 | DHA Super Admin Dashboard | Platform overview, patient management, professional verification, clinic management, screening programmes, platform configuration and administrative monitoring. |
| 22 | Verification & Compliance Interface | Professional folio verification, clinic verification, identity checks, consent records, access logs and audit trail. |

## **Part E — Shared Interface and System-Wide Experiences**

| No. | Section | What we will specify |
| ----- | ----- | ----- |
| 23 | Notifications & Communication | In-app notifications, reminders, email/SMS interface states and communication preferences. |
| 24 | Account Settings & Security | Personal settings, password management, profile updates, privacy settings, consent management and account status. |
| 25 | Shared Design System & Reusable Components | Colours, typography, buttons, form controls, tables, cards, modals, alerts, navigation, icons and responsive layouts. |
| 26 | Global UI States & Error Handling | Loading, empty states, success messages, validation errors, unavailable screens, access-denied screens and confirmation dialogs. |

## **How we will work through these sections**

Each section will have its own functional specification containing:

1. Purpose of the screen.  
2. Who uses it.  
3. Screen layout and components.  
4. Fields and input types.  
5. Buttons and actions.  
6. Dropdowns and selection options.  
7. Validation rules.  
8. Statuses and possible UI states.  
9. Navigation and interactions.  
10. Responsive behaviour for mobile, tablet and desktop.

For the odontogram, we will go considerably deeper because it is the central clinical interface.

Frontend-only rule: All screens will initially use sample data and simulated interactions. We will not introduce backend development or real integrations at this stage.

## **Recommended order of development**

Although the list is organised by product area, I recommend that we design the product in this order:

1. Patient platform (Sections 1–7).  
2. Quick screening and clinical workspace (Sections 8–13).  
3. Professional and clinic platform (Sections 14–17).  
4. Screening programmes and administration (Sections 18–22).  
5. Shared components and system-wide experiences (Sections 23–26).

This gives us a coherent patient experience first, followed by the clinical tools that make the platform valuable to dentists.

One important distinction: The 26 sections are our complete planning structure, not 26 separate applications. They should share consistent navigation, design components and user experiences, with different interfaces depending on the account type and access level.

We can use this list as our master checklist and mark each section as specified, reviewed, designed in Stitch and implemented on the frontend.

