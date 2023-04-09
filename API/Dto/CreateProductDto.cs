using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

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

        public ProductType? ProductType { get; set; }
        public int ProductTypeId { get; set; }

        public Brand? Brand { get; set; }
        public int BrandId { get; set; }

         public List<ProductSizeDto>? ProductSizes { get; set; }

    }

    public class UpdateProductDto : CreateProductDto 
    {
        public int ProductId { get; set; }
    }
}