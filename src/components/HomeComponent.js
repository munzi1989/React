import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';
import { FadeTransform } from 'react-animation-components';
import 'animate.css';




function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return <Loading />;

    }

    if (errMess) {
        return <h4>{errMess}</h4>
    }
    else {
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translate(50%)'
            }}>
                
            <Card >
                
                <CardImg src={baseURL + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    )};
}

function Home(props) {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md m1'>
                    <RenderCard
                        item={props.campsite}
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                    />
                </div>
                <div className='col-md m1'>
                    <RenderCard
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                <div className='col-md m1'>
                    <RenderCard
                        item={props.partner}
                        isLoading={props.partnerLoading}
                        errMess={props.partnerErrMess}

                    />
                </div>
            </div>
        </div>

    );
}

export default Home;