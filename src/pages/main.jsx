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
import React, { useRef, useState, useEffect } from "react";



function MainPage() {


  return (
    
    <Page loginScreen noToolbar noNavbar noSwipeback>
      
      <Block className="grid grid-gap">
        <BlockTitle large>
          <center>
            <h1>Pawster</h1>
            <Icon size={60} f7="paw" />

          </center>
        </BlockTitle >
        <Button large fillMd roundIos largeIos tonalIos loginScreenOpen='#login-screen'>Login</Button>
        <Button large fillMd roundIos largeIos tonalIos loginScreenOpen='#signup-screen' >SignUp</Button>
        <center> <BlockHeader>Feline paws, could be yours</BlockHeader> </center>
      </Block>
    </Page>
  );
}

export default MainPage;
