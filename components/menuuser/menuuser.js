const templatemenuuser = document.createElement('template')
templatemenuuser.innerHTML = `
    <link rel="stylesheet" href="../../css/all.css">
    <link rel="stylesheet" href="../../components/menuuser/menuuser.css">
    


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
                <li><i class="fa-solid fa-cart-shopping"></i> <a href="ordersList.html">لیست سفارش ها</a></li>
                <li><i class="fa-solid fa-user-pen"></i> <a href="AccountDetails.html">جزئیات حساب</a></li>
                <li><i class="fa-solid fa-envelope"></i> <a href="SendTicket.html">پشتیبانی</a></li>
                <li><i class="fa-solid fa-right-from-bracket"></i> <a id="BtnLogout" href="#">خروج</a></li>
            </ul>

        </div>
    </div>
`


class menuuser extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(templatemenuuser.content.cloneNode(true))
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


export {menuuser}