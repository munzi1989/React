import React, { Component } from "react";
import { Card, CardImg, CardBody, ModalHeader, ModalBody, Modal, Label, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);

    }

    render() {
        return (
            <React.Fragment>
                <Button color='primary' onClick={this.toggleModal} outline className='fa fa-pencil fa-lg'>Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className='form-group'>
                                <Label hmtlFor='rating'>Rating</Label>
                                <Control.select name='rating' id='rating' model='.rating' className='form-control'>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Control.select>
                            </div>
                            <div className='form-group'>
                                <Label htmlFor='author'>Your Name</Label>
                                <Control.text model='.author' name='author' id='author' className='form-control' validators={{

                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show='touched'
                                    component="div"
                                    messages={{

                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className='form-group'>
                                <Label htmlFor='text'>Comment</Label>
                                <Control.textarea rows='6' model='.text' name='text' id='text' className='form-control' />
                            </div>

                            <Button type='submit' color='primary'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>

        )
    }
}


function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card onClick={() => this.onCampsiteSelect(campsite)}>
                <CardImg src={baseURL + campsite.image} alt={campsite.name} />
                <CardBody>{campsite.description}</CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments, postComment, campsiteId }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments =>
                    <div key={comments.id}>
                        <p>{comments.text}<br />--{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}</p>
                    </div>)}
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        )
    }
    return <div></div>
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }



    if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>


        )
    }

    if (props.campsite) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='./directory'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        );
    }
}



export default CampsiteInfo;