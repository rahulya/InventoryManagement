using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ProductSubGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PrSubGrpCode { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(50)")]
        public string PrSubGrpDesc { get; set; }
        public int PrGroupCode { get; set; }
        public ICollection<Product> Products { get; set; }


    }
}
