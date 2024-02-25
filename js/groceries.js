import { mainheader } from "../components/mainheader/mainheader.js";
window.customElements.define("main-header", mainheader)

import { mainfooter } from "../components/mainfooter/mainfooter.js";
window.customElements.define("main-footer",mainfooter)

let arrayProductsgroceries = JSON.parse(localStorage.getItem("Productsgroceries")) 
arrayProductsgroceries.reverse();


let NumberPerPage = 6;
let pageIndex = 1;

const BoxPaging = document.getElementById("BoxPaging")
function CreateBtnPaging () {
    let  NumberBtn = Math.ceil(arrayProductsgroceries.length / NumberPerPage);
    BoxPaging.innerHTML = ""
    for(let inerBtn = 1 ; inerBtn <= NumberBtn; inerBtn++ ){
        BoxPaging.insertAdjacentHTML("beforeend",`
            <p onclick="SetActivePageIndex(event)" class="BtnPaging">${inerBtn}</p>        
        `)
    }
    const BtnPaging = document.querySelectorAll(".BtnPaging")
    BtnPaging.forEach(BtnPaging => {
        BtnPaging.style.backgroundColor = "#ef4056"
    })
    BtnPaging[pageIndex-1].style.backgroundColor = "#F3B95F"
}
CreateBtnPaging()


window.SetActivePageIndex = function SetActivePageIndex (e) {
    pageIndex = e.target.innerHTML
    groceries()
    window.scrollTo(0,0)
    document.documentElement.classList.add('scroll-top-animation');
            setTimeout(() => {
                document.documentElement.classList.remove('scroll-top-animation');
            }, 1000);
    CreateBtnPaging()
}







const containerGroceriesElm = document.getElementById("containerGroceries")
let Discountedprice = null
function groceries() {
    
    let End = NumberPerPage * pageIndex;
    let Start = End - NumberPerPage;
    let ResultsliceItem = arrayProductsgroceries.slice(Start,End)
    

    containerGroceriesElm.innerHTML = ""
    ResultsliceItem.forEach(function (arrayProductsgroceriesItem) {
        const discountAmount = (arrayProductsgroceriesItem.Price * (arrayProductsgroceriesItem.Discount).replace('%', '')) / 100;
        arrayProductsgroceriesItem.Discount == "" ?Discountedprice = "" :Discountedprice = arrayProductsgroceriesItem.Price;
        containerGroceriesElm.insertAdjacentHTML("beforeend", '<a class="GroceriesItem" href="product.html?id=' + arrayProductsgroceriesItem.id + '"><div class="SpecialSellBoxGroceriesItem"><img class="SpecialSellGroceriesItem" src="' + arrayProductsgroceriesItem.SrcSpecialSell + '" alt=""></div><div class="imgGroceriesItem"><img class="srcGroceriesItem" src="' + arrayProductsgroceriesItem.SrcProduct + '" alt=""></div><p class="nameGroceriesItem">' + arrayProductsgroceriesItem.TextProduct + '</p><div class="ScoreSeller"><div class="Seller"><img class="SellerSvg" src="' + arrayProductsgroceriesItem.SvgWhichsend + '" alt=""><p class="SellerText">' + arrayProductsgroceriesItem.TextWhichsend + '</p></div><div class="Score"><p class="ScoreText">' + arrayProductsgroceriesItem.numberStar + '</p><i class="fa-solid fa-star ScoreSvg" style="color: #f9bc00;"></i></div></div><div class="DiscountPrice"><div class="Price"><p class="PriceText">' +((arrayProductsgroceriesItem.Price)-discountAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</p></div><div style="background-color: ' + arrayProductsgroceriesItem.backgroundDiscount + ';" class="DiscountBox"><p class="Discount">' + arrayProductsgroceriesItem.Discount + '</p></div></div><p class="PriceTextFake">' + (Discountedprice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</p></a>')
    })

}












window.addEventListener("load", groceries)
