import Game from "../models/gameModel";


class GameController {
    static createOrUpdateGame = async (req, res) => {
        try {
            if (!req.body.content) {
                return res.status(400).json("Thiếu nội dung!");
            }

            const findGame = await Game.findOne();
            if (findGame) {
                findGame.content = req.body.content;
                await findGame.save();

                return res.status(200).json({
                    statusCode: 200,
                    message: 'Cập nhật danh sách trò chơi thành công!'
                });
            }
            else {
                await Game.create({
                    content: req.body.content
                })

                return res.status(200).json({
                    statusCode: 200,
                    message: 'Tạo danh sách trò chơi thành công!'
                });
            }
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getGame = async (req, res) => {
        try {
            const findGame = await Game.findOne();

            return res.status(200).json({
                statusCode: 200,
                data: findGame
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }
}

export default GameController;