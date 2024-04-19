import UserModel from "../../src/models/UserModel";
import VideoModel from "../../src/models/VideoModel";

const deleteAll = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    await VideoModel.deleteMany({
        userId: user.id
    })
}

const create = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    await VideoModel.create({
        userId: user.id,
        title: 'video lucu',
        description: 'iya ini sangat lucu',
        video: 'http://dunialucu.com/video/hihiho.mp4'
    })
}

const get = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    const video = await VideoModel.findOne({userId: user.id})

    return {
        id: video.id
    }
}

export default {
    deleteAll,
    create,
    get
}