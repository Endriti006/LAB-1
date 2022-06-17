using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Kryesori
    {
        public int KryesoriId { get; set; }
        public string KryesoriName { get; set; }
        public int nrLeternjoftim { get; set; }

        public string DateOfJoining { get; set; }

        public string PhotoFileName { get; set; }
    }
}
