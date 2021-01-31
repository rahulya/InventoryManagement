using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.ApiBusinessLogic.DatabaseModel
{
    public class GeneralLedger
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Gl_Code { get; set; }
        public string Gl_Desc { get; set; }
        public string Gl_ShortName { get; set; }
        public string Gl_Category { get; set; }
        public string Ac_GrpCode { get; set; }
        public string Ac_SGrpCode { get; set; }
        public string Cash_Bank { get; set; }
        public string Cash_Book { get; set; }
        public string SubLedger { get; set; }
        public string DocAdjust { get; set; }
        public string Area_Code { get; set; }
        public string Agent_Code { get; set; }
        public string Credit_Limit { get; set; }
        public int Credit_Day { get; set; }
        public decimal Rate_Of_Intrest { get; set; }
        public string Gl_Adress { get; set; }
        public string Gl_City { get; set; }
        public string Gl_State { get; set; }
        public string Gl_Country { get; set; }
        public string Gl_Phone_Office { get; set; }
        public string Gl_Phone_Res { get; set; }
        public string Gl_Fax { get; set; }
        public string Gl_Email { get; set; }
        public string Gl_PanNo { get; set; }
        public string Contact_Person { get; set; }
        public string Cr_Code { get; set; }
        public int Scheme_Group_Id { get; set; }
        public decimal TurnOverAmt { get; set; }
        public string GlLock { get; set; }
        public string Temp_Gl_Code { get; set; }
        public string TINNo { get; set; }
        public string TANNo { get; set; }
        public string ServiceTaxNo { get; set; }
        public string GSTNo { get; set; }
        public string CSTNo { get; set; }
        public string ExciseRCNo { get; set; }
        public int ChequeRecDay { get; set; }
        public string Scheme_Code { get; set; }
        public string Source_Module { get; set; }
        public string DL_No { get; set; }
        public string Bill_RateOn { get; set; }
        public string Class_Code { get; set; }
        public string Class_Code1 { get; set; }
        public string Class_Code2 { get; set; }
        public DateTime Action_Date { get; set; }
        public DateTime Action_Time { get; set; }
        public string Action_Miti { get; set; }
        public string Action { get; set; }
        public string Document_Date { get; set; }
        public string CreditBal { get; set; }
        public string Creditday { get; set; }

        public string CountryCode { get; set; }
        public string MobileNo { get; set; }
        public string MobileNo1 { get; set; }
        public string MobileNo2 { get; set; }
        public decimal BankGuarntee { get; set; }
        public decimal CashDeposit { get; set; }
        public string Gl_Authorize_Type { get; set; }
        public string Gl_Authorize_Remarks { get; set; }
        public string Gl_Authorize_By { get; set; }
        public DateTime Gl_Authorize_Date { get; set; }
        public DateTime LReconcileDate { get; set; }

        //account group
        public string Ac_Desc { get; set; }
        //Account_Sub_Group 
        public string Ac_SGrpDesc { get; set; }

        // agent
        public string Agent_Desc { get; set; }
        //aarea
        public string Area_Desc { get; set; }

        public string  Sno { get; set; }





    }
}
