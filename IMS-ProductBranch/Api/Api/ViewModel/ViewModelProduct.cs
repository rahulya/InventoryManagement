using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.ViewModel
{
    public class ViewModelProduct
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductCode { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(256)")]
        public string ProductDesc { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(50)")]
        public string UniqueName { get; set; }
        [Column(TypeName = "CHAR(5)")]
        public string ProductType { get; set; }
        public int? PrGroupCode { get; set; }
        public int? PrtSubGrpCode { get; set; }
        public int? PrGroupCode1 { get; set; }
        public int? PrGroupCode2 { get; set; }

        [Column(TypeName = "VARCHAR(5)")]
        public string Unit { get; set; }

        [Column(TypeName = "CHAR(2)")]
        public decimal? Factor { get; set; }

        [Column(TypeName = "CHAR(2)")]
        public string ValuationType { get; set; }


        [Column(TypeName = "VARCHAR(5)")]
        public string AltUnit { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Conv_Ratio { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Buy_Rate { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Sales_Rate { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Max_Stock { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Min_Stock { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Reorder_Level { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Reorder_Qty { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Product_Rate { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Product_MRP { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Trade_Price { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Min_Qty { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Min_Bonus { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Max_Qty { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Max_Bonus { get; set; }

        [Column(TypeName = "VARCHAR(256)")]
        public string AddProductDescription { get; set; }
        public bool? Product_Lock { get; set; }

        [Column(TypeName = "VARCHAR(max)")]
        public string Product_photo { get; set; }
        public string BarcodeName { get; set; }
        public DateTime? Action_Date { get; set; }
        public DateTime? Action_Time { get; set; }
        public string Action_Miti { get; set; }
        public string Action { get; set; }
        public DateTime? Document_Date { get; set; }

        [Column(TypeName = "VARCHAR(256)")]
        public string ProductImage_Name { get; set; }
        public DateTime? Warranty_Period { get; set; }

        public string PrGrpDesc { get; set; }

        public string PrSubGrpDesc { get; set; }

       public int PrSubGrpCode { get; set; }
    }
}
