using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ProductGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PrGroupCode { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(50)")]
        public string PrGrpDesc { get; set; }
        public string PrGrpShortName { get; set; }
        public bool PrGroupLock { get; set; }
        public bool PrGroupActive { get; set; }

        public ICollection<Product> Products { get; set; }

    }
}
