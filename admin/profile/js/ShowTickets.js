import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)



const AllUser = JSON.parse(localStorage.getItem("Users")) 



const BoxTicket = document.getElementById("BoxTicket")
let NumberOfTickets = 0
AllUser.forEach(User => {
    
    if(User.tickets){
        User.tickets.forEach((ticket,) =>{
            NumberOfTickets++
            BoxTicket.insertAdjacentHTML("beforeend",`
                <a href="ShowMessageTicket.html?id=${ticket.UserName};${ticket.id}" class="ItemTicket">
                    <div class="TextItemTicket">
                        <p class="idtextSubjectTickets">${NumberOfTickets}#</p>
                        <p class="textSubjectTickets">${ticket.SubjectTickets}</p>
                    </div>
                    <div class="StatusItemTicket">
                        <p class="${ticket.active ? "StatusItemTicketTrue" :"StatusItemTicketFalse"}">${ticket.active?"فعال":"غیر فعال"}</p>
                        <p class="UserName">${ticket.UserName}</p>
                    </div>
                </a>
            `)
        })
    }

});
