// const convertPublicId = require('../utils/convertPublicId');
// const removeVietnameseTones = require('../utils/removeVietnameseTones');

const UsersDemo = require("../db/users");
const UserRepository = require("./user");

const createUsers = async () => {
  try {
    let payload = await UserRepository.find({page: 1, limit: 10});

    if (payload.docs.length === 0) {
      console.log('Users empty');

      let temp = 0
      for (let i=0; i<UsersDemo.length; i++) {
        let item = UsersDemo[i]
        item.password = '12345678'
        let user = await UserRepository.create(item)
        if (user) {
          temp++
        }
      }
      
      if (temp === UsersDemo.length) {
        console.log(`Users created: ${temp}`);
      } else {
        console.log(`Create users failed`);
      }
    } else {
      console.log('Users exists');
    }

    payload = await UserRepository.find({page: 1, limit: 10});

    return payload;
  } catch (error) {
    throw error;
  }
};

const create = async () => {
  let users = await createUsers()
  
  let payload = {
    users
  }

  return payload
}

const DBRepository = {
  create
}

module.exports = DBRepository

// module.exports.createPosts = async () => {
//   try {
//     let payload = await PostsRepository.find(1, 10);

//     if (payload.docs.length === 0) {
//       console.log('Posts collection empty');
//       const users = await UsersRepository.find(1, 10);

//       Promise.all(
//         dbPosts.map(
//           (item) =>
//             new Promise((resolve, reject) => {
//               let newItem = { ...item };
//               newItem.user =
//                 users.docs[Math.floor(Math.random() * users.docs.length)]._id;
//               newItem.attachments = [
//                 dbImages[Math.floor(Math.random() * dbImages.length)],
//               ];

//               let public_id = convertPublicId(
//                 removeVietnameseTones(newItem.title),
//               );
//               newItem.public_id = public_id;

//               PostsRepository.create(newItem)
//                 .then((res) => resolve(res))
//                 .catch((err) => reject(err));
//             }),
//         ),
//       )
//         .then((res) =>
//           console.log(`Posts created ${res.length}/${dbUsers.length}`),
//         )
//         .catch((err) => console.log('Create Posts collection failed: ', err));

//       payload = await PostsRepository.find(1, 10);
//     } else {
//       console.log('Posts collection created');
//     }

//     return payload;
//   } catch (error) {
//     console.log('Create Posts collection failed: ', error);
//     throw error;
//   }
// };

// module.exports.updatePosts = async () => {
//   try {
//     const usersPayload = await UsersRepository.find(1, dbUsers.length);
//     let postsPayload = await PostsRepository.find(1, dbPosts.length);

//     for (const item of postsPayload.docs) {
//       let newItem = item;

//       // update likes
//       const likesCount = Math.floor(Math.random() * postsPayload.docs.length);
//       if (newItem.likes.length === 0 && likesCount > 0) {
//         for (let i = 0; i < likesCount; i++) {
//           newItem.likes.push(usersPayload.docs[i]._id);
//         }
//       }

//       // update shares
//       const sharesCount = Math.floor(Math.random() * postsPayload.docs.length);
//       if (newItem.shares.length === 0 && sharesCount > 0) {
//         for (let i = 0; i < sharesCount; i++) {
//           newItem.shares.push(usersPayload.docs[i]._id);
//         }
//       }

//       // // update comments
//       // const commentsCount = Math.floor(Math.random() * dbComments.length);
//       // if (newItem.comments.length === 0 && commentsCount > 0) {
//       //   for (let i = 0; i < commentsCount; i++) {
//       //     const comment = {
//       //       content:
//       //         dbComments[Math.floor(Math.random() * dbComments.length)].content,
//       //       timestamps: new Date(),
//       //       user:
//       //         usersPayload.docs[
//       //           Math.floor(Math.random() * usersPayload.docs.length)
//       //         ]._id,
//       //     };
//       //     newItem.comments.push(comment);
//       //   }
//       // }

//       await PostsRepository.update(newItem._id, newItem);
//     }
//     console.log('Update Posts collection successfully!');

//     postsPayload = await PostsRepository.find(1, 5);
//     return postsPayload;
//   } catch (error) {
//     console.log('Update Posts collection failed: ', error);
//     throw error;
//   }
// };

// module.exports.createConversations = async () => {
//   try {
//     let payload = await ConversationsRepository.find(1, 10);

//     if (payload.docs.length === 0) {
//       const usersPayload = await UsersRepository.find(1, dbUsers.length);

//       for (let i = 0; i < 99; i++) {
//         const model = {
//           users: [
//             usersPayload.docs[0]._id,
//             usersPayload.docs[
//               Math.floor(Math.random() * usersPayload.docs.length - 1) + 1
//             ]._id,
//           ],
//         };
//         await ConversationsRepository.create(model);
//       }

//       payload = await ConversationsRepository.find(1, 10);
//       console.log('Create Conversations collection successfully!');
//     } else {
//       console.log('Conversations collection created');
//     }

//     return payload;
//   } catch (error) {
//     console.log('Create Conversations collection failed: ', error);
//     throw error;
//   }
// };

// module.exports.createMessages = async () => {
//   try {
//     let conversationsPayload = await ConversationsRepository.find(1, 99);
//     let payload = await MessagesRepository.find(1, 10);

//     if (payload.docs.length === 0) {
//       for (const item of conversationsPayload.docs) {
//         const count = Math.floor(Math.random() * 50);
//         for (let i = 0; i < count; i++) {
//           const model = {
//             conversation: item._id,
//             user: item.users[Math.floor(Math.random() * item.users.length)]._id,
//             content:
//               dbMessages[Math.floor(Math.random() * dbMessages.length)].content,
//           };
//           await MessagesRepository.create(model);
//         }
//       }

//       payload = await MessagesRepository.find(1, 10);
//       console.log('Create Messages collection successfully!');
//     } else {
//       console.log('Messages collection created');
//     }

//     return payload;
//   } catch (error) {
//     console.log('Create Messages collection failed: ', error);
//     throw error;
//   }
// };
