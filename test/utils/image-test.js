import ImageModel from "../../src/models/ImageModel"
import UserModel from "../../src/models/UserModel";

const deleteAll = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    await ImageModel.deleteMany({
        userId: user.id
    })
}

const create = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    await ImageModel.create({
        userId: user.id,
        title: 'wajib baca',
        description: 'hiihihihih',
        image: 'http//kamu.com/image/apa.png'
    })
}

const get = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
    const image = await ImageModel.findOne({userId: user.id});
    return {
        id: image.id
    }
}

export default {
    deleteAll,
    create,
    get
}