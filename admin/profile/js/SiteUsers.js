import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)

let AllUsers = JSON.parse(localStorage.getItem("Users"))




const boxPagingUsers = document.getElementById("boxPagingUsers")
function CreateBtnPaging () {
    let  NumberBtn = Math.ceil(AllUsers.length / NumberPerPage);
    for(let inerBtn = 1 ; inerBtn <= NumberBtn; inerBtn++ ){
        boxPagingUsers.insertAdjacentHTML("beforeend",`<p onclick="SetActivePageIndex(event);" class="BtnPagingUsers">${inerBtn}</p>`)
    }
}

window.SetActivePageIndex = function SetActivePageIndex(event) {
    pageIndex = event.target.innerHTML
    ShowUsers()
}


// 
let BoxUser = document.getElementById("ulUsers")
let NumberPerPage = 4;
let pageIndex = 1;
function ShowUsers () {
    let End = NumberPerPage * pageIndex;
    let Start = End - NumberPerPage;
    let ResultsliceItem = AllUsers.slice(Start,End)
    
    

    AddToDom(ResultsliceItem)
    
    
    
}
function AddToDom (ResultsliceItem){
    BoxUser.innerHTML ="";
    ResultsliceItem.forEach(user => {

        let TextBtnBlockUser = null;
        user.Block == false ? TextBtnBlockUser = "مسدود کردن کاربر" :TextBtnBlockUser = "آزاد سازی کاربر";

        

        BoxUser.insertAdjacentHTML("beforeend",`
            <li>
                <p class="UserNameText">${user.userName}</p>
                <div class="BoxBlockUpgradeUser">
                    <button onclick="toggleBlockUser(event);" class="BtnBlockUser BlockUserColor${user.Block}">${TextBtnBlockUser}</button> 
                </div>
            </li>
        `)
        if(user.userName == "admin"){
            document.querySelector(".BtnBlockUser").style.cursor = "not-allowed"
        }

    });
}
// 
    

window.toggleBlockUser = function toggleBlockUser(event) {
    // console.log();
    let UserNameCliked = event.target.parentNode.previousElementSibling.innerHTML;
    if(UserNameCliked != "admin"){

        let FindUserInAllUser = AllUsers.find((User)=>{
            return User.userName == UserNameCliked
        })
        FindUserInAllUser.Block = !FindUserInAllUser.Block;
        
        UpdateUserLocalstorage()
    }
}


function UpdateUserLocalstorage () {
    inputSearchUser.value = ""
    let PreviousUsersLocalstorage = JSON.parse(localStorage.getItem("Users"))
    PreviousUsersLocalstorage = AllUsers
    localStorage.setItem("Users",JSON.stringify(AllUsers))

    ShowUsers()
}




const SubSearch = document.getElementById("SubSearch")
const inputSearchUser = document.getElementById("inputSearchUser")
function SearchUser () {
    console.log(inputSearchUser.value);

    let ResaluSearch = AllUsers.filter(user=>{
        return user.userName.includes(inputSearchUser.value)
    })
    if(ResaluSearch){

        AddToDom(ResaluSearch)
    }
    
    
}



SubSearch.addEventListener("click",SearchUser)
window.addEventListener("load",CreateBtnPaging)
window.addEventListener("load",ShowUsers)





