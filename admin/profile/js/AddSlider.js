import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)

let BoxSlide = document.getElementById("BoxSlide")
let AllSlid = JSON.parse(localStorage.getItem("Slider"))
function AddSlideTodom () {
    const ReverseAllSlid = [...AllSlid]
    ReverseAllSlid.reverse()
    BoxSlide.innerHTML = ""
    ReverseAllSlid.forEach(Slide => {
        BoxSlide.insertAdjacentHTML("beforeend",`
            <div class="Slide">
                <img class="imgSlide" src="${Slide.src.split('/')[0] == "img" ? "../../"+Slide.src : Slide.src }">
                <button  onclick="DeleteSlide(event)" data-id="${Slide.id}" class="DeleteSlide" >حذف اسلاید</button>
            </div>
        `)
    });

}



let BoxBtnAddSlider = document.getElementById("BoxBtnAddSlider")
BoxBtnAddSlider.addEventListener("click",ShowAddSlider)
let BoxContentAddSlider = document.getElementById("BoxContentAddSlider")
function ShowAddSlider () {
    BoxContentAddSlider.style.height = "200px"
    ResetInputAddSlider()
}
    
    


let ExitAddSlider = document.getElementById('ExitAddSlider')
ExitAddSlider.addEventListener("click",ExitAddSliderFun)
function ExitAddSliderFun () {
    BoxContentAddSlider.style.height = "0"
}




let TextBoxImgAddSlider = document.getElementById("TextBoxImgAddSlider")
let SrcInputBoxImgAddSlider = null;
function IsUploadimgAddSlider (e) {
    TextBoxImgAddSlider.innerHTML = e.target.files[0].name;
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = ()=> {
        SrcInputBoxImgAddSlider = reader.result
    }
    EroorAddSlider.innerHTML = ""
}


let InputBoxImgAddSlider = document.getElementById("InputBoxImgAddSlider")
const EroorAddSlider = document.getElementById("EroorAddSlider")
function ResetInputAddSlider () {
    InputBoxImgAddSlider.setAttribute("type","text")
    InputBoxImgAddSlider.setAttribute("type","file")
    SrcInputBoxImgAddSlider = null
    TextBoxImgAddSlider.innerHTML = "عکس محصول"
    EroorAddSlider.innerHTML = ""
}




let SubAddSlider = document.getElementById("SubAddSlider")
SubAddSlider.addEventListener("click",SubAddSliderFun)
function SubAddSliderFun () {
    if(SrcInputBoxImgAddSlider){
        let NewSlide = {
            id: AllSlid[AllSlid.length-1] ? AllSlid[AllSlid.length-1].id+1 : 1 ,
            src:SrcInputBoxImgAddSlider,
        }
        AllSlid.push(NewSlide)
        UpdateLocalStorage(AllSlid)
        ExitAddSliderFun()
    }else{
        EroorAddSlider.innerHTML = "<p>لطفا عکس اسلایدر را اپلود کنید!</p>"
    }
}




const BlurBox = document.querySelector(".BlurBox")
const BoxDeleteSlider = document.getElementById("BoxDeleteSlider")
const TrueIsDeleteSlide = document.getElementById("TrueIsDeleteSlide")
const FalseIsDeleteSlide = document.getElementById("FalseIsDeleteSlide")

window.DeleteSlide = function DeleteSlide (e) {
    BlurBox.style.display ="unset";
    BoxDeleteSlider.style.display = "flex";
    document.body.style.overflow = "hidden"
    TrueIsDeleteSlide.setAttribute("data-id" , e.target.getAttribute("data-id"));
}



TrueIsDeleteSlide.addEventListener("click",(e)=>{
    let IdSlide = e.target.getAttribute("data-id")
    let FindIndexSlide = AllSlid.findIndex(Slide =>{
        return Slide.id == IdSlide
    })
    AllSlid.splice(FindIndexSlide,1)
    UpdateLocalStorage(AllSlid)
    FalseIsDeleteStoryFun()
})
FalseIsDeleteSlide.addEventListener("click",FalseIsDeleteStoryFun)

function FalseIsDeleteStoryFun () {
    BlurBox.style.display ="none";
    BoxDeleteSlider.style.display = "none";
    document.body.style.overflow = "unset"
}





function UpdateLocalStorage (AllSlid) {
    localStorage.setItem("Slider",JSON.stringify(AllSlid))
    AddSlideTodom()
}




InputBoxImgAddSlider.addEventListener("change",IsUploadimgAddSlider)
window.addEventListener("load",AddSlideTodom)