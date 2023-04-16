class ApiFeachers {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }


    // search all products according to name category and brandName as a given keyword
    search() {
        const keyword = this.queryStr.keyword ? {
            // or option used for one keyword enable all types of search
            $or: [
                {
                    name: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    brandName: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                }
            ]
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }


    // filter products as categery

    filter() {
        const queryCopy = { ...this.queryStr }

        // removing some fields for category

        const removeFileds = ["keyword", "page", "limit"];
        removeFileds.forEach(key => {
            delete queryCopy[key]
        })

        // filter price and rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(lt|gt|gte|lte)\b/g, (key) => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }

    // pagingation result per page

    pagination(resultPerPage) {
        const currentPage = this.queryStr.page || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.queryStr = this.query.limit(resultPerPage).skip(skip)
        return this;
    }


}


module.exports = ApiFeachers;

