"use client";

import { dummyCompanies } from "@/constants/dummyData";

import { GenericTable } from "@/components/reusable/table/GenericTable";
import { ICompany, ICompanyProfile } from "@/validations/CompanySchema";

import { companyColumns } from "@/constants/table-columns/companyColumn";

const CompanyManagementTable = () => {
  return (
    <div className="ml-64  h-[700px] p-10 gap-4 ">

      <GenericTable<ICompanyProfile, any>
        columns={companyColumns}
        data={dummyCompanies}
      />
    </div>
  );
};

export default CompanyManagementTable;
