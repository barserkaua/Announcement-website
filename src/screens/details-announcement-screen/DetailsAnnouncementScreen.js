import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button, Row, Col, ListGroup, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";

import {listAnnouncementDetails, removeFromAnnouncement} from "../../actions/announcementActions";

import './details-announcement-screen.scss';

function DetailsAnnouncementScreen() {

    const {id} = useParams();

    const navigate = useNavigate()

    const announcement = useSelector(state => state.announcement)
    const {announcementItems} = announcement;

    const announcementDetails = useSelector(state => state.announcementDetails)
    const {announcementItem, loading, error} = announcementDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        announcementItems.map(item => {
            if (item.id === id) {
                dispatch(listAnnouncementDetails(item))

            }
        })
    }, [dispatch, announcementItems])

    const deleteHandler = (id) => {
        let confirmResult = window.confirm("Are you sure want to delete this announcemented?")
        if (confirmResult) {
            dispatch(removeFromAnnouncement(id))
            navigate('/');
        }
    }

    return (
        <div>
            <Link to='/' className="btn btn-outline-dark my-3"><i className="fas fa-arrow-left"></i> Go Back</Link>
            {loading ? <Loader/>
                : error ? <Message variant="danger">{error}</Message>
                    :
                    <div>
                        <Row>
                            <Col md={9}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="details_title">
                                        <h3>{announcementItem.title}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {announcementItem.description}
                                    </ListGroup.Item>

                                    <ListGroup.Item className="details_date">
                                        Date publish: <strong>{announcementItem.date}</strong>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <div>
                                    <ListGroup variant="flush">

                                        <ListGroup.Item>
                                            <Button
                                                className="btn-block btn_detail_edit"
                                                type="button"
                                            >Edit</Button>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Button
                                                className="btn-block btn_detail_delete"
                                                type="button"
                                                onClick={() => deleteHandler(announcementItem.id)}
                                            >Delete</Button>
                                        </ListGroup.Item>


                                    </ListGroup>
                                </div>
                            </Col>
                        </Row>
                    </div>
            }
        </div>
    )
}

export default DetailsAnnouncementScreen;