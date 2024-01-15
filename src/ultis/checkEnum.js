import { typeChapter, typeLesson, typeLevel } from "./enum"


export const checkTypeLesson = (type) => {
    const isExist = typeLesson.filter((typeLesson) => typeLesson === type)
    return isExist ? true : false
}

export const checkTypeLevel = (type) => {
    const isExist = typeLevel.filter((typeLevel) => typeLevel === type)
    return isExist ? true : false
}

export const checkTypeChapter = (type) => {
    const isExist = typeChapter.filter((typeChapter) => typeChapter === type)
    return isExist ? true : false
}