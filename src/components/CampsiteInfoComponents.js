import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody } from 'reactstrap';

class CampsiteInfo extends Component {

    renderComments(comments) {
        if (comments) {
            return (
                <div>
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

    renderCampsite(campsite) {
        return (<div className="col-md-5 m-1">
            <Card onClick={() => this.onCampsiteSelect(campsite)}>
                <CardImg src={campsite.image} alt={campsite.name} />
                <CardTitle className='m-1'>{campsite.name}</CardTitle>
                <CardBody>{campsite.description}</CardBody>
            </Card>
        </div>)
    }

    render() {
        if (this.props.campsite) {
            return (
                <div>
                    <div className="row">{this.renderCampsite(this.props.campsite)}
                        <div className='col-md-5'>{this.renderComments(this.props.campsite.comments)}</div>
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

}

export default CampsiteInfo;