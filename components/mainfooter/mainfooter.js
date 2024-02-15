const templatemainfooter = document.createElement('template')
templatemainfooter.innerHTML = `
    <link rel="stylesheet" href="components/mainfooter/mainfooter.css">
    <link rel="stylesheet" href="css/all.css">

    <div id="FooterBox">

        <div id="FooterBoxTop">
            <div id="FooterTop">
                <img src="img/Logo.svg">
                <div id="BtnBoxScroolTop">
                    <p>بازگشت به بالا</p>
                    <i class="fa-solid fa-angle-up"></i>
                </div>
            </div>
            <div id="FooterBottom">
                <p>تلفن پشتیبانی ۱۱۱۱۱۱۱۱ - ۰۲۱ | ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
            </div>
        </div>   


        <div id="FooterBoxBottom">
            <div class="ItemFooterBottom">
                <img src="img/Footer/express-delivery.svg">
                <p>اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس</p>
            </div>
            <div class="ItemFooterBottom">
                <img src="img/Footer/cash-on-delivery.svg">
                <p>امکان پرداخت در محل</p>
            </div>
            <div class="ItemFooterBottom">
                <img src="img/Footer/support.svg">
                <p>۷ روز هفته ، ۲۴ ﺳﺎﻋﺘﻪ</p>
            </div>
            <div class="ItemFooterBottom">
                <img src="img/Footer/days-return.svg">
                <p>هفت روز ضمانت بازگشت کالا</p>
            </div>
            <div class="ItemFooterBottom">
                <img src="img/Footer/original-products.svg">
                <p>ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ</p>
            </div>
        </div>


    </div>

`
class mainfooter extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(templatemainfooter.content.cloneNode(true))

    }


    connectedCallback() {
        let BtnBoxScroolTop = this.shadowRoot.querySelector("#BtnBoxScroolTop")
        BtnBoxScroolTop.addEventListener("click",()=>{
           
            window.scrollTo(0, 0);
            document.documentElement.classList.add('scroll-top-animation');
            setTimeout(() => {
                document.documentElement.classList.remove('scroll-top-animation');
            }, 1000);
             
           
        })
    }
}




export { mainfooter }

