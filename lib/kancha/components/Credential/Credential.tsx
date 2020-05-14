import * as React from 'react'
import { TouchableOpacity, TouchableHighlight, Linking, ViewStyle, StyleSheet } from 'react-native'
import { Container, Text, Domain, Issuer, Icon, Colors } from '@kancha'
import { Navigation } from 'react-native-navigation'

/**
 * Use existing Avatar until its rewritten
 */
import Avatar from 'uPortMobile/lib/components/shared/Avatar'
import { capitalizeAllLetter } from 'uPortMobile/lib/utilities/string'
import { Theme } from '../../themes/default'

interface CredentialProps {
  claimType: string
  missing?: boolean
  screen?: string
  componentId?: string
  verification?: any
  issuer?: any
  spec?: any
  openModal?: any
  noMargin?: boolean
}

const Credential: React.FC<CredentialProps> = props => {

  const baseStyle = {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  }

  const shadow = {
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 25,
  }

  const border = {
    borderWidth: 1,
    borderColor: Theme.colors.primary.accessories,
  }

  type borderStyle = 'dotted' | 'dashed' | 'solid' | undefined

  const requiredBorder = {
    // @ts-ignore
    borderStyle: 'dotted' as borderStyle,
    borderColor: Theme.colors.warning.accessories,
  }

  const style: ViewStyle = {
    ...baseStyle,
    ...(props.missing ? border : shadow),
    ...(props.spec && props.spec.essential ? requiredBorder : {}),
    ...(props.noMargin ? { margin: 0 } : {}),
  }
  console.log('CREDENTIAL',props);
  return (
    <TouchableOpacity
      style={style}
      disabled={props.missing}
      onPress={() =>
        // props.openModal(props.verification)
        props.screen &&
        props.componentId &&
        Navigation.push(props.componentId, {
          component: {
            name: props.screen,
            passProps: { verification: props.verification, claimType: props.claimType },
          },
        })
      }>
      <Container>
        <Container>
          <Container
            flexDirection={'row'}
            justifyContent={'space-between'}
            padding
            backgroundColor={
              props.missing && props.spec && props.spec.essential
                ? Theme.colors.warning.background
                : Theme.colors.primary.background
            }
            viewStyle={{
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
              borderRightWidth: StyleSheet.hairlineWidth,
              borderColor: Theme.colors.primary.accessories,
            }}>
            <Container>
              <Text type={Text.Types.H5} bold>
                {props.verification.claim.RapidTestCredential.credentialSubject.Content.kit}
              </Text>
            </Container>
            {props.issuer ? (
              <Container padding={3} backgroundColor={Theme.colors.primary.background}>
                <Avatar size={30} source={props.issuer} />
              </Container>
            ) : (
              <Container padding={3} w={40} />
            )}
          </Container>
          <Container flex={1}>
            <Container paddingLeft paddingTop={0} paddingBottom paddingRight>
              <Container paddingBottom={5} alignItems={'center'}>
                <Text type={Text.Types.H4} bold textStyle={{color: '#20b787', fontSize: 18}}>
                  {capitalizeAllLetter(props.verification.claim.RapidTestCredential.credentialSubject.Content.result)}
                </Text>
              </Container>
              <Container
                flexDirection={'row'}
                justifyContent={'space-between'}
                paddingTop={15}
              >
                <Container>
                  <Text type={Text.Types.SubTitle} textColor='#587b81' >Purchased:</Text>
                  <Text type={Text.Types.SubTitle} textColor='#587b81' >{props.verification.claim.RapidTestCredential.credentialSubject.Content.purchased}</Text>
                </Container>
                <Container>
                  <Text type={Text.Types.SubTitle} textColor='#587b81'>Submitted: </Text>
                  <Text type={Text.Types.SubTitle} textColor='#587b81'>{props.verification.claim.RapidTestCredential.credentialSubject.Content.submitted}</Text>
                </Container>
              </Container>
              {/*{!props.missing && <Text type={Text.Types.SubTitle}>{props.issuer && props.issuer.name}</Text>}*/}
              {props.missing && (!props.spec || !props.spec.essential) && (
                <Text type={Text.Types.SubTitle}>Missing credential</Text>
              )}
              {props.missing && props.spec && props.spec.essential && (
                <Text type={Text.Types.SubTitle} warn>
                  Required Credential
                </Text>
              )}
              {props.spec && props.spec.reason && (
                <Container paddingTop>
                  <Text type={Text.Types.Body}>{props.spec.reason}</Text>
                </Container>
              )}
            </Container>
            {/*{props.spec && props.spec.iss && (*/}
            {/*  <Container paddingTop={0}>*/}
            {/*    <Container paddingLeft paddingBottom={8}>*/}
            {/*      <Text type={Text.Types.SubTitle} textColor={'red'}>Apply for credential</Text>*/}
            {/*    </Container>*/}
            {/*    {props.spec.iss*/}
            {/*      .filter((iss: any) => iss.url)*/}
            {/*      .map((iss: any) => {*/}
            {/*        return (*/}
            {/*          <TouchableHighlight*/}
            {/*            key={iss.did}*/}
            {/*            onPress={() => Linking.openURL(iss.url)}*/}
            {/*            underlayColor={Theme.colors.primary.underlay}>*/}
            {/*            <Container*/}
            {/*              flexDirection={'row'}*/}
            {/*              paddingLeft*/}
            {/*              dividerTop*/}
            {/*              justifyContent={'space-between'}*/}
            {/*              padding>*/}
            {/*              <Text>{Domain(iss.url)}</Text>*/}
            {/*              <Icon name={'link'} color={Theme.colors.primary.accessories} size={18} />*/}
            {/*            </Container>*/}
            {/*          </TouchableHighlight>*/}
            {/*        )*/}
            {/*      })}*/}
            {/*  </Container>*/}
            {/*)}*/}
          </Container>
        </Container>
      </Container>
    </TouchableOpacity>
  )
}

Credential.defaultProps = {
  missing: false,
}

export default Credential
