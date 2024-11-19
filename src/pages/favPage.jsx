import React, { useState } from "react";
import {
  Page,
  Navbar,
  Icon,
  List,
  ListInput,
  ListItem,
  Toggle,
  BlockTitle,
  Button,
  Range,
  Block,
  Card,
  CardContent,
  ListGroup,
  f7,
} from "framework7-react";
import CardExp from "../components/cardExpandable";
import supabase from "../utils/supabase.js";


function FavPage({ Favurls = [],  name, userr, email }) {
  const [FavUrls, setFavUrls] = useState(Favurls);
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

  function FavCard() {
    f7.progressbar.show();
    setTimeout(() => {
      getFavs();
        f7.progressbar.hide();
    }, 1000); 
  }

  const reload = (done) => {
    setTimeout(() => {
        FavCard();
        done();
    }, 1000);
  };

  return (
    <Page onPageTabShow={FavCard} ptr ptrMousewheel onPtrRefresh={reload} name="fav">
      <Navbar title="Favorites" />

      {FavUrls.length == [] && (
        <Block
          strongIos
          outlineIos
          className="display-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div className="text-align-center">
            <Icon size={60} f7="heart_slash" />
            <h4>
              It's empty here,<br></br>Add some favorites from the{" "}
              <a  onClick={()=>{
              }} >Cat-alog</a> page
            </h4>
            {
              userr == null && (
                <Button large fillMd roundIos largeIos tonalIos loginScreenOpen='#main-screen' >Sign Out</Button>
              )
            }
          </div>
        </Block>
      )}

      {FavUrls.length > 0 && (
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
            favSet={"heart_fill"}
            />
          ))
      )}

    </Page>
  );
}

export default FavPage;
