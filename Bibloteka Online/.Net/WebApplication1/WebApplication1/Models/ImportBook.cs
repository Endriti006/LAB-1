using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class ImportBook
    {
        public int BookId { get; set; }
        public string BookName { get; set; }
        public string BookAuthor { get; set; }

        public string publishDate { get; set; }

        public string PhotoFileName { get; set; }

        public string Genre { get; set; }
    }
}


