import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import FormContainer from "../../components/form-container/FormContainer";
import {listAnnouncementDetails, updateAnnouncement} from "../../actions/announcementActions";
import {updateFromAnnouncement} from "../../actions/announcementActions";
import {ANNOUNCEMENT_UPDATE_RESET} from "../../constants/announcementConstants";

function EditScreenAnnouncement() {

    const dispatch = useDispatch();
    // we get our history
    const navigate = useNavigate()
    // get state of all announcement Items
    const announcement = useSelector(state => state.announcement)
    const {announcementItems} = announcement;
    // get state of only current announcement Item
    const announcementDetails = useSelector(state => state.announcementDetails)
    const {announcementItem, loading, error} = announcementDetails;
    // we get current id announcement item
    const {id} = useParams();
    // we get all parameters what we need to edit
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const announcementUpdate = useSelector(state => state.announcementUpdate)
    const {success: successUpdate} = announcementUpdate;

    useEffect(() => {
        // we check if we successfully update our announcement
        if (successUpdate) {
            dispatch({type:ANNOUNCEMENT_UPDATE_RESET})
            navigate(`/announcement-detail/${announcementItem.id}`)
        } else {
            // if we don`t have announcement title or the announcement ID that we currently have
            if (!announcementItem.title || announcementItem.id !== id){
                announcementItems.map(item => {
                    if (item.id === id) {
                        dispatch(listAnnouncementDetails(item))
                    }
                })
            } else {
                setTitle(announcementItem.title)
                setDescription(announcementItem.description)
                setDate(announcementItem.date)
            }
        }

    }, [dispatch, id, announcementItem, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateFromAnnouncement({
            id,
            title,
            description,
            date,
        }))
        dispatch(updateAnnouncement())
    }

    return (
        <div>

            <Link to='/' className="btn btn-outline-dark my-3"><i className="fas fa-arrow-left"></i> Go Back</Link>
            {loading ? <Loader/>
                :error ? <Message variant="danger">{error}</Message>
                    :
                    <div>
                        <FormContainer>
                            <h1>Edit Announcement</h1>
                            <Form onSubmit={submitHandler} className="form-create">
                                <Form.Group controlId='title'>
                                    <Form.Label className="my-3">Title</Form.Label >
                                    <Form.Control
                                        type='text'
                                        required
                                        placeholder='Enter title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label className="my-3">Description</Form.Label>
                                    <Form.Control
                                        type='text'
                                        required
                                        as="textarea"
                                        rows={3}
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='date'>
                                    <Form.Label className="my-3">Date publish</Form.Label >
                                    <Form.Control
                                        type='date'
                                        placeholder='Current date'
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Button className='my-3' type='submit' variant='primary'>Edit</Button>
                            </Form>
                        </FormContainer>
                    </div>
            }
        </div>
    )
}

export default EditScreenAnnouncement;