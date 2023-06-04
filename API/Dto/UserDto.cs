using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class UserDto
    {
        public string? Email { get; set; }
        public string? Token { get; set; }
        public BasketDto? Basket { get; set; }

        public string? Name { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber {get; set;}

        
    }

    
}