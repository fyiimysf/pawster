import React from "react";
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


const FavPage = ({ FavUrls = [] ,name, user, email }) => (
  <Page name="fav">
    <Navbar title="Favorites" />

    {FavUrls.length === 0 && (
      <Block
        strongIos
        outlineIos
        className="display-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="text-align-center">
          <Icon size={60} f7="heart_slash" />
          <h4>
            It's empty here,<br></br>Add some favorites from the <a>Cat-alog</a>{" "}
            page
          </h4>
        </div>
      </Block>
    )}

    {FavUrls.length > 0 &&  FavUrls.map((url, index) => (
      <CardExp
        key={index}
        cardHieght={400}
        height={500}
        textHieght={330}
        location={url}
        Header={`Card ${index + 1}`}
        sunHeader={`Card ${index + 1}`}
      />
    ))}
  </Page>
);

export default FavPage;
