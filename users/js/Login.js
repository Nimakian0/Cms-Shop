if(document.cookie.substring(document.cookie.indexOf("="),0)){
    document.location ="http://127.0.0.1:5500"
}



const showPasswordBtn = document.querySelector(".showPassword")

showPasswordBtn.addEventListener("click",()=>{
    if(showPasswordBtn.classList.contains("fa-eye-slash")){
        showPasswordBtn.classList.remove("fa-eye-slash")
        showPasswordBtn.classList.add("fa-eye")
        showPasswordBtn.previousElementSibling.setAttribute("type","text");
    }else{
        showPasswordBtn.classList.add("fa-eye-slash")
        showPasswordBtn.classList.remove("fa-eye")
        showPasswordBtn.previousElementSibling.setAttribute("type","password");
    }
})//نمایش و مخفی کردن رمز عبور =/\


const subLoginUser = document.getElementById("subLoginUser")
const userNameInput = document.getElementById("userName")
const passwordInput = document.getElementById("password")
const errorBox = document.querySelector(".error")
let correctNameAndPassword



subLoginUser.addEventListener("click",e => {
    e.preventDefault()


    correctNameAndPassword = allUsers.find(user => {
        return user.userName == userNameInput.value.toLowerCase() && user.password == passwordInput.value.toLowerCase()
    });

    if(userNameInput.value == "" && passwordInput.value == ""){
        errorBox.innerHTML = "<p>نام کاربری یا رمز عبور نمی تواند خالی باشد</p>"
    }else{

        if(correctNameAndPassword){
            if(correctNameAndPassword.Block){
                errorBox.innerHTML = "<p>حساب کاربری شما مسدود می باشد</p>"
            }else{
                setCookirLogin()
            }
        }else{
            errorBox.innerHTML = "<p>نام کاربری یا رمز عبور اشتباه می باشد</p>"
        }
    }
})



function setCookirLogin(){
    errorBox.innerHTML = ""
    document.cookie = `token = ${correctNameAndPassword.userName};path=/`
    errorBox.innerHTML = "<span>با موفقیت وارد شدید</span>"
    setTimeout(()=>{
        window.location = "../"
    },1000)

    
}




