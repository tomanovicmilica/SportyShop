using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class BasketItemDto
    {
        public int ProductId { get; set; }

        public string? Name { get; set; }

        public long Price { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int SizeId { get; set; }

        public int Quantity { get; set; }
    }
}