import ApiError from '~/middlewares/ApiError'
import Chat from '~/models/chat'

const accessChat = async (myID, chatDetails, userID) => {
  const { users, chatName, isGroupChat } = chatDetails
  if (isGroupChat) {
    if (!Array.isArray(users) || users.length < 2) throw new ApiError(400, 'Nhóm chat phải có ít nhất 2 người dùng')
    const isNotInGroup = users.some((user) => user === myID)
    if (isNotInGroup) throw new ApiError(403, 'Bạn không có quyền truy cập nhóm này')

    const groupChat = await Chat.findOneAndUpdate(
      {
        isGroupChat: true,
        chatName,
        users: { $all: users }
      },
      { $setOnInsert: { groupAdmin: myID } },
      { new: true, upsert: true }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')

    return groupChat // Trả về nhóm chat
  } else {
    // const chat = await Chat.findOneAndUpdate(
    //   {
    //     isGroupChat: false,
    //     users: { $all: [myID, userID] } // Sử dụng $all để kiểm tra cả hai user trong mảng
    //   },
    //   { $setOnInsert: { chatName: null } }, // Chỉ cần cập nhật nếu tạo mới
    //   { new: true, upsert: true } // Trả về document mới nếu được tạo
    // )
    //   .populate('users', '-password') // Lấy danh sách người dùng mà không có password
    //   .populate('latestMessage') // Lấy tin nhắn mới nhất

    // Tìm cuộc trò chuyện 1-1
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [myID, userID] }
    })
      .populate('users', 'fullname avatar')
      .populate('latestMessage')

    // Nếu không tìm thấy, tạo cuộc trò chuyện mới
    if (!chat) {
      chat = await Chat.create({
        chatName: null,
        isGroupChat: false,
        users: [myID, userID]
      }).populate('users', 'fullname avatar')
    }
    return chat
  }
}

const createGroupChat = async (myID, users, chatName) => {
  if (!users || users.length < 2) throw new ApiError(400, 'Nhóm phải có ít nhất 2 người')

  users.push(myID) // Thêm người tạo nhóm vào danh sách

  const groupChat = await Chat.create({
    chatName,
    isGroupChat: true, // Đây là cuộc trò chuyện nhóm
    users: users,
    groupAdmin: myID
  })

  const fullGroupChat = await Chat.findById(groupChat._id).populate('users', '-password').populate('groupAdmin', '-password')
  return fullGroupChat
}

const getChats = async (myID) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: myID } }
  })
    .populate('users', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1 })

  return chats
}

export const chatService = {
  accessChat,
  createGroupChat,
  getChats
}
