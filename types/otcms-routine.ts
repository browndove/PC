/** OTCMS (Over-The-Counter Medicine Seller) routine inspection — form drafts. */

export type VisitOrder = '1' | '2' | '3' | null;

export type OtcmsRoutinePart1Draft = {
  facilityName: string;
  region: string;
  signboard: boolean | null;
  conformsToStandards: boolean | null;
  facilityRegistered: boolean | null;
  licenseValid: boolean | null;
  licenseDisplayed: boolean | null;
  atLicensedLocation: boolean | null;
  visitOrder: VisitOrder;
  inspectorComment: string;
};

export type OtcmsAssistantRow = {
  name: string;
  highestEducation: string;
  yearOfQualification: string;
  yearsInPractice: string;
  registeredWithCouncil: boolean | null;
};

export type OtcmsRoutinePart2Draft = {
  licenceHolderPresent: boolean | null;
  assistants: OtcmsAssistantRow[];
  absentInChargeName: string;
  absentInChargeQualification: string;
};

/** Part III — Yes/No checklist items. */
export type OtcmsChecklistDraft = {
  g_clean: boolean | null;
  g_light: boolean | null;
  g_vent: boolean | null;
  g_walls: boolean | null;
  g_floor: boolean | null;
  g_wash: boolean | null;
  r_sales: boolean | null;
  r_invoices: boolean | null;
  r_electronic: boolean | null;
  p_class_ab: boolean | null;
  p_substandard: boolean | null;
  w_book: boolean | null;
  w_proc: boolean | null;
};

export type ConfiscatedProductRow = {
  productName: string;
  quantity: string;
  batchNumber: string;
  expiryDate: string;
};

export type OtcmsRoutinePart3Draft = {
  checklist: OtcmsChecklistDraft;
  confiscated: ConfiscatedProductRow[];
  otcmsName: string;
  location: string;
  remarksAction: string;
  inspector1Name: string;
  inspector2Name: string;
  inspector3Name: string;
  teamLeaderSignature: string;
  inspectionDate: string;
  inspectionTime: string;
  licenceHolderName: string;
  licenceHolderSignature: string;
  mobile: string;
  email: string;
  acknowledgementDate: string;
};
