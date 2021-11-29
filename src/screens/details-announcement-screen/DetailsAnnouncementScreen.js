import {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Row, Col, ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";

import {listAnnouncementDetails, removeFromAnnouncement, topListAnnouncement} from "../../actions/announcementActions";

import './details-announcement-screen.scss';

function DetailsAnnouncementScreen() {
    // we get current id announcement item
    const {id} = useParams();
    // we get our history
    const navigate = useNavigate()

    const dispatch = useDispatch();
    // get state of all announcement Items
    const announcement = useSelector(state => state.announcement)
    const {announcementItems} = announcement;
    // get state of only current announcement Item
    const announcementDetails = useSelector(state => state.announcementDetails)
    const {announcementItem, loading, error} = announcementDetails;

    const announcementTopList = useSelector(state => state.announcementTopList)
    const {announcementTopListItems} = announcementTopList;

    let splitTitleCurrentItem = [];
    let splitDescriptionCurrentItem = []
    let topItems = [];


    const findTopSimilarItems = () => {
        announcementItems.map(item => {
            // we get current item
            if (item.id === id) {
                // we create counter to find how many times we have intersection in strings
                let counter = 0
                // we convert our title from string to Array and split each word
                splitTitleCurrentItem = item.title.toLowerCase().split(' ');
                // we convert our description from string to Array and split each word
                splitDescriptionCurrentItem = item.description.toLowerCase().split(' ');
                // we go through every second item in which we will look for intersections
                announcementItems.map(secondItem => {
                    // we check that our second item does not match the current one
                    if (secondItem.id !== id) {
                        // we take each element from our array title to find intersection
                        splitTitleCurrentItem.forEach(title => {
                            if (secondItem.title.search(title) >= 0) {
                                // if we find element, we just add its quantity to ours counter
                                counter += +secondItem.title.split(title).length - 1
                            }
                        })
                        // we take each element from our array description to find intersection
                        splitDescriptionCurrentItem.forEach(description => {
                            if (secondItem.description.search(description) >= 0) {
                                // if we find element, we just add its quantity to ours counter
                                counter += +secondItem.description.split(description).length - 1
                            }
                        })
                        // the result with the received data we write down in our array
                        topItems.unshift({
                            idItem: secondItem.id,
                            intersection: counter
                        })
                    }
                    // we reset value from counter
                    counter = 0
                })
            }
        })
    }
    findTopSimilarItems()

    // sort our top items
    topItems.sort(function (firstItem, secondItem) {
        return secondItem.intersection - firstItem.intersection
    }).splice(3, 1)

    useEffect(() => {
        // we search our current item
        announcementItems.map(item => {
            if (item.id === id) {
                dispatch(listAnnouncementDetails(item))
                dispatch(topListAnnouncement(topItems))
            }
        })
    }, [dispatch, announcementItems, id])


    // delete item from our list
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
                                            <Link to={`/announcement-detail/${announcementItem.id}/edit`}>
                                                <Button
                                                    className="btn-block btn_detail_edit"
                                                    type="button"
                                                >Edit</Button>
                                            </Link>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Button
                                                className="btn-block btn_detail_delete"
                                                type="button"
                                                onClick={() => deleteHandler(announcementItem.id)}
                                            >Delete</Button>
                                        </ListGroup.Item>

                                    </ListGroup>

                                    <br/>
                                    <br/>

                                    <h4 className="similar"><strong>Top Similar announcements</strong></h4>

                                    <ListGroup variant="flush">

                                        {announcementItems.map(item => (
                                            announcementTopListItems.map(topItem => {

                                                if (item.id === topItem.idItem && topItem.intersection >= 1){
                                                    return (
                                                            <ListGroup.Item className="text-align-center">
                                                                <Link className="link-style" to={`/announcement-detail/${item.id}`}>
                                                                    {item.title}
                                                                </Link>
                                                            </ListGroup.Item>
                                                    )
                                                } else {
                                                    return (
                                                        <div></div>
                                                    )
                                                }
                                            })
                                        ))}
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