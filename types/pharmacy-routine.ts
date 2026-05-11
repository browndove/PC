/** Pharmacy Council routine inspection — form drafts (Parts I–V). */

export type VisitOrder = '1' | '2' | '3' | null;

export type FacilityTypeId =
  | 'retail'
  | 'wholesale'
  | 'wholesale_retail'
  | 'manufacturing_wholesale'
  | null;

export type PharmacyRoutinePart1Draft = {
  facilityName: string;
  region: string;
  mmda: string;
  facilityType: FacilityTypeId;
  signboard: boolean | null;
  conformsToStandards: boolean | null;
  facilityRegistered: boolean | null;
  licenseValid: boolean | null;
  licenseDisplayed: boolean | null;
  atLicensedLocation: boolean | null;
  visitOrder: VisitOrder;
  inspectorComment: string;
};

export type OtherPharmacistRow = {
  name: string;
  regNo: string;
  designation: string;
  qualification: string;
  present: boolean | null;
  nameTag: boolean | null;
};

export type TechOrMcaRow = {
  name: string;
  registration: boolean | null;
  pin: string;
  qualification: string;
  present: boolean | null;
  dressNameTag: string;
};

export type PharmacyRoutinePart2Draft = {
  superintendentName: string;
  superintendentRegNo: string;
  superintendentPresent: boolean | null;
  superintendentNameTag: boolean | null;
  otherPharmacists: OtherPharmacistRow[];
  technicians: TechOrMcaRow[];
  mcas: TechOrMcaRow[];
  pharmacistAbsentInChargeName: string;
  pharmacistAbsentInChargeQualification: string;
};

export type TriState = 'na' | 'yes' | 'no' | null;

export type PharmacyRoutinePart5Draft = {
  remarks: string;
  improvementPlans: string;
  inspector1Name: string;
  inspector2Name: string;
  inspector3Name: string;
  teamLeaderSignature: string;
  inspectionDate: string;
  timeIn: string;
  responsibleStaffName: string;
  responsibleDesignation: string;
  responsibleSignature: string;
  responsibleMobile: string;
  responsibleEmail: string;
  timeOut: string;
};
