**DHA PRODUCT BLUEPRINT**

**Patient-centred oral health • Connected screening • Restricted clinical workspace**

 

| DOCUMENT STATUS  Working product reference for DHA and Dr Jay to review and agree. Consolidates the initial implementation checklist, Dr Jay's written feedback, the One Stop Dental Ecosystem Developer Guide and supplied interface illustrations. It is not a final clinical protocol or regulatory approval. |
| :---- |

 

| DOCUMENT CONTROL  Once jointly accepted, Version 2.0 becomes the current working product specification. The earlier Implementation Checklist remains an archived record of the initial proposal and should not be used as the day-to-day requirements document after acceptance. |
| :---- |

 

# **Document control**

| Item | Description |
| :---- | :---- |
| Product | DHA |
| Document | Product Blueprint and Consolidated Requirements |
| Version | 2.0 |
| Prepared by | DHA |
| Clinical input | Dr Jay — written feedback supplied for product planning |
| Status | Draft for joint review and confirmation |
| Working-reference relationship | Proposed replacement for the earlier Implementation Checklist |
| Source materials | Initial checklist; Dr Jay feedback note; One Stop Dental Ecosystem Developer Guide v1.0; four supplied interface illustrations |

 

 

# 

# **1\. Product vision and purpose**

DHA is a patient-centred oral-health platform that helps people create, maintain and access a continuing oral-health record. It connects public-facing patient services and basic screening with a restricted clinical workspace used by participating, authorised dental professionals and clinics.

The product should support a person's journey from profile creation and community screening through detailed clinical examination, treatment, referral and follow-up. Patients should receive value even if their usual dentist or clinic has not yet joined.

| Core product principle  One patient identity. One connected longitudinal record. Different access levels for patients, screeners, clinicians and clinics. Clinical information retains its source, author, date and change history. |
| :---- |

 

## **1.1 Product objectives**

·         Give the public a simple way to maintain a personal oral-health profile and access information they are authorised to see.

·         Enable quick oral-health screening in appropriate community, school, PHC and clinic settings.

·         Allow participating clinics and authorised clinicians to complete detailed examinations and maintain clinical records.

·         Reduce repeated data entry by transferring relevant profile and screening information into the clinical workspace with source/date information.

·         Support treatment planning, completed-treatment history, referrals and follow-up.

·         Provide patient-friendly summaries and visual explanations based on clinician-reviewed information.

·         Support prevention and engagement through oral-health education and reminders.

·         Create a foundation for future provider discovery, telehealth and wider connected-care services.

# 

# **2\. Product architecture and connected experiences**

The product has two connected platform experiences. They share patient identity and linked records, but have different permissions and available functions.

| Experience | Primary users | Main capabilities |
| :---- | :---- | :---- |
| Public platform | Patients/public users; approved screening users in permitted contexts | Patient profile; general health profile; patient ID; quick screening; approved patient summaries; education and reminders. |
| Private clinical EHR | Verified and authorised clinicians and staff of eligible onboarded clinics | Detailed examination; odontogram; clinical history; investigations; diagnosis; treatment plans; completed treatment; referrals; follow-up; clinical audit history. |

 

A patient may have a profile before a clinic participates. Clinic participation enables the relevant private clinical workflow for authorised users; it does not create a separate patient identity or disconnected record.

## **2.1 Four-stage care flow**

| Stage | Experience | What happens | Result |
| :---- | :---- | :---- | :---- |
| 1\. Patient profile | Public platform | Patient creates or updates a reusable profile. | Patient identity/profile available for later visits. |
| 2\. Quick screening | Public platform / approved setting | Short screening captures complaint/reason, basic findings, date, location and screener. | Structured screening record linked to patient. |
| 3\. Detailed examination | Private EHR | Authorised clinician reviews available information, completes history/examination, investigations, clinical conclusions and plan. | Clinician-authored encounter added to longitudinal record. |
| 4\. Referral and follow-up | Private EHR | Clinic records referral, receiving provider, urgency, appointment status and outcome. | Continuity of care and outstanding actions tracked. |

 

A basic screening may proceed directly to the examination interface where appropriate; the workflow should not force unnecessary steps.

# 

# **3\. Account types, roles and onboarding**

## **3.1 Patient / public user**

·         Register and maintain a personal profile and unique patient ID.

·         Maintain patient-reported general health information and oral-health information.

·         Access permitted screening records and clinician-approved patient summaries.

·         Participate in quick screening where the setting and process allow.

·         Receive oral-health education and configured reminders.

·         In later phases, discover dentists and clinics, invite providers and access additional services.

## **3.2 Individual dentist / healthcare professional**

·         Create an individual professional profile with identity and professional details.

·         Provide relevant professional folio number and other required information.

·         Complete professional verification.

·         Be affiliated with one or more participating organisations where applicable.

·         Receive clinical permissions only after verification and appropriate clinic/platform authorisation.

·         Access only records and functions permitted by role, clinic relationship and patient-sharing rules.

A professional profile alone must not grant access to every patient record or unrestricted clinical editing.

## **3.3 Organisation / clinic**

·         Register an eligible dental clinic, practice, hospital, NGO or other approved organisation.

·         Provide organisation name/type, address, location, contact details and relevant registration information.

·         Create or maintain a public organisation profile where applicable.

·         Associate verified professionals and authorised staff with the organisation.

·         Assign staff roles and permissions according to responsibilities.

·         Use the private clinical workspace only after completing the agreed onboarding and approval process.

## 

## **3.4 Operational roles**

| Role | Proposed permitted responsibilities | Restrictions / notes |
| :---- | :---- | :---- |
| Community / school screener | Quick-screening records in an approved programme; minimum necessary patient information. | No unrestricted detailed EHR access; no diagnosis or treatment approval. |
| Receptionist / admin staff | Patient check-in, appointment administration and permitted non-clinical tasks. | No unrestricted clinical notes or clinical editing. |
| Clinic owner / administrator | Clinic setup, staff affiliation, operational oversight and permitted clinic reporting. | Clinical actions remain restricted to authorised professionals. |
| Dentist / clinician | Detailed history, examination, investigations, diagnosis, treatment, referral within approved scope. | Subject to verification, clinic authorisation, patient access rules and self-record restriction. |
| DHA super admin | Platform administration, clinic onboarding, account support and verification administration. | Platform administration does not imply routine unrestricted access to clinical content. |

 

| Open decision  Confirm the complete role catalogue, exact permissions and whether additional roles such as dental therapist, nurse or specialist are required. |
| :---- |

 

# **4\. Patient identity, profile and general health history**

## **4.1 Patient identity and Health ID**

·         Assign a unique patient identifier to each patient identity.

·         Allow the ID to be displayed, saved or printed; QR and human-readable forms may be considered.

·         Use the identifier to locate a patient, not as a password or automatic access token.

·         Require appropriate identity confirmation and permission before opening sensitive records.

·         Provide safe processes for lost IDs, mistaken identity, duplicate profiles and identity correction.

·         Consider assisted or printed-card access for people without smartphones or reliable internet.

## **4.2 Patient profile**

·         Collect the minimum identity and contact information needed for safe patient matching.

·         Capture date of birth and other demographic details where justified.

·         Support parent/guardian details and appropriate consent/assent for children.

·         Capture relevant preferences and consent settings.

·         Link the profile to screening and clinical history; avoid repeated data entry.

## **4.3 Reusable general health profile**

Dr Jay proposed a reusable general-health section within normal dental history. It should appear to an authorised clinician when opening the patient's interface and show when the information was last updated.

| Category | Proposed information | Handling requirement |
| :---- | :---- | :---- |
| Existing conditions | Diabetes, hypertension, asthma, sickle cell disease and other relevant conditions. | Allow patient report; clinician can review and document relevant history. |
| Current medications | Current medicines and relevant details. | Show source and last-updated date; allow updates. |
| Allergies | Known allergies and reactions to medicines. | Make clinically relevant information easy to notice; retain source/date. |
| Health habits | Tobacco, alcohol, sugary drinks and oral-hygiene habits. | Clear, non-judgmental questions; allow updates. |
| Measurements | Blood pressure and weight, where available and appropriate. | Record value, unit, date, source and whether measured or patient-reported. |
| Immunisation | Particularly for children, where relevant and documented. | Optional and subject to clinical agreement. |
| Blood group | Where relevant and documented. | Do not infer; distinguish documented information from unverified report. |

 

| Data integrity  Patient edits to reported profile information must not silently rewrite historical clinical observations. Distinguish patient-reported, measured and professionally verified information. |
| :---- |

 

Open clinical decisions: exact fields, mandatory/optional status, units, validation ranges, who may enter or verify each item, and age-specific relevance.

# **5\. Quick screening**

Quick screening is a short, structured process for community, school, PHC or clinic screening. It captures the presenting complaint or reason for screening and basic oral-health findings. Dr Jay noted that a basic screening may proceed directly to examination and findings without lengthy history-taking.

## **5.1 Screening information**

·         Patient identity or safe process to create/resolve a patient identity.

·         Presenting a complaint/reason (for example check-up, toothache, bleeding gums, swelling or other).

·         Screening type and date.

·         Screening location and setting.

·         Screener identity and role.

·         Basic oral-health findings, optional notes and optional photographs where appropriate.

·         Consent/assent and guardian handling where required.

## **5.2 Screening access and output**

The quick-screening interface should be available only to approved users and settings, even though it belongs to the public-facing platform. Submission creates a linked screening record. Relevant data automatically populates the detailed examination when an authorised clinician opens it, with source and date visible.

Quick screening must not be represented as a full diagnosis or detailed clinical examination. Patient summaries must reflect the limited scope of screening.

## **5.3 No duplicate entry**

·         Do not create a second patient profile simply because a patient attends another screening or clinic.

·         Show imported profile/screening data with source and date.

·         Allow the clinician to review and confirm or correct imported information.

·         Preserve original screening entries and later corrections in the audit trail.

# **6\. Detailed examination — private EHR**

The detailed examination is the principal clinical workspace for an authorised clinician at an onboarded clinic. It should be pre-populated with relevant patient profile and screening information, while showing the source and date of imported information.

## **6.1 Examination context**

·         Patient identity and patient ID.

·         Examination date and clinic/location.

·         Responsible clinician and clinic context.

·         Dentition selection: permanent/adult, deciduous or mixed.

·         Tooth-numbering display preference: FDI/ISO two-digit, Palmer or Universal.

·         Presenting complaint and relevant medical, dental, social and risk-factor history.

## **6.2 Interactive odontogram**

The odontogram is a central clinical interaction. Selecting a tooth opens a panel/form for findings associated with that tooth and, where relevant, surrounding periodontal tissues.

·         Support permanent/adult, deciduous and mixed dentition.

·         Support FDI/ISO two-digit, Palmer and Universal numbering systems.

·         Allow a clinic or clinician to select a display preference; exact configuration level remains open.

·         Support multiple findings per tooth.

·         Support tooth surfaces, status, severity, notes and attachments where relevant.

·         Allow findings to be associated with an individual tooth, surface, quadrant, arch or whole mouth.

·         Update the chart, findings list and summary when a finding is saved.

·         Store a canonical system-independent tooth identity; convert to selected notation for display and reports.

·         Preserve source notation for imported findings and request confirmation where mapping is uncertain.

## **6.3 Findings categories and location**

| Category | Examples from supplied materials | Possible location |
| :---- | :---- | :---- |
| Caries / restorations | Caries by surface; existing filling/restoration; crowned tooth. | Tooth and surface. |
| Missing / structural | Extracted/missing tooth; retained root; implant; fracture; supernumerary tooth. | Tooth or region. |
| Periodontal / soft tissue | Gingivitis; periodontitis; recession; calculus; mobility; pocketing; rotation; frenulum issue. | Tooth, region or whole mouth as appropriate. |
| Other tooth findings | Abscess; tooth wear/abrasion; eruption delay; other specified finding. | Tooth or region. |
| General dentition | Spacing/crowding; generalised gingivitis/calculus; attrition; bruxism signs. | Arch or whole mouth. |
| Other oral findings | TMJ, other soft-tissue and bony findings. | Joint, tissue, bone, region or whole mouth. |

 

## **6.4 TMJ, soft tissue and bony findings**

Add a dedicated area for temporomandibular joint (TMJ) findings. Also provide an optional area for other soft-tissue and bony findings, including a short note. These findings should not be forced into tooth-specific fields when they do not relate to an individual tooth.

## **6.5 Investigations**

Investigations may be linked to the selected tooth or recorded at a wider anatomical level where appropriate. Support imaging, chairside tests and laboratory investigations.

·         Periapical X-ray, bitewing X-ray, OPG and CBCT.

·         Other imaging, tests or laboratory investigations as approved.

·         Investigation date and status.

·         Result, attachment and clinician interpretation.

·         Tooth/region association where relevant.

·         Keep investigation results separate from the clinician's diagnosis.

## **6.6 Clinical conclusion**

Keep these concepts distinct in the data model and interface:

·         Presenting complaint — what the patient reports.

·         Observed signs/findings — what the screener or clinician records.

·         Investigation results — what imaging or tests show.

·         Diagnosis/clinical conclusion — what the authorised clinician determines.

·         Proposed treatment — what is recommended or planned.

·         Treatment completed — what was actually carried out.

# **7\. Clinical summary and AI assistance**

## **7.1 Structured clinical summary**

After submission, generate a structured summary of recorded findings, linked to relevant teeth, regions, investigations and clinical entries.

## **7.2 AI-assisted summary and treatment-plan draft**

·         AI may organise existing structured findings into a draft summary.

·         AI may prepare a draft patient-friendly explanation.

·         AI may suggest possible treatment-plan options based on recorded information.

·         AI must not invent findings, diagnoses, tooth anatomy, investigation results or treatment history.

·         AI output remains clearly labelled as a draft until reviewed and approved by an authorised clinician.

·         The clinician remains responsible for the final diagnosis and treatment decision.

·         Retain the approved version and relevant review/approval history.

| Clinical safety boundary  AI is decision-support and documentation assistance. It does not replace clinical judgement, independent examination or clinician approval. |
| :---- |

 

## **7.3 Patient and clinician views**

| Patient-friendly view | Clinician view |
| :---- | :---- |
| Plain-language explanation of approved findings. | Detailed findings with tooth numbers, surfaces, severity and location. |
| Visual oral-health chart based on approved data. | Interactive odontogram and complete clinical record. |
| Relevant completed and outstanding treatment information. | Investigation results, diagnosis, proposed plan and treatment status. |
| Approved education and next steps. | Clinical history, source records, attachments and audit history. |

 

Visual summaries must be generated from structured, clinician-reviewed data. They are explanatory aids, not replacements for the full clinical record or radiographs.

# **8\. Treatment planning, treatment history and reminders**

## **8.1 Treatment plan and completion**

The system must distinguish proposed treatment from procedures actually completed. It should support multiple visits, partial completion and changes over time.

| Status | Meaning |
| :---- | :---- |
| Proposed | Possible treatment documented; not yet approved as the active plan. |
| Approved / planned | Clinician has approved the plan or item. |
| Pending | Treatment remains outstanding. |
| Partially completed | Some planned work is complete; remaining work is outstanding. |
| Completed | Procedure was carried out and documented. |
| Cancelled / no longer required | Item withdrawn or no longer considered necessary; retain reason/history. |

 

Each treatment item should retain relevant tooth/location, procedure, status, date, responsible clinician and linked encounter. Updates append to history rather than erase prior treatment events.

## **8.2 Follow-up and reminders**

·         Allow clinics to set follow-up dates for pending treatment.

·         Support patient reminders at intervals selected by the clinic and appropriate to the care plan.

·         Dr Jay suggested two-week or monthly reminders as examples, not universal defaults.

·         Allow the clinic to update, pause or close a reminder when treatment status changes.

·         Provide general preventive reminders, including twice-daily brushing and routine dental visits approximately every six months, with intervals adjustable to clinical advice.

·         Reminders are informational and do not replace clinical advice or urgent care.

# **9\. Referral and continuity of care**

The private EHR should support referral and follow-up based on clinical findings. Capture:

·         Referral category and reason.

·         Preferred or receiving provider/facility, where known.

·         Urgency level, using clinician-approved options.

·         Patient consent and information authorised for sharing.

·         Referral date and relevant clinical summary/attachments.

·         Appointment status and whether the patient attended.

·         Follow-up outcome and further action required.

Do not automatically send a referral to an unverified provider or expose the full patient record by default. Sharing follows the agreed permission and consent workflow.

# **10\. Professional and clinic verification**

## **10.1 Folio-number verification**

Dr Jay explained that practising doctors have a professional identification number called a folio number and that the relevant professional board has a verification platform. Direct use may require permission.

| Route | Description | Status |
| :---- | :---- | :---- |
| Direct verification | Explore whether the board permits integration or an approved lookup process for folio verification. | Open — permission and technical access not confirmed. |
| Manual verification | Collect folio details and supporting evidence for review by an authorised process. | Fallback recommendation if direct access is unavailable. |

 

Record the submitted folio number, professional name, verification status, source and date, plus expiry/re-verification information if required. A folio number alone does not prove that the account holder is the named professional.

## **10.2 Clinic onboarding**

·         Collect organisation identity, location and relevant registration details.

·         Review and approve the clinic according to the agreed onboarding policy.

·         Associate verified professionals and authorised staff with the clinic.

·         Configure permitted modules and user roles.

·         Maintain approval status and changes to clinic affiliation.

# **11\. Patient engagement and education**

## **11.1 General oral-health tool**

·         Twice-daily toothbrushing reminders.

·         Routine dental-visit reminders, approximately every six months as a general prompt where appropriate.

·         Simple oral-health education and preventive-care tips.

·         Patient controls to manage reminder preferences.

## **11.2 Children's educational experience**

Dr Jay proposed children's educational games that could be used on tablets during school or public-awareness campaigns. Possible later activities include brushing education, oral-health quizzes, healthy-food choices and age-appropriate challenges.

This is a future module, not a dependency for the core clinical MVP. It requires a parent/guardian model, age-appropriate design, appropriate consent and minimisation of children's personal data.

## **11.3 Provider discovery, invitations and rewards**

The initial checklist proposed dentist/clinic discovery, invitations and points/rewards. These remain broader product directions, but Dr Jay's latest feedback does not define their detailed rules. Specify them as a later-phase module after the core patient and clinical workflows are agreed.

·         Provider search by state, LGA, town/district and local area.

·         Public profiles with appropriate details and verification status.

·         Invitation links for providers not yet listed.

·         Points only for agreed qualifying actions, with duplicate/fraud controls.

·         Partner-funded rewards and redemption rules to be agreed before launch.

# **12\. Security, privacy, consent and record integrity**

## **12.1 Role-based access and consent-aware sharing**

·         Separate public/patient-facing access from private clinical permissions.

·         Apply role-based access and clinic affiliation rules.

·         Require appropriate consent or other approved authority before sharing records with another provider.

·         Limit each user to the minimum information and actions required for their role.

·         Provide parent/guardian and appropriate consent/assent workflows for children.

·         Maintain an access and change history.

## **12.2 Clinician self-record restriction**

| Explicit partner requirement  Clinicians must be restricted from placing or altering their own clinical records. |
| :---- |

 

Proposed implementation: where the authenticated clinician is also the patient for the record, block that clinician from creating, approving, editing or correcting their own clinical entries. Another appropriately authorised clinician must handle the clinical record. Log blocked attempts where appropriate.

Confirm with Dr Jay whether this applies to every clinical action, how it interacts with emergency care, and whether the clinician may separately update their own patient-reported profile information.

## **12.3 Audit trail and amendments**

·         Record who created each screening and clinical entry and when.

·         Preserve original screening and clinical entries.

·         Record changes, corrections, reason, author and timestamp.

·         Do not silently overwrite or delete clinical history.

·         Distinguish original source data from imported, reviewed, amended and clinician-approved information.

·         Record relevant access and sharing events.

## **12.4 Unknown and unassessed states**

Where relevant, distinguish No, Unknown, Not asked, Not assessed and Not applicable. Do not force a false negative.

## **12.5 Urgent symptoms**

Provide an escalation prompt only after the dental clinical team approves the criteria and wording. The software must not invent triage rules.

# **13\. MVP scope and phased roadmap**

This is a proposed sequence based on the supplied materials, not a claim that every item is already approved for the first release. The final MVP boundary must be agreed jointly.

| Stage | Proposed scope | Exit condition |
| :---- | :---- | :---- |
| MVP foundation | Patient identity/profile; general health profile; roles/permissions; clinic onboarding; audit trail; patient ID. | Correct patient can be identified and permitted users can access the correct profile. |
| MVP screening | Quick-screening form; complaint; basic findings; screening metadata; linked record; source/date transfer. | Screening links to the patient and flows into clinical workspace without duplicate patient. |
| MVP clinical core | Detailed examination; odontogram; dentition and numbering; findings; TMJ/soft tissue/bony notes; investigations; diagnosis; plan and completed treatment. | Authorised clinician can complete and preserve a structured clinical encounter. |
| MVP patient output | Clinician-approved patient summary and visual summary; treatment status/follow-up where agreed. | Patient sees an understandable, appropriately restricted summary. |
| Next expansion | Referral enhancements; reminders; provider discovery; invitations; clinic analytics and practice tools. | Core workflows validated with pilot users and clinics. |
| Later expansion | AI-assisted drafting; children's games; points/rewards; telehealth; integrations and fuller EHR. | Governance, clinical safety, partner readiness and business case established. |

 

| Scope caution  AI treatment suggestions, children's games, telehealth, rewards and broad provider discovery should not delay proving the core patient → screening → clinical examination → approved summary workflow. AI drafting may be prototyped earlier but must remain clinician-reviewed. |
| :---- |

 

# **14\. Functional acceptance criteria**

These are proposed testable checks. Clinical content and rule.

1\.   	A patient can create/update a profile and receive a unique patient identifier.

2\.   	A patient can maintain general health information with source and last-updated date.

3\.   	An approved screener can submit a quick-screening record linked to the correct patient.

4\.   	Submitting screening does not create a duplicate patient by default.

5\.   	An authorised clinician sees relevant imported profile/screening data with source/date and a review path.

6\.   	The odontogram supports permanent, deciduous and mixed dentition.

7\.   	The odontogram supports FDI/ISO, Palmer and Universal display notation without changing underlying tooth identity.

8\.   	Selecting a tooth allows multiple findings and relevant surfaces to be recorded.

9\.   	Findings can be assigned to a tooth, region, quadrant, arch or whole mouth as appropriate.

10\.	TMJ, soft-tissue and bony findings can be recorded without incorrect tooth assignment.

11\.	Investigations can be recorded with date, status, results, attachments and interpretation, and linked to a tooth/region where relevant.

12\.	Presenting complaints, findings, investigation results, diagnosis, proposed treatment and completed treatment are distinguishable.

13\.	AI content is labelled draft and cannot become final diagnosis or approved treatment without clinician approval.

14\.	Treatment can be pending, partially completed or completed, with dates and history preserved.

15\.	Patients can access only permitted patient-facing summaries, not unauthorised private EHR content.

16\.	A clinician cannot create, approve or alter their own clinical record, subject to final agreed interpretation.

17\.	Corrections preserve the original entry and show author, reason and date.

18\.	Role-based access and relevant access/change events are auditable.

19\.	Children's accounts follow the approved guardian and consent process before being enabled.