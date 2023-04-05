using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket) {

            return new BasketDto {
                BasketId = basket.BasketId,
                BuyerId = basket.UserId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product!.Name,
                    Price = item.Product.Price,
                    Description = item.Product.Description,
                    ImageUrl = item.Product.ImageUrl,
                    Quantity = item.Quantity
                }).ToList()
            };
            }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .Where(basket => basket.UserId == buyerId);
        }
        }
    }
