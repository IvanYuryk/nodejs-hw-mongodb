import { typeList } from "../constants/index.js";

const parseBoolean = value => {
    if (typeof value !== "string") return;
    if (!["true", "false"].includes(value)) return;
    return value === "true";
};

const parseFilterParams = ({ type, isFavourite }) => {
    const parsedType = typeList.includes(type) ? type : null;
    const parsedFavourite = parseBoolean(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedFavourite,
    };
};

export default parseFilterParams;
