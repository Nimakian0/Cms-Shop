import { mainheader } from "../components/mainheader/mainheader.js";
window.customElements.define("main-header", mainheader)

import { mainfooter } from "../components/mainfooter/mainfooter.js";
window.customElements.define("main-footer",mainfooter)


arrayStoreContent = JSON.parse(localStorage.getItem("Story"))
let ReverseArrayStoreContent = [...arrayStoreContent]
ReverseArrayStoreContent.reverse()

let containerStoryBox = document.getElementById("storyBox")
function AddToDomStory (){
    ReverseArrayStoreContent.forEach(function(arrayStoreContentItem){
        containerStoryBox.insertAdjacentHTML("beforeend",'<div id="storyItem"><img onclick ="ClickInStoryItem(event)" data-idStory="'+ arrayStoreContentItem.id +'" class="imgStory '+ arrayStoreContentItem.look +'" src="'+ arrayStoreContentItem.srcIcon +'" alt=""><p>'+ arrayStoreContentItem.text +'</p></div>')
    })
}AddToDomStory()





window.ClickInStoryItem = function ClickInStoryItem (event) {
    let FindresultClick  = arrayStoreContent.find(function(arrayStoreContentitem){
        return arrayStoreContentitem.id == event.target.getAttribute("data-idStory")
    })
    FindresultClick.look = "lookStoreTrue"
    containerStoryBox.innerHTML = ""
    AddToDomStory()
    UpdatelocalStorageStory()
    ShowStory(FindresultClick.id)
}



const StoryContentSelect = document.getElementById("StoryContent")
const informationImgSelect = document.getElementById("informationImg")
const informationTextSelect = document.getElementById("informationText")
const StoryblorSelect = document.getElementById("Storyblor")
function ShowStory(FindresultClickId) {
    let FindStory = arrayStoreContent.find(Story => {
        return Story.id == FindresultClickId
    })

    StoryContentSelect.style.display = "block"
    StoryContentSelect.style.backgroundImage = FindStory.srcContent
    informationImgSelect.setAttribute("src",FindStory.srcIcon)
    informationTextSelect.innerHTML = FindStory.text
    StoryblorSelect.style.display = "block";
    document.body.style.overflow = "hidden";
    timeSelect.style.width = "0"
    window.scrollTo(1,1)
    timeExitStory()
    
}



function exitStory (){
    StoryContentSelect.style.display = "none"
    document.body.style.overflow = "auto"
    StoryblorSelect.style.display = "none"
    // timeSelect.style.width = "0%" 
}

let exitStorySelect = document.getElementById("exitStory")
exitStorySelect.addEventListener("click",exitStory)
StoryblorSelect.addEventListener("click",exitStory)



const timeSelect = document.getElementById("time")
function timeExitStory (){
    
    setTimeout(function() {
        timeSelect.style.width = "100%" 
        // clearTimeout(setIntervaltimeStory)
        let TimeouttimeStory = setTimeout(function(){
            exitStory()
        } , 5000)    


        exitStorySelect.addEventListener("click",function(){
            clearTimeout(TimeouttimeStory)
        })

        StoryblorSelect.addEventListener("click",function(){
            clearTimeout(TimeouttimeStory)
        })
    },500) 
}


function UpdatelocalStorageStory () {
    localStorage.setItem("Story",JSON.stringify(arrayStoreContent))
}
// UpdatelocalStorageStory() 


// endStory
// endStory
// endStory




// slider
// slider
// slider

const sliderBox = document.getElementById('sliderBox');
let AllimgSlider = null;
const SliderCircle = document.getElementById("SliderCircle")
const arrowLeftbtn = document.getElementById("arrow-Left")
const arrowright = document.getElementById("arrow-right")
let ArraySlider = JSON.parse(localStorage.getItem("Slider"))
ArraySlider.reverse()
function AddSliderToDom (){
    ArraySlider.forEach(img => {
        sliderBox.insertAdjacentHTML("beforeend",`
            <img class="imgSlider" ondragstart="nodragfun(event)" src="${img.src}" alt="">
        `)
        
    })
    AllimgSlider = [...sliderBox.children]
}AddSliderToDom()
const imgSlider = document.querySelector(".imgSlider")


window.nodragfun = function nodragfun (event){
    event.preventDefault()
}


arrowLeftbtn.addEventListener("click",function(event){
    let imgwidth = imgSlider.width

    let beforeactivSliderCircleItem = document.querySelector(".activitemslider")

    if(beforeactivSliderCircleItem.getAttribute("data-id") >= AllimgSlider.length){
        beforeactivSliderCircleItem.classList.remove("activitemslider")
        SliderCircle.children[0].classList.add("activitemslider");
        sliderBox.scrollLeft = 0
    }else{
        let activSliderCircleItem =  beforeactivSliderCircleItem.nextElementSibling
        activSliderCircleItem.classList.add("activitemslider")
        beforeactivSliderCircleItem.classList.remove("activitemslider")
        sliderBox.scrollLeft = -(activSliderCircleItem.getAttribute("data-id")-1) * imgwidth
    }
    
})



arrowright.addEventListener("click",function(){
    let imgwidth = imgSlider.width
   
    let beforeactivSliderCircleItem = document.querySelector(".activitemslider")

    if(beforeactivSliderCircleItem.getAttribute("data-id") == 1){
        beforeactivSliderCircleItem.classList.remove("activitemslider")
        SliderCircle.children[AllimgSlider.length-1].classList.add("activitemslider")
        sliderBox.scrollLeft = -(AllimgSlider.length-1)*imgwidth

    }else{
        let activSliderCircleItem = beforeactivSliderCircleItem.previousElementSibling
        activSliderCircleItem.classList.add("activitemslider")
        beforeactivSliderCircleItem.classList.remove("activitemslider")
        sliderBox.scrollLeft = -(activSliderCircleItem.getAttribute("data-id")-1) * imgwidth

    }
    
})




AllimgSlider.forEach ((imgSlider,index)=> {
    SliderCircle.insertAdjacentHTML("beforeend",`
        <div data-id="${index+1}" class="ItemSliderCircle" ></div>
    `);
})
SliderCircle.children[0].classList.add("activitemslider");

// endslider
// endslider
// endslider





// sliderd-special-sale

let AllProductsGroceries = JSON.parse(localStorage.getItem("Productsgroceries"))


let ProductsGroceriesSpecialSale = AllProductsGroceries.filter(product => {
    return product.Discount != ""
}).sort((ProductOne,ProductTwo)=>{
    return parseFloat(ProductTwo.Discount) - parseFloat(ProductOne.Discount)
})
ProductsGroceriesSpecialSale.length = 8


let ContentSpecialSale = document.getElementById("ContentSpecialSale")



ProductsGroceriesSpecialSale.forEach( Product =>{
    const discountAmount = (Product.Price * (Product.Discount).replace('%', '')) / 100;
    ContentSpecialSale.insertAdjacentHTML("beforeend",`
        <a href="product.html?id=${Product.id}" class="ItemSpecialSale">
            <img nodragfun(return false) class="ImgProduct" src="${Product.SrcProduct}">

            <div class="BoxPricrAndDiscountItemSpecialSale">
                <p class="DiscountItemSpecialSale">
                    ${Product.Discount}
                </p>
                
                <p class="PriceItemSpecialSale">
                    ${(Product.Price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
                
            </div>
            <p class="DiscountedPrice">
            ${((Product.Price)-discountAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
        </a>
    `)
})

let ArrowRightSpecialSale = document.getElementById("ArrowRightSpecialSale")
let ArrowLeftSpecialSale = document.getElementById("ArrowLeftSpecialSale")
let IndexShowSpecialSale = 0
ArrowRightSpecialSale.addEventListener("click",()=>{
    IndexShowSpecialSale--
   
    
    ContentSpecialSale.scrollLeft =  -(IndexShowSpecialSale * 188);

    ControlBtnSpecialSale(IndexShowSpecialSale)
})


ArrowLeftSpecialSale.addEventListener("click",()=>{
    IndexShowSpecialSale++
    

    ContentSpecialSale.scrollLeft = -(IndexShowSpecialSale * 188)
    ControlBtnSpecialSale(IndexShowSpecialSale)
})


function ControlBtnSpecialSale (){
    if(IndexShowSpecialSale == 0)    {
        ArrowRightSpecialSale.style.display = "none"
    }else{
        ArrowRightSpecialSale.style.display = "flex"
    }

    
    if(IndexShowSpecialSale + Math.floor((ContentSpecialSale.clientWidth / 188)-2) == ProductsGroceriesSpecialSale.length - 1){
        ArrowLeftSpecialSale.style.display = "none"
    }else{
        ArrowLeftSpecialSale.style.display = "flex"
    }
    
}
ControlBtnSpecialSale()





// sliderd-special-sale


