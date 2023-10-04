import { products } from '../constants/Data.js'
import Product from '../model/product-schema.js'

export const defaultData = async () => {
    try {
        await Product.insertMany(products);
        console.log('products data inserted successfully');
    } catch (error) {
        console.log('error while inserting the product data : ', error.message)
    }
}

export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});

        return response.status(200).json(products);
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
}

export const getProductById = async (request, response) => {

    try {
        const id = request.params.id;
        const product = await Product.findOne({ 'id': id });

        return response.status(200).json(product);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}
