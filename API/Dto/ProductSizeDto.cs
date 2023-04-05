using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Dto
{
    public class ProductSizeDto
    {
        public int SizeId { get; set; }

        public int ProductId { get; set; }

         public int QuantityInStock { get; set; }

    }
}