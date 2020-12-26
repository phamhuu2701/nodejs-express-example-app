const PostsDemo = require("../db/posts");
const UsersDemo = require("../db/users");
const convertPublicId = require("../utils/convertPublicId");
const removeVietnameseTones = require("../utils/removeVietnameseTones");
const PostRepository = require("./post");
const UserRepository = require("./user");

const createUsers = async () => {
  try {
    let payload = await UserRepository.find({page: 1, limit: 1});
    if (payload.docs.length === 0) {
      console.log('Users empty');

      let temp = 0
      for (let i=0; i<UsersDemo.length; i++) {
        let item = UsersDemo[i]
        item.password = '123123123'
        let user = await UserRepository.create(item)
        if (user) {
          temp++
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

    payload = await UserRepository.find({page: 1, limit: 1});
    return payload;
  } catch (error) {
    throw error;
  }
};

const CATEGORIES = [
  '',
  'society',
  'world',
  'education',
  'business',
  'technology',
  'startup',
  'health',
  'sport',
  'entertainment',
  'life',
  'travel',
  'vehicle',
]

const createPosts = async () => {
  try {
    let payload = await PostRepository.find({page: 1, limit: 1});
    if (payload.docs.length === 0) {
      console.log('Posts empty');

      let temp = 0
      for (let i=0; i<PostsDemo.length; i++) {
        let item = PostsDemo[i]
        item.type = 'post'
        item.category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
        item.likes = Math.floor(Math.random() * 10000000)
        item.comments = Math.floor(Math.random() * 10000000)
        item.shares = Math.floor(Math.random() * 10000000)
        item.views = Math.floor(Math.random() * 10000000)
        
        item.attachments = [
          `https://source.unsplash.com/random/400x300?sig=${Math.floor(Math.random() * 1000)}`,
          `https://source.unsplash.com/random/400x300?sig=${Math.floor(Math.random() * 1000)}`,
          `https://source.unsplash.com/random/400x300?sig=${Math.floor(Math.random() * 1000)}`,
          `https://source.unsplash.com/random/400x300?sig=${Math.floor(Math.random() * 1000)}`,
          `https://source.unsplash.com/random/400x300?sig=${Math.floor(Math.random() * 1000)}`,
        ]

        item.hashtags = [
          `hashtag-${Math.floor(Math.random() * 1000)}`,
          `hashtag-${Math.floor(Math.random() * 1000)}`,
        ]

        item.publicId = convertPublicId(removeVietnameseTones(item.title));

        let user = await UserRepository.findByEmail('admin@gmail.com')
        if (user) {
          item.user = user._id
        }

        let post = await PostRepository.create(item)
        if (post) {
          temp++
        }
      }
      
      if (temp === PostRepository.length) {
        console.log(`Posts created: ${temp}/${PostRepository.length}`);
      } else {
        console.log(`Create Posts failed`);
      }
    } else {
      console.log('Posts exists');
      return payload;
    }

    payload = await PostRepository.find({page: 1, limit: 1});
    return payload;
  } catch (error) {
    throw error;
  }
};

const create = async () => {
  let users = await createUsers()
  let posts = await createPosts()
  
  let payload = {
    users,
    posts
  }

  return payload
}

const DBRepository = {
  create
}

module.exports = DBRepository