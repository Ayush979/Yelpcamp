const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	//useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
	console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() =>{
	await Campground.deleteMany({});
	for(let i=0;i<750;i++){
		const random1000 =Math.floor(Math.random() * 1000); 
		const price=Math.floor(Math.random() * 30) + 10;
		const camp = new Campground({
			author: '63ddc7c04b50312bf806682f',
			location: `${cities[random1000].city} , ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
			price,
			geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,	
				]
			},
			images: [
    {
      url: 'https://res.cloudinary.com/ayush979/image/upload/v1676355014/YelpCamp/saahvfg1qtxqmzrwyewp.jpg',
      filename: 'YelpCamp/saahvfg1qtxqmzrwyewp',
      
    },
    {
      url: 'https://res.cloudinary.com/ayush979/image/upload/v1676355014/YelpCamp/sbkhxcd2cyde89hegoxx.png',
      filename: 'YelpCamp/sbkhxcd2cyde89hegoxx',
      
    }
  ]
		})
		await camp.save();
	}
}

seedDB().then(() => {
	mongoose.connection.close();
})



