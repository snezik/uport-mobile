import React, { useEffect, useState } from 'react'
import { Linking, Alert, Modal, StyleSheet, TouchableHighlight, View, Image } from 'react-native';
import { connect } from 'react-redux'
import { Screen, Container,
  Text,
  Card,
  Credential,
  Theme,
  Colors,
  Icon,
  SignPost,
  SignPostCardType,
  // Button,
  Images
} from "@kancha";
import { Button } from 'uPortMobile/lib/components/shared/Button'
import { CustomPassportCredential } from "uPortMobile/lib/components/Custom/CustomPassportCredential";
import SCREENS from './Screens'
import { track } from 'uPortMobile/lib/actions/metricActions'
import { parseClaimItem } from 'uPortMobile/lib/utilities/parseClaims'

import { onlyLatestAttestationsWithIssuer } from 'uPortMobile/lib/selectors/attestations'
import { capitalizeAllLetter } from "uPortMobile/lib/utilities/string";
// import TESTID from "uPortMobile/lib/e2e/testIDs";
// import { Navigation } from "uPortMobile/node_modules/react-native-navigation";

interface DashboardProps {
  credentials: any[]
  componentId: string
  openURL: (url: string, eventName: string) => void
}

export const Dashboard: React.FC<DashboardProps> = props => {
  const [signPosts, updateSignPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>();
  console.log(modalData);
  const fetchSignPosts = async () => {
    const response = await fetch(
      'https://uport-mobile-store.s3.us-east-2.amazonaws.com/dashboard-signposts/signposts.json',
    )
    const json = await response.json();

    // updateSignPosts(json);
    updateSignPosts([])
  }
  const showSignPosts =
    signPosts.length > 0 &&
    props.credentials.length === 0 &&
    signPosts.map((card: SignPostCardType) => {
      return <SignPost key={card.id} card={card} onPress={() => props.openURL(card.url, card.id)}/>
    })

  useEffect(() => {
    fetchSignPosts()
  }, []);

  // const isTestButtonShow = () => {
  //   const arrayOfTypes = props.credentials.map(credential => {
  //     const { claimCardHeader } = parseClaimItem(credential);
  //     if (claimCardHeader === 'Immune Passport')
  //       return true;
  //   });
  //   return arrayOfTypes.indexOf(true) >=0
  // }
  // console.log('2222', immunePassportArray, otherCredentialsArray);
  // const immunePassportClaim = props.credentials.find((credential)=>{
  //   if(credential.claim['Immune Passport']){
  //     return credential;
  //   }
  // });
  // const immunePassportClaimContent = immunePassportClaim.claim['Immune Passport'].credentialSubject.Content;
  // console.log('!!!!!!!!!!!!!!!!!!!', isTestButtonShow, immunePassportClaimContent);

  const immunePassportArray = props.credentials.filter((credential)=> {
    if(credential.type === 'Immune Passport')
      return credential;
  });

  const otherCredentialsArray = props.credentials.filter((credential)=> {
    if(credential.type !== 'Immune Passport')
      return credential;
  });

  const openModal = (credential: any)=> {
    setModalVisible(true);
    setModalData(credential);
  };
  const showCredentials = otherCredentialsArray.map(credential => {
    const { claimCardHeader } = parseClaimItem(credential);
    // console.log('@@@@',props.credentials, claimCardHeader);
    return (
      <Container key={credential.token} marginBottom>
        <Credential
          componentId={props.componentId}
          screen={SCREENS.Credential}
          verification={credential}
          claimType={claimCardHeader}
          issuer={credential.issuer}
          openModal={openModal}
          noMargin
        />
      </Container>
    )
  });
  const showImmunePassportCredential = (firstCredential :any)=> {
    console.log('firstCredential',firstCredential);
    const immunePassportClaimContent = firstCredential.claim['Immune Passport'].credentialSubject.Content;
    return (
      <CustomPassportCredential immunePassportClaimContent={immunePassportClaimContent} />
    );
  };
  return (
    <Screen
      backgroundImage={Images.backgrounds.credential}
      type={Screen.Types.Custom}
      config={Screen.Config.Scroll}
    >
      <Container padding marginTop={0}>
        {immunePassportArray.length > 0 ?  showImmunePassportCredential(immunePassportArray[0]): null}
        {immunePassportArray.length > 0 ?
          <Button
            style={{ backgroundColor: '#20b787' }}
            textStyle={{ color: '#ffffff' }}
            fullWidth
            onPress={() => props.openURL('https://lab.palada.tech/#/welcome', '12')}
            // type={Button.Types.Custom}
            // block={Button.Block.Filled}
          >{'Add Sample Kit'}</Button>
          : null}
        {showSignPosts}
        {showCredentials}
      </Container>
      { modalVisible &&
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.rootView}>
          <View style={styles.modalView}>
            <Container
              flexDirection={'column'}
              alignItems={'center'}
            >
              <Image source={Images.logo.sanquin} style={{ height: 38, width: 158 }}/>
            </Container>
            <Container
              flexDirection={'column'}
              alignItems={'flex-start'}
              paddingTop={20}
            >
              <Text textStyle={{fontSize: 12, fontWeight: '400'}} >{modalData.claim.RapidTestCredential.credentialSubject.Content.kit}</Text>
              <Text type={Text.Types.H4} bold textStyle={{color: '#20b787', fontSize: 18}}>
                {capitalizeAllLetter(modalData.claim.RapidTestCredential.credentialSubject.Content.result)}
              </Text>
            </Container>
            <Container>
              <Container
                flexDirection={'row'}
                alignItems={'flex-start'}>
                <Text textStyle={{fontSize: 14, fontWeight: 'bold'}} >&#10003;</Text>
                <Text textStyle={{fontSize: 14, fontWeight: 'bold'}} >Purchased:</Text>
                <Text textStyle={{fontSize: 14, fontWeight: 'bold'}} >{modalData.claim.RapidTestCredential.credentialSubject.Content.purchased}</Text>
              </Container>
              <Container
                flexDirection={'row'}
                alignItems={'flex-start'}>
                <Text textStyle={{fontSize: 14, fontWeight: 'bold'}} >&#10003;</Text>
                <Text textStyle={{fontSize: 14, fontWeight: 'bold'}} >Submitted:</Text>
                <Text textStyle={{fontSize: 14, fontWeight: 'bold'}} >{modalData.claim.RapidTestCredential.credentialSubject.Content.submitted}</Text>
              </Container>
            </Container>

            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Image source={Images.icons.closeButton} style={{height: 35, width: 35 }}/>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      }
    </Screen>
  )
}

const styles = StyleSheet.create({
  rootView: {
    height:'100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  kit: {},
  modalView: {
    height:'100%',
    width:'100%',
    marginTop: 150,
    backgroundColor: 'white',
    borderRadius: 0,
    paddingTop: 45,
    paddingLeft: 10,
    paddingRight: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    position: 'absolute',
    top : 10,
    right: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const mapStateToProps = (state: any) => {
  return {
    credentials: onlyLatestAttestationsWithIssuer(state),
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  openURL: (url: string, eventName: string) => {
    dispatch(track(`Opened linked ${eventName}`))
    Linking.openURL(url)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
