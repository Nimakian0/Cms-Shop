import { mainheader } from "../components/mainheader/mainheader.js";
window.customElements.define("main-header", mainheader)

import { mainfooter } from "../components/mainfooter/mainfooter.js";
window.customElements.define("main-footer",mainfooter)



let arrayProductsgroceries = JSON.parse(localStorage.getItem("Productsgroceries")) 


const containerGroceriesElm = document.getElementById("containerGroceries")
let Discountedprice = null
function groceries() {
    arrayProductsgroceries.reverse();
    
    
    arrayProductsgroceries.forEach(function (arrayProductsgroceriesItem) {

        const discountAmount = (arrayProductsgroceriesItem.Price * (arrayProductsgroceriesItem.Discount).replace('%', '')) / 100;
        
        arrayProductsgroceriesItem.Discount == "" ?Discountedprice = "" :Discountedprice = arrayProductsgroceriesItem.Price;


        containerGroceriesElm.insertAdjacentHTML("beforeend", '<a class="GroceriesItem" href="product.html?id=' + arrayProductsgroceriesItem.id + '"><div class="SpecialSellBoxGroceriesItem"><img class="SpecialSellGroceriesItem" src="' + arrayProductsgroceriesItem.SrcSpecialSell + '" alt=""></div><div class="imgGroceriesItem"><img class="srcGroceriesItem" src="' + arrayProductsgroceriesItem.SrcProduct + '" alt=""></div><p class="nameGroceriesItem">' + arrayProductsgroceriesItem.TextProduct + '</p><div class="ScoreSeller"><div class="Seller"><img class="SellerSvg" src="' + arrayProductsgroceriesItem.SvgWhichsend + '" alt=""><p class="SellerText">' + arrayProductsgroceriesItem.TextWhichsend + '</p></div><div class="Score"><p class="ScoreText">' + arrayProductsgroceriesItem.numberStar + '</p><i class="fa-solid fa-star ScoreSvg" style="color: #f9bc00;"></i></div></div><div class="DiscountPrice"><div class="Price"><p class="PriceText">' +((arrayProductsgroceriesItem.Price)-discountAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</p></div><div style="background-color: ' + arrayProductsgroceriesItem.backgroundDiscount + ';" class="DiscountBox"><p class="Discount">' + arrayProductsgroceriesItem.Discount + '</p></div></div><p class="PriceTextFake">' + (Discountedprice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</p></a>')
    })

} //نمایش تمام محصولات




const mainHeader = document.querySelector("main-header");
const shadowRoot = mainHeader.shadowRoot;

const NumberProductsElmgroceries = shadowRoot.querySelector(".NumberProducts")
const TextNumberProductsElmgroceries = shadowRoot.querySelector(".TextNumberProducts")
let Cartgroceries =  JSON.parse(localStorage.getItem("Cart"))

let sumNumberProductsingroceries = 0
if (Cartgroceries) {
    Cartgroceries.forEach(function (Cartgroceriesitem) {
        sumNumberProductsingroceries += Number(Cartgroceriesitem.value)
    })
}
if (sumNumberProductsingroceries) {
    NumberProductsElmgroceries.style.display = "Flex"
    TextNumberProductsElmgroceries.innerHTML = sumNumberProductsingroceries

} else {
    NumberProductsElmgroceries.style.display = "none"
}//نمایش تعداد محصولا در صفحه index




window.addEventListener("load", groceries)
