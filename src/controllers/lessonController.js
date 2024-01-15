import Lesson from "../models/lessonModel.js"
import { checkTypeChapter, checkTypeLesson, checkTypeLevel } from "../ultis/checkEnum.js"
import { typeChapter } from "../ultis/enum.js"

class LessonController {
    static createLesson = async (req, res) => {
        try {
            if (!req.body.title || !req.body.url || !req.body.type || !req.body.chapter || !req.body.level) {
                return res.status(400).json("Thiếu tiêu đề, link, chương trình hoặc học phần!")
            }

            if (!checkTypeLesson(req.body.type)) {
                return res.status(404).json("Chương trình này hiện không tồn tại!")
            }

            if (!checkTypeLevel(req.body.level)) {
                return res.status(404).json("Bậc học này hiện không tồn tại!")
            }

            if (!checkTypeChapter(req.body.chapter)) {
                return res.status(404).json("Học phần này hiện không tồn tại!")
            }

            const findLesson = await Lesson.find({
                level: req.body.level
            });

            const checkLesson = findLesson.filter((lesson) => lesson.title === req.body.title || lesson.url === req.body.url)

            if (checkLesson.length > 0) {
                return res.status(400).json("Tiêu đề hoặc link đã trùng lặp trong chương trình!")
            }

            await Lesson.create({
                title: req.body.title,
                url: req.body.url,
                type: req.body.type,
                level: req.body.level,
                chapter: req.body.chapter,
                content: req.body.content,
                order: findLesson.length
            })

            return res.status(200).json({
                statusCode: 200,
                message: 'Tạo bài học thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }

    }

    static getStudyById = async (req, res) => {
        try {
            if (!req.query.lessonId) {
                return res.status(400).json("Thiếu lesson id!")
            }

            const lesson = await Lesson.findById(req.query.lessonId);

            if (!lesson) {
                return res.status(400).json(`Bài học không tồn tại!`);
            }

            return res.status(200).json({
                statusCode: 200,
                data: {
                    _id: lesson._id,
                    title: lesson.title,
                    url: lesson.url,
                    type: lesson.type,
                    level: lesson.level,
                    chapter: lesson.chapter,
                    content: lesson.content
                }
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }

    }

    // Get the exact table of contents, including sub-lessons
    static getTableOfContentLevel = async (req, res) => {
        try {
            if (!req.query.level) {
                return res.status(400).json(`Thiếu bậc học!`);
            }

            const findAllLessonByType = await Lesson.find({
                level: req.query.level
            }, { content: 0 }).sort({ order: 1 })

            let data = [];
            typeChapter.map((chapter) => {
                let lessonList = []
                for (let lesson of findAllLessonByType) {
                    if (chapter === lesson.chapter) {
                        lessonList.push(lesson)
                    }
                }

                data.push({
                    title: chapter,
                    baiHoc: lessonList
                })
            })

            return res.status(200).json({
                message: 'OK',
                data: data
            })

        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    // create url for fe
    static getTableOfContentStudy = async (req, res) => {
        try {
            if (!req.query.level) {
                return res.status(400).json(`Thiếu bậc học!`);
            }

            const findAllLessonByLevel = await Lesson.find({
                level: req.query.level
            }, { content: 0, level: 0 })

            return res.status(200).json({
                message: 'OK',
                data: findAllLessonByLevel
            })
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static getAllStudy = async (req, res) => {
        try {
            const skip = req.query.skip ? req.query.skip : 0;
            const limit = req.query.limit ? req.query.limit : 10;
            const level = req.query.level ?? undefined;
            const chapter = req.query.chapter ?? undefined;
            let findLesson, count;
            if (!level && !chapter) {
                findLesson = await Lesson.find({ type: 'Tu Học' }, { content: 0 }).sort({ level: 1, chapter: 1, order: 1 }).skip(skip).limit(limit);
                count = await Lesson.countDocuments({ type: 'Tu Học' });
            }
            else if (level && !chapter) {
                findLesson = await Lesson.find({ type: 'Tu Học', level: level }, { content: 0 }).sort({ chapter: 1, order: 1 }).skip(skip).limit(limit);
                count = await Lesson.countDocuments({ type: 'Tu Học', level: level });
            }
            else if (!level && chapter) {
                findLesson = await Lesson.find({ type: 'Tu Học', chapter: chapter }, { content: 0 }).sort({ level: 1, order: 1 }).skip(skip).limit(limit);
                count = await Lesson.countDocuments({ type: 'Tu Học', chapter: chapter });
            }
            else {
                findLesson = await Lesson.find({ type: 'Tu Học', level: level, chapter: chapter }, { content: 0 }).sort({ order: 1 }).skip(skip).limit(limit);
                count = await Lesson.countDocuments({ type: 'Tu Học', level: level, chapter: chapter });
            }

            return res.status(200).json({
                message: 'OK',
                data: {
                    data: findLesson,
                    count: count
                }
            })
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static deleteLessonById = async (req, res) => {
        try {
            if (!req.query.lessonId) {
                return res.status(400).json('Thiếu id của bài học!');
            }

            const findLesson = await Lesson.findById(req.query.lessonId);
            if (!findLesson) {
                return res.status(404).json('Bài học không tồn tại!');
            }

            await Lesson.deleteOne({ _id: req.query.lessonId });

            return res.status(200).json({
                statusCode: 200,
                message: 'Xóa bài học thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static setOrderLesson = async (req, res) => {
        try {
            if (!req.query.lessonId) {
                return res.status(400).json('Thiếu id của bài học!');
            }

            if (!req.body.order) {
                return res.status(400).json('Thiếu thứ tự của bài học!');
            }

            const findLesson = await Lesson.findById(req.query.lessonId);
            if (!findLesson) {
                return res.status(404).json('Bài học không tồn tại!');
            }

            findLesson.order = req.body.order;
            await findLesson.save();

            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật thứ tự bài học thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    static updateLesson = async (req, res) => {
        try {
            if (!req.query.lessonId || !req.body.title || !req.body.url || !req.body.type || !req.body.chapter || !req.body.level) {
                return res.status(400).json('Thiếu các trường bắt buộc của bài học!');
            }

            const findLesson = await Lesson.findById(req.query.lessonId);
            if (!findLesson) {
                return res.status(404).json('Bài học không tồn tại!');
            }

            findLesson.title = req.body.title;
            findLesson.url = req.body.url;
            findLesson.type = req.body.type;
            findLesson.chapter = req.body.chapter;
            findLesson.level = req.body.level;
            findLesson.content = req.body.content;
            await findLesson.save();

            return res.status(200).json({
                statusCode: 200,
                message: 'Cập nhật bài học thành công!'
            });
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }
}

export default LessonController;