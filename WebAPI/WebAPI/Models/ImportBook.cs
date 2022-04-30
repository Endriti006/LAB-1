using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class ImportBook
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string BookName { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string Sasia { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string authorName { get; set; }

        public int DataBotimit { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string Zhanra { get; set; }

        
    }
}
