using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ProductSize
    {
        //[ForeignKey("Size")]
        public Size? Size { get; set; }
        public int Id { get; set; }

       // [ForeignKey("Product")]
        public Product? Product { get; set; }
        public int ProductId { get; set; }

         public int QuantityInStock { get; set; }

        
    }
}