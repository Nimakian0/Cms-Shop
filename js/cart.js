import { mainheader } from "../components/mainheader/mainheader.js";
window.customElements.define("main-header", mainheader)

import { mainfooter } from "../components/mainfooter/mainfooter.js";
window.customElements.define("main-footer",mainfooter)


const mainHeader = document.querySelector("main-header");
const shadowRoot = mainHeader.shadowRoot;
let Cart = JSON.parse(localStorage.getItem("Cart")) || []
const NumberProductsElm = shadowRoot.querySelector(".NumberProducts")
const TextNumberProductsElm = shadowRoot.querySelector(".TextNumberProducts")
const EmptycartElm = document.getElementById("Emptycart")
const boxCartElm = document.getElementById("boxCart")
const cartItemBoxElm = document.getElementById("cartItemBox")
const NumberAllProductsElm = document.getElementById("NumberAllProducts")
const textPriceAllProductNumberElm = document.getElementById("textPriceAllProductNumber")
const SumCartProductElm = document.getElementById("SumCartProduct")
const SumAllDiscountCartElm = document.getElementById("SumAllDiscountCart")


let NumberProductsCart = 0
function updateNumberProducts () {
    NumberProductsCart = 0
    if(Cart) {
        Cart.forEach(function(CartItem){
            NumberProductsCart += Number(CartItem.value)
        });
    }
    NumberAllProductsElm.innerHTML = "("+ NumberProductsCart +")"

    if (NumberProductsCart) {
        NumberProductsElm.style.display = "flex"
        TextNumberProductsElm.innerHTML = NumberProductsCart
    }else{
        NumberProductsElm.style.display = "none"
        TextNumberProductsElm.innerHTML = NumberProductsCart
    }
}updateNumberProducts()



function Iscart () {
    if(NumberProductsCart){
        EmptycartElm.style.display ="none"
        boxCartElm.style.display = "flex"
    }else{
        boxCartElm.style.display = "none"
        EmptycartElm.style.display ="flex"
    }
}Iscart()



window.minusProductFunInCart = function minusProductFunInCart (event) {
    const NumberInputInCartElm = event.target.parentNode.children[1]
    if(NumberInputInCartElm.innerHTML == 1){
        DeleteProductinCart(event)
    }
    NumberInputInCartElm.innerHTML =  Number(NumberInputInCartElm.innerHTML)-1
    UpdateCart(event)
    AllPriceProductsInCArtFun()
}



window.plusProducFunInCart = function plusProducFunInCart  (event) {
    const NumberInputInCartElm = event.target.parentNode.children[1]
    NumberInputInCartElm.innerHTML =  Number(NumberInputInCartElm.innerHTML)+1
    UpdateCart(event)
    AllPriceProductsInCArtFun()
}


let  AlldiscountPrice = 0;
function AddCartItemToDom () {
    cartItemBoxElm.innerHTML = ""
    let TextDiscountProduct = "تومان تخفیف"
    let srcMinusProduct = ""
    AlldiscountPrice = 0
    Cart.forEach(function(CartItem){

        
        const discountAmount = (CartItem.Price * (CartItem.Discount).replace('%', '')) / 100;
        const PriceProduct = CartItem.Price - discountAmount
        let  discountPrice = ((CartItem.Price - PriceProduct)*CartItem.value) 

        AlldiscountPrice += Number(discountPrice)
        
        

        if(discountAmount <= 0) {
            discountPrice = ""
            TextDiscountProduct = ""
        }

        if(CartItem.value == 1){
            srcMinusProduct = "img/noun-trash-1825564.svg"
        }else{
            srcMinusProduct = "img/minus-solid.svg"
        }

        cartItemBoxElm.insertAdjacentHTML("beforeend",`
        <div class="cartitem">
            <div class="cartitemRight"><a href="product.html?id=${CartItem.id}">
                    <img class="SrcProduct" src="${CartItem.SrcProduct}">
                    </a><img class="srcGroceries" src="${CartItem.SrcSpecialSell}">
                <div class="managementProductCart">
                    <img data-id="${CartItem.id}" onclick="plusProducFunInCart(event)" class="plusProductInCart"src="img/plus-solid.svg" alt="">
                    <p class="NumberInputInCart">${CartItem.value}</p>
                    <img data-id="${CartItem.id}" onclick="minusProductFunInCart(event)" class="minusProductInCart"style="width: 14px;" src="${srcMinusProduct}" alt="">
                </div>
            </div>
            <div class="cartitemLeft">
                <p>${CartItem.TextProduct}</p>
                <div class="Warranty">
                    <i class="fa-solid fa-shield" style="color: #a1a3a8;">
                    </i>
                    <p>گارانتی اصالت و سلامت فیزیکی کالا</p>
                </div>
                <div class="Company">
                    <i class="fa-regular fa-building" style="color: #62666d;">
                    </i>
                    <p>دیجی‌کالا</p>
                </div>
                <div class="cellar"><i class="fa-solid fa-warehouse" style="color: #19bfd3;font-size: 12px;">
                    </i>
                    <p>موجود در انبار دیجی‌کالا</p>
                </div>
                <div class="FastSending"><i class="fa-solid fa-circle circle" style="color: #19bfd3;">
                    </i><img style="margin: 0 7px;width: 15px;" src="img/groceries/truck-solid.svg" alt="">
                    <p>ارسال سریع سوپرمارکتی دیجی‌کالا</p>
                </div>
                <div class="DiscountBoxCart">
                    <p class="DiscountText">${discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }</p>
                    <p>${TextDiscountProduct}</p>
                </div>
                <div class="priceProducr">
                    <p class="priceText"> ${(PriceProduct *CartItem.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                    <p>تومان</p>
                </div>
            </div>
        </div>    
    `)



    })
}AddCartItemToDom()


function DeleteProductinCart(event) {
    let findIndexProductDelete = Cart.findIndex(function(Cartitem){
        return Cartitem.id == event.target.getAttribute("data-id")
    })
    Cart.splice(findIndexProductDelete,1)
    
}


function UpdateCart (event) {
    
    
    let findIndexProductchanged = Cart.findIndex(function(Cartitem){
        return Cartitem.id == event.target.getAttribute("data-id")
    })

    if(findIndexProductchanged != -1) {
        Cart[findIndexProductchanged].value = event.target.parentNode.children[1].innerHTML
    }
    AddCartItemToDom()
    addCartToLocal()
    updateNumberProducts()
    Iscart()
}


function addCartToLocal () {
    localStorage.setItem("Cart",JSON.stringify(Cart))
}



function AllPriceProductsInCArtFun (){
    let AllPriceProductsInCArt = 0
    
    Cart.forEach(function(CartItem){
        AllPriceProductsInCArt +=  (CartItem.Price * CartItem.value);
    })

    textPriceAllProductNumberElm.innerHTML = AllPriceProductsInCArt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    SumCartProductElm.innerHTML = (AllPriceProductsInCArt-AlldiscountPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
    SumAllDiscountCartElm.innerHTML = AlldiscountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
}AllPriceProductsInCArtFun()



function heightcartItemBox () {
    if(Cart.length == 1){
        cartItemBoxElm.style.height = "fit-content"   
    }
}


const Recordorder = document.getElementById("Recordorder")
const errboxCart =  document.getElementById("errboxCart")
Recordorder.addEventListener("click",setorder)


function setorder() {
    if(document.cookie == ""){
        errboxCart.style.opacity ="1"
        errboxCart.style.margin ="0 auto 10px"
        errboxCart.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }else{
        let tokenUserLogin = document.cookie.substring(document.cookie.indexOf("=")+1);
        let AllUsers = JSON.parse(localStorage.getItem("Users"))
        let FindUserLogin = AllUsers.find((User)=>{
            return User.userName == tokenUserLogin
        })
        let PreviousOrders = FindUserLogin.Orders;
        Cart.forEach((CartItem)=>{
            CartItem.isAcceptProduct = false
            PreviousOrders.push(CartItem)
        })
        FindUserLogin.Orders = PreviousOrders

        
        

        setorderInLocalstorage(AllUsers)
    }
}


function setorderInLocalstorage (AllUsers) {
    localStorage.setItem("Users",JSON.stringify(AllUsers))
    DeleteCart()
}



function DeleteCart(){
    Cart = []
    localStorage.setItem("Cart",JSON.stringify(Cart))
    NumberProductsCart = 0
    updateNumberProducts()
    Iscart()
    ShowSuccessMessage()
}


function ShowSuccessMessage () {
    let SuccessMessage = document.getElementById("SuccessMessage")
    SuccessMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
    SuccessMessage.style.right = "0%"
    setTimeout(()=>{
        SuccessMessage.style.right = "-100%"
    },4000)
}


window.addEventListener("load",heightcartItemBox)



 