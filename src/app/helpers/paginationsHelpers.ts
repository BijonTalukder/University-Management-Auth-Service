type IOptions ={
    page?:number;
    limit?:number;
}
const calculatePagination = (options:IOptions)=>{
    const page = Number(options.page||1);
    const limit = Number(options.limit|| 10);
    const skip = (page-1 )* limit
    return {
        page,
        limit,
        skip
    }
}
export const pagginationHelpers = {
    calculatePagination
}