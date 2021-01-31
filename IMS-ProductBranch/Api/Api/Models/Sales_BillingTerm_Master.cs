using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Sales_BillingTerm_Master
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public string ST_Code { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(3)")]
        public string ST_ShortName { get; set; }
        [Required]
        [Column(TypeName ="VARCHAR(50)")]
        public string ST_Desc { get; set; }
        [Column(TypeName = "VARCHAR(10)")]
        public string Gl_Code { get; set; }

        [Column(TypeName = "CHAR(1)")]
        public string ST_Basis { get; set; }
        [Required]
        [Column(TypeName = "CHAR(1)")]
        public string St_ProductBasic { get; set; }

        [Column(TypeName = "CHAR(1)")]
        public string ST_Sign { get; set; }

        [Column(TypeName = "CHAR(1)")]
        public string ST_ProductWise { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(1)")]
        public string ST_Category { get; set; }

        [Column(TypeName = "CHAR(1)")]
        public string ST_Profibality { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(256)")]
        public string ST_Formula { get; set; }

        [Column(TypeName = "decimal(16 ,6)")]
        public decimal ST_Rate { get; set; }
        [Required]
        [Column(TypeName = "CHAR(1)")]
        public string DecimalType { get; set; }
        [Column(TypeName = "CHAR(1)")]
        public string ST_SupressZero { get; set; }

        [Required]
      
        [Column(TypeName = "CHAR(1)")]
        public string margin { get; set; }
    }
}
