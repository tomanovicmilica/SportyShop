using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }
        public ProductItemOrdered? ItemOrdered { get; set; }

        public string? Size { get; set; }

        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}