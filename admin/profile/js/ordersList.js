import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)


let AllUsers = JSON.parse(localStorage.getItem("Users"))
const Profilecontent = document.querySelector(".Profilecontent")

const NewTagContainerGroceries = document.createElement("div")
NewTagContainerGroceries.className = "containerGroceries"

const NewTagNameUser = document.createElement("h4")
NewTagNameUser.className = "Tag-Name-User"

function AddOrdersToDom() {

    AllUsers.forEach(User => {
        
        
        NewTagContainerGroceries.innerHTML = ""
        if(User.Orders.length != 0){
            User.Orders.reverse()
            User.Orders.forEach((order)=>{

                
                
                
                const discountAmount = (order.Price * (order.Discount).replace('%', '')) / 100;
                NewTagContainerGroceries.insertAdjacentHTML("beforeend",`
                <div class="GroceriesItem" >
                    <div class="SpecialSellBoxGroceriesItem">
                        <img class="SpecialSellGroceriesItem" src="../../${order.SrcSpecialSell}" alt="">
                    </div>
                    <a href="../../product.html?id=${order.id}" class="imgGroceriesItem">
                        <img class="srcGroceriesItem" src="${(order.SrcProduct).split("/")[0] == "img" ? "../../"+order.SrcProduct : order.SrcProduct}" alt="">
                    </a>
                    <p class="nameGroceriesItem">${order.TextProduct}</p>
                    <div class="ScoreSeller">
                        <div class="Seller">
                            <img class="SellerSvg" src="../../${order.SvgWhichsend}" alt="">
                            <p class="SellerText">${order.TextWhichsend}</p>
                        </div>
                        <div class="Score">
                            <p class="ScoreText">${order.numberStar}</p>
                            <i class="fa-solid fa-star ScoreSvg" style="color: #f9bc00;"></i>
                        </div>
                    </div>
                    <div class="DiscountPrice">
                        <div class="Price">
                            <p class="PriceText">${((order.Price)-discountAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                        </div>
                        <div style="background-color:${order.backgroundDiscount};" class="DiscountBox">
                            <p class="Discount">${order.Discount}</p>
                        </div>
                    </div>
                    <p class="PriceTextFake">${(order.Price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>   
                    <button onclick="AcceptProduct(event)" class="${order.isAcceptProduct?"Accept-Product-true":"Accept-Product-false"}" data-Buyer="${User.userName}" data-id="${order.id}">${order.isAcceptProduct?"تایید شده":"تایید محصول"}</button>
                </div>
                `)
            })

            

            const BoxOrderUserName = document.createElement("div")
            BoxOrderUserName.innerHTML = `
                <div class="BoxUserName">
                    <p>لیست سفارش کاربر:</p>
                    <p class="UserName">${User.userName}</p>
                </div>
                <i class="fa-solid fa-plus btn-Order-User-Name"></i>
            `
            BoxOrderUserName.className = "Box-Order-User-Name"
            BoxOrderUserName.setAttribute("onclick","ShowAndExitOrder(event)")

            


            Profilecontent.append(BoxOrderUserName);
            Profilecontent.append(NewTagContainerGroceries.cloneNode(true)) 
        }
        
       




    });

    
}





window.ShowAndExitOrder = function ShowAndExitOrder (e){


    let BoxOrder = e.target.nextElementSibling;
    
    
    if(e.target.children[1].classList.contains("fa-plus")){
        e.target.children[1].className = "fa-solid fa-minus btn-Order-User-Name"
        BoxOrder.style.height = "auto"
    }else{
        e.target.children[1].className = "fa-solid fa-plus btn-Order-User-Name"
        BoxOrder.style.height = "0px"
    }

    
}




window.AcceptProduct = function AcceptProduct (e){

    let BuyerProduct = e.target.getAttribute("data-Buyer")
    let IdProduct = e.target.getAttribute("data-id")

    let FindUserOrder = AllUsers.find((User)=>{
        return User.userName == BuyerProduct
    })
    FindUserOrder.Orders.reverse();

    let FindOrder = FindUserOrder.Orders.find((order) => {
        return order.id == IdProduct
    })

    FindOrder.isAcceptProduct = true;


    UpdateLocalStorage(AllUsers)


    e.target.style.backgroundColor = "#fff";
    e.target.style.color = "green";
    e.target.style.fontStyle = "17px";
    e.target.style.cursor = "auto";
    e.target.innerHTML ="تایید شده"


    

    


}



function UpdateLocalStorage (AllUsers) {
    localStorage.setItem("Users",JSON.stringify(AllUsers))
}






window.addEventListener("load",AddOrdersToDom)