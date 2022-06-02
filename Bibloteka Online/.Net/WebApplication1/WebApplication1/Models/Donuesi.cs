using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Donuesi
    {
        public int DonuesiId { get; set; }
        public string fullName { get; set; }

        public string EmriLibrat { get; set; }

        public string Vendbanimi { get; set; }

        public int nrLeternjoftim { get; set; }

        public string DitaEDorzimit { get; set; }
    }
}
