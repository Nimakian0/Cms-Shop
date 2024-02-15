const templateBeforeLoad = document.createElement('template')
templateBeforeLoad.innerHTML = `
    <div id="BeforeLoad" style="width: 100%;height: 100vh;position: absolute;display: flex;align-items: center;justify-content: center;z-index: 2;background-color: #ffffff;">
        <img style="width: 150px;" src="img/Logo.svg">
    </div>
`


class BeforeLoad extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(templateBeforeLoad.content.cloneNode(true))
    }


    connectedCallback () {
       let BeforeLoad = this.shadowRoot.querySelector("#BeforeLoad")

        window.addEventListener("load",()=>{
            setTimeout(() => {
                BeforeLoad.style.display = "none"
                document.body.style.overflow = "unset"
            },500)
        })


    }
}

window.customElements.define("before-load",BeforeLoad)