export interface ICompany {
    name: string;
    email: string;
    companyWebsite: string;
    registrationCertificateNumber?: string;
    linkedInProfile?: string;
    phone: string;
    password: string;
    companyType: string;
    candidates?: object[];
    isVerified?: boolean;
    createdAt?:string;
    isBlocked?:boolean;
  }