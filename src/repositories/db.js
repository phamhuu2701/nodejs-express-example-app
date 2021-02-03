const UserRepository = require('./user');
const VendorRepository = require('./vendor');
const ProductRepository = require('./product');
const ProductColorsRepository = require('./productColor');
const ProductSizesRepository = require('./productSize');

const { UsersDemo } = require('../db/users');
const { VendorsDemo } = require('../db/vendors');
const { ProductsDemo } = require('../db/products');
const { ProductColorsDemo } = require('../db/productColors');
const { ProductSizesDemo } = require('../db/productSize');

const convertPublicId = require('../utils/convertPublicId');
const removeVietnameseTones = require('../utils/removeVietnameseTones');

const createUsers = async () => {
  try {
    let payload = await UserRepository.find({ page: 1, limit: 1 });
    if (payload.docs.length === 0) {
      console.log(`Users empty`);
      console.log(`Users creating..`);

      let temp = 0;
      for (let i = 0; i < UsersDemo.length; i++) {
        let item = UsersDemo[i];
        item.password = '123123123';
        let saved = await UserRepository.create(item);
        if (saved) {
          temp++;
        }
      }

      if (temp === UsersDemo.length) {
        console.log(`Users created: ${temp}/${UsersDemo.length}`);
      } else {
        console.log(`Create Users failed`);
      }
    } else {
      console.log(`Users exists`);
      return payload;
    }

    payload = await UserRepository.find({ page: 1, limit: 1 });
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createVendors = async () => {
  try {
    let payload = await VendorRepository.find({ page: 1, limit: 1 });
    if (payload.docs.length === 0) {
      console.log(`Vendors empty`);
      console.log(`Vendors creating..`);

      let temp = 0;
      for (let i = 0; i < VendorsDemo.length; i++) {
        let item = VendorsDemo[i];
        let saved = await VendorRepository.create(item);
        if (saved) {
          temp++;
        }
      }

      if (temp === VendorsDemo.length) {
        console.log(`Vendors created: ${temp}/${VendorsDemo.length}`);
      } else {
        console.log(`Create Vendors failed`);
      }
    } else {
      console.log(`Vendors exists`);
      return payload;
    }

    payload = await VendorRepository.find({ page: 1, limit: 1 });
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createProducts = async () => {
  try {
    let payload = await ProductRepository.find({ page: 1, limit: 1 });
    if (payload.docs.length === 0) {
      console.log(`Products empty`);
      console.log(`Products creating..`);

      let vendors = await VendorRepository.find({ page: 1, limit: 10 });

      let temp = 0;
      for (let i = 0; i < ProductsDemo.length; i++) {
        let item = ProductsDemo[i];
        item.title = item.title.slice(0, 200);
        item.description = item.description.slice(0, 2500);
        item.publishId = convertPublicId(removeVietnameseTones(item.title));
        item.metaTitle = item.title;
        item.metaDescription = item.description.slice(0, 300);
        item.metaUrl = item.publishId;
        item.sold = 0;
        item.status = 'Published';
        item.images = [
          'https://source.unsplash.com/random/400x400',
          'https://source.unsplash.com/random/400x300',
          'https://source.unsplash.com/random/300x400',
        ];
        item.tags = [
          `product-${Math.ceil(Math.random() * 1000)}`,
          `product-${Math.ceil(Math.random() * 1000)}`,
          `product-${Math.ceil(Math.random() * 1000)}`,
        ];
        item.vendor = vendors.docs[Math.floor(Math.random() * vendors.docs.length)]._id

        let saved = await ProductRepository.create(item);
        if (saved) {
          temp++;
        }
      }

      if (temp === ProductsDemo.length) {
        console.log(`Products created: ${temp}/${ProductsDemo.length}`);
      } else {
        console.log(`Create Products failed`);
      }
    } else {
      console.log(`Products exists`);
      return payload;
    }

    payload = await ProductRepository.find({ page: 1, limit: 1 });
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createProductColors = async () => {
  try {
    let payload = await ProductColorsRepository.find({ page: 1, limit: 1 });
    if (payload.docs.length === 0) {
      console.log(`ProductColors empty`);
      console.log(`ProductColors creating..`);

      let temp = 0;
      for (let i = 0; i < ProductColorsDemo.length; i++) {
        let item = ProductColorsDemo[i];
        let saved = await ProductColorsRepository.create(item);
        if (saved) {
          temp++;
        }
      }

      if (temp === ProductColorsDemo.length) {
        console.log(`ProductColors created: ${temp}/${ProductColorsDemo.length}`);
      } else {
        console.log(`Create ProductColors failed`);
      }
    } else {
      console.log(`ProductColors exists`);
      return payload;
    }

    payload = await ProductColorsRepository.find({ page: 1, limit: 1 });
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createProductSizes = async () => {
  try {
    let payload = await ProductSizesRepository.find({ page: 1, limit: 1 });
    if (payload.docs.length === 0) {
      console.log(`ProductSizes empty`);
      console.log(`ProductSizes creating..`);

      let temp = 0;
      for (let i = 0; i < ProductSizesDemo.length; i++) {
        let item = ProductSizesDemo[i];
        let saved = await ProductSizesRepository.create(item);
        if (saved) {
          temp++;
        }
      }

      if (temp === ProductSizesDemo.length) {
        console.log(`ProductSizes created: ${temp}/${ProductSizesDemo.length}`);
      } else {
        console.log(`Create ProductSizes failed`);
      }
    } else {
      console.log(`ProductSizes exists`);
      return payload;
    }

    payload = await ProductSizesRepository.find({ page: 1, limit: 1 });
    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async () => {
  try {
    let users = await createUsers();
    let vendors = await createVendors();
    let products = await createProducts();
    let productColors = await createProductColors();
    let productSizes = await createProductSizes();

    let payload = {
      users,
      vendors,
      products,
      productColors,
      productSizes,
    };

    return payload;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  create,
};
