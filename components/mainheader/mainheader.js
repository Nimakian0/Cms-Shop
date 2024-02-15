const templateMainHeader = document.createElement('template')
templateMainHeader.innerHTML = `
<link rel="stylesheet" href="components/mainheader/mainheader.css">
<link rel="stylesheet" href="css/all.css">
<header>
    <div id="TopHeader">
    </div>

    <div id="CenterHeader">
        <div id="RightCenterHeader">
            <a href="./" id="BoxLogo"><img src="img/Logo.svg" alt=""></a>
            <div id="searchBox">
                <i class="fa-solid fa-magnifying-glass" style="color: #a1a3a8; background-color: #f0f0f1;height: 40px;padding: 0 10px;display: flex;align-items: center;justify-content: center;border-radius: 0 10px 10px 0 ;"></i>
                <input id="inputSearch" placeholder="جستجو" type="tetx">
            </div>
            
        </div>

        <div id="LeftCenterHeader">
            <div id="login">
                <i class="fa-solid fa-right-to-bracket fa-flip-horizontal" style="color: #424650;"></i>
                <a href="users/Login.html">ورود</a>
                <span>|</span>
                <a href="users/SingUp.html">ثبت نام</a>
            </div>

            <a href="/cart.html" id="Cart">
                <i class="fa-solid fa-cart-shopping fa-flip-horizontal" style="color: #424750;"></i>    
                <div class="NumberProducts">
                    <p class="TextNumberProducts">1</p>
                </div>
            </a>
        </div>
    </div>



    <div id="BottomHeader">
        <div id="rightBottomHeader">
            <div id="listAll">
                <i class="fa-solid fa-bars" style="color: #424750;"></i>
                <h5 id="listAllTetx">دسته بندی کالا ها</h5>
            </div>

            <div id="list">
                <ul>
                    <li id="boxLogoAndExitRespansev"><img src="img/Logo.svg"> <i id="ExitBtn" class="fa-solid fa-xmark"></i></li>
                    <li>  <i class="fa-solid fa-percent circleSvg" style="color: #a1a3a8;"></i>  <a href="#">شگفت انگیزها</a>  </li>
                    <li>  <a href="groceries.html">سوپر مارکت</a>  </li>
                    <li>  <i class="fa-regular fa-credit-card" style="color: #a1a3a8;"></i>  <a href="#">کارت هدیه</a>  </li>
                    <li>  <i class="fa-solid fa-fire-flame-curved" style="color: #a1a3a8;"></i>  <a href="#">پر فروش ترین ها</a>  </li>
                    <li class="Menudiscountsandrecommendations">  <i class="fa-solid fa-tag" style="color: #a1a3a8;"></i>  <a href="#">تخفیف ها و پیشنهاد ها</a>  </li>
                </ul>
            </div>



        </div>


        <div id="leftBottomHeader">
            <i class="fa-solid fa-location-dot" style="color: #424750;"></i>
            <p>ارسال به آذر بایجان شرقی , تبریز </p>
        </div>

    </div>
</header>

`
class mainheader extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(templateMainHeader.content.cloneNode(true))

    }
    connectedCallback() {
        // this.shadowRoot.querySelector("p").innerHTML = this.getAttribute("text")
        const chengelistAllTetx = () => {
            if (window.innerWidth <= 890) {
                this.shadowRoot.getElementById("listAllTetx").innerHTML = "دسته بندی"
                const listAllBtn = this.shadowRoot.getElementById("listAll");
                listAllBtn.addEventListener("click", () => {
                    this.shadowRoot.getElementById("list").style.right = "0%";
                    document.body.style.overflow = "hidden";
                })

                const ExitBtn = this.shadowRoot.getElementById("ExitBtn")
                ExitBtn.addEventListener("click", () => {
                    this.shadowRoot.getElementById("list").style.right = "-100%";
                    document.body.style.overflow = "auto";
                })
            } else {
                this.shadowRoot.getElementById("listAllTetx").innerHTML = "دسته بندی کالاها"

            }
        }
        chengelistAllTetx()
        window.addEventListener('resize', chengelistAllTetx);








        if (document.cookie) {

            let loginBox = this.shadowRoot.getElementById("login");

            loginBox.innerHTML = `
                
                <div class="boxUserinHeader">
                    <p>${document.cookie.substring(document.cookie.indexOf("=") + 1)}</p>
                    <i class="fa-regular fa-user"></i>
                </div>
                
            `;


            loginBox.addEventListener("click", () => {
                const username = document.cookie.substring(document.cookie.indexOf("=") + 1)

                let allUser = JSON.parse(localStorage.getItem("Users"))
                let findUserinDatas = allUser.find(userOne => {
                    return userOne.userName == username
                })

                if (findUserinDatas.type == "User") {
                    document.location = "users/profile/ordersList.html"
                } else {
                    document.location = "admin/profile/CartAdmin.html"
                }

            })
        }


        const NumberProductsElm = this.shadowRoot.querySelector(".NumberProducts")
        const TextNumberProductsElm = this.shadowRoot.querySelector(".TextNumberProducts")
        let Cart = [

        ]
        Cart = JSON.parse(localStorage.getItem("Cart"))
        let sumNumberProducts = 0
        if (Cart) {
            Cart.forEach(function (Products) {
                sumNumberProducts += Number(Products.value)
            })
        }
        if (sumNumberProducts) {
            NumberProductsElm.style.display = "Flex"
            TextNumberProductsElm.innerHTML = sumNumberProducts

        } else {
            NumberProductsElm.style.display = "none"
        }//نمایش تعداد محصولا در صفحه index




    }
}




export { mainheader }

