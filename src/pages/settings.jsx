import React, { useState } from 'react';
import {
  Page,
  Navbar,
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
  CardHeader,
  f7,
} from 'framework7-react';
import supabase from '../utils/supabase.js';


const SettingsPage = ({ dmodeVal, username }) => {

  const audio = document.querySelector('audio');

 let bgMute = false;
 let vol = 1;

  const sendDarkMode = async (toggleVal) => {
    const { data, error } = await supabase
      .from('users')
      .select('Username, darkMode')
    if (!error) {
      data.forEach(async element => {
        if (username == element.Username) {
          const { data, error } = await supabase

            .from('users')
            .update({ darkMode: toggleVal })
            .eq('Username', username)
            .select()
          if (!error) {
            console.log('DarkMode set in DB', toggleVal);
            f7.setDarkMode(toggleVal);
          }
        }
      });
    } else {
      console.log(error.message)
    }
  };

  return (
    <Page name="settings">
      <Navbar title="Settings" />



      <Block>
        <p>This is an example of tabs-layout application.
          The main point of such tabbed layout is that each
          tab contains independent view with its own routing
          and navigation.
        </p>

        <p>Each tab/view may have different layout, different navbar type (dynamic, fixed or static) or without navbar like this tab.</p>
      </Block>

      <BlockTitle>Appearance</BlockTitle>
      <List strong inset dividersIos>
        <ListItem title="DarkMode" >
          <Toggle slot="after"
          value={dmodeVal}
            onToggleChange={(e) => {
              sendDarkMode(e)
            }}
            />
        </ListItem>
        <ListItem title="Music" >
          <Toggle defaultChecked slot="after"
            value={bgMute}
            onToggleChange={(e) => {
              if(!e){
                audio.pause();
              }else {
                audio.play();
              }
              bgMute = e
              console.log(e)
            }}
          />
        </ListItem>
        <ListItem >
          <Range value={vol*100} onRangeChange={(v)=>{
            vol = v/100
            console.log('volume:' + vol)
            audio.volume = vol;
          }}></Range>
        </ListItem>
      </List>
      <audio  autoPlay loop>
        <source src="../assets/sounds/yawn.mp3" type="audio/mpeg" />
      </audio>


      <BlockTitle>Modals</BlockTitle>
      <Block className="grid grid-cols-2 grid-gap">
        <Button fillMd roundIos largeIos tonalIos popupOpen="#my-popup">Popup</Button>
        <Button fillMd roundIos largeIos tonalIos loginScreenOpen='#login-screen' >Login Screen</Button>
      </Block>
        <BlockTitle>Other</BlockTitle>
      <List strong inset dividersIos>
        <ListItem link="/about/" title="About" />
        <ListItem link="/form/" title="Send a report" />
        <ListItem
          title="Dynamic (Component) Route"
          link="/dynamic-route/blog/45/post/125/?foo=bar#about"
          />

        <ListItem
          title="Request Data & Load"
          link="/request-and-load/user/123456/"
        />
      </List>

    </Page>)
};

export default SettingsPage;
