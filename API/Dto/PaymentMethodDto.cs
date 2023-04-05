using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class PaymentMethodDto
    {
        [Required]
        public string? Method { get; set; }

        public string? Details { get; set; }
    }
}