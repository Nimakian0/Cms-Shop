import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)

let AllUsers = JSON.parse(localStorage.getItem("Users"))



let ContainerUser = document.getElementById("ContainerUser")
let NumberPerPage = 4;
let pageIndex = 1;

const boxPagingUsers = document.getElementById("boxPagingUsers")
function CreateBtnPaging () {
    let  NumberBtn = Math.ceil(AllUsers.length / NumberPerPage);
    boxPagingUsers.innerHTML = ""
    for(let inerBtn = 1 ; inerBtn <= NumberBtn; inerBtn++ ){
        boxPagingUsers.insertAdjacentHTML("beforeend",`<p onclick="SetActivePageIndex(event);" class="BtnPagingUsers">${inerBtn}</p>`)
    }
    const BtnPagingUsers = document.querySelectorAll(".BtnPagingUsers")
    BtnPagingUsers.forEach(BtnPaging => {
        BtnPaging.style.backgroundColor = "#ef4056"
    })
    BtnPagingUsers[pageIndex-1].style.backgroundColor = "#2DCEA2"
}

window.SetActivePageIndex = function SetActivePageIndex(event) {
    pageIndex = event.target.innerHTML
    CreateBtnPaging()
    AddToDom()

}


// 


function AddToDom (){
    let End = NumberPerPage * pageIndex;
    let Start = End - NumberPerPage;
    let ResultsliceItem = AllUsers.slice(Start,End)
    ContainerUser.innerHTML ="";

    ResultsliceItem.forEach(user => {

        let TextBtnBlockUser = null;
        user.Block == false ? TextBtnBlockUser = "مسدود کردن کاربر" :TextBtnBlockUser = "آزاد سازی کاربر";

        

        ContainerUser.insertAdjacentHTML("beforeend",`
           

            <tr>
                <td>${user.userName}</td>
                <td>${user.firstNamea+" "+user.lastName}</td> 
                <td>
                    
                    <button data-name="${user.userName}" onclick="toggleBlockUser(event);" class="BtnBlockUser BlockUserColor${user.Block}">${TextBtnBlockUser}</button>
                    
                </td>
            </tr>



        `)
        if(user.userName == "admin"){
            document.querySelector(".BtnBlockUser").style.cursor = "not-allowed"
        }

    });
}
// 
    

window.toggleBlockUser = function toggleBlockUser(event) {
    let UserNameCliked = event.target.getAttribute("data-name");
    if(UserNameCliked != "admin"){

        let FindUserInAllUser = AllUsers.find((User)=>{
            return User.userName == UserNameCliked
        })
        FindUserInAllUser.Block = !FindUserInAllUser.Block;
        
        UpdateUserLocalstorage()
    }
}


function UpdateUserLocalstorage () {
    let PreviousUsersLocalstorage = JSON.parse(localStorage.getItem("Users"))
    PreviousUsersLocalstorage = AllUsers
    localStorage.setItem("Users",JSON.stringify(AllUsers))

    AddToDom()
}









window.addEventListener("load",CreateBtnPaging)
window.addEventListener("load",AddToDom)






