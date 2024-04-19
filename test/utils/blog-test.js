import BlogModel from "../../src/models/BlogModel";
import UserModel from "../../src/models/UserModel";

const deleteAll = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    await BlogModel.deleteMany({userId: user.id})
}

const create = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    await BlogModel.create({
        userId: user.id,
        title: 'test blog',
        text: 'test text'
    })
}

const get = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    const blog = await BlogModel.findOne({userId: user.id});
    return {
        id: blog.id
    }
}

export default {
    deleteAll,
    create,
    get
}