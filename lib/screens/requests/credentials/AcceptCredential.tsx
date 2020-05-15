// Copyright (C) 2018 ConsenSys AG
//
// This file is part of uPort Mobile App.
//
// uPort Mobile App is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// uPort Mobile App is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with uPort Mobile App.  If not, see <http://www.gnu.org/licenses/>.
//
import * as React from 'react'
import { connect } from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native';
import { Container, CredentialExplorer, Screen, Banner, Card, Text, Section, Theme, Button, Images, CredentialBanner } from '@kancha'

interface AcceptCredentialProps {
  verification: any
  address: string
  title: string
  issuer: any
  request: any

  authorizeRequest: (request: any, iss: string) => void
  cancelRequest: (request: any) => void
}

export const AcceptCredential: React.FC<AcceptCredentialProps> = props => {
  return (
    <Screen
      statusBarHidden
      type="custom"
      backgroundImage={Images.backgrounds.credential}
      config={Screen.Config.Scroll}

    // footerNavComponent={
    //   <Container>
    //     {/* <Container paddingHorizontal>
    //       <Text textAlign={'center'} type={Text.Types.SectionHeader}>
    //         {'You have received a credential'}
    //       </Text>
    //     </Container> */}
    //     {/* <Container flexDirection={'row'} padding>
    //       {<Container flex={1} paddingRight>
    //         <Button
    //           depth={1}
    //           buttonText={'Decline'}
    //           block={Button.Block.Clear}
    //           type={Button.Types.Warning}
    //           onPress={() => props.cancelRequest(props.request)}
    //         />
    //       </Container> } */}
    //       {/* <Container flexDirection={'row'} padding alignItems="center">
    //         <Button
    //           buttonText={'Accept'}
    //           type={Button.Types.Confirm}
    //           onPress={() => props.authorizeRequest(props.request, props.verification.iss)}
    //         />
    //       </Container> */}
    //     {/* </Container> */}
    //   </Container>
    // }
    >
      {/* <TouchableWithoutFeedback onPress={() => props.authorizeRequest(props.request, props.verification.iss)}> */}
      <Container paddingLeft paddingRight paddingTop={80}  >

        <Card>
          <CredentialBanner
            size="small"
            requestor={props.verification.claim.RapidTestCredential !== undefined ? props.verification.claim.RapidTestCredential.credentialSubject.Content.result : "Identity Verification"}
            subTitle={`Notification from lab`}
            avatar={props.issuer.avatar && props.issuer.avatar}
            httpsResolveStatus={'OKAY'}
            backgroundImage={Images.backgrounds.credential}
            backgroundColor={'#072a3d'}
          // {props.issuer.bannerImage && props.issuer.bannerImage}
          />
          {/* <Section noTopBorder noTopMargin>
            <CredentialExplorer claim={props.verification.claim} />
          </Section> */}
        </Card>

        <Container flexDirection={'row'} marginTop={150} > 
        <Container flex={1}>
            <Button
            fullWidth={true}
            buttonText={'Accept'}
            type={Button.Types.Confirm}
            block={Button.Block.Filled}
            onPress={() => props.authorizeRequest(props.request, props.verification.iss)}
          />
        </Container>
        </Container>
      </Container>
      {/* </TouchableWithoutFeedback> */}

    </Screen>
  )
}

export default AcceptCredential
