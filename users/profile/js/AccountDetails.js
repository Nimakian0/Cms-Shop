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


function UserDate (){
    UserName.value = document.cookie.substring(document.cookie.indexOf("=")+1);
    Password.value = FindUser.password
    RepeatPassword.value = FindUser.password
    
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
    if(Password.value != RepeatPassword.value){
        BoxEroor.innerHTML = "<p>رمز عبور و تکرار آن یکسان نمی باشد !</p>"
    }else{
        BoxEroor.innerHTML = "<span>مشخصات شما با موفقیت بروز شد .</span>"
        FindUser.userName = UserName.value.toLowerCase()
        FindUser.password = Password.value.toLowerCase()
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
    },3000)
}


window.addEventListener("load",UserDate)


