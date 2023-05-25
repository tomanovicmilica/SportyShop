import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required(),
    brandId: yup.number().required(),
    productTypeId: yup.number().required(),
    price: yup.number().required().moreThan(100),
   // quantityInStock: yup.number().required().min(0),
    description: yup.string().required(),
    /*file: yup.mixed().when("imageUrl", 
    {
        is : (value: string) => !value,
        then: yup.mixed().required('Please provide an image') as any
    })*/
});