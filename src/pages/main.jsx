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
      

      <Block className="grid grid-gap">
        <BlockTitle large>
          <center>
            <h1>Pawster</h1>
            <Icon size={70} f7="paw" />
      
          </center>
        </BlockTitle >
        <Button large fillMd roundIos largeIos tonalIos loginScreenOpen='#login-screen'>Login</Button>
        <Button large fillMd roundIos largeIos tonalIos loginScreenOpen='#signup-screen' >SignUp</Button>
        <center> <BlockHeader>Feline paws, could be yours</BlockHeader>

        
        <Block className="grid grid-cols-2 "  >

        <Button small onClick={() => {
            f7.loginScreen.close();
            f7.loginScreen.close();
            f7.loginScreen.close();
            f7.toast.create({
              icon: '<i class="f7-icons">exclamationmark_triangle</i>',
              text: 'Demo Mode<br/> features not available: <ol><li>Favorite Cats</li><li>Dark Mode</li><li>Settings</li></ol>',
              position: "center",
              closeButton: true,
              closeTimeout: 2500
            }).open();
          }}  >Demo</Button>

          <Button small onClick={() => 
          f7.dialog.alert('To install Pawster on your phone,<br/> Press "Add to Homescreen" in Chrome menu.','How To Install')
        }>
        Install
        </Button>
        </Block>
          
        </center>
      </Block>
      
      
       
    </Page>
  );
}

export default MainPage;
