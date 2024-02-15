import { menuuser } from "../../../components/menuuser/menuuser.js";
window.customElements.define("menu-user",menuuser)


let AllUser = JSON.parse(localStorage.getItem("Users")) 
const UserName = document.cookie.substring(document.cookie.indexOf("=")+1)
let FindUSer = AllUser.find(User => {
    return User.userName == UserName
})
const AllTicket = document.getElementById("AllTicket")
function AddTicketsToDom () {
    if(FindUSer.tickets.length == 0){
        AllTicket.insertAdjacentHTML("beforeend",`
            <div class="EmptyTicket">
                <h4>تیکت ای ثبت نشده است :(</h4>
            </div>
        `)
    }else{
        AllTicket.innerHTML = ""
        let reverseticketsFindUSer = [...FindUSer.tickets]
        reverseticketsFindUSer.reverse();
        reverseticketsFindUSer.forEach(ticket => {
            AllTicket.insertAdjacentHTML("beforeend",`
                <a href="ShowTicket.html?id=${ticket.id}" class="ItemTicket">
                    <div class="TextItemTicket">
                        <p class="idtextSubjectTickets">${ticket.id}#</p>
                        <p class="textSubjectTickets">${ticket.SubjectTickets}</p>
                    </div>
                    <div class="StatusItemTicket">
                        <p class="${ticket.active ? "StatusItemTicketTrue":"StatusItemTicketFalse"}">${ticket.active ? "فعال":"بسته شده"}</p>
                    </div>
                </a>
            `)            
        });
    }
}





const ShowAddNewTicket = document.getElementById("ShowAddNewTicket")
const BoxContentNewTickets = document.getElementById("BoxContentNewTickets")
ShowAddNewTicket.addEventListener("click",ShowAddNewTicketFun)
function ShowAddNewTicketFun () {
    BoxContentNewTickets.style.opacity = "1"
    BoxContentNewTickets.style.height = "480px"
}


const ExitNewTicket = document.getElementById("ExitNewTicket")
ExitNewTicket.addEventListener("click",ExitNewTicketFun)
function ExitNewTicketFun () {
    BoxContentNewTickets.style.opacity = "0"
    BoxContentNewTickets.style.height = "0px"
    ResetInput()
}


const SubjectTickets = document.getElementById("SubjectTickets")
const textTicket = document.getElementById("textTicket")
const EroorBox = document.getElementById("EroorBox")
function ResetInput () {
    SubjectTickets.value = ""
    textTicket.value = ""
    EroorBox.innerHTML = ""
    EroorBox.style.display = "none"
}







const SubNewTicket = document.getElementById('SubNewTicket')
SubNewTicket.addEventListener("click",SubNewTicketFun)
function SubNewTicketFun () {
    EroorBox.innerHTML = ""
    EroorBox.style.display = "block"
    if(SubjectTickets.value == ""){
        EroorBox.innerHTML += "<p>موضوع تیکت را وارد کنید !</p>"
    }
    if(textTicket.value == ""){
        EroorBox.innerHTML += "<p>متن تیکت را وارد کنید</p>"
    }


    if(EroorBox.innerHTML == "" ){

        const NewTickets = {
            id: FindUSer.tickets[FindUSer.tickets.length-1] ? FindUSer.tickets[FindUSer.tickets.length-1].id+1 : 1,
            UserName:UserName,
            SubjectTickets:SubjectTickets.value,
            active:true,
            Messages:[
                {sender:"User",Text:textTicket.value},
            ]
        }

        FindUSer.tickets.push(NewTickets)

        UpdateLocalStorage()
        
    }


}



function UpdateLocalStorage () {
    localStorage.setItem("Users",JSON.stringify(AllUser))
    ExitNewTicketFun()
    ResetInput()
    AddTicketsToDom()
}




window.addEventListener("load",AddTicketsToDom)