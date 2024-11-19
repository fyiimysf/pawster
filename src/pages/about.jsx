import React from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';

const AboutPage = () => (
  <Page>
    <Navbar title="About" backLink="Back" />
    <BlockTitle>About My App</BlockTitle>
    <Block>
      <p>
        My app is a simple app that allows users to view a list of items and select items to add to their favorites. It also has a settings page where users can change the app theme between light and dark.
      </p>
      <p>
        The app uses the Framework7 library to create a mobile-friendly interface. The app also uses the Supabase library to store and retrieve data from a PostgreSQL database.
      </p>

    </Block>
  </Page>
);

export default AboutPage;
