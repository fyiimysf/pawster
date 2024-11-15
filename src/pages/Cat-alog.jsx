import React from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Button,
    Icon,
    Card,
    Views,
    View,
    CardContent,
    CardHeader,
    Subnavbar,
    Segmented,
    Popover
} from 'framework7-react';
import CardExp from '../components/cardExpandable';


function CatLogPage() {

    let CatDivShow = false
    let BirdDivShow = true
    let DogDivShow = true
    const SelectPaw = (val) => {
        // console.log(val)
        if (val == 0) {
            CatDivShow = false
            BirdDivShow = true
            CatDivShow = true
        }
        else if (val == 1) {
            CatDivShow = !CatDivShow
            BirdDivShow = !BirdDivShow
            CatDivShow = !DogDivShow
        }
        else if (val == 2) {
            CatDivShow = !CatDivShow
            BirdDivShow = !BirdDivShow
            CatDivShow = !DogDivShow
        }
    }

    let cardExpH = 700
    return (
        <Page className='safe-area' name="catlog">
            {/* Top Navbar */}
            <Navbar title='Pawster' >
                <NavRight>
                    <Button popoverOpen='.paw-pop'>
                        <Icon f7='paw' />
                    </Button>
                </NavRight>
            </Navbar>

            {/* Page content */}

            <Block>
                <p>
                    In addition to usual <a href="/cards/">Cards</a> there are also Expandable Cards that allow
                    to store more information and illustrations about particular subject.
                </p>
            </Block>

            <div hidden={CatDivShow}>
                <CardExp cardHieght={400} height={500} textHieght={25} location={'https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/sign/pawster_assets/imgs/CarDB/car10.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYXdzdGVyX2Fzc2V0cy9pbWdzL0NhckRCL2NhcjEwLmpwZWciLCJpYXQiOjE3MzE2NjQ0NTUsImV4cCI6MjA0NzAyNDQ1NX0.nvkLbugQbFng9ia_EX2wO8FL25Lh-jnrguZphQS-x1Q'} />
                <CardExp cardHieght={400} height={500} textHieght={25} location={'https://vbjluyefvsofglojkskp.supabase.co/storage/v1/object/sign/pawster_assets/imgs/CarDB/car12.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYXdzdGVyX2Fzc2V0cy9pbWdzL0NhckRCL2NhcjEyLmpwZWciLCJpYXQiOjE3MzE2NjQ0NzEsImV4cCI6MjA0NzAyNDQ3MX0.aiCKiEe64bymya2qgJTwvSRAx7ruQWKGSOCTMDEY9RM'} />

            </div>


            <Popover className="paw-pop">
                <List>
                    <ListItem link onClick={SelectPaw(0)} popoverClose title="Cats" />
                    <ListItem link onClick={SelectPaw(1)} popoverClose title="Birds" />
                    <ListItem link onClick={SelectPaw(2)} popoverClose title="Dogs" />
                </List>
            </Popover>


        </Page>
    );
}
export default CatLogPage;