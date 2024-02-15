import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)



const AllUser = JSON.parse(localStorage.getItem("Users"))
let UrlSearch = new URLSearchParams(location.search)
const UrlVale = UrlSearch.get("id")

const NameUser = UrlVale.split(";")[0]
const MessageId = UrlVale.split(";")[1]



const FindMessage = AllUser.find(User => {
    return User.userName == NameUser
}).tickets.find(message => {
    return message.id == MessageId
})





const ContentTicket = document.getElementById("ContentTicket")
const TextSubjectTickets = document.getElementById('TextSubjectTickets')
function AddMessageTodom () {
    ContentTicket.innerHTML = ""
    FindMessage.Messages.forEach(Message => {
        TextSubjectTickets.innerHTML = FindMessage.SubjectTickets
        ContentTicket.insertAdjacentHTML("beforeend",`
            <div class="${Message.sender == "User" ? "BoxMessageUser" : "BoxMessageAdmin"}">
                <div class="Message">
                    <p class="MessageSender">${Message.sender == "User" ? NameUser :"Admin"}</p>
                    <p class="TextMessager">${Message.Text}</p>
                </div>
            </div>
        `)
        ContentTicket.scrollTo(0,ContentTicket.scrollHeight)
    });
}



const BoxInput = document.getElementById("BoxInput")
const BlockTicket = document.getElementById("BlockTicket")
function ControlBlockChat () {
    if(FindMessage.active){
        BlockTicket.style.display = "none"
        BoxInput.style.display = "flex"
    }else{
        BoxInput.style.display = "none"
        BlockTicket.style.display = "flex"
    }
}





const ExitShowTicket = document.getElementById("ExitShowTicket")
ExitShowTicket.addEventListener("click",()=>{
    window.location = "ShowTickets.html"
})


const BlockShowTicket = document.getElementById("BlockShowTicket")
BlockShowTicket.addEventListener("click",BlockChat)
function BlockChat () {
    FindMessage.active = false
    UpdateLocalStorage()
    ControlBlockChat()
}




const InputMessageTicket = document.getElementById("InputMessageTicket")
function ResetInput () {
    InputMessageTicket.value = ""
} 




const SendMessageTicket = document.getElementById("SendMessageTicket")
SendMessageTicket.addEventListener("click",SendTicket)
function SendTicket () {
    const NewMassage = {
        sender: "Admin",
        Text : InputMessageTicket.value
    }
    FindMessage.Messages.push(NewMassage)
    UpdateLocalStorage()
}





function UpdateLocalStorage (){
    localStorage.setItem("Users",JSON.stringify(AllUser))
    ResetInput()
    AddMessageTodom()
}







window.addEventListener("load",ControlBlockChat)
window.addEventListener("load",AddMessageTodom)