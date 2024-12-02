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

function CatLogPage({ userr, getfavLis = [], const: [animal, setAnimal] = useState(-1) }) {
    let imgCount = 20;
    var carUrls = [];
    var checkIcon = useState("heart_outline");
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

    var FavUrls = useState(getfavLis);
    const getFavs = async () => {
        const { data, error } = await supabase
            .from("users")
            .select("Favorites")
            .eq("Username", userr);
        if (!error) {
            console.log(data[0].Favorites);
            FavUrls = data[0].Favorites;
            console.log(FavUrls);
        }
    }

    // function checkFav() {
    //     carUrls.find((element) => {
    //         getfavLis.find((element2) => {
    //             if (element == element2) {
    //                 FavUrls.push(element);
    //             }
    //         });
    //     });
    // } //checkFav

    function checkFav(url) {
        getfavLis.find((element) => {
            if (element == url) {
                return true;
            }
        })
            ? "heart_fill"
            : "heart_outline"
    };



    function FavCard() {
        f7.progressbar.show();
        setTimeout(async () => {
            await getFavs();
            f7.progressbar.hide();
        });
    }

    const reload = (done) => {
        setTimeout(async () => {
            FavCard();
            console.log(userr);
            if (animal < 0) {
                setAnimal(0);
            }
            done();
            //   console.log(FavUrls)
        });
    };

    const [currentAnimal, setCurrentAnimal] = useState("Cats");

    return (
        <Page onPageBeforeIn={() => {
        }} onPageTabShow={
            () => {
                FavCard();
            }
        } ptr ptrMousewheel onPtrRefresh={reload} name="fav">
            {/* Top Navbar */}
            <Navbar >
                <BlockTitle >
                    <center>
                        <h1>Pawster</h1>
                    </center>
                </BlockTitle>
                <NavRight >
                    <Button text={currentAnimal} popoverOpen=".paw-pop">
                        <Icon f7="paw" />
                    </Button>
                </NavRight>
            </Navbar>
            {/* Page content */}


                {animal < 0 && (
                    <Block
                    strongIos
                    outlineIos
                    className="display-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                  >
                    <div className="text-align-center">
                      <Icon  size={70} f7="arrow_down_circle" />
                      <h3>
                        Swipe down to refresh the feed
                      </h3>
                    </div>
                  </Block>
                    
                    
                )}
            <div>
                {animal == 0 && (

                    carUrls.map((url, index) => (
                        <CardExp
                            key={index}
                            cardHieght={400}
                            height={500}
                            textHieght={330}
                            location={url}
                            Header={`${url.split("/")[url.split("/").length - 1].split(".")[0]}`} //prints the name of the image
                            sunHeader={`${url.split("/")[url.split("/").length - 1].split(".")[0]}`} //prints the name of the image
                            user={userr}
                            favSet={`${getfavLis.find((element) => {
                                if (element == url) {
                                    return true;
                                }
                            })
                                ? "heart_fill"
                                : "heart_outline"
                                }`}
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
                            Header={`${url.split("/")[url.split("/").length - 1].split(".")[0]}`} // prints the name of the image
                            sunHeader={`${url.split("/")[url.split("/").length - 1].split(".")[0]}`} //prints the name of the image
                            user={userr}
                            favSet={`${getfavLis.find((element) => {
                                if (element == url) {
                                    return true;
                                }
                            })
                                ? "heart_fill"
                                : "heart_outline"
                                }`}
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
                                setCurrentAnimal("Cats");
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
                                setCurrentAnimal("Birds");
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
