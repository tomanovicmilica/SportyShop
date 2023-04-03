using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PaymentMethod
    {
        [Key]
        public int MethodId { get; set; }

        public string? Method { get; set; }

        public string? Details { get; set; }
    }
}