import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import nextId from "react-id-generator";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import FormContainer from "../../components/form-container/FormContainer";
import {listFormAddNewAnnouncement} from "../../actions/announcementActions";
import {listFormCreateAnnouncement} from "../../actions/announcementActions";
import {ANNOUNCEMENT_CREATE_ITEM_RESET} from "../../constants/announcementConstants";


function CreateNewAnnouncement(){

    // get state of all announcement Items
    const announcement = useSelector(state => state.announcement)
    const {announcementItems, success} = announcement;

    const announcementFormCreate = useSelector(state => state.announcementFormCreate)
    const {loading, error} = announcementFormCreate;

    // special id to our announcement
    const id = nextId();
    // we get all parameters what we need to post
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const dispatch = useDispatch();

    // we posted all ours data from Form on localStorage
    const submitHandler = (e) => {
        e.preventDefault()
        if (title.length > 0 && title !== null && title !== undefined) {
            dispatch(listFormAddNewAnnouncement(id, title, description, date))
        }
    }

    useEffect(() => {
        dispatch(listFormCreateAnnouncement())
       if (success) {
           // if create success we reset ours form value
           setTitle('')
           setDescription('')
           setDate('')
           // we return success from true to false
           const timer = setTimeout(() => {
               dispatch({
                   type: ANNOUNCEMENT_CREATE_ITEM_RESET,
               })
           }, 4000);
           return () => clearTimeout(timer);
       }
    }, [dispatch, success])

    return(
        <div>
            <Link to='/' className="btn btn-outline-dark my-3"><i className="fas fa-arrow-left"></i> Go Back</Link>
            {loading ? <Loader/>
                :error ? <Message variant="danger">{error}</Message>
                    :
                <div>
                    <FormContainer>
                        <h1>Create New Announcement</h1>
                        {success && <Message variant="success">Announcement created success</Message>}
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

                            <Button className='my-3' type='submit' variant='primary'>Create</Button>
                        </Form>
                    </FormContainer>
                </div>
            }
        </div>
    )
}

export default CreateNewAnnouncement;