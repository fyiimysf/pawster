import { f7,
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
  CardContent,} from "framework7-react";
import React, { useState } from "react";



function SignupPage() {

  const alertLoginData = () => {
    f7.dialog.confirm(`Is this Correct? :<br> ${user} `, () => {
      AccountPage('', user);
      f7.loginScreen.close();
    });
  };

  const [name, setName, getName] = useState("");
  const [user, setUsername, getUsername] = useState("");
  const [email, setEmail, getEmail] = useState("");
  const [pass, setPassword] = useState("");

  return (
    <LoginScreen id='signUp'>
      <View>
      <Page loginScreen>
        <Navbar small>
          <NavRight>
            <Link iconIos="f7:clear" iconMd="f7:clear" loginScreenClose />
          </NavRight>
          <LoginScreenTitle>Sign Up</LoginScreenTitle>
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
                f7.dialog.preloader("Logging In");
                setTimeout(() => {
                  if (user.length > 0 && pass.length > 0) {
                    alertLoginData();
                  } else {
                    f7.dialog.alert(`Something was not added correctly!`);
                  }
                  f7.dialog.close();
                }, 1000);
              } } />
            <br></br>
          </Block>
        </List>
      </Page>
      </View>
    </LoginScreen>
  );
}

export default SignupPage;
