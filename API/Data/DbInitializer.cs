using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager) {
            
              if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "milica",
                    Email = "milica@test.com"
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
        }

        if (context!.ProductTypes!.Any()) return;

        var types = new List<ProductType> {

            new ProductType {
                ProductTypeId = 1,
                Name = "Sneakers"
            },
            new ProductType {
                ProductTypeId = 2,
                Name = "Hoodie"
            },
        };

        if (context!.Brands!.Any()) return;

        var brands = new List<Brand> {

            new Brand {
                BrandId = 1,
                Name = "Nike"
            },
            new Brand {
                BrandId = 2,
                Name = "Adidas"
            },
        };

        if (context!.Products!.Any()) return;

         var products = new List<Product>
            {
                new Product
                {
                    Name = "Nike Air Force",
                    Price = 12000,
                    Description = "White Nike Air Force 1 sneakers",
                    ImageUrl = "/images/products/sneakers1.png",
                    ProductTypeId = 1,
                    BrandId = 1,
                },
                new Product
                {
                    Name = "Black Hoodie A",
                    Price = 6000,
                    Description = "White Nike Air Force 1 sneakers",
                    ImageUrl = "/images/products/hoodie1.png",
                    ProductTypeId = 2,
                    BrandId = 2,
                },
                new Product
                {
                    Name = "Blue sneakers Ad2",
                    Price = 11000,
                    Description = "Blue-white Adidas sneakers",
                    ImageUrl = "/images/products/sneakers1.png",
                    ProductTypeId = 1,
                    BrandId = 2,
                },
            };

              foreach (var product in products)
            {
                context!.Products!.Add(product);
            }

            foreach (var productType in types)
            {
                context!.ProductTypes!.Add(productType);
            }

            foreach (var brand in brands)
            {
                context!.Brands!.Add(brand);
            }

            context.SaveChanges();

    }
}

}