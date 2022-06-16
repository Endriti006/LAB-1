using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Rezervimi
    {
        public int RezervimId { get; set; }
        public string fullName { get; set; }
        public string DataeRezervimit { get; set; }

        public string Tavolina { get; set; }

    }
}
