import React, { useRef, useState, useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
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
  BlockHeader,
  theme
} from "framework7-react";

import capacitorApp from "../js/capacitor-app";
import routes from "../js/routes";
import store from "../js/store";
import SettingsPage from "../pages/settings";
import AccountPage from "../pages/account";
import CatLogPage from "../pages/Cat-alog";
import HomePage from "../pages/home";
import MainPage from "../pages/main";
import SignupPage from "../pages/signup";

import supabase from '../utils/supabase.js'



const MyApp = () => {

  // Login screen demo data
  const device = getDevice();
  
  


let dMode = true;
  // Framework7 Parameters
  const f7params = {
    name: "Pawster", // App name
    theme: "auto", // Automatic theme detection
    colors: {
      primary: "#f5c7ff",
    },
    darkMode: dMode,

    // App store
    store: store,
    // App routes
    routes: routes,



    // Register service worker (only on production build)
    serviceWorker:
      process.env.NODE_ENV === "production"
        ? {
          path: "/service-worker.js",
        }
        : {},
    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: false,
      androidOverlaysWebView: true,
    },

  };

  f7ready(() => {
    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });



  const [name, setName, getName] = useState("");
  const [user, setUsername, getUsername] = useState("");
  const [email, setEmail, getEmail] = useState("");
  const [pass, setPassword, getPassword] = useState("");
  const toastIcon = useRef(null);


  //------------------    TOASTS    ------------------------
  const AccToast = (int) => {
    // Create toast
    if (int == 0) { //Logged In
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon:
            '<i class="f7-icons">checkmark_circle</i>',
          text: "Log In Succesfull",
          position: 'center',
          closeButton: true,
          closeTimeout: 1000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
    if (int == 1) { //Acc created
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon:
            '<i class="f7-icons">person_crop_circle_badge_checkmark</i>',
          text: "Account has been created",
          position: 'center',
          closeButton: true,
          closeTimeout: 1000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
  };

  const errorAccToast = (int) => {
    // Create toast
    if (int == 0) { //Error 0
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">person_crop_circle_badge_xmark</i>',
          text: "Account does not exist, Or Invalid credentials were added",
          position: 'bottom',
          closeButton: true,
          closeTimeout: 3000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
    if (int == 1) { //Error 1
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">exclamationmark_triangle</i>',
          text: "Account cannot be made, Try again later",
          position: 'bottom',
          closeButton: true,
          closeTimeout: 3000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
    if (int == 2) { //Error 2
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">person_crop_circle_badge_exclam</i>',
          text: "Login Failed",
          position: 'bottom',
          closeButton: true,
          closeTimeout: 3000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
    if (int == 3) { //Error 3
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">exclamationmark_shield</i>',
          text: "Account already exits",
          position: 'bottom',
          closeButton: true,
          closeTimeout: 3000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
  };

  async function addUser() {
    const { error } = await supabase
      .from('users')
      .insert([
        {
          Name: name,
          Username: user,
          Email: email,
          Password: pass,
        },
      ])
    if (!error) {
      f7.loginScreen.close();
      f7.loginScreen.close();
      f7.loginScreen.close();
      AccToast(1);
    } 
    else if(error.code == '23505'){
      errorAccToast(3);
    }
    else {
      console.log(error.message, error.code)
      errorAccToast(1);
    }
  }

  
  //CHECK USER Func
  async function checkUser() {

    let uBool = false
    let pBool = false

    const { data: unames, error: errorU } = await supabase
      .from('users')
      .select('Username,Email,Name,darkMode')
    if (!errorU) {
      unames.forEach(element => {
        if (user == element.Username) {
          uBool = true;
          setEmail(element.Email)
          setName(element.Name)
          if(element.darkMode == true){
            dMode = true
            f7.setDarkMode(true)
          }else{
            dMode = false
            f7.setDarkMode(false)
          }
        }
      });
    } else {
      console.log(errorU.message)
      errorAccToast(2);
    }

    const { data: passw, error: errorP } = await supabase
      .from('users')
      .select('Password')
    if (!errorP) {
      passw.forEach(element => {
        if (pass == element.Password) {
          pBool = true;
        }
      });
    } else {
      console.log(errorP.message)
      errorAccToast(2);

    }
    if (uBool && pBool) {
      f7.loginScreen.close();
      f7.loginScreen.close();
      f7.loginScreen.close();
      AccToast(0)
    } else {
      errorAccToast(0);
    }
  }

  const alertSignUpData = () => {
    f7.dialog.confirm(`Do you wish to make the account with this information? `, async () => {
      addUser()
    });
  };

  

  return (

    <App  {...f7params}>

      {/* Views/Tabs container */}
      
      <LoginScreen id={'main-screen'} opened >
        <MainPage />
      </LoginScreen>


      <Views tabs className="safe-areas">
        {/* Tabbar for switching views-tabs */}
        <Toolbar icons  tabbar  bottom >
          <Link
            tabLink="#view-acc"
            iconIos="f7:person_circle"
            iconMd="f7:person_circle"
            text="Account"
          />
          <Link
            tabLink="#view-catalog"
            tabLinkActive
            iconIos="f7:paw"
            iconMd="f7:paw"
            text="Cat-alog"
          />
          <Link
            tabLink="#view-settings"
            iconIos="f7:gear"
            iconMd="material:settings"
            text="Settings"
          />
        </Toolbar>



        {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
        <View className="safe-areas" id="view-acc" tab >
          <AccountPage email={email} name={name} user={user} />
        </View>

        {/* Catalog View */}
        <View className="safe-areas" id="view-catalog" tabActive name="catalog" tab>
          <CatLogPage />
        </View>

        {/* Settings View */}
        <View className="safe-areas" id="view-settings" name="settings" tab  >
          <SettingsPage getDmodeVal={dMode} username={user} />
        </View>
      </Views>


      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>

      {/* Login segment */}
      <LoginScreen id="login-screen">

        <View>
          <Page loginScreen>
            <Navbar small>
              <NavRight>
                <Link iconIos="f7:clear" iconMd="f7:clear" loginScreenClose />
              </NavRight>
              <LoginScreenTitle>Login</LoginScreenTitle>
            </Navbar>
            <List strong inset dividersIos form formStoreData id="demo-form" >
              <ListInput
                type="text"
                label='Username'
                name="username"
                clearButton
                placeholder="Username"
                value={user}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                label='Password'
                name="password"
                clearButton
                placeholder="Password"
                value={pass}
                maxlength={12}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
              <BlockFooter>
                Password should be maximum 12 characters login
              </BlockFooter>
            </List>
            <List>
              <Block>
                <Button
                  fill
                  roundIos largeIos tonalIos
                  id="login-button"
                  text="Continue"
                  onClick={() => {
                    f7.dialog.preloader("Logging In");
                    setTimeout(() => {
                      if (user.length > 0 && pass.length > 0) {
                        checkUser();
                      } else {
                        f7.dialog.alert(`A field is missing!`);
                      }
                      f7.dialog.close()
                      ;
                    }, 3000);
                  }}
                />
                <br></br>
              </Block>
            </List>
          </Page>
        </View>
      </LoginScreen>


      {/* Sign Up Segment */}
      <LoginScreen id="signup-screen">
        <View>
          <Page loginScreen>
            <Navbar small>
              <NavRight>
                <Link iconIos="f7:clear" iconMd="f7:clear" loginScreenClose />
              </NavRight>
              <LoginScreenTitle>SignUp</LoginScreenTitle>
            </Navbar>
            <List strong inset dividersIos form>
              <ListInput
                type="text"
                name="name"
                label='Name'
                clearButton
                placeholder="Enter your name"
                value={name}
                onInput={(e) => setName(e.target.value)}
              ></ListInput>
              <ListInput
                type="text"
                label='Username'
                name="username"
                clearButton
                placeholder="Username"
                value={user}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="email"
                label='Email'
                name="email"
                clearButton
                placeholder="Email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                label='Password'
                name="password"
                clearButton
                placeholder="Password"
                value={pass}
                maxlength={12}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
              <BlockFooter>
                Password should be maximum 12 characters login
              </BlockFooter>
            </List>
            <List>
              <Block>
                <Button
                  fill
                  roundIos largeIos tonalIos
                  id="login-button"
                  text="Continue"
                  onClick={() => {
                    f7.dialog.preloader("Signing Up");
                    setTimeout(() => {
                      if (user.length > 0 && pass.length > 0 && email.length > 0 && name.length > 0) {
                        alertSignUpData();
                      } else {
                        f7.dialog.alert(`A field is missing!`);
                      }
                      f7.dialog.close();
                    }, 1000);
                  }}
                />
                <br></br>
              </Block>
            </List>
          </Page>
        </View>
      </LoginScreen>
      
    </App>
  );
};
export default MyApp;
