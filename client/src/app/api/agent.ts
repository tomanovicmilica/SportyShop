import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = 'http://localhost:5053/api/';
axios.defaults.withCredentials = true;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403: 
            toast.error('You are not allowed to do that!');
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
    }

    return Promise.reject(error.response);

})

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData;
}

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (productId: number) => requests.get(`products/${productId}`),
    fetchFilters: () => requests.get('products/filters'),
    fetchBrands: () => requests.get('brands')
}


const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1, size: string) => requests.post(`basket?productId=${productId}&quantity=${quantity}&size=${size}`, {}),
    removeItem: (productId: number, size: string, quantity = 1) => requests.delete(`basket?productId=${productId}&size=${size}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress'),
    updateUser: (user: any) => requests.putForm('account', createFormData(user))
}

const ProductSize = {
    getSizes: () => requests.get('productSize'),
    getSize: (productSizeId: number) => requests.get(`productSize/${productSizeId}`)
}

const Orders = {
    list: () => requests.get('order'),
    fetch: (id: number) => requests.get(`order/${id}`),
    create: (values: any) => requests.post('order', values),
    listAll: () => requests.get('order/orders')
}

const Payments = {
    createPaymentIntent: () => requests.post('payments', {})
}

const Admin = {
    createProduct: (product: any) => requests.postForm('products', createFormData(product)),
    updateProduct: (product: any) => requests.putForm('products', createFormData(product)),
    deleteProduct: (id: number) => requests.delete(`products/${id}`),
    createBrand: (brand: any) => requests.postForm('brand', createFormData(brand)),
    createProductType: (productType: any) => requests.postForm('productType', createFormData(productType)),
    deleteBrand: (id: number) => requests.delete(`brand/${id}`),
    deleteProductType: (id: number) => requests.delete(`productType/${id}`),
    createSize:(size: any) => requests.postForm('size', createFormData(size)),
    createProductSize:(productSize: any) => requests.postForm('productSize', createFormData(productSize)),
    deleteProductSize:(id: number) => requests.delete(`productSize/${id}`),
    updateProductSize: (productSize: any) => requests.putForm('productSize', createFormData(productSize))
}

const Brand = {
    list: () => requests.get('brand'),
    fetch: (id: number) => requests.get(`brand/${id}`),
    create: (values: any) => requests.post('brand', values)
}

const ProductType = {
    list: () => requests.get('productType'),
    fetch: (id: number) => requests.get(`productType/${id}`),
    create: (values: any) => requests.post('productType', values)
}

const Size ={
    list: () => requests.get('size')
}

const agent = {
    Catalog,
    Basket,
    Account,
    ProductSize,
    Orders, 
    Payments,
    Admin,
    Brand,
    ProductType,
    Size
}

export default agent;