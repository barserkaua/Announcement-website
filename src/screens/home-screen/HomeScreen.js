import {useDispatch, useSelector} from "react-redux";
import Announcement from "../../components/announcement/Announcement";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import {useEffect} from "react";
import {listAnnouncement} from "../../actions/announcementActions";

function HomeScreen() {

    const dispatch = useDispatch();

    const announcement = useSelector(state => state.announcement)
    const {announcementItems} = announcement;

    const announcementList = useSelector(state => state.announcementList)
    const {loading, error, announcementListItems} = announcementList;

    useEffect(() => {
        dispatch(listAnnouncement(announcementItems))
    }, [dispatch, announcementItems])

    return (
        <div>
            <h1 className="text-center">List of Announcement</h1>
            {loading ? <Loader/>
                : error ? <Message variant="danger">{error}</Message>
                    :
                    <div className="cards">
                        {announcementListItems.map(announcement => (
                            <div key={announcement.id}>
                                <Announcement announcement={announcement}/>
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default HomeScreen;