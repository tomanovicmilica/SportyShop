using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Dto
{
    public class BasketItemDto
    {
        public int ProductId { get; set; }

        public string? Name { get; set; }

        public long Price { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public string? Size { get; set; }

        public int Quantity { get; set; }
    }
}