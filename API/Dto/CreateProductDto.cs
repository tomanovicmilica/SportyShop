using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class CreateProductDto
    {
        [Required]
        public string? Name { get; set; }
        
        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Price { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public string? ImageUrl { get; set; }

        public int ProductTypeId { get; set; }

        public int BrandId { get; set; }

        [Required]
        public int QuantityInStock { get; set; }
    }
}