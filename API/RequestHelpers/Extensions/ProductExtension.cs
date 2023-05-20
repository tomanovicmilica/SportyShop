using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers.Extensions
{
    public static class ProductExtension
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy) {
            
             if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

             query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(n => n.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name!.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brand, string type)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if (!string.IsNullOrEmpty(brand))
                brandList.AddRange(brand.ToLower().Split(",").ToList());

            if (!string.IsNullOrEmpty(type))
                typeList.AddRange(type.ToLower().Split(",").ToList());

            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand!.Name!.ToLower()));

            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.ProductType!.Name!.ToLower()));

            return query;
        }
     public static IQueryable<UpdateProductDto> ProjectProductSizeToProduct(this IQueryable<Product> query) {
            return query 
                .Select(p => new UpdateProductDto {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Price = p.Price,
                    Description = p.Description,
                    ProductTypeId = p.ProductTypeId,
                    ProductType = p.ProductType,
                    BrandId = p.BrandId,
                    Brand = p.Brand,
                    ImageUrl = p.ImageUrl,
                    ProductSizes = p.ProductSizes.Select(pSize => new ProductSizeDto {
                        Product = pSize.Product,
                        ProductId = pSize.ProductId,
                        Size = pSize.Size,
                        SizeId = pSize.SizeId,
                        QuantityInStock = pSize.QuantityInStock
                    }).ToList()
                }).AsNoTracking();
     }

     public static IQueryable<UpdateProductSizeDto> ProjectSizeToProductSize(this IQueryable<ProductSize> query) {


        return query
            .Select(s => new UpdateProductSizeDto {
                Id = s.Id,
                SizeId = s.SizeId,
                Size = s.Size,
                ProductId = s.ProductId,
                Product = s.Product,
                QuantityInStock = s.QuantityInStock
            }).AsNoTracking();
     }

    public static IQueryable<UpdateSizeDto> ProjectSizeToSize(this IQueryable<Size> query) {


        return query
            .Select(s => new UpdateSizeDto {
                Id = s.Id,
                SizeOfProduct = s.SizeOfProduct,
                ProductSizes = s.ProductSizes.Select(pSize => new ProductSizeDto {
                        ProductId = pSize.ProductId,
                        SizeId = pSize.SizeId,
                        QuantityInStock = pSize.QuantityInStock
                    }).ToList()
            }).AsNoTracking();
     }
    
    }
}