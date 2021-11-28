import {useState} from "react";
import {Form, Button} from 'react-bootstrap';
import {useNavigate, useLocation} from "react-router-dom";

function SearchBox() {

    const [keyword, setKeyword] = useState('');

    // we get our history
    const navigate = useNavigate();

    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}`)
        } else {
            // if we nothing to search, we just doing nothing
            navigate(navigate(location.pathname))
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex mx-4'>
            <Form.Control
                type='text'
                name='q'
                value={keyword ? keyword : ''}
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
                placeholder='Search...'
            />
            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox;