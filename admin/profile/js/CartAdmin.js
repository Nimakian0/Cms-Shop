import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)




let AllUsers = JSON.parse(localStorage.getItem("Users"))
let FindAdmin = AllUsers.find((User)=>{
    return User.userName == document.cookie.substring(document.cookie.indexOf("=")+1)
})
let Orders = FindAdmin.Orders || []
Orders.reverse()


let cartItemBox = document.getElementById("cartItemBox")
let SrcProduct = null;
let ResultAcceptProduct = null;
let ColorResultAcceptProduct = null;
function addOrderToDom () {
    Orders.forEach(Order => {
        const discountAmount = (Order.Price * (Order.Discount).replace('%', '')) / 100;
        const amountPaid = (Order.Price * Order.value) - (discountAmount*Order.value)

        let SrcSpecialSell = null;
        Order.SrcSpecialSell ? SrcSpecialSell = "../../"+Order.SrcSpecialSell : SrcSpecialSell="";


        (Order.SrcProduct).split("/")[0] == "img" ? SrcProduct = "../../"+Order.SrcProduct : SrcProduct = Order.SrcProduct


        
        if(Order.isAcceptProduct){
            ResultAcceptProduct = "تایید شده"
            ColorResultAcceptProduct = "green"
        }else{
            ResultAcceptProduct = "در انتظار تایید"
            ColorResultAcceptProduct = "Red"
        }

        

        cartItemBox.insertAdjacentHTML("beforeend",`
        <div class="cartitem">

            <div class="cartitemRight">
                <a href="../../product.html?id=${Order.id}"><img class="SrcProduct" src="${SrcProduct}"></a>
                <img class="srcGroceries" src="${SrcSpecialSell}">

                <div class="managementProductCart">
                    <p class="NumberInputInCart">${Order.value}</p>
                </div>
            </div>

            <div class="cartitemLeft">
                <p>${Order.TextProduct}</p>
                <div class="Warranty">
                    <i class="fa-solid fa-shield" style="color: #a1a3a8;"></i>
                    <p>گارانتی اصالت و سلامت فیزیکی کالا</p>
                </div>
                <div class="Company">
                    <i class="fa-regular fa-building" style="color: #62666d;"></i>
                    <p>دیجی‌کالا</p>
                </div>
                <div class="cellar">
                    <i class="fa-solid fa-warehouse" style="color: #19bfd3;font-size: 12px;"></i>
                    <p>موجود در انبار دیجی‌کالا</p>
                </div>
                <div class="FastSending">
                    <img src="../../${Order.SvgWhichsend}" alt="">
                    <p>${Order.TextWhichsend}</p>
                </div>

                <div class="priceProducr">
                    <p>مبلغ پرداخت شده : </p>
                    <p class="priceText">${amountPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                    <p>تومان</p>
                </div>

                <div class="Box-is-Accept-Product">
                    <p>وضعیت :</p>
                    <p class="Result-Accept-Product" style="Color:${ColorResultAcceptProduct}">${ResultAcceptProduct}</p>
                </div>

            </div>


        </div>
        `)


    });
    
}






window.addEventListener("load",addOrderToDom)