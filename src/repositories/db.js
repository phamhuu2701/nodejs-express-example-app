const UsersRepository = require('./user');
const ProductColorsRepository = require('./productColor');
const ProductSizesRepository = require('./productSize');

const { UsersDemo } = require('../db/users');
const { ProductColorsDemo } = require('../db/productColors');
const { ProductSizesDemo } = require('../db/productSize');

const createUsers = async () => {
  try {
    let payload = await UsersRepository.find({ page: 1, limit: 1 });
    if (payload.docs.length === 0) {
      console.log('Users empty');
      console.log('Users creating..');

      let temp = 0;
      for (let i = 0; i < UsersDemo.length; i++) {
        let item = UsersDemo[i];
        item.password = '123123123';
        let user = await UsersRepository.create(item);
        if (user) {
          temp++;
        }
      }

      if (temp === UsersDemo.length) {
        console.log(`Users created: ${temp}/${UsersDemo.length}`);
      } else {
        console.log(`Create Users failed`);
      }
    } else {
      console.log('Users exists');
      return payload;
    }

    payload = await UsersRepository.find({ page: 1, limit: 1 });
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
      console.log('ProductColors empty');
      console.log('ProductColors creating..');

      let temp = 0;
      for (let i = 0; i < ProductColorsDemo.length; i++) {
        let item = ProductColorsDemo[i];
        let color = await ProductColorsRepository.create(item);
        if (color) {
          temp++;
        }
      }

      if (temp === ProductColorsDemo.length) {
        console.log(`ProductColors created: ${temp}/${ProductColorsDemo.length}`);
      } else {
        console.log(`Create ProductColors failed`);
      }
    } else {
      console.log('ProductColors exists');
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
      console.log('ProductSizes empty');
      console.log('ProductSizes creating..');

      let temp = 0;
      for (let i = 0; i < ProductSizesDemo.length; i++) {
        let item = ProductSizesDemo[i];
        let color = await ProductSizesRepository.create(item);
        if (color) {
          temp++;
        }
      }

      if (temp === ProductSizesDemo.length) {
        console.log(`ProductSizes created: ${temp}/${ProductSizesDemo.length}`);
      } else {
        console.log(`Create ProductSizes failed`);
      }
    } else {
      console.log('ProductSizes exists');
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
    let productColors = await createProductColors();
    let productSizes = await createProductSizes();

    let payload = {
      users,
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
