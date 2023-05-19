using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Dto
{
    public class ProductSizeDto
    {
        public Size? Size { get; set; }
        public int SizeId { get; set; }

        public Product? Product { get; set; }
        public int ProductId { get; set; }

         public int QuantityInStock { get; set; }

    }

    public class UpdateProductSizeDto : ProductSizeDto {

        
        public int Id { get; set; }

        
    }
}