using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class AudioBooks
    {
        public int AudioBooksId { get; set; }
        public string AudioBooksName { get; set; }
        public string AudioBooksAuthor { get; set; }

        public string publishDate { get; set; }

        public string PhotoFileName { get; set; }

        public string Genre { get; set; }
    }
}
