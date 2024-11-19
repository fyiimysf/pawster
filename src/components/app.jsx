import React, { useRef, useState, useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
import {
  f7,
  f7ready,
  App,
  Fab,
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
  theme,
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

import supabase from "../utils/supabase.js";
import FavPage from "../pages/favPage.jsx";

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
  const [favList, setFavList] = useState([])
  const toastIcon = useRef(null);

  //------------------    TOASTS    ------------------------
  const AccToast = (int) => {
    // Create toast
    if (int == 0) {
      //Logged In
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">checkmark_circle</i>',
          text: "Log In Succesfull",
          position: "center",
          closeButton: true,
          closeTimeout: 1000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
    if (int == 1) {
      //Acc created
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">person_crop_circle_badge_checkmark</i>',
          text: "Account has been created",
          position: "center",
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
    if (int == 0) {
      //Error 0
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">person_crop_circle_badge_xmark</i>',
          text: "Account does not exist, Or Invalid credentials were added",
          position: "bottom",
          closeButton: true,
          closeTimeout: 3000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
    if (int == 1) {
      //Error 1
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">exclamationmark_triangle</i>',
          text: "Account cannot be made, Try again later",
          position: "bottom",
          closeButton: true,
          closeTimeout: 3000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
    if (int == 2) {
      //Error 2
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">person_crop_circle_badge_exclam</i>',
          text: "Login Failed",
          position: "bottom",
          closeButton: true,
          closeTimeout: 3000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
    if (int == 3) {
      //Error 3
      if (!toastIcon.current) {
        toastIcon.current = f7.toast.create({
          icon: '<i class="f7-icons">exclamationmark_shield</i>',
          text: "Account already exits",
          position: "bottom",
          closeButton: true,
          closeTimeout: 3000,
        });
      }
      // Open it
      toastIcon.current.open();
    }
  };

  async function addUser() {
    const { error } = await supabase.from("users").insert([
      {
        Name: name,
        Username: user,
        Email: email,
        Password: pass,
      },
    ]);
    if (!error) {
      f7.loginScreen.close();
      f7.loginScreen.close();
      f7.loginScreen.close();
      AccToast(1);
    } else if (error.code == "23505") {
      errorAccToast(3);
    } else {
      console.log(error.message, error.code);
      errorAccToast(1);
    }
  }

    
  
  const getFavs = async () => {
        const { data, error } = await supabase
            .from("users")
            .select("Favorites")
            .eq("Username", user);
        if (!error) {
            setFavList(data[0].Favorites);
            console.log("GOT FROM APP.js: "+ favList);   
        }
    }

  //CHECK USER Func
  async function checkUser() {
    let uBool = false;
    let pBool = false;
      
    const { data: unames, error: errorU } = await supabase
      .from("users")
      .select("*");
    if (!errorU) {
      unames.forEach((element) => {
        if (user == element.Username) {
          uBool = true;
          setEmail(element.Email);
          setName(element.Name);
          if (element.darkMode == "true") {
            dMode = true;
            f7.setDarkMode(true);
            console.log("darkMode is " + dMode);
          } else {
            dMode = false;
            f7.setDarkMode(false);
            console.log("darkMode is " + dMode);
          }
          getFavs();
        }
      });
    } else {
      console.log(errorU.message);
      errorAccToast(2);
    }

    const { data: passw, error: errorP } = await supabase
      .from("users")
      .select("Password");
    if (!errorP) {
      passw.forEach((element) => {
        if (pass == element.Password) {
          pBool = true;
        }
      });
    } else {
      console.log(errorP.message);
      errorAccToast(2);
    }
    if (uBool && pBool) {
      f7.loginScreen.close();
      f7.loginScreen.close();
      f7.loginScreen.close();
      AccToast(0);
    } else {
      errorAccToast(0);
    }
  }

  const alertSignUpData = () => {
    f7.dialog.confirm(
      `Do you wish to make the account with this information? `,
      async () => {
        addUser();
      }
    );
  };


  return (
    <App {...f7params}>
      {/* Views/Tabs container */}

      <LoginScreen id={"main-screen"} opened>
        <MainPage />
      </LoginScreen>

      <Views tabs className="safe-areas">
        {/* Tabbar for switching views-tabs */}
        <Toolbar icons tabbar bottom>
          <Link
          href="/favorites/"
            tabLink="#view-acc"
            iconIos="f7:heart_fill"
            iconMd="f7:heart_fill"
            text="Favorites"
            
            
          />
          <Link
          href="/catalog/"
            tabLink="#view-catalog"
            tabLinkActive
            iconIos="f7:paw"
            iconMd="f7:paw"
            text="Cat-alog"
          />
          <Link
            href="/settings/"
            tabLink="#view-settings"
            iconIos="f7:gear"
            iconMd="material:settings"
            text="Settings"
          />
        </Toolbar>

        {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
        {/* Favorites View */}
        <View onTabShow={() => {
          getFavs();      
        }} className="safe-areas" id="view-acc" tab>
          <FavPage email={email} name={name} userr={user} Favurls={favList} />
        </View>

        {/* Catalog View */}
        <View
          className="safe-areas"
          id="view-catalog"
          tabActive
          name="catalog"
          tab
        >
          <CatLogPage userr={user} getfavLis={favList}/>
        </View>

        {/* Settings View */}
        <View className="safe-areas" id="view-settings" name="settings" tab>
          <SettingsPage
            dmodeVal={dMode}
            username={user}
            name={name}
            user={user}
            email={email}
          />
        </View>
      </Views>

      {/* Popup */}
      <Popup swipeToClose push id="my-popup">
        <View>
          <Page>
            <Navbar title="Account Settings">
              <NavRight>
                <Link popupClose>
                  <Icon ios="f7:close" md="material:close"></Icon>
                </Link>
              </NavRight>
            </Navbar>
            <Card>
              <CardContent>
                <List dividersIos mediaList outlineIos strongIos>
                  <ListItem title={name} subtitle={user} text={email}>
                    <img
                      slot="media"
                      style={{ borderRadius: "10px" }}
                      src="https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/public/pawster_assets/imgs/def_av.png"
                      width="65"
                    />
                  </ListItem>
                </List>
                <center>
                  <BlockTitle>Update Account</BlockTitle>
                </center>
                <List strong inset dividersIos>
                  <ListItem
                    title="Change Username"
                    onClick={() => {
                      f7.dialog.prompt("","Enter new Username", (val) => {
                        f7.dialog.confirm(
                          `Are you sure you want to change your username to ${val}?`,
                          async () => {
                            const { error } = await supabase
                              .from("users")
                              .update({ Username: val })
                              .eq("Username", user);
                            if (!error) {
                              f7.dialog.alert("Username updated");
                              setUsername(val);
                            } else {
                              f7.dialog.alert(
                                "Username not updated, Account already exits"
                              );
                              console.log(error.message);
                            }
                          }
                        );
                      });
                    }}
                  />
                  <ListItem
                    title="Change Password"
                    onClick={() => {
                      f7.dialog.password(
                        "",
                        "Enter Old Password",
                        async (val) => {
                          const { data, error } = await supabase
                            .from("users")
                            .select("Password")
                            .eq("Username", user);
                          if (!error) {
                            data.forEach((element) => {
                              if (val == element.Password) {
                                f7.dialog.password(
                                  "Must be 12 charaters long",
                                  "Enter New Password",
                                  (val) => {
                                    f7.dialog.confirm(
                                      `Are you sure you want to change your password?`,
                                      async () => {
                                        const { error } = await supabase
                                          .from("users")
                                          .update({ Password: val })
                                          .eq("Username", user);
                                        if (!error) {
                                          f7.dialog.alert("Password updated");
                                        } else {
                                          f7.dialog.alert(
                                            "Password not updated, Account already exits"
                                          );
                                          console.log(error.message);
                                        }
                                      }
                                    );
                                  }
                                );
                              } else {
                                f7.dialog.alert("Incorrect Password");
                              }
                            });
                          } else {
                            console.log(error.message);
                          }
                        }
                      );
                    }}
                  />
                  <ListItem
                    title="Change Email"
                    onClick={() => {
                      f7.dialog.prompt("","Enter New Email", (val) => {
                        f7.dialog.confirm(
                          `Are you sure you want to change your Email to ${val}?`,
                          async () => {
                            const { error } = await supabase
                              .from("users")
                              .update({ Email: val })
                              .eq("Username", user);
                            if (!error) {
                              f7.dialog.alert("Email updated");
                              setEmail(val);
                            } else {
                              f7.dialog.alert("Email not updated!");
                              console.log(error.message);
                            }
                          }
                        );
                      });
                    }}
                  />
                  <ListItem
                    title="Change Name"
                    onClick={() => {
                      f7.dialog.prompt("","Enter New Name", (val) => {
                        f7.dialog.confirm(
                          `Are you sure you want to change your Name to ${val}?`,
                          async () => {
                            const { error } = await supabase
                              .from("users")
                              .update({ Name: val })
                              .eq("Username", user);
                            if (!error) {
                              f7.dialog.alert("Name updated");
                              setName(val);
                            } else {
                              f7.dialog.alert("Name not updated!");
                              console.log(error.message);
                            }
                          }
                        );
                      });
                    }}
                  />
                </List>
              </CardContent>
              <br />
            </Card>
            <Block className="grid grid-gap">
              <Button
                textColor="red"
                borderColor="red"
                outline
                largeIos
                tonalIos
                onClick={() => {
                  f7.dialog.confirm(
                    "Are you sure you want to delete your account?",
                    async () => {
                      const { error } = await supabase
                        .from("users")
                        .delete()
                        .eq("Username", user);
                      if (!error) {
                        f7.dialog.preloader("Deleting Account");
                        setTimeout(() => {
                          f7.dialog.close();
                          f7.dialog.alert("Account Deleted");
                          f7.popup.close();
                          f7.loginScreen.open("#main-screen");
                          f7.setDarkMode(true);
                        }, 3000);
                      } else {
                        console.log(error.message);
                      }
                    }
                  );
                }}
              >
                Delete Account
              </Button>
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
            <List strong inset dividersIos form formStoreData id="demo-form">
              <ListInput
                type="text"
                label="Username"
                name="username"
                clearButton
                placeholder="Username"
                value={user}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                label="Password"
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
                  roundIos
                  largeIos
                  tonalIos
                  id="login-button"
                  text="Continue"
                  onClick={() => {
                    f7.dialog.preloader("Logging In");
                    setTimeout(async () => {
                      if (user.length > 0 && pass.length > 0) {
                        await checkUser();
                      } else if (user.length == 0) {
                        f7.toast
                          .create({
                            text: "A field is missing!",
                            position: "bottom",
                            icon: '<i class="f7-icons">exclamationmark_triangle</i>',
                            closeTimeout: 3000,
                          })
                          .open();
                      }
                      f7.dialog.close();
                    });
                  }}
                />
                <br></br>
                <Button
                  id="forget-button"
                  text="Forgot Password?"
                  onClick={() => {
                    f7.dialog.prompt("Enter your username", (val) => {
                      f7.dialog.prompt("Enter your email", async (val2) => {
                        const { data, error } = await supabase
                          .from("users")
                          .select("Password")
                          .eq("Username", val)
                          .eq("Email", val2);
                        if (!error) {
                          data.forEach((element) => {
                            f7.dialog.alert(
                              `Your Password is: ${element.Password}`
                            );
                          });
                        } else {
                          console.log(error.message);
                        }
                      });
                    });
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
                label="Name"
                clearButton
                placeholder="Enter your name"
                value={name}
                onInput={(e) => setName(e.target.value)}
              ></ListInput>
              <ListInput
                type="text"
                label="Username"
                name="username"
                clearButton
                placeholder="Username"
                value={user}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="email"
                label="Email"
                name="email"
                clearButton
                placeholder="Email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                label="Password"
                name="password"
                clearButton
                placeholder="Password"
                value={pass}
                maxlength={12}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
              <BlockFooter>
                Password should be maximum 12 characters long
              </BlockFooter>
            </List>
            <List>
              <Block>
                <Button
                  fill
                  roundIos
                  largeIos
                  tonalIos
                  id="login-button"
                  text="Continue"
                  onClick={() => {
                    f7.dialog.preloader("Signing Up");
                    setTimeout(() => {
                      if (
                        user.length > 0 &&
                        pass.length > 0 &&
                        email.length > 0 &&
                        name.length > 0
                      ) {
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
