import { sortList } from "../constants/index.js";

const parseSortParams = ({ sortOrder, sortBy }, fieldList) => {
    const parsedSortOrder = sortList.includes(sortOrder) ? sortOrder : sortList[0];
    const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];
    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};

export default parseSortParams;
