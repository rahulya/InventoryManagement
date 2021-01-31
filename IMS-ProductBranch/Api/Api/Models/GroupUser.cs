using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class GroupUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        [Column(TypeName = "CHAR(4)")]
        public string GroupCode { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(250)")]
        public string GroupName { get; set; }

        [Required]
        public DateTime GroupCreateDate { get; set; }
        //get
        //{
        //    return GroupCreateDate;
        //}
        //set
        //{
        //    DateTime now = DateTime.Now;
        //}
        // }
    }
}
