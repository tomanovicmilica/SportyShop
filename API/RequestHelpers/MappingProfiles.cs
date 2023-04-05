using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {

            CreateMap<CreateProductDto, Product>();
            CreateMap<CreateProductTypeDto, ProductType>();
            CreateMap<CreateBrandDto, Brand>();
            CreateMap<SizeDto,Size>();
            CreateMap<ProductSizeDto, ProductSize>();
            CreateMap<PaymentMethodDto, PaymentMethod>();

        }
    }
}