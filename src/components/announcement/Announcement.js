import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './announcement.scss';
import {useDispatch} from "react-redux";
import {removeFromAnnouncement} from "../../actions/announcementActions";

function Announcement({announcement, keyword}) {

    const dispatch = useDispatch();
    // delete item from our list
    const deleteHandler = (id) => {
        let confirmResult = window.confirm("Are you sure want to delete this announcemented?")
        if (confirmResult) {
            dispatch(removeFromAnnouncement(id))
        }
    }

    if (announcement.title.toLowerCase().search(keyword) >= 0 || keyword == undefined) {
        return (
            <Card className="card-background">
                <Card.Text className="card__icon"><i className="fas fa-bolt"></i></Card.Text>

                <button onClick={() => deleteHandler(announcement.id)} type="button" className="btn-close" aria-label="Close"></button>

                <Card.Title className="card__title">
                    {announcement.title}
                </Card.Title>

                <Card.Text className="card__read">
                    <Link className="card__link" to={`/announcement-detail/${announcement.id}`}>Read More <i className="fas fa-arrow-right"></i></Link>
                    <p lassName="card__date">{announcement.date}</p>
                </Card.Text>
            </Card>
        )
    } else {
        return (
            <div></div>
        )
    }

}

export default Announcement;