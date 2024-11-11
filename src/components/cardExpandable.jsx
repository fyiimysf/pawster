import React from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Button,
    Icon,
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from 'framework7-react';


function CardExp({ Header, sunHeader ,location ,cardWidth , cardHieght ,height, textHieght}) {

    return (
        <div className="demo-expandable-cards">
                 <center>
                 <Card style={{
                    height: `${cardHieght}px`,
                    width: `${cardWidth}px`
                
                }} expandable>
                    <CardContent padding={false}>
                    <div 
                        
                        style={{ 
                            background:`url(${location}) no-repeat center  `,
                            backgroundPosition: 'middle',
                            height: `${height}px` 
                        }}
                        >
                            <CardHeader style={{top: `${textHieght}px`, fontSize: '30px'}} textColor="white" className="display-block">
                                {Header}
                                <br />
                                <small style={{ opacity: 0.7, }}>{sunHeader}</small>
                            </CardHeader>
                            <Link
                                cardClose
                                className="card-opened-fade-in"
                                style={{ position: 'absolute', right: '15px', top: '15px', color: 'black' }}
                                iconF7="xmark_circle" />
                        </div>
                        <div className="card-content-padding">
                            <p>
                                Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile
                                apps or web apps with iOS or Android (Material) native look and feel. It is also an
                                indispensable prototyping apps tool to show working app prototype as soon as possible
                                in case you need to. Framework7 is created by Vladimir Kharlampidi.
                            </p>
                            <p>
                                The main approach of the Framework7 is to give you an opportunity to create iOS and
                                Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is
                                full of freedom. It doesn't limit your imagination or offer ways of any solutions
                                somehow. Framework7 gives you freedom!
                            </p>
                            <p>
                                Framework7 is not compatible with all platforms. It is focused only on iOS and Android
                                (Material) to bring the best experience and simplicity.
                            </p>
                            <p>
                                Framework7 is definitely for you if you decide to build iOS and Android hybrid app
                                (Cordova or Capacitor) or web app that looks like and feels as great native iOS or
                                Android (Material) apps.
                            </p>
                            <p>
                                <Button outline large cardClose >
                                    Close
                                </Button>
                            </p>
                        </div>
                        
                    </CardContent>
                </Card>

                </center>
            </div>
    );
}
export default CardExp;