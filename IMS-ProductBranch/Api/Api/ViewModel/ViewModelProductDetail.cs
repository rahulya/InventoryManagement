using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.ViewModel
{
    public class ViewModelProductDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int  ProductCode { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(256)")]
        public string ProductDesc { get; set; }


        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Buy_Rate { get; set; }

        [Column(TypeName = "decimal(16 ,4)")]
        public decimal? Sales_Rate { get; set; }
    }
}
