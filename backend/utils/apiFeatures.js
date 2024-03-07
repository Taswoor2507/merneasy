class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    // console.log(this);
    console.log(keyword);
    return this;
  }

  filter() {
    let queryStrCopy = { ...this.queryStr };
    // removing som fields for category
    const removeItems = ["keyword", "page", "limit"];
    removeItems.forEach((item) => delete queryStrCopy[item]);
    // this.query = this.query.find(queryStrCopy);
    // filter for price
    console.log(queryStrCopy);
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  //   pagination

  pagination(productPerPage) {
    let currentPage = this.queryStr.page || 1;
    const skip = productPerPage * (currentPage - 1);
    this.query = this.query.limit(productPerPage).skip(skip);
    return this;
  }
}

export default ApiFeature;
