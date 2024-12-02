import React, { useRef } from 'react';
import { Page, Navbar, Block, List, ListItem, BlockTitle, NavTitle, PhotoBrowser, Icon } from 'framework7-react';

const RequestAndLoad = (props) => {
  const { user } = props;

  const photos = [
    {
      url: 'https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/public/pawster_assets/imgs/uceph.em.jpg',
      caption: '',
    },
  ];  const standaloneDark = useRef(null);
  return (
    <Page>
      <PhotoBrowser photos={photos}  theme="dark" ref={standaloneDark} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px ' }}>
        <img onClick={() => standaloneDark.current.open()} src={`https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/public/pawster_assets/imgs/uceph.em.jpg`} 
        alt={"profile picture"} style={{ width: '128px', height: '128px', borderRadius: '50%' }} />
      </div>

      <Navbar backLink="Back">
      <NavTitle style={{ textAlign: 'center' }} >Creator</NavTitle>
      </Navbar>
      <BlockTitle style={{ textAlign: 'center' }} large>{user.firstName} {user.lastName}</BlockTitle>
      <Block strong >
        {user.about}
      </Block>
      <BlockTitle>About My App</BlockTitle>
      <Block>
        <p>
          My app is a simple app that allows users to view a list of items and select items to add to their favorites. It also has a settings page where users can change the app theme between light and dark.
        </p>
        <p>
          The app uses the Framework7 library to create a mobile-friendly interface. The app also uses the Supabase library to store and retrieve data from a PostgreSQL database.
        </p>

      </Block>
      <BlockTitle>Links</BlockTitle>
      <List strong inset dividersIos>
        {user.links.map((link, index) => (
          <ListItem
            
            key={index}
            link={link.url}
            title={link.title}
            external
            target="_blank"
          ><Icon f7={link.icon} /></ListItem>
        ))}
      </List>
    </Page>
  );
};

export default RequestAndLoad;
