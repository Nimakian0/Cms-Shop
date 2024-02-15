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
                <a href="../../"><img src="../../img/Logo.svg" alt=""></a>
                <i class="fa-solid fa-xmark exitMenuRespansevBtn"></i>
            </div>

            <ul class="Ulmenu">
                <li><i class="fa-solid fa-cart-shopping"></i> <a href="CartAdmin.html">خرید های ادمین</a></li>
                <li><i class="fa-solid fa-users"></i> <a href="SiteUsers.html">کاربران</a></li>
                <li><i class="fa-solid fa-clipboard"></i> <a href="productsList.html">لیست محصولات</a></li>
                <li><i class="fa-solid fa-shop"></i> <a href="ordersList.html">لیست سفارش ها</a></li>
                <li><i class="fa-solid fa-boxes-stacked"></i> <a href="AddStory.html">افزودن استوری</a></li>
                <li><i class="fa-regular fa-images"></i> <a href="AddSlider.html">افزودن اسلایدر</a></li>
                <li><i class="fa-solid fa-envelope"></i> <a href="ShowTickets.html">پشتیبانی</a></li>
                <li><i class="fa-solid fa-right-from-bracket"></i> <a id="BtnLogout" href="#">خروج</a></li>
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

        const BtnLogout = this.shadowRoot.getElementById("BtnLogout")
        BtnLogout.addEventListener("click",()=>{
            let Time = new Date();
            Time.setTime(Time.getTime() - 2*24*60*60*1000);
            document.cookie = `token=admin;Expires=${Time};path=/`;
        
            window.location = "../../"
        })

    }
}


export {menuAdmin}