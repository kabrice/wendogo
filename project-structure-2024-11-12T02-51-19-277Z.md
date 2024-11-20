# Project Structure

```
.
├── src
│   ├── components
│   │   ├── SimulationEngine
│   │   │   ├── DateInput.js
│   │   │   ├── SE2DateInput.js
│   │   │   ├── SEAcademicYearHeadDetails.js
│   │   │   ├── SEAlertMessage.js
│   │   │   ├── SEAutoSuggestInput.js
│   │   │   ├── SEAutoSuggestListInput.js
│   │   │   ├── SECheckBox.js
│   │   │   ├── SEDateInput.js
│   │   │   ├── SEDropDownList.js
│   │   │   ├── SEDualSelection.js
│   │   │   ├── SELabel.js
│   │   │   ├── SELevelRail.js
│   │   │   ├── SEMarkInput.js
│   │   │   ├── SENumberSelection.js
│   │   │   ├── SEReportCard.js
│   │   │   ├── SESelectionList.js
│   │   │   ├── SESmallAlertMessage.js
│   │   │   ├── SETextArea.js
│   │   │   ├── SETextInput.js
│   │   │   ├── SETextInputPhone.js
│   │   │   └── SEYesNo.js
│   │   ├── Birthday.js
│   │   ├── ButtonLarge.js
│   │   ├── Calendar.js
│   │   ├── ContactModal.js
│   │   ├── Countdown.js
│   │   ├── CourseDomainFilter.js
│   │   ├── Footer.js
│   │   ├── FooterSingleRow.js
│   │   ├── HeaderMenuBar.js
│   │   ├── HeaderMenuBarOnlyWithLogo.js
│   │   ├── HeaderMenuLoginBar.js
│   │   ├── Modal.js
│   │   ├── OptimizedImage.js
│   │   ├── QuestionsOnTopic.js
│   │   ├── ServicePricingCard.js
│   │   ├── SimulationResultWaiting.js
│   │   ├── Spinner.js
│   │   └── SubscriptionModal.js
│   ├── context
│   ├── data
│   ├── hooks
│   │   ├── useAutoComplete.js
│   │   └── useDropdown.js
│   ├── pages
│   │   ├── SimulationEngineStep
│   │   │   ├── AcademicYearHeadDetails1.js
│   │   │   ├── AcademicYearHeadDetails2.js
│   │   │   ├── AcademicYearHeadDetails3.js
│   │   │   ├── Address.js
│   │   │   ├── AlreadyTraveledToFrance.js
│   │   │   ├── AwardDetails.js
│   │   │   ├── BirthDate.js
│   │   │   ├── BlankYearReptition.js
│   │   │   ├── BlankYearReptitionAlert.js
│   │   │   ├── CampusFranceInegibilityAlert.js
│   │   │   ├── CanJustifyEnglishLevel.js
│   │   │   ├── CanJustifyOtherLanguage.js
│   │   │   ├── CanProveWorkExperience.js
│   │   │   ├── ClassRepetition.js
│   │   │   ├── ClassRepetitionWarningAlert.js
│   │   │   ├── CouldPayTuition.js
│   │   │   ├── CouldPayTuitionWarningAlert.js
│   │   │   ├── DegreeExactName.js
│   │   │   ├── DegreeNameEquivalence.js
│   │   │   ├── Disable.js
│   │   │   ├── Email.js
│   │   │   ├── EnglishLevel.js
│   │   │   ├── Firstname.js
│   │   │   ├── FrenchLevel.js
│   │   │   ├── FrenchTest.js
│   │   │   ├── FrenchTestInfoAlert.js
│   │   │   ├── HasPassport.js
│   │   │   ├── HasWonAward.js
│   │   │   ├── HasWorkExperience.js
│   │   │   ├── HighSchoolInFrench.js
│   │   │   ├── IsResult1Available.js
│   │   │   ├── IsResult2Available.js
│   │   │   ├── IsResult3Available.js
│   │   │   ├── LastFranceTravelDetails.js
│   │   │   ├── Lastname.js
│   │   │   ├── MainSubjects.js
│   │   │   ├── Nationality.js
│   │   │   ├── OtherLanguageLevel.js
│   │   │   ├── OtherSpokenLanguage.js
│   │   │   ├── PassportDetails.js
│   │   │   ├── PhoneNumber.js
│   │   │   ├── ProgramDomain.js
│   │   │   ├── RecentDegree.js
│   │   │   ├── RecentLevel.js
│   │   │   ├── RecentLevelHighSchool.js
│   │   │   ├── RecentLevelUniversity.js
│   │   │   ├── ReportCard1.js
│   │   │   ├── ReportCard2.js
│   │   │   ├── ReportCard3.js
│   │   │   ├── ResidentCountry.js
│   │   │   ├── Salutation.js
│   │   │   ├── SchoolLevel.js
│   │   │   ├── SchoolYear1.js
│   │   │   ├── SchoolYear2.js
│   │   │   ├── SchoolYear3.js
│   │   │   ├── Validation.js
│   │   │   ├── VisaType.js
│   │   │   └── WorkExperienceDetails.js
│   │   ├── api
│   │   │   └── simulation
│   │   │       ├── home.js
│   │   │       └── result.js
│   │   ├── ressources
│   │   │   ├── AboutUs.js
│   │   │   ├── FormSuccess.js
│   │   │   ├── ImmigrateToCanada.js
│   │   │   ├── KeepInTouch.js
│   │   │   ├── ScholarshipProgramCA.js
│   │   │   ├── ScholarshipProgramFR.js
│   │   │   ├── StudyInFrance.js
│   │   │   ├── WendogoCost.js
│   │   │   ├── WendogoMission.js
│   │   │   ├── WendogoPrivacy.js
│   │   │   └── WorkPermitStep.js
│   │   ├── simulation
│   │   │   ├── country
│   │   │   │   └── selection.js
│   │   │   ├── engine.js
│   │   │   └── home.js
│   │   ├── Appointment.js
│   │   ├── CGU.js
│   │   ├── Congratulation.js
│   │   ├── Contact.js
│   │   ├── CredentialEnd.js
│   │   ├── CredentialStart.js
│   │   ├── Error.js
│   │   ├── LegalNotice.js
│   │   ├── NotFound.js
│   │   ├── VerificationWhatsapp.js
│   │   ├── WaitingList.js
│   │   ├── _app.js
│   │   ├── _document.js
│   │   └── index.js
│   ├── redux
│   │   ├── errorPageSlice.jsx
│   │   ├── modalslice.jsx
│   │   ├── premiereClassSlice.jsx
│   │   ├── progressBarStepSlice.jsx
│   │   ├── simulationStepSlice.jsx
│   │   ├── spinnerslice.jsx
│   │   ├── store.jsx
│   │   ├── universitySlice.jsx
│   │   ├── userLevelSlice.jsx
│   │   └── userslice.jsx
│   ├── store
│   │   ├── apis
│   │   │   ├── academicYearOrganizationApi.js
│   │   │   ├── bacApi.js
│   │   │   ├── countryApi.js
│   │   │   ├── degreeApi.js
│   │   │   ├── init.js
│   │   │   ├── leadApi.js
│   │   │   ├── leadstatusApi.js
│   │   │   ├── levelApi.js
│   │   │   ├── levelValueApi.js
│   │   │   ├── majorApi.js
│   │   │   ├── markSystemApi.js
│   │   │   ├── nationalityApi.js
│   │   │   ├── schoolApi.js
│   │   │   ├── schoolYearApi.js
│   │   │   ├── spokenLanguageApi.js
│   │   │   ├── subjectWeightSystemApi.js
│   │   │   ├── userApi.js
│   │   │   └── visaTypeApi.js
│   │   └── index.js
│   ├── utils
│   │   ├── Constants.js
│   │   ├── CountryCodes.js
│   │   ├── Helper.js
│   │   └── SvgConstant.js
│   ├── index.css
│   └── routes.js
├── .env.local
├── README.md
├── copilot
├── favicon.ico
├── file-structure-script.js
├── next.config.js
├── package-lock.json
├── package.json
├── tailwind.config.js
├── test.csv
├── test.js
├── test.txt
└── test1.js

18 directories, 177 files

```