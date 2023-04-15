class ApiFeachers {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
        // console.log(this.query, this.queryStr)
    }

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
        console.log(keyword)
    
        this.query =  this.query.find({...keyword});
        return this;
    }


}


module.exports = ApiFeachers;


// this.queryStr.keyword ? {
//     // or option used for one keyword enable all types of search
//     $or: [
//         {
//             name: {
//                 $regex: this.queryStr.keyword,
//                 $optionss: "i"
//             }
//         },
//         {
//             brandName: {
//                 $regex: this.queryStr.keyword,
//                 $optionss: "i"
//             }
//         },
//         {
//             category: {
//                 $regex: this.queryStr.keyword,
//                 $optionss: "i"
//             }
//         }
//     ]
// } : {}