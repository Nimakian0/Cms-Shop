const templateMainHeader = document.createElement('template')
templateMainHeader.innerHTML = `
    <link rel="stylesheet" href="../../css/all.css">
    <link rel="stylesheet" href="../../components/menuAdmin/menuAdmin.css">
    


    <div class="menuBox">
    
        <div class="menu-respansev-btn">
            <i class="fa-solid fa-bars" style="color: #424750;"></i>
        </div>

        <div class="menu">
            <div class="BoxLogoExitRespansev">
                <a style="height:30px;" href="../../"><img src="../../img/Logo.svg" alt=""></a>
                <i class="fa-solid fa-xmark exitMenuRespansevBtn"></i>
            </div>

            <ul class="Ulmenu">
                <a href="CartAdmin.html"> <i class="fa-solid fa-cart-shopping"></i> <p>خرید های ادمین</p> </a>
                <a href="SiteUsers.html"> <i class="fa-solid fa-users"></i> <p>کاربران</p> </a>
                <a href="productsList.html"> <i class="fa-solid fa-clipboard"></i> <p>لیست محصولات</p> </a>
                <a href="ordersList.html"> <i class="fa-solid fa-shop"></i> <p>لیست سفارش ها</p> </a>
                <a href="AddStory.html"> <i class="fa-solid fa-boxes-stacked"></i> <p>افزودن استوری</p> </a>
                <a href="AddSlider.html"> <i class="fa-regular fa-images"></i> <p>افزودن اسلایدر</p> </a>
                <a href="ShowTickets.html"> <i class="fa-solid fa-envelope"></i> <p>پشتیبانی</p> </a>
                <a id="BtnLogout"> <i class="fa-solid fa-right-from-bracket"></i> <p>خروج</p> </a>
            </ul>

        </div>
    </div>
`


class menuAdmin extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(templateMainHeader.content.cloneNode(true))
    }


    connectedCallback () {
        let ShowMenurespansevbtn = this.shadowRoot.querySelector(".menu-respansev-btn")
        let menu = this.shadowRoot.querySelector(".menu")
        ShowMenurespansevbtn.addEventListener("click",()=>{
            menu.style.right = "0%"
            document.body.style.overflow = "hidden"
        })

        let exitMenuRespansevBtn = this.shadowRoot.querySelector(".exitMenuRespansevBtn")
        exitMenuRespansevBtn.addEventListener("click",()=>{
            menu.style.right = "-100%"
            document.body.style.overflow = "unset"
        })



        document.body.insertAdjacentHTML("beforeend",`
            <div class="BlurBox">
            </div>
            <div id="BoxIsLogot">
                <p>آیا میخواهید خارج شوید ؟</p>
                <div id="BtnBoxIsLogot">
                    <button id="TrueIsLogot">بله</button>
                    <button id="FalseIsLogot">خیر</button>
                </div>
            </div>
        `)
        const BlurBoxIsLogot = document.querySelector(".BlurBox")
        const BoxIsLogot = document.getElementById("BoxIsLogot")
        const TrueIsLogot = document.getElementById("TrueIsLogot")
        const FalseIsLogot = document.getElementById("FalseIsLogot")



        const BtnLogout = this.shadowRoot.getElementById("BtnLogout")
        BtnLogout.addEventListener("click",()=>{
            BlurBoxIsLogot.style.display ="unset"
            BoxIsLogot.style.display = "flex"
        })

        FalseIsLogot.addEventListener("click",()=>{
            BlurBoxIsLogot.style.display ="none"
            BoxIsLogot.style.display = "none"
        })

        TrueIsLogot.addEventListener("click",LogOt)


        function LogOt() {
            let Time = new Date();
            Time.setTime(Time.getTime() - 2*24*60*60*1000);
            document.cookie = `token=admin;Expires=${Time};path=/`;
            window.location = "../../"
        }




        const PageLink = this.shadowRoot.querySelector(`a[href="${this.getAttribute("src")}"]`);
        PageLink.style.backgroundColor = "#ef4056"
        PageLink.querySelector("i").style.color = "#fff"
        PageLink.querySelector("p").style.color = "#fff"


    }
}


export {menuAdmin}