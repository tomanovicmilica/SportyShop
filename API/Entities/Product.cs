using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        public string? Name { get; set; }

        public long Price { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

       // [ForeignKey(nameof(ProductType))]
        public ProductType? ProductType { get; set; }
        public int ProductTypeId { get; set; }

       // [ForeignKey(nameof(Brand))]
        public Brand? Brand { get; set; }
        public int BrandId { get; set; }

        public List<ProductSize> ProductSizes { get; set; } = new List<ProductSize>();

         public void AddItem(Product product, Size size, int quantity)
        {
            if (ProductSizes.All(prSize => prSize.ProductId != product.ProductId && prSize.Id != size.Id))
            {
                ProductSizes.Add(new ProductSize { Product = product, Size = size, QuantityInStock = quantity });
                return;
            }

            var existingItem = ProductSizes.FirstOrDefault(prSize => prSize.ProductId == product.ProductId && prSize.Id == size.Id);
            if (existingItem != null) existingItem.QuantityInStock += quantity;
        }

    }
}