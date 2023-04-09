using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }

        
    }
}