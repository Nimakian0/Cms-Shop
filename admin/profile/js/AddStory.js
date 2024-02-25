import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)



let AllStory = JSON.parse(localStorage.getItem("Story"))


const StoryContent = document.getElementById("StoryContent")
function AddStoryToDom (){
    let ReverseAllStory = [...AllStory]
    ReverseAllStory.reverse()


    StoryContent .innerHTML = ""
    let SrcIcon = null
    ReverseAllStory.forEach(Story => {

        Story.srcIcon.split('/')[0] == "img" ? SrcIcon = "../../"+Story.srcIcon :SrcIcon = Story.srcIcon

        StoryContent.insertAdjacentHTML("beforeend",`
            <div class="StoryItem">
                <img class="ImgStoryItem" src="${SrcIcon}">
                <p class="TetxStoryItem">${Story.text}</p>
                <button  onclick="DeleteStory(event)" data-id="${Story.id}" class="DeleteStory">حذف استوری</button>
            </div>
        `)
    });
}



let ContentAddStory = document.getElementById("ContentAddStory")
let BoxBtnAddStore = document.getElementById("BoxBtnAddStore")
let ExitAddStory = document.getElementById("ExitAddStory")
BoxBtnAddStore.addEventListener("click",ShowContentAddStory)
ExitAddStory.addEventListener("click",ExitAddStoryFun)



function ShowContentAddStory(){
    ContentAddStory.style.height = "380px"
}

function ExitAddStoryFun () {
    ContentAddStory.style.height = "0px"
    ResetISUpload()
}

let IconeStory = null
const TetxImgIconeContentAddStory = document.getElementById("TetxImgIconeContentAddStory")
function IsUploadIconeStory (e) {
    TetxImgIconeContentAddStory.innerHTML = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        IconeStory = reader.result
    };
}

let SrcStory = null
const TextImgSrcContentAddStory = document.getElementById("TextImgSrcContentAddStory")
function IsUploadSrcStory (e) {
    TextImgSrcContentAddStory.innerHTML = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        SrcStory = reader.result
    };
}


function ResetISUpload(){
    inputTextContentAddStory.value = ""

    inputImgIconeContentAddStory.setAttribute("type","text")
    inputImgIconeContentAddStory.setAttribute("type","file")
    TetxImgIconeContentAddStory.innerHTML = "عکس محصول"
    IconeStory = null

    InputImgSrcContentAddStory.setAttribute("type","text")
    InputImgSrcContentAddStory.setAttribute("type","file")
    TextImgSrcContentAddStory.innerHTML = "عکس محصول"
    SrcStory = null
}


let SubAddStoryBtn = document.getElementById("SubAddStory")
SubAddStoryBtn.addEventListener("click",SubAddStory)
const inputTextContentAddStory = document.getElementById("inputTextContentAddStory")
const ErorAddStory = document.getElementById('ErorAddStory')
function SubAddStory () {
    let ErorTexts = ""

    if(!inputTextContentAddStory.value){
        ErorTexts += "<p>عنوان استوری نمیتواند خالی باشد.</p>"
    }
    if(!IconeStory){
        ErorTexts += "<p>یک عکس برای ایکون استوری اپلود کنید.</p>"
    }
    if(!SrcStory){
        ErorTexts += "<p>یک عکس برای محتوای استوری اپلود کنید.</p>"

    }


    ErorAddStory.innerHTML = ErorTexts
    if(!ErorTexts){
        let NewStory = {
            id:  AllStory[AllStory.length-1] ? AllStory[AllStory.length-1].id+1 :1,
            look : "lookStoreFalse",
            srcContent : "url("+SrcStory+")",
            srcIcon: IconeStory,
            text: inputTextContentAddStory.value,
        }
       
    
        AllStory.push(NewStory)
        ExitAddStoryFun()
        UpdateLocalStorage(AllStory)    
    }

    
}


const BlurBox = document.querySelector(".BlurBox")
const BoxDeleteStory = document.getElementById("BoxDeleteStory")
const TrueIsDeleteStory = document.getElementById("TrueIsDeleteStory")
const FalseIsDeleteStory = document.getElementById("FalseIsDeleteStory")

window.DeleteStory = function DeleteStory (e) {
    BlurBox.style.display ="unset";
    BoxDeleteStory.style.display = "flex";
    TrueIsDeleteStory.setAttribute("data-id" , e.target.getAttribute("data-id"));
    document.body.style.overflow = "hidden"


    
}


TrueIsDeleteStory.addEventListener('click',(e)=>{
    let StoryId = e.target.getAttribute("data-id")
    let FindIndexStory = AllStory.findIndex( Story =>{
        return Story.id == StoryId
    })
    AllStory.splice(FindIndexStory,1)
    UpdateLocalStorage(AllStory)
    FalseIsDeleteStoryFun()
})
FalseIsDeleteStory.addEventListener('click',FalseIsDeleteStoryFun)


function FalseIsDeleteStoryFun () {
    BlurBox.style.display ="none";
    BoxDeleteStory.style.display = "none";
    document.body.style.overflow = "unset"
}






function UpdateLocalStorage (AllStory) {
    localStorage.setItem("Story",JSON.stringify(AllStory))
    AddStoryToDom()
}


const inputImgIconeContentAddStory = document.getElementById("inputImgIconeContentAddStory")
inputImgIconeContentAddStory.addEventListener("change",IsUploadIconeStory)

const InputImgSrcContentAddStory = document.getElementById("InputImgSrcContentAddStory")
InputImgSrcContentAddStory.addEventListener("change",IsUploadSrcStory)


window.addEventListener("load",AddStoryToDom)