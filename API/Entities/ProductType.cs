using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ProductType
    {
        [Key]
        public int ProductTypeId { get; set; }

        public string? Name { get; set; }
    }
}