import React from "react";
import { Card, CardImg, CardTitle, CardBody } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';






function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card onClick={() => this.onCampsiteSelect(campsite)}>
                <CardImg src={campsite.image} alt={campsite.name} />
                <CardBody>{campsite.description}</CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments =>
                    <div key={comments.id}>
                        <p>{comments.text}<br />--{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}</p>
                    </div>)}
            </div>
        )
    }
    return <div></div>
}

function CampsiteInfo(props) {
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
                    <RenderCampsite campsite={props.campsite}/>
                    <RenderComments comments={props.comments} />
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