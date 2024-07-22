import './ticket-page.css'
import {useParams} from "react-router-dom";
import {TicketCardAdmin} from "../../components/ticket-card/TicketCardAdmin.jsx";
import {TicketCardUser} from "../../components/ticket-card/TicketCardUser.jsx";

export const TicketPage = ({userInfo}) => {
    const {id} = useParams();
    const isAdmin = 0;

    return (
        <>
            {isAdmin === 1 ?
                <TicketCardAdmin ticketId={id} userInfo={userInfo}/> :
                <TicketCardUser ticketId={id}/>
            }
        </>
    )
}