import { menuuser } from "../../../components/menuuser/menuuser.js";
window.customElements.define("menu-user",menuuser)


let AllUser = JSON.parse(localStorage.getItem("Users"))

const FindUser = AllUser.find(User => {
    return User.userName == document.cookie.substring(document.cookie.indexOf("=")+1)
})


const BoxEroor = document.getElementById("BoxEroor")
let UserName = document.getElementById("UserName")
let Password = document.getElementById("Password")
let RepeatPassword = document.getElementById("RepeatPassword")
const FirstName = document.getElementById("FirstName")
const LastName = document.getElementById("LastName")


function UserDate (){
    UserName.value = document.cookie.substring(document.cookie.indexOf("=")+1);
    Password.value = FindUser.password
    RepeatPassword.value = FindUser.password
    FirstName.value = FindUser.firstNamea
    LastName.value = FindUser.lastName
}



window.showPassword =  function showPassword (e) {
    if(e.target.className == "fa-regular fa-eye-slash showPassword i"){
        e.target.className = "fa-regular showPassword fa-eye i"
        e.target.previousElementSibling.setAttribute("type","text")
    }else{
        e.target.className = "fa-regular fa-eye-slash showPassword i"
        e.target.previousElementSibling.setAttribute("type","password")
    }
}




const CancellAccountDetails = document.getElementById('CancellAccountDetails')
CancellAccountDetails.addEventListener('click',UserDate)




let SubAccountDetails = document.getElementById("SubAccountDetails")
SubAccountDetails.addEventListener("click",()=>{
    BoxEroor.style.opacity = "1"
    BoxEroor.innerHTML = ""
    if(Password.value != RepeatPassword.value){
        BoxEroor.innerHTML += "<p>رمز عبور و تکرار آن یکسان نمی باشد !</p>"
    }
    if(UserName.value == ""){
        BoxEroor.innerHTML += "<p>نام نمایشی نمیتواند خالی باشد !</p>"
    }


    const DuplicateUserName = AllUser.find(User => {
        return User.userName == UserName.value
    })

    if(DuplicateUserName != undefined && UserName.value != FindUser.userName ){
        BoxEroor.innerHTML += "<p>نام نمایشی از قبل وجود دارد !</p>"
    }

    if(Password.value == "" || RepeatPassword.value == "" ){
        BoxEroor.innerHTML += "<p>رمز عبور ای وارد نشده !</p>"
    }


    
    
    if(BoxEroor.innerHTML == ""){
        BoxEroor.innerHTML = "<span>مشخصات شما با موفقیت بروز شد .</span>"
        FindUser.userName = UserName.value.toLowerCase()
        FindUser.password = Password.value.toLowerCase()
        FindUser.firstNamea = FirstName.value
        FindUser.lastName = LastName.value
        UpdateLocalStorage()
    }
    ResetBoxEroor()
})


function UpdateLocalStorage () {
    localStorage.setItem("Users",JSON.stringify(AllUser))
    document.cookie = `token = ${UserName.value.toLowerCase()};path=/`
}

function ResetBoxEroor () {
    setTimeout(()=>{
        BoxEroor.style.opacity = "0"
    },4000)
}


window.addEventListener("load",UserDate)


