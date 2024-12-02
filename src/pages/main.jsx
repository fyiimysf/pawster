import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  BlockHeader,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  Icon,
  Button,
  Card,
  CardContent,
} from "framework7-react";
import { element } from "prop-types";


import React, { useRef, useEffect } from "react";




function MainPage() {


  return (

    <Page


      loginScreen noToolbar noNavbar noSwipeback>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Block className="grid grid-gap">
        <BlockTitle large>
          <center>
            <h1>Pawster</h1>
            <Icon size={60} f7="paw" />

          </center>
        </BlockTitle >
        <Button large fillMd roundIos largeIos tonalIos loginScreenOpen='#login-screen'>Login</Button>
        <Button large fillMd roundIos largeIos tonalIos loginScreenOpen='#signup-screen' >SignUp</Button>
        <center> <BlockHeader>Feline paws, could be yours</BlockHeader>

          <Button small onClick={() => {
            f7.loginScreen.close();
            f7.loginScreen.close();
            f7.loginScreen.close();
            f7.toast.create({
              icon: '<i class="f7-icons">exclamationmark</i>',
              text: 'Demo Mode<br/> Not all features are available',
              position: "center",
              closeButton: true,
              closeTimeout: 2000
            }).open();
          }}  >Demo the App</Button>


        </center>
      </Block>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Block >

        <Button onClick={() => 
          f7.dialog.alert('To install Pawster on your phone,<br/> Press "Add to Homescreen" in Chrome menu.','How To Install')
        }>
        <Icon size={44} f7="info_circle" />
        </Button>
      </Block>
    </Page>
  );
}

export default MainPage;
