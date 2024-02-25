if(document.cookie.substring(document.cookie.indexOf("="),0)){
    document.location ="../"
}


const tagShowPassword = document.querySelectorAll('.showPassword')
tagShowPassword.forEach((ItemTagShowPassword)=>{
    ItemTagShowPassword.addEventListener("click",e=>{
    if(e.target.classList.contains("fa-eye-slash")){
        ItemTagShowPassword.classList.remove("fa-eye-slash")
        ItemTagShowPassword.classList.add("fa-eye")
        e.target.previousElementSibling.setAttribute("type","text");
    }else{
        ItemTagShowPassword.classList.add("fa-eye-slash")
        ItemTagShowPassword.classList.remove("fa-eye")
        e.target.previousElementSibling.setAttribute("type","password");
    }
})
})
// پیاده سازی عملیات نمایش و مخفی کردن پسورد =/\




const btnSubSingUpUser = document.getElementById("subSingUpUser")
const userNameInput = document.getElementById("userName")
const passwordInput = document.getElementById("password")
const RepeatPasswordInput = document.getElementById("RepeatPassword")
const errorBox = document.querySelector(".error")
btnSubSingUpUser.addEventListener("click",e=>{
    e.preventDefault()
    // پیاده سازی تکراری نبودن نام کاربری!

    let allUsers = JSON.parse(localStorage.getItem("Users")) || []
   

    const isRepeatUsername = allUsers.find((datauser)=>{
        return datauser.userName == userNameInput.value
    })
    

    if(isRepeatUsername){
        errorBox.innerHTML = "<p>نام کاربری از قبل وجود دارد</p>"
    }else if(RepeatPasswordInput.value != passwordInput.value){
        errorBox.innerHTML = "<p>رمز عبور و تکرار آن یکسان نمی باشد</p>"
    }else if(userNameInput.value == "" || passwordInput.value == "" ){
        errorBox.innerHTML = "<p>نام کاربری یا رمز عبور نمی تواند خالی باشد</p>"
    }else{
        errorBox.innerHTML = ""
        let newUser = {
            firstNamea : "",
            lastName : "",
            userName : userNameInput.value.toLowerCase(),
            password : passwordInput.value.toLowerCase(),
            Orders : [],
            type : "User",
            Block : false, 
            tickets : [
                
            ]
        }
    
        
        allUsers.push(newUser)
        localStorage.setItem("Users",JSON.stringify(allUsers))
        errorBox.innerHTML = "<span>ثبت نام شما با موفقیت تکمیل شد</span>"
        document.cookie = `token = ${newUser.userName};path=/`
        setTimeout(()=>{
            window.location = "../"
        },1000)
        userNameInput.value = ""
        passwordInput.value = ""
        RepeatPasswordInput.value = ""

    }
    





})


