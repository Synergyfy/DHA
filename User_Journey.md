**DHA User Journeys & Access Permissions**

**Patient journeys • Screening • Clinical workflow • Treatment • Referral • Role permissions**

 

| DOCUMENT STATUS  Working functional specification. It translates Product Blueprint v2.0 into proposed workflows and access rules. Clinical, privacy, regulatory and operational details identified as open decisions before production use. |
| :---- |

 

**Document control**

| Item | Description |
| :---- | :---- |
| Product | DHA |
| Document | User Journeys and Access Permissions |
| Version | 1.0 |
| Status | Draft for joint review |
| Parent reference | DHA Product Blueprint v2.0 |
| Primary reviewers | DHA product/engineering team and Dr Jay |
| Purpose | Define end-to-end user journeys, role permissions, safeguards and acceptance checks. |

 

# **1\. Rules that apply to every journey**

·         One patient identity should connect the patient's profile, screenings, clinical encounters, investigations, treatment history, summaries and referrals.

·         An account does not automatically grant professional status, clinic membership or access to clinical records.

·         Professional verification and clinic authorisation are separate checks. Both must be satisfied before private clinical access is granted.

·         Access is limited by role, clinic relationship, patient relationship, consent/other approved authority and the task being performed.

·         Quick screening is not the same as a detailed clinical examination or a final diagnosis.

·         Patient-reported information, screener observations, clinician findings, investigation results, diagnoses and treatment events must remain distinguishable.

·         Every clinical entry must retain its author, date/time, organisation, source and amendment history.

·         Clinical records must not be silently overwritten or deleted. Corrections are appended with reason and attribution.

·         AI-generated text is a draft until reviewed and approved by an authorised clinician.

·         Patient-facing summaries show only content approved for patient access; they do not expose the entire private EHR by default.

| Permission decision sequence  Before showing or changing a record, the system checks: (1) authenticated account, (2) active role, (3) professional verification if required, (4) active clinic affiliation if required, (5) patient/record relationship and consent or other approved authority, and (6) permission for the specific action. |
| :---- |

 

# **2\. User roles**

| Role | Meaning | Typical scope |
| :---- | :---- | :---- |
| Patient | Adult using DHA for their own profile and records. | Own profile; own permitted summaries; own consent and reminder preferences. |
| Parent / guardian | Person authorised to act for a child or dependent under the approved policy. | Linked dependent profile and permitted actions within verified guardian authority. |
| Community / school screener | Approved person conducting a limited screening programme. | Create and submit quick-screening records for assigned programme/location. |
| Receptionist / clinic support | Clinic staff handling non-clinical administration. | Check-in, appointments, demographics correction workflow and administrative tasks. |
| Verified clinician | Dentist or other approved professional whose identity and credentials have been verified. | Clinical work only where clinic affiliation and patient access are also valid. |
| Clinic owner / administrator | Person responsible for a participating clinic's operational account. | Clinic setup, staff access administration and operational reporting. |
| DHA verification / support staff | Authorised DHA staff handling onboarding and account support. | Verification workflow, support and limited administrative access. |
| DHA super admin | Platform-level administrator. | Platform configuration and administration; not routine clinical authorship or unrestricted patient-record browsing. |
| Receiving provider clinician | Verified clinician at a receiving organisation for a referred patient. | Only the referral information and records specifically authorised for the referral/care episode. |

 

# **3\. Journey 1 — Patient registers**

## **3.1 Entry points**

·         Patient downloads/opens DHA and selects patient/public registration.

·         Patient may be invited through a clinic, community screening, school programme or another patient.

·         A parent/guardian may begin a child's registration using the approved guardian pathway.

## **3.2 Main flow**

1\.        Patient selects Create patient account.

2\.        System explains what the account is for, what information is collected and how records may be used/shared.

3\.        Patient enters the minimum registration details required for identity matching and account security.

4\.        System verifies contact details using the approved verification method.

5\.        System checks for a possible existing patient profile using configured matching rules. A possible match is not automatically merged.

6\.        If a possible existing profile is found, the patient follows a safe match/recovery process or requests assisted review.

7\.        If no match is found, the system creates a new patient identity and profile.

8\.        System issues a unique patient ID. A QR code or printable/human-readable version may be provided; the ID is not a password or access token.

9\.        Patient completes optional general-health profile fields, clearly labelled as patient-reported unless professionally verified.

10\. 	Patient sets consent and communication preferences where applicable, including reminders and record sharing.

11\. 	Patient lands on the patient dashboard with profile completeness and next-step guidance.

## **3.3 System outcome**

·         A unique patient identity and account are created or safely linked to an existing identity.

·         The system records when profile information was entered and who supplied it.

·         Patient can update their own reported profile information; prior clinical records remain unchanged.

·         No detailed clinical access is granted merely because a patient account exists.

## **3.4 Exceptions**

·         No smartphone/internet: provide an approved assisted registration or printed ID process without weakening identity checks.

·         Duplicate suspected: flag for review; do not silently merge records.

·         Child account: require the approved guardian relationship and consent/assent handling.

·         Patient cannot verify contact: allow only the approved limited/recovery process; do not expose an existing record based on an unverified claim.

# **4\. Journey 2 — Patient attends a community screening**

12\. 	Patient arrives at an approved screening location and is informed about the screening and the use of their information.

13\. 	Staff searches for the patient using the patient ID or approved matching details.

14\. 	If the patient already exists, staff confirms identity using the programme's approved process and selects the correct profile.

15\. 	If the patient is new, the screener or registration assistant creates a minimal screening-linked patient profile or sends the patient through registration, according to programme policy.

16\. 	Patient/guardian consent or other approved authority is recorded before screening information is captured.

17\. 	The screener records the screening setting, date, location, screener identity and screening type.

18\. 	The screener records the presenting complaint/reason where applicable and basic findings using the quick-screening form.

19\. 	The screener adds optional notes or images only where the programme permits and consent/privacy requirements are met.

20\. 	The screener reviews the information with the patient/guardian and submits the screening.

21\. 	System saves the screening as a distinct screening event linked to the patient timeline.

22\. 	System displays an appropriate confirmation and next-step information; where follow-up is advised, the patient receives the approved instructions.

| System behaviour | Required rule |
| :---- | :---- |
| Existing patient | Link the screening to the existing patient identity; do not create a second profile just because this is a new screening. |
| New patient | Create or initiate one patient identity using the approved minimum-data process. |
| Screening scope | Store as screening information, not as a full diagnosis or detailed clinical encounter. |
| Patient view | Show only the screening summary approved for patient access. |
| Clinical handoff | Make screening data available to an authorised clinician with source, date and screener attribution. |

 

# **5\. Journey 3 — School or community screener creates a screening record**

# **5\. Journey 3 — School or community screener creates a screening record**

This journey defines the screener's work when the patient is not independently completing the form.

23\. 	Screener signs in using an approved screener account.

24\. 	System confirms the screener's active role and assigned programme, school/community or location.

25\. 	Screener selects New screening and searches for an existing patient.

26\. 	If the patient is a child, the screener follows the guardian/consent process and records the responsible guardian where required.

27\. 	If no patient match exists, screener captures only the minimum data allowed to create or stage a patient identity.

28\. 	Screener selects screening type and enters presenting complaint/reason where applicable.

29\. 	Screener completes the limited examination fields available to the screener role.

30\. 	System prevents access to detailed EHR sections, diagnosis authoring, treatment planning and unrelated patient history.

31\. 	Screener reviews and submits. The record is attributed to the screener and programme.

32\. 	System links the record to the patient's longitudinal timeline and makes it available for authorised clinical review.

| Important restriction  A screener must not be able to open a patient's full private clinical record simply because they created a screening entry. Their access is limited to the assigned screening task and the minimum patient information required. |
| :---- |

 

## **5.1 Screener cannot**

·         Create or approve a clinical diagnosis.

·         Create or approve a treatment plan.

·         Mark treatment as completed.

·         Edit or delete a clinician's entry.

·         View unrelated medical history, private notes or investigations unless specifically authorised for a defined task.

·         Export or browse the full screening programme's patient list unless the programme role explicitly permits it.

# **6\. Journey 4 — Patient visits an onboarded clinic**

33\. 	Patient contacts or arrives at an onboarded clinic.

34\. 	Receptionist searches for the patient using the patient ID or approved matching details.

35\. 	Receptionist confirms identity using the clinic's approved procedure; if uncertain, the record is not opened until resolved.

36\. 	If an existing profile is found, receptionist links the visit/appointment to that patient.

37\. 	If no profile is found, receptionist supports registration or creates a minimal profile under the permitted workflow.

38\. 	Patient confirms or updates contact details and patient-reported general-health information through the patient-facing workflow or assisted process.

39\. 	Clinic records the visit/encounter context and obtains the required consent for the care episode and any sharing.

40\. 	System checks that the clinic is active/onboarded and the staff member has the appropriate role.

41\. 	An authorised clinician is assigned or selected for the encounter.

42\. 	Clinician opens the clinical workspace and reviews relevant profile, screening and prior clinical information that the clinician is permitted to access.

## **6.1 Clinic access conditions**

·         Clinic must be approved and active for the private EHR features it is using.

·         Clinician must be verified and affiliated with that clinic for the relevant period.

·         Receptionist access remains administrative; it does not become clinical access.

·         A patient arriving at a clinic does not automatically authorise every staff member to view all historical records. Access must be tied to the care relationship and approved rules.

# **7\. Journey 5 — Dentist opens the patient's existing record**

43\. 	Dentist signs in with an authenticated account.

44\. 	System verifies professional status and confirms active clinic affiliation.

45\. 	Dentist searches using the patient ID or approved patient-matching process.

46\. 	System confirms that the dentist has a permitted care relationship/assignment and that consent or another approved authority for access exists.

47\. 	If permission is missing, system requests the required authorisation or routes the request through the approved workflow.

48\. 	System opens a patient overview showing identity and key alerts that the dentist is authorised to see.

49\. 	System displays the reusable general-health profile with source and last-updated date, distinguishing patient-reported, measured and verified items.

50\. 	System displays the longitudinal timeline: prior screenings, clinical encounters, investigations, diagnoses, treatment events, referrals and patient-visible summaries, subject to access rules.

51\. 	Dentist selects the current encounter or starts a new encounter.

52\. 	System records the access event and context in the audit trail.

| No blanket access  Being a verified dentist, having a DHA account, or working at an onboarded clinic must not by itself grant unrestricted access to every patient's records. |
| :---- |

 

# **8\. Journey 6 — Dentist conducts a detailed examination**

53\. 	Dentist opens the patient record and starts a new detailed examination/encounter.

54\. 	System checks the clinician is verified, clinic-affiliated, authorised for the patient and not blocked by the self-record rule.

55\. 	System pre-fills relevant patient profile and quick-screening information, showing source and date.

56\. 	Dentist confirms the examination date, clinic, responsible clinician and dentition context.

57\. 	Dentist selects permanent/adult, deciduous or mixed dentition as appropriate.

58\. 	Dentist selects the display numbering system: FDI/ISO, Palmer or Universal, according to the permitted configuration.

59\. 	Dentist records presenting complaint and relevant medical, dental, social and risk-factor history.

60\. 	Dentist selects a tooth on the odontogram. The system opens the tooth findings panel.

61\. 	Dentist records one or more findings for that tooth, including surface/location and other clinically approved attributes.

62\. 	Dentist records periodontal findings associated with the tooth or surrounding tissues where appropriate.

63\. 	Dentist records general dentition, TMJ, soft-tissue and bony findings in their appropriate non-tooth-specific sections.

64\. 	Dentist adds investigations and links each item to a tooth/region where clinically relevant.

65\. 	Dentist reviews the findings list and structured summary for completeness.

66\. 	System may generate a draft clinical summary or AI-assisted suggestions only if that function is enabled and approved.

67\. 	Dentist reviews, edits and explicitly signs/submits the clinical encounter.

68\. 	System locks the submitted version against silent editing and preserves the author, timestamp and audit history. Later corrections are separate amendments.

## **8.1 Validation and incomplete records**

·         Required fields must be defined by the clinical team; do not invent mandatory clinical fields in the software specification.

·         Allow an encounter to be saved as draft where policy permits, clearly marked incomplete and not yet finalised.

·         Clearly distinguish unassessed, unknown, not asked, not applicable and negative findings where the clinical data model requires these states.

·         Prevent final submission if required safety or attribution fields are missing.

## **8.2 AI assistance**

·         AI can organise only the information already present in the encounter and linked records.

·         AI-generated suggestions must be visually labelled as draft/unapproved.

·         The clinician must actively review and approve any text that becomes part of the final clinical record.

·         The system must not auto-submit an AI diagnosis or treatment recommendation.

# **9\. Journey 7 — Clinician proposes and completes treatment**

## **9.1 Proposing treatment**

69\. 	Clinician reviews the examination findings, investigations and clinical context.

70\. 	Clinician creates a treatment plan with one or more treatment items linked to the relevant tooth, region or condition.

71\. 	Each item includes the proposed procedure/action, clinical rationale where required, priority and intended follow-up.

72\. 	If AI assistance is enabled, it may suggest a draft plan; clinician edits and selects what is clinically appropriate.

73\. 	Clinician confirms the plan and records the discussion/communication with the patient according to clinic policy.

74\. 	System marks items as proposed, approved/planned or pending according to the agreed workflow.

75\. 	Patient-facing view shows the approved explanation and relevant outstanding actions, not internal-only notes.

## **9.2 Completing treatment**

76\. 	When treatment is performed, an authorised clinician opens the relevant treatment item or encounter.

77\. 	Clinician records what was actually done, the date, tooth/region, responsible clinician and relevant details.

78\. 	Clinician marks the item completed or partially completed.

79\. 	If only part is completed, the remaining work stays pending and can be scheduled.

80\. 	System appends a treatment event to the patient's history; it does not overwrite the original proposed plan.

81\. 	Where appropriate, clinician sets review/follow-up date and reminder instructions.

82\. 	Patient sees the approved completed-treatment history and any outstanding treatment summary.

| Treatment state | Who may set it | Patient visibility |
| :---- | :---- | :---- |
| Proposed | Authorised clinician | Only if clinic chooses to show proposed items and clinician approves the wording. |
| Approved / planned | Authorised clinician | Yes, in patient-friendly form where approved. |
| Pending | Authorised clinician / authorised workflow | Yes, with next-step information. |
| Partially completed | Authorised clinician | Yes, explain what remains outstanding. |
| Completed | Authorised clinician | Yes, as approved treatment history. |
| Cancelled / no longer required | Authorised clinician | Show only an appropriate patient-facing explanation; retain internal audit history. |

 

# **10\. Journey 8 — Patient views their summary**

83\. 	Patient signs in or follows the approved secure access route.

84\. 	System verifies the patient's identity and account-to-patient link.

85\. 	Patient opens My Oral Health / Summary.

86\. 	System displays a plain-language summary generated from approved data.

87\. 	Summary may include approved findings, visual odontogram, relevant investigations, completed treatment, pending treatment and follow-up instructions.

88\. 	Patient can open more detail only where the relevant item is approved for patient access.

89\. 	Patient can download/print/share an approved summary using the permitted sharing flow.

90\. 	System records relevant disclosure/share events.

## **10.1 Patient must not see by default**

·         Internal clinician-only notes or administrative notes.

·         Unreviewed AI drafts or unapproved treatment suggestions.

·         Another person's record or information outside the patient's authority.

·         Raw staff-only audit/security data.

·         Unapproved images, investigation annotations or sensitive third-party information.

| Patient-facing principle  Give patients a clear and useful explanation of their oral health without exposing unfinished clinical work or private professional commentary. |
| :---- |

 

# **11\. Journey 9 — Patient is referred to another provider**

91\. 	Authorised clinician determines that referral is appropriate and discusses it with the patient/guardian.

92\. 	Clinician selects referral category, reason, urgency, receiving provider/facility and relevant follow-up information.

93\. 	System checks whether the receiving provider is registered and verified, where applicable.

94\. 	Clinician selects the specific clinical information and attachments needed for the referral.

95\. 	System presents the proposed referral package and recipient to the patient/guardian for the required consent/authorisation.

96\. 	After the required authorisation is recorded, system securely sends or makes available the referral package to the intended receiving provider.

97\. 	System records what was shared, with whom, by whom, when and under what authority.

98\. 	Receiving provider authenticates and confirms the referral is intended for them/their organisation.

99\. 	Receiving clinician accesses only the referral package and any additional records separately authorised for the care episode.

100\.  Receiving provider updates referral status, appointment/attendance and outcome where the workflow permits.

101\.  Referring clinic can view the referral status and document follow-up, subject to the patient's permissions and agreed care relationship.

## **11.1 Referral data minimisation**

·         Do not send the entire patient record by default.

·         Share only information relevant to the referral and authorised by the patient/guardian or other approved authority.

·         The referral package should identify its source, author, date and included attachments.

·         A referral link or patient ID must not function as an unrestricted access token.

·         If the receiving provider is not on DHA, define a secure alternative before enabling external referral.

# **12\. Clinician self-record restriction**

| Mandatory control from Dr Jay's feedback  A clinician must not create, submit, approve, amend or otherwise alter their own clinical records. |
| :---- |

 

## **12.1 Definition**

A self-record event occurs when the authenticated clinician is the patient whose clinical record is being created or changed. The restriction applies regardless of whether the clinician is acting at their own clinic, another clinic or through an administrative account.

## **12.2 Actions to block**

·         Starting or submitting a detailed clinical examination for themselves.

·         Entering or signing their own diagnosis or clinical findings.

·         Creating, approving or changing their own treatment plan.

·         Marking their own treatment as completed.

·         Adding, editing or deleting clinical notes, investigation interpretations or referral decisions on their own record.

·         Using another staff role or clinic affiliation to bypass the restriction.

## **12.3 Permitted actions, subject to final agreement**

·         The clinician may maintain their own patient login and update patient-reported demographic/contact details.

·         The clinician may enter patient-reported general-health profile information, clearly labelled as self-reported, if this is permitted for all patients.

·         The clinician may view their own patient-facing summary and approved records as a patient.

·         A different, appropriately authorised clinician may provide care and document the encounter, subject to normal access and consent rules.

## **12.4 Enforcement**

102\.  Compare the authenticated professional identity with the patient identity before any clinical create/update/sign action.

103\.  Apply the check on the server/API as well as in the user interface; hiding buttons alone is insufficient.

104\.  Block attempts even if the clinician changes role, switches clinic or uses a second account that is reliably linked to the same verified professional identity.

105\.  Show a neutral message explaining that clinicians cannot author or alter their own clinical records and that another authorised clinician must assist.

106\.  Log the blocked attempt for security review without creating a clinical entry.

107\.  Ensure clinic administrators and DHA support staff cannot override the restriction through ordinary permission settings.

| Open policy decision  Dr Jay and DHA must confirm whether this restriction is absolute or whether a formally governed emergency exception is ever allowed. Recommended default: no exception in the MVP. Any later exception would require a documented policy, independent review and immutable audit trail. |
| :---- |

 

# **13\. Role-based permission matrix**

Legend: A \= allowed; C \= conditional (requires assignment, consent, clinic relationship or specific workflow); R \= read-only; N \= not allowed. This is the proposed baseline. Final permissions require joint approval.

| Action / data | Patient | Guardian | Screener | Reception | Clinician | Clinic admin | DHA admin |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Create own patient account | A | A for dependent | C | C | A as patient | C | C |
| Edit own patient-reported profile | A | C | N | C via workflow | A as patient | N | C support only |
| Edit another patient's demographics | N | C | C minimum | C | C | C | C support only |
| View own approved summary | A | C | N | N | A as patient | N | N by default |
| Create quick screening | N | N | A assigned | N | C if authorised | N | C support/config only |
| View screening record | C own | C dependent | C assigned records | C admin need | C care need | C operational need | C exceptional support |
| Create detailed examination | N | N | N | N | A authorised | N | N |
| Edit/approve own clinical record | N | N | N | N | N | N | N |
| Create/edit another patient's clinical record | N | N | N | N | A with access | N | N |
| Create diagnosis/treatment plan | N | N | N | N | A | N | N |
| Mark treatment completed | N | N | N | N | A | N | N |
| Manage clinic staff/roles | N | N | N | N | C delegated | A | C platform support |
| Approve clinic onboarding | N | N | N | N | N | C submit only | A authorised |
| Verify professional credentials | N | N | N | N | N | N | A authorised |
| Share referral package | C authorise | C authorise | N | N | A initiate | N | N |
| Access full patient record | C own scope | C dependent scope | N | N | C care need | N | N exceptional audited support |
| View platform audit/security logs | N | N | N | N | C own activity | C clinic activity | A authorised |

 

# **14\. More detailed role permissions**

## **14.1 Patient**

·         Can create and maintain own account and patient-reported profile.

·         Can view approved summaries and patient-visible records linked to their identity.

·         Can manage reminder and communication preferences.

·         Can grant or withdraw sharing permissions where the approved model allows.

·         Cannot create, edit, approve or delete clinician-authored clinical entries.

·         Cannot view another patient's information without a verified guardian/legal authority.

## **14.2 Parent / guardian**

·         Can act only for a dependent where the relationship and authority are verified under policy.

·         Can complete registration/consent and view permitted dependent summaries within the authority granted.

·         Cannot use guardian access to edit clinician-authored records.

·         Guardian authority must be reviewable and changeable when the child reaches the applicable age or the authority ends.

## **14.3 Screener**

·         Can create and submit quick-screening records for assigned programme/location.

·         Can view only the minimum patient information needed to match the patient and conduct screening.

·         Can view/edit their own unsubmitted draft screening; submitted-record corrections follow an audited amendment process.

·         Cannot access detailed EHR, diagnose, prescribe, plan treatment or mark treatment completed.

## **14.4 Receptionist / clinic support**

·         Can manage permitted appointments, check-in and non-clinical contact/demographic workflows.

·         Can identify whether a patient has a profile without automatically opening detailed clinical content.

·         Cannot author or alter clinical findings, diagnosis, treatment or investigations.

·         Any correction to a clinical record must be routed to an authorised clinician through an audited process.

## **14.5 Verified clinician**

·         Can access records only for an authorised care purpose and within the relevant clinic/encounter relationship.

·         Can create and sign clinical examinations, findings, diagnoses, investigations, treatment plans, treatment completion and referrals for other patients.

·         Can amend their own prior entries only through a correction/addendum workflow, preserving the original entry.

·         Cannot create or alter their own clinical records.

·         Cannot manage platform-wide settings or verify their own credentials.

## **14.6 Clinic owner / administrator**

·         Can manage clinic profile, locations, staff invitations, role assignments and operational settings within approved limits.

·         Can see operational information needed to run the clinic.

·         Does not automatically receive access to detailed patient clinical records because they own the clinic.

·         Cannot create, approve or alter clinical records unless separately verified and authorised as a clinician; self-record restriction still applies.

## **14.7 DHA super admin and support**

·         Can manage platform configuration, account support, clinic onboarding and verification workflows according to assigned admin privilege.

·         Can suspend or restore access and manage role/permission configuration through controlled procedures.

·         Should not routinely browse patient clinical content.

·         Any exceptional support access to clinical data must be time-limited, purpose-bound, approved, logged and reviewed.

·         Must not create or alter clinical records as a substitute for a clinician.

## **14.8 Receiving provider clinician**

·         Must be verified and authenticated.

·         Can access only the referral package and any additional records explicitly authorised for the receiving care episode.

·         Cannot browse unrelated patient history or the referring clinic's entire EHR by default.

·         Can add their own clinical encounter to the patient's longitudinal record under the agreed hybrid-record model, preserving provider attribution.

# **15\. Record ownership, amendments and audit**

| Record type | Who creates it | Who can correct/update it | Core rule |
| :---- | :---- | :---- | :---- |
| Patient-reported profile | Patient/guardian; assisted entry where permitted | Patient/guardian; authorised support correction workflow | Retain source and last-updated date; do not rewrite past clinical observations. |
| Quick screening | Assigned screener or authorised clinician | Author through audited correction process; supervisor workflow if defined | Preserve submitted version and attribution. |
| Detailed examination | Authorised clinician | Authorised clinician through addendum/correction workflow; not self-record | No silent overwrite; preserve original. |
| Investigation | Authorised clinician/approved staff upload workflow | Authorised clinician or approved role with audit | Retain report/image source and interpretation separately. |
| Diagnosis and treatment plan | Authorised clinician | Authorised clinician via versioned amendment | AI draft cannot become final without approval. |
| Treatment completed event | Authorised clinician | Authorised clinician via correction/addendum | Record actual procedure/date/responsible clinician. |
| Referral | Authorised referring clinician | Authorised clinician through audited update | Track recipient, consent, shared data and status. |

 

The system should use append-only or versioned clinical history. Technical implementation may vary, but the user-visible outcome must be a traceable record of what was entered, changed, by whom and when.

# **16\. Permission and safety scenarios**

| Scenario | Expected system response |
| :---- | :---- |
| A screener searches for a patient outside their assigned programme | Deny access or require an approved assignment; log the attempt as appropriate. |
| A receptionist opens a detailed examination tab | Deny access; do not expose clinical content in the page payload. |
| A verified dentist has no active clinic affiliation | Do not grant private EHR authoring access. |
| A dentist tries to open an unrelated patient's record | Require an authorised care relationship and approved access basis; otherwise deny. |
| A dentist tries to examine themselves | Block clinical create/update/sign actions and log the attempt. |
| A clinic owner is not a verified clinician | Allow clinic administration only; deny clinical authoring. |
| A patient withdraws sharing permission | Stop future access under that permission; preserve records already lawfully created/shared and apply the agreed revocation policy. |
| A patient has a possible duplicate profile | Hold merge; route to identity review; preserve source records. |
| A referral is sent to an unverified provider | Do not release the clinical package until an approved safe route is confirmed. |
| AI suggests a diagnosis not supported by recorded data | Do not silently add it; require clinician review and correction/rejection. |
| A child reaches the age where guardian authority changes | Trigger the approved transition and re-consent/identity process. |
| A staff member leaves a clinic | Revoke clinic affiliation and access promptly; retain their historical authorship on records. |

 

# **17\. Notifications and reminders**

·         Registration/contact verification messages are sent only through configured channels and with appropriate safeguards.

·         Screening confirmation should avoid exposing sensitive details on lock-screen notifications.

·         Appointment and follow-up reminders should disclose only the minimum necessary information.

·         Pending treatment reminders follow the clinician/clinic-defined schedule and patient preferences.

·         General brushing and routine dental-visit reminders are optional patient engagement features, not clinical orders.

·         Referral status notifications should not reveal sensitive referral details to an unverified recipient.

# **18\. Audit events to capture**

·         Account creation, identity verification and patient-profile linkage/merge decisions.

·         Guardian relationship creation, verification, change and termination.

·         Screening creation, submission, correction and viewing where required.

·         Clinical record open/access, creation, signing, amendment and correction.

·         Investigation upload, result entry and interpretation changes.

·         Treatment plan status changes and treatment completion events.

·         Patient consent, sharing authorisation, withdrawal and referral disclosure.

·         Clinic/professional verification, role changes, suspension and termination.

·         Self-record restriction blocks and attempted permission bypasses.

·         Exceptional administrative access to sensitive records.

# **19\. Acceptance criteria for design and development**

108\.  A patient can register, verify their account and receive a unique patient ID.

109\.  Possible duplicate patient identities are flagged for review and are not automatically merged.

110\.  A patient can update patient-reported profile data without changing historical clinical records.

111\.  A guardian can act for a child only through the approved verified relationship workflow.

112\.  An assigned screener can create a quick-screening record and cannot access detailed EHR functions.

113\.  Quick-screening data is linked to the correct patient and pre-populates the authorised clinician's workspace with source/date.

114\.  A receptionist can perform permitted administrative tasks but cannot view or edit detailed clinical records by default.

115\.  A verified clinician without active clinic authorisation cannot access private EHR authoring functions.

116\.  A clinician can open a patient's existing record only after the required patient/record access checks pass.

117\.  An authorised clinician can create a detailed examination with tooth-specific and non-tooth-specific findings.

118\.  An investigation can be linked to a tooth/region and retains its date, source and author.

119\.  AI output remains a draft until an authorised clinician approves it.

120\.  Proposed, pending, partially completed and completed treatment states are distinguishable and history is retained.

121\.  A patient can view only approved patient-facing summaries and authorised records.

122\.  A referral shares only the selected, authorised information with the intended recipient.

123\.  A clinician cannot create, submit, approve or amend their own clinical record, including through another clinic role.

124\.  Clinic owners and DHA administrators cannot use administrative roles to bypass clinical permissions.

125\.  Role changes and clinic departure revoke future access without removing historical authorship.

126\.  Sensitive access, sharing, amendments and denied self-record attempts are auditable. 

