import React, { useEffect, useState } from "react";
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
    CardFooter,
} from "framework7-react";
import supabase from "../utils/supabase.js";

function CardExp({
    Header,
    sunHeader,
    location,
    cardWidth,
    cardHieght,
    height,
    favSet = useState("heart"),
    user,
    getFavsList = [],
}) {
    
    var fav = [];
    // fav = getFavsList;
    const [favicon, setFavicon] = React.useState(favSet);
    const getFavs = async () => {
        console.log(user);
        const { data, error } = await supabase
            .from("users")
            .select("Favorites")
            .eq("Username", user);
        if (!error) {
            fav = data[0].Favorites;   
            console.log(fav);
            // if (fav.includes(location)) {
            //     setFavicon("heart_fill");
            // }
        }
        
    }
    useEffect(()=>{
        if (!favSet) {
            setFavicon("heart");
        }else{
            setFavicon("heart_fill");
        }
    },[]);

    const addFav = async () => {
        await getFavs();
        fav.find((element) => {
            if (element == location) {
                removeFav();
            }
        });
        fav.push(location);
        const { data, error } = await supabase
            .from("users")
            .update({ Favorites: fav })
            .select("Favorites")
            .eq("Username", user);
        if (!error) {
            data[0].Favorites = [data[0].Favorites, location];
            console.log("Fav added");
        } else {
            console.log(error.message);
        }

    };

    const removeFav = async () => {
        await getFavs();
        fav.find((element) => {
            if (element == location) {
                fav.splice(fav.indexOf(element), 1);
            }
        });
        const { data, error } = await supabase
            .from("users")
            .update({ Favorites: fav })
            .select("Favorites")
            .eq("Username", user);
        if (!error) {
            data[0].Favorites = [data[0].Favorites, location];
            console.log("Fav removed");
        } else {
            console.log(error.message);
        }
    };

    const [title, setTitle] = React.useState(Header);
    return (
        <div onLoad={ () => {
            
        }

        } className="demo-expandable-cards">
            <Card
                style={{
                    height: `${cardHieght}px`,
                    width: `${cardWidth}px`,
                }}
                expandable
                onCardClosed={() => setTitle(Header)}
                onCardOpen={() => setTitle("")}
            >
                <CardContent padding={false}>
                    <div
                        style={{
                            background: `url(${location}) no-repeat center/cover`,
                            backgroundPosition: "middle",
                            height: `${height}px`,
                        }}
                    >
                        <CardHeader
                            style={{ top: `${0}px`, fontSize: "30px" }}
                            textColor="white"
                            className="card-closed-fade-in"
                        >
                            {title}
                            <br />
                        </CardHeader>
                        <Link
                            cardClose
                            className="card-opened-fade-in"
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "15px",
                                color: "black",
                            }}
                            iconF7="xmark_circle"
                        />
                    </div>
                    <div className="card-content-padding">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ fontSize: "30px" }} className="display-block">
                                {Header}
                                <br />
                                <small style={{ opacity: 0.8 }}>{sunHeader}</small>
                            </div>
                            <Button
                                raised
                                onClick={() => {
                                    if (favicon === "heart") {
                                        setFavicon("heart_fill");
                                    } else {
                                        setFavicon("heart");
                                    }
                                }}
                            >
                                <Icon f7={favicon} size="35" />
                            </Button>
                        </div>
                        <p>
                            In contrast, the design of our app is a reflection of our
                            collective imagination, where a simple and intuitive user
                            interface is the key to a successful user experience. We are not
                            limited by the conventions of traditional web design, but rather
                            we are free to create something truly unique and beautiful.
                        </p>
                        <p>
                            <Button outline large cardClose>
                                Close
                            </Button>
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Button
                round
                fill
                style={{
                    position: "absolute",
                    right: "20px",
                    marginTop: "-90px",
                    // marginTop: "-410px",
                    width: "50px",
                    height: "50px",
                    zIndex: 100,
                }}
                onClick={async () => {
                    if (favicon === "heart") {
                        setFavicon("heart_fill");
                        await addFav();
                    } else {
                        setFavicon("heart");
                        await removeFav();
                    }
                }}
            >
                <Icon f7={favicon} size="35" />
            </Button>
        </div>
    );
}
export default CardExp;
