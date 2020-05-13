import * as React from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { Screen, Container, Button, Text, Images, Theme } from '@kancha'
import SCREENS from '../Screens'
import { Navigation } from 'react-native-navigation'

import { track } from 'uPortMobile/lib/actions/metricActions'
import { segmentId } from 'uPortMobile/lib/selectors/identities'

import TESTID from 'uPortMobile/lib/e2e/testIDs'

interface WelcomeProps {
  trackSegment: (event: any) => any
  componentId: string
}

class Welcome extends React.Component<WelcomeProps> {
  componentDidMount() {
    this.props.trackSegment('Start')
  }

  render() {
    return (
      <Screen
        backgroundImage={Images.backgrounds.welcomeSmall}
        resizeMode={'contain'}
        type={Screen.Types.Custom}
        config={Screen.Config.SafeNoScroll}
        statusBarHidden>
        <Container flex={1} paddingLeft={10}>
          <Container flex={1} justifyContent={'flex-start'} alignItems={'flex-start'} paddingTop={50}>
            {/*<Image source={Images.branding.logoWhite} style={{ height: 100 }} resizeMode={'contain'} />*/}
            <Text type={Text.Types.H1} textColor={'white'} bold textAlign={'left'} padding={10} paddingBottom={1} margin={0}>
            Health Passport
          </Text>
          <Text type={Text.Types.H5} textColor={'white'} bold textAlign={'left'} padding={10}>
            Mobilize human capital in a{'\n'}
            time of crisis and beyond
          </Text>
          </Container>
          <Container flex={1} paddingTop alignItems={'center'} marginTop={250}>
            <Container w={200}>
              <Button
                testID={TESTID.ONBOARDING_GET_STARTED}
                bold
                fullWidth
                buttonText={'Get Started'}
                onPress={() =>
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: SCREENS.Learn,
                      options: {
                        topBar: {
                          elevation: 0,
                        },
                      },
                    },
                  })
                }
                type={Button.Types.Primary}
                block={Button.Block.Filled}
              />
              <Button
                testID={TESTID.ONBOARDING_RECOVER}
                bold
                fullWidth
                buttonText={'Recover Identity'}
                onPress={() =>
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: SCREENS.RECOVERY.RestoreSeedInstructions,
                      options: {
                        topBar: {
                          backButton: {
                            title: 'Back',
                            color: Theme.colors.primary.brand,
                            visible: true,
                          },
                        },
                      },
                    },
                  })
                }
                type={Button.Types.Primary}
                block={Button.Block.Clear}
              />
            </Container>
          </Container>
        </Container>
      </Screen>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...ownProps,
    segmentId: segmentId(state),
  }
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    trackSegment: (event: any) => {
      dispatch(track(`Onboarding ${event}`))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome)
