import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)


let AllUser = JSON.parse(localStorage.getItem("Users"))
const firstNamea = document.getElementById("firstNamea")
const lastName = document.getElementById("lastName")
const UserName = document.getElementById("UserName")
const Password = document.getElementById("Password")
const EroorBox = document.getElementById("EroorBox")



function ResetEroorBox () {
    EroorBox.innerHTML = ""
    EroorBox.style.opacity = "0"
}



const SubCreateUser = document.getElementById("SubCreateUser")
SubCreateUser.addEventListener("click",()=>{

    const IsRepetitUserName = AllUser.find(User => {
        return User.userName == UserName.value
    })
    EroorBox.innerHTML = ""
    EroorBox.style.opacity = "1"
    if(IsRepetitUserName != undefined){
        EroorBox.innerHTML += "<p>نام نمایشی از قبل وجود دارد</p>"
    }
    if(Password.value == ""){
        EroorBox.innerHTML += "<p>رمز عبور نمی تواند خالی باشد</p>"
    }

    setTimeout(ResetEroorBox,4000)

    if(EroorBox.innerHTML == ""){
        let NewUser = {
            firstNamea : firstNamea.value,
            lastName : lastName.value,
            userName : UserName.value.toLowerCase(),
            password : Password.value.toLowerCase(),
            Orders : [],
            type : "User",
            Block : false, 
            tickets : [
                
            ]
        }

        AllUser.push(NewUser)
        UpdateLocalStorage()

    }

})


function UpdateLocalStorage () {
    localStorage.setItem("Users",JSON.stringify(AllUser))
    window.location = "SiteUsers.html"
}

