using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class UpdatePaymentMethodDto
    {
        public string? Method { get; set; }

        public string? Details { get; set; }
    }
}