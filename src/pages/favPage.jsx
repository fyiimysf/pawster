import React from 'react';
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
  ListGroup,
} from 'framework7-react';

const FavPage = ({name, user, email}) => (
  <Page name="fav"> 
    <Navbar title="Favorites"  />
    
    
        
    <BlockTitle>Form Example</BlockTitle>
    

    <BlockTitle>Buttons</BlockTitle>
    <Block strongIos outlineIos className="grid grid-cols-2 grid-gap">
      <Button>Button</Button>
      <Button fill>Fill</Button>

      <Button raised>Raised</Button>
      <Button raised fill>
        Raised Fill
      </Button>

      <Button round>Round</Button>
      <Button round fill>
        Round Fill
      </Button>

      <Button outline>Outline</Button>
      <Button round outline>
        Outline Round
      </Button>

      <Button small outline>
        Small
      </Button>
      <Button small round outline>
        Small Round
      </Button>

      <Button small fill>
        Small
      </Button>
      <Button small round fill>
        Small Round
      </Button>

      <Button large raised>
        Large
      </Button>
      <Button large fill raised>
        Large Fill
      </Button>

      <Button large fill raised color="red">
        Large Red
      </Button>
      <Button large fill raised color="green">
        Large Green
      </Button>
    </Block>

    <BlockTitle>Checkbox group</BlockTitle>
    <List strongIos outlineIos dividersIos>
      <ListItem checkbox name="my-checkbox" value="Books" title="Books"></ListItem>
      <ListItem checkbox name="my-checkbox" value="Movies" title="Movies"></ListItem>
      <ListItem checkbox name="my-checkbox" value="Food" title="Food"></ListItem>
    </List>

    <BlockTitle>Radio buttons group</BlockTitle>
    <List strongIos outlineIos dividersIos>
      <ListItem radio name="radio" value="Books" title="Books"></ListItem>
      <ListItem radio name="radio" value="Movies" title="Movies"></ListItem>
      <ListItem radio name="radio" value="Food" title="Food"></ListItem>
    </List>
  </Page>
);

export default FavPage;
