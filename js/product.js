import { mainheader } from "../components/mainheader/mainheader.js";
window.customElements.define("main-header", mainheader)

import { mainfooter } from "../components/mainfooter/mainfooter.js";
window.customElements.define("main-footer",mainfooter)




let UrlSearch = new URLSearchParams(location.search)
let Urlid = UrlSearch.get("id")


let arrayProductsgroceries = JSON.parse(localStorage.getItem("Productsgroceries"));

if(!arrayProductsgroceries){
    document.location = "./groceries.html"
}

let findProduct = arrayProductsgroceries.find(function(arrayProductsgroceriesitem){
    return arrayProductsgroceriesitem.id == Urlid
})



const locationroductElm = document.getElementById("locationproduct")
const imgproductElm = document.getElementById('imgproduct')
const nameProductElm = document.getElementById("nameProduct")
const TextstarProductElm = document.getElementById("TextstarProduct")
const FakePriceElm = document.getElementById("FakePrice")
const DiscountBoxElm = document.querySelector(".DiscountBox")
const DiscountElm = document.querySelector(".Discount")
const PriceProductTextElm = document.getElementById("PriceProductText")
// 

function ShowProduct () {
    locationroductElm.innerHTML = findProduct.location
    imgproductElm.setAttribute("src",findProduct.SrcProduct);
    nameProductElm.innerHTML = findProduct.TextProduct
    TextstarProductElm.innerHTML = findProduct.numberStar
    
    if((findProduct.Discount).includes("%")){
        FakePriceElm.innerHTML = (findProduct.Price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    DiscountBoxElm.style.backgroundColor = findProduct.backgroundDiscount;
    DiscountElm.innerHTML = findProduct.Discount

    const discountAmount = (findProduct.Price * (findProduct.Discount).replace('%', '')) / 100;
    PriceProductTextElm.innerHTML = (findProduct.Price-discountAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}//نمایش محصول
ShowProduct()






// سبد خرید



const AddCartfalseBtn = document.getElementById("AddCartfalse")
const AddCartTrueBtn = document.getElementById("AddCartTrue")
const plusProductBtn = document.querySelector(".plusProduct")
const NumberInputElm = document.querySelector(".NumberInput")
const minusProductbtn = document.querySelector(".minusProduct")
const mainHeader = document.querySelector("main-header");
const shadowRoot = mainHeader.shadowRoot;
const NumberProductsElm = shadowRoot.querySelector(".NumberProducts")
const TextNumberProductsElm = shadowRoot.querySelector(".TextNumberProducts")


let Cart = [

]


function SwitchbuttonToTrue () {
    AddCartfalseBtn.style.display = "none"
    AddCartTrueBtn.style.display ="flex"
    NumberInputElm.innerHTML = 1
    AddToCartLocal()
    isShowNumberProducts()
}

function SwitchbuttonToFalse (){
    AddCartfalseBtn.style.display = "flex"
    AddCartTrueBtn.style.display ="none"
}


function plusProducFun () {
    if(NumberInputElm.innerHTML == 1){
        minusProductbtn.setAttribute("src","img/minus-solid.svg")
    }
    NumberInputElm.innerHTML =  Number(NumberInputElm.innerHTML)+1
    
    UpdateValueProduct()
    isShowNumberProducts()
}


function minusProductFun () {
    if(NumberInputElm.innerHTML == 2){
        minusProductbtn.setAttribute("src","img/noun-trash-1825564.svg")
    }else if(NumberInputElm.innerHTML == 1){
        DeleteProduct()
        SwitchbuttonToFalse()
    }
    NumberInputElm.innerHTML =  Number(NumberInputElm.innerHTML)-1
    UpdateValueProduct()
    isShowNumberProducts()
}




function AddToCartLocal () {
    // findProduct محصول جدید

    let existingItems = JSON.parse(localStorage.getItem('Cart')) || [];
    findProduct.value = NumberInputElm.innerHTML
    // var DuplicateProduct = existingItems.find(function(existingItem){
    //     return existingItem.id == findProduct.id
    // })
    // if(!DuplicateProduct){
        existingItems.push(findProduct);
    // }


    localStorage.setItem('Cart', JSON.stringify(existingItems));
    UpdateCart()
    
}UpdateCart()


function UpdateCart () {
    Cart = JSON.parse(localStorage.getItem("Cart"))
    checkSwitchbutton()
}


function UpdateValueProduct () {
    if(Cart){
        var findProductUpdateValue = Cart.find(function(CartItem){
            return CartItem.id == findProduct.id
        })
    }
    
    
    if(Number(NumberInputElm.innerHTML)){
        findProductUpdateValue.value = NumberInputElm.innerHTML
    }
   
   

    cartTolocal()


}


function checkSwitchbutton () {
    if(Cart){
        var IsSwitch = Cart.find(function(CartItem){
            return CartItem.id == findProduct.id
        })
    }


    if(IsSwitch){
        AddCartfalseBtn.style.display = "none"
        AddCartTrueBtn.style.display ="flex"
        NumberInputElm.innerHTML = IsSwitch.value

        if(IsSwitch.value > 1){
            minusProductbtn.setAttribute("src","img/minus-solid.svg")
        }

        // console.log(IsSwitch);
    }
}

function DeleteProduct () {
    if(Cart){
        var IndexDeleteProduct = Cart.findIndex(function(CartItem){
            return CartItem.id == findProduct.id
        })

        Cart.splice(IndexDeleteProduct,1)
        cartTolocal()
    }
}

function cartTolocal () {
    localStorage.setItem("Cart",JSON.stringify(Cart))
}


function isShowNumberProducts () {
    let sumNumberProducts = 0
        if(Cart){
        Cart.forEach(function(Products){
            sumNumberProducts += Number(Products.value)
        })
    }


    if(sumNumberProducts){
        NumberProductsElm.style.display = "Flex"
        TextNumberProductsElm.innerHTML = sumNumberProducts

    }else{
        NumberProductsElm.style.display = "none"
    }

    
    

    
}isShowNumberProducts()



AddCartfalseBtn.addEventListener("click",SwitchbuttonToTrue)
plusProductBtn.addEventListener("click",plusProducFun)
minusProductbtn.addEventListener("click",minusProductFun)




//  

