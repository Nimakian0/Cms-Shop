const mainAdmin = {
    userName:"Admin".toLowerCase(),
    password:"1234".toLowerCase(),
    Orders:[],
    type:"Admin".toLowerCase(),
    Block:false,
    firstNamea : "نیما",
    lastName : "کیان"
}
let allUsers = JSON.parse(localStorage.getItem("Users")) || []
const findAdminData = allUsers.find(userData => {
    return userData.userName == "Admin".toLowerCase()
});
if(!findAdminData){
    allUsers.push(mainAdmin)
}
localStorage.setItem("Users",JSON.stringify(allUsers))


// /////////////////

let baseArrayProductsgroceries = [
    { id: 1, SrcSpecialSell: "img/groceries/SpecialSell.svg", SrcProduct: "img/groceries/1.webp", TextProduct: "نودل تند و فلفلی لیوانی شف هو - 65 گرم بسته 6 عددی", TextWhichsend: "ارسال فردا", SvgWhichsend: "img/groceries/clock-regular.svg", numberStar: "4.4", backgroundDiscount: "#ef394e", Discount: "23%", Price: 108_000, location: "نودل" },
    { id: 2, SrcSpecialSell: "", SrcProduct: "img/groceries/2.webp", TextProduct: "نودل نیمه آماده رامن با طعم مرغ داغ سامیانگ -105 گرم", TextWhichsend: "ارسال فروشنده", SvgWhichsend: "img/groceries/user-regular.svg", numberStar: "3.1", backgroundDiscount: "", Discount: "", Price: 307_140, PriceFake: "", location: "نودل" },
    { id: 3, SrcSpecialSell: "img/groceries/SpecialSell.svg", SrcProduct: "img/groceries/3.webp", TextProduct: "نودل مرغ شف هو - 425 گرم بسته 5 عددی", TextWhichsend: "ارسال فردا", SvgWhichsend: "img/groceries/clock-regular.svg", numberStar: "4.3", backgroundDiscount: "#ef394e", Discount: "30%", Price: 60_000, location: "نودل" },
    { id: 4, SrcSpecialSell: "", SrcProduct: "img/groceries/4.webp", TextProduct: "ماکارونی پیکولی زر ماکارون مقدار 500 گرم", TextWhichsend: "ارسال سریع سوپر مارکتی", SvgWhichsend: "img/groceries/truck-solid.svg", numberStar: "4.4", backgroundDiscount: "", Discount: "", Price: 19_800, location: "ماکرونی" },
    { id: 5, SrcSpecialSell: "img/groceries/SpecialSell.svg", SrcProduct: "img/groceries/5.webp", TextProduct: "روغن آفتابگردان حاوی توکوفرول غنچه پلاس - 900 میلی لیتر", TextWhichsend: "ارسال سریع سوپر مارکتی", SvgWhichsend: "img/groceries/truck-solid.svg", numberStar: "4.4", backgroundDiscount: "#ef394e", Discount: "12%", Price: 50_500, location: "روغن" },
    { id: 6, SrcSpecialSell: "img/groceries/SpecialSell.svg", SrcProduct: "img/groceries/6.webp", TextProduct: "نودل کاسه ای کم چرب تند و فلفلی،شف هو - 110 گرم", TextWhichsend: "ارسال فردا", SvgWhichsend: "img/groceries/clock-regular.svg", numberStar: "3.8", backgroundDiscount: "#ef394e", Discount: "20%", Price: 50_000, location: "نودل" },
    { id: 7, SrcSpecialSell: "", SrcProduct: "img/groceries/7.webp", TextProduct: "برنج طارم ممتاز گلستان - 10 کیلوگرم", TextWhichsend: "ارسال سریع سوپر مارکتی", SvgWhichsend: "img/groceries/truck-solid.svg", numberStar: "4.2", backgroundDiscount: "", Discount: "", Price: 1_260_520, location: "برنج" },
    { id: 8, SrcSpecialSell: "img/groceries/SpecialSell.svg", SrcProduct: "img/groceries/8.webp", TextProduct: "روغن نیمه جامد لادن - 5 کیلوگرم", TextWhichsend: "ارسال سریع سوپر مارکتی", SvgWhichsend: "img/groceries/truck-solid.svg", numberStar: "4.4", backgroundDiscount: "#ef394e", Discount: "12%", Price: 365_400, location: "روغن" },
    { id: 9, SrcSpecialSell: "", SrcProduct: "img/groceries/9.webp", TextProduct: "رب گوجه فرنگی چین چین - 800 گرم", TextWhichsend: "ارسال سریع سوپر مارکتی", SvgWhichsend: "img/groceries/truck-solid.svg", numberStar: "4.3", backgroundDiscount: "#ef394e", Discount: "2%", Price: 45_000,  location: "رب" },
    { id: 10, SrcSpecialSell: "img/groceries/SpecialSell.svg", SrcProduct: "img/groceries/10.webp", TextProduct: "ذرت صنایع غذایی 516- 700 گرم", TextWhichsend: "ارسال فروشنده", SvgWhichsend: "img/groceries/user-regular.svg", numberStar: "4.2", backgroundDiscount: "#ef394e", Discount: "37%", Price: 81_500, location: "ذرت" },
    { id: 11, SrcSpecialSell: "", SrcProduct: "img/groceries/11.webp", TextProduct: "لازانیا پیش پخت زر ماکارون - 500 گرم", TextWhichsend: "ارسال فردا", SvgWhichsend: "img/groceries/clock-regular.svg", numberStar: "4.3", backgroundDiscount: "", Discount: "", Price: 54_600, location: "لازانیا" },
    { id: 12, SrcSpecialSell: "img/groceries/SpecialSell.svg", SrcProduct: "img/groceries/12.webp", TextProduct: "پودر خمیر پیتزا رشد مقدار 480 گرم", TextWhichsend: "ارسال سریع سوپر مارکتی", SvgWhichsend: "img/groceries/truck-solid.svg", numberStar: "3.8", backgroundDiscount: "#ef394e", Discount: "10%", Price: 60_000, location: "پودر" },
]

if (!JSON.parse(localStorage.getItem("Productsgroceries"))) {
    localStorage.setItem("Productsgroceries", JSON.stringify(baseArrayProductsgroceries))
}
//  ۱۲۳۴۵۶۷۸۹۰

// /////////////////

let arrayStoreContent = [
    {id:1, text:"خرید طلا", srcIcon:"img/Story/1.jpeg", look:"lookStoreFalse", srcContent:"url(img/Storycontent/1.jpeg)"},
    {id:2, text:"نیم پوت", srcIcon:"img/Story/2.jpeg", look:"lookStoreFalse", srcContent:"url(img/Storycontent/2.jpeg)"},
    {id:3, text:"بلوز و شومیز", srcIcon:"img/Story/3.webp", look:"lookStoreFalse", srcContent:"url(img/Storycontent/3.jpeg)"},
    {id:4, text:"لوازم تحریر", srcIcon:"img/Story/4.jpeg", look:"lookStoreFalse", srcContent:"url(img/Storycontent/4.jpeg)"},
    {id:5, text:"جهان قهوه", srcIcon:"img/Story/5.jpeg", look:"lookStoreFalse", srcContent:"url(img/Storycontent/5.jpeg)"},
    {id:6, text:"عطر های اصل", srcIcon:"img/Story/6.jpeg", look:"lookStoreFalse", srcContent:"url(img/Storycontent/6.jpeg)"},
    {id:7, text:"برنده شو", srcIcon:"img/Story/7.jpeg", look:"lookStoreFalse", srcContent:"url(img/Storycontent/7.jpeg)"},
    {id:8, text:"انواع مکمل", srcIcon:"img/Story/8.jpeg", look:"lookStoreFalse", srcContent:"url(img/Storycontent/8.jpeg)"},
]

if(!JSON.parse(localStorage.getItem("Story"))){
    localStorage.setItem("Story",JSON.stringify(arrayStoreContent))
}

// //////////////////

let ArraySlider = [
    {id:1 , src:"img/Slider/1.webp"},
    {id:2 , src:"img/Slider/2.webp"},
    {id:3 , src:"img/Slider/3.webp"},
    {id:4 , src:"img/Slider/4.webp"},
    {id:5 , src:"img/Slider/5.webp"},
    {id:6 , src:"img/Slider/6.webp"},
    {id:7 , src:"img/Slider/7.webp"},
    {id:8 , src:"img/Slider/8.gif"},
    {id:9 , src:"img/Slider/9.webp"},
]

if(!JSON.parse(localStorage.getItem("Slider"))) {
    localStorage.setItem("Slider",JSON.stringify(ArraySlider))
}

// //////////////////


