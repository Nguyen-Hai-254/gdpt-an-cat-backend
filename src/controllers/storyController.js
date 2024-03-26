import Story from "../models/storyModel.js"

class StoryController {
    static createStory = async (req, res) => {
        try {
            if (!req.body.name || !req.body.link || !req.body.image) {
                return res.status(400).json("Thiếu tên câu chuyện, link hoặc ảnh cho truyện!")
            }

            let findStory = await Story.find({
                $or: [{
                    name: req.body.name
                },
                {
                    link: req.body.link
                }]
            });

            if (findStory.length > 0) {
                return res.status(400).json("Câu chuyện đã tồn tại!")
            }

            await Story.create({
                name: req.body.name,
                link: req.body.link,
                content: req.body.content,
                image: req.body.image
            })

            return res.status(200).json({
                statusCode: 200,
                message: 'Tạo câu chuyện tiền thân thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getAllStory = async (req, res) => {
        try {
            let findStory = await Story.find({}, { content: 0 });

            return res.status(200).json({
                statusCode: 200,
                data: findStory
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static deleteStory = async (req, res) => {
        try {
            if (!req.query.storyId) {
                return res.status(400).json('Thiếu id của câu chuyện!');
            }

            const findStory = await Story.findById(req.query.storyId);
            if (!findStory) {
                return res.status(404).json('Câu chuyện không tồn tại!');
            }

            await Story.deleteOne({ _id: req.query.storyId });

            return res.status(200).json({
                statusCode: 200,
                message: 'Xóa câu chuyện thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static updateStory = async (req, res) => {
        try {
            if (!req.query.storyId || !req.body.name || !req.body.link || !req.body.image) {
                return res.status(400).json('Thiếu các trường bắt buộc của câu chuyện!');
            }

            const findStory = await Story.findById(req.query.storyId);
            if (!findStory) {
                return res.status(404).json('Câu chuyện không tồn tại!');
            }

            findStory.name = req.body.name;
            findStory.link = req.body.link;
            findStory.image = req.body.image;
            findStory.content = req.body.content;
            await findStory.save();

            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật câu chuyện thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getStoryByLink = async (req, res) => {
        try {
            if (!req.query.link) {
                return res.status(400).json('Thiếu link của câu chuyện!');
            }

            const findStory = await Story.findOne({ link: req.query.link });
            if (!findStory) {
                return res.status(404).json('Câu chuyện không tồn tại!');
            }

            return res.status(200).json({
                statusCode: 200,
                data: findStory
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getStoryById = async (req, res) => {
        try {
            if (!req.query.storyId) {
                return res.status(400).json('Thiếu id của câu chuyện!');
            }

            const findStory = await Story.findById(req.query.storyId);
            if (!findStory) {
                return res.status(404).json('Câu chuyện không tồn tại!');
            }

            return res.status(200).json({
                statusCode: 200,
                data: findStory
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getStoryLimited = async (req, res) => {
        try {
            const findStory = await Story.find({}, { content: 0 }).limit(8);

            return res.status(200).json({
                statusCode: 200,
                data: findStory
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }
}

export default StoryController;