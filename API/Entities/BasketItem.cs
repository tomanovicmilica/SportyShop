using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class BasketItem
    {
        [Key]
        public int BasketItemId { get; set; }

       // [ForeignKey("Basket")]
        public Basket? Basket { get; set; }
        public int BasketId { get; set; }

       // [ForeignKey("Product")]
        public Product? Product { get; set; }
        public int ProductId { get; set; }
        
        public int Quantity { get; set; }
    }
}