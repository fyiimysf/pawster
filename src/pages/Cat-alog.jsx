import React, { useRef, useState, useEffect } from "react";
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    SkeletonBlock,
    Block,
    BlockTitle,
    List,
    ListItem,
    Button,
    Icon,
    Card,
    Views,
    View,
    CardContent,
    CardHeader,
    Subnavbar,
    Segmented,
    Popover,
    f7,
} from "framework7-react";
import supabase from "../utils/supabase.js";

import CardExp from "../components/cardExpandable";

function CatLogPage({ userr, getfavLis }) {
    let imgCount = 20;
    var carUrls = [];
    for (let i = 1; i <= imgCount; i++) {
        carUrls.push(
            `https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/public/pawster_assets/imgs/CarDB/car${i}.jpeg`
        );
    }
    var birdUrls = [];
    for (let i = 1; i <= imgCount; i++) {
        birdUrls.push(
            `https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/public/pawster_assets/imgs/BirdDB/bird${i}.jpg`
        );
    }

    const [FavUrls, setFavUrls] = useState(getfavLis);
    const getFavs = async () => {
        const { data, error } = await supabase
            .from("users")
            .select("Favorites")
            .eq("Username", userr);
        if (!error) {
            setFavUrls(data[0].Favorites);
            console.log(FavUrls);
        }
    }

    function checkFav(url) {
        FavUrls.forEach((element) => {
            console.log(element, url, element == url);
            if (url == element) {
                
                return "heart_fill";
            }
        });
        return "heart";
    }

    function FavCard() {
        f7.progressbar.show();
        setTimeout(async () => {
            await getFavs();
            checkFav();
            f7.progressbar.hide();
        });

    }

    const reload = (done) => {
        setTimeout(async () => {
            await FavCard();
            done();
            //   console.log(FavUrls)
        });
    };
    

    const [animal, setAnimal] = useState(0);
    return (
        <Page onPageTabShow={reload} ptr ptrMousewheel onPtrRefresh={reload} name="fav">
            {/* Top Navbar */}
            <Navbar >
                <BlockTitle >
                    <center>
                        <h1>Pawster</h1>
                    </center>
                </BlockTitle>
                <NavRight>
                    <Button popoverOpen=".paw-pop">
                        <Icon f7="paw" />
                    </Button>
                </NavRight>
            </Navbar>
                {/* Page content */}
            <div>
            {animal == 0 && (
                carUrls.map((url, index) => (
                    <CardExp
                        key={index}
                        cardHieght={400}
                        height={500}
                        textHieght={330}
                        location={url}
                        Header={`Card ${index + 1}`}
                        sunHeader={`Card ${index + 1}`}
                        user={userr}
                        favSet={checkFav(url)}
                    />
                ))
            )}
            </div>
            <div>
            {animal == 1 && (
                birdUrls.map((url, index) => (
                    <CardExp
                        key={index}
                        cardHieght={400}
                        height={500}
                        textHieght={330}
                        location={url}
                        Header={`Card ${index + 1}`}
                        sunHeader={`Card ${index + 1}`}
                        user={userr}
                        favSet={checkFav(url)}
                    />
                ))
            )}
            </div>
            {/* {animal == 2 && (
                FavUrls.map((url, index) => (
                    <CardExp
                        key={index}
                        cardHieght={400}
                        height={500}
                        textHieght={330}
                        location={url}
                        Header={`Card ${index + 1}`}
                        sunHeader={`Card ${index + 1}`}
                        user={userr}
                    />
                ))
            )} */}

            <Popover className="paw-pop">
                <List>
                    <ListItem
                        link
                        onClick={() => {
                            f7.progressbar.show();
                            setTimeout(() => {
                                f7.progressbar.hide();
                                setAnimal(0);
                                FavCard();
                            }, 1000);
                        }}
                        popoverClose
                        title="Cats"
                    />
                    <ListItem
                        link
                        onClick={() => {
                            f7.progressbar.show();
                            setTimeout(() => {
                                f7.progressbar.hide();
                                setAnimal(1);
                                FavCard();
                            }, 1000);
                        }}
                        popoverClose
                        title="Birds"
                    />
                    <ListItem link onClick={() => { }} popoverClose title="Dogs" />
                </List>
            </Popover>


        </Page>

        // let imgCount = 20;



        // var carUrls = [];
        // for (let i = 1; i <= imgCount; i++) {
        //     carUrls.push(
        //         `https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/public/pawster_assets/imgs/CarDB/car${i}.jpeg`
        //     );        
        // }
        // var birdUrls = [];
        // for (let i = 1; i <= imgCount; i++) {
        //     birdUrls.push(
        //         `https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/public/pawster_assets/imgs/BirdDB/bird${i}.jpg`
        //     );
        // }

        // const [animal, setAnimal] = useState(carUrls);

        // let cardExpH = 700;
        // return (
        //     <Page className="safe-area" name="catlog">
        //         {/* Top Navbar */}
        //         <Navbar title="Pawster">
        //             <NavRight>
        //                 <Button popoverOpen=".paw-pop">
        //                     <Icon f7="paw" />
        //                 </Button>
        //             </NavRight>
        //         </Navbar>

        //         {/* Page content */}

        //         <center>
        //             <h1>Cat-alog</h1>
        //         </center>

        //         {animal.map((url, index) => (
        //             console.log(userr),
        //             <CardExp
        //                 key={index}
        //                 cardHieght={400}
        //                 height={500}
        //                 textHieght={330}
        //                 location={url}
        //                 Header={`Card ${index + 1}`}
        //                 sunHeader={`Card ${index + 1}`}
        //                 user={userr}
        //                 getFavsList={getfavLis}
        //             />
        //         ))}

        // <Popover className="paw-pop">
        //     <List>
        //         <ListItem
        //             link
        //             onClick={() => {
        //                 f7.progressbar.show();
        //                 setTimeout(() => {
        //                     f7.progressbar.hide();
        //                     setAnimal(carUrls);
        //                 }, 1000);
        //             }}
        //             popoverClose
        //             title="Cats"
        //         />
        //         <ListItem
        //             link
        //             onClick={() => {
        //                 f7.progressbar.show();
        //                 setTimeout(() => {
        //                     f7.progressbar.hide();
        //                     setAnimal(birdUrls);
        //                 }, 1000);
        //             }}
        //             popoverClose
        //             title="Birds"
        //         />
        //         <ListItem link onClick={() => { }} popoverClose title="Dogs" />
        //     </List>
        // </Popover>
        //     </Page>
    );
}
export default CatLogPage;
