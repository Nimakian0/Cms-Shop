import { menuuser } from "../../../components/menuuser/menuuser.js";
window.customElements.define("menu-user",menuuser)



let AllUser = JSON.parse(localStorage.getItem("Users")) 
const UserName = document.cookie.substring(document.cookie.indexOf("=")+1)
let FindUSer = AllUser.find(User => {
    return User.userName == UserName
})
let UrlSearch = new URLSearchParams(location.search)
let Urlid = UrlSearch.get("id")

const Findticket = FindUSer.tickets.find(ticket =>{
    return ticket.id == Urlid
})




const ContentTicket = document.getElementById("ContentTicket")
const TextSubjectTickets = document.getElementById('TextSubjectTickets')
function AddLocalStorageToDom(){
    ContentTicket.innerHTML = ""
    TextSubjectTickets.innerHTML = Findticket.SubjectTickets
    Findticket.Messages.forEach(Message => {
        ContentTicket.insertAdjacentHTML("beforeend",`
            <div class="${Message.sender == "User" ? "BoxMessageUser" : "BoxMessageAdmin"}">
                <div class="Message">
                    <p class="MessageSender">${Message.sender == "User" ? UserName :"Admin"}</p>
                    <p class="TextMessager">${Message.Text}</p>
                </div>
            </div>
        `)
    });
    ContentTicket.scrollTo(0,ContentTicket.scrollHeight)

}



const BoxInput = document.getElementById("BoxInput")
const BlockTicket = document.getElementById("BlockTicket")
function ControlBlockChat () {
    if(Findticket.active){
        BlockTicket.style.display = "none"
        BoxInput.style.display = "flex"
    }else{
        BoxInput.style.display = "none"
        BlockTicket.style.display = "flex"
    }
}




const ExitShowTicket = document.getElementById("ExitShowTicket")
ExitShowTicket.addEventListener("click",()=>{
    window.location = "SendTicket.html"
})






const InputMessageTicket = document.getElementById("InputMessageTicket")
function ResetInput () {
    InputMessageTicket.value = ""
} 


const SendMessageTicket = document.getElementById("SendMessageTicket")
SendMessageTicket.addEventListener("click",SendTicket)
function SendTicket () {
    if(InputMessageTicket.value != ""){
        const NewMassage = {
            sender: "User",
            Text : InputMessageTicket.value
        }
        Findticket.Messages.push(NewMassage)
        UpdateLocalStorage()
    }
}





function UpdateLocalStorage () {
    localStorage.setItem("Users",JSON.stringify(AllUser))
    ResetInput()
    AddLocalStorageToDom()
}









window.addEventListener("load",ControlBlockChat)
window.addEventListener("load",AddLocalStorageToDom)