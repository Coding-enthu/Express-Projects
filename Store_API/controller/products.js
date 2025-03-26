const Product = require("../models/product.model.js");


const getAllProductsStatic = async (req, res) => {
	const search = "wood";
	// const products = await Product.find({
		// name: { $regex: search, $options: "i" }, 
		// Finds the pattern i.e. (search) in the name field.
		//option: i -> case insensitive search
	// });


	const products = await Product.find({}).sort("price");
	res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
	// console.log(req.query);
	const {featured, company, name, sort, fields, limit, numericFilters} = req.query;

	const queryObject = {};

	if(featured){
		queryObject.featured = featured === "true"? true : false;
	}

	if(company){
		queryObject.company = company;
	}

	if(name){
		queryObject.name = { $regex: name, $options: "i"};
	}
	// console.log(queryObject);

	// if(numericFilters){
	// 	const operatorMap = {
	// 		">": "&gt",
	// 		">=": "&gte",
	// 		"<": "&lt",
	// 		"<=": "lte",
	// 		"=": "&eq" 
	// 	}

	// 	const regEx = /\b(> | >= | < | <= | =\b)/g;
		
	// 	let filters = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}`);
		
	// 	const options = ["price", "rating"];
	// 	filters = filters.split(",").forEach((item) => {
	// 		const [field, operator, value] = item.split("-");
	// 		if(options.includes(field)){
	// 			queryObject[field] = {[operator]: Number(value)}
	// 		}
	// 	})
	// }


	let result = Product.find(queryObject);

	if(sort){
		const sortList = sort.split(",").join(" ");
		result = result.sort(sortList);
	}
	else {
		result = result.sort("createdAt");
	}

	
	if(fields){
		// console.log(fields);
		const include = fields.split(",").join(" ");
		// console.log(typeof exclude);
		result = result.select(include);
	}
	const l = Number(limit) || 10;
	const page = Number(req.query.page) || 1;

	const skip = (page-1) * l;

	result = result.skip(skip).limit(l);

	const products = await result;

	res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
