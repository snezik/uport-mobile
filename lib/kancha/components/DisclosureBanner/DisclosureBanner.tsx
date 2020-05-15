import * as React from 'react'
import { ImageBackground, ViewStyle, Image } from 'react-native'
import { Container, Text } from '@kancha'
import { View } from 'react-native-animatable'
const Logo: React.FC<any> = props => {
  return (
    <Container backgroundColor={'#FFFFFF'} br={10} viewStyle={{ overflow: 'hidden' }}>
      <Image resizeMode={'cover'} source={props.image} style={{ width: 70, height: 70 }} />
    </Container>
  )
}

interface BannerProps {
  backgroundImage: any
  backgroundColor?: string
  avatar: any
  requestor: string
  httpsResolveStatus: any
  size?: 'small' | 'medium'
  subTitle?: string
}

const bannerSize: { [index: string]: number } = {
  small: 180,
  medium: 250,
}


const DisclosureBanner: React.FC<BannerProps> = props => {
  const BannerStyle: ViewStyle = {
    backgroundColor: '#333333',
    flex: 1,
    height: bannerSize[props.size ? props.size : bannerSize.medium],
  }
  return (
    <ImageBackground source={props.backgroundImage} style={BannerStyle}>
      <Container
        backgroundColor={props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,0.5)'}
        flex={1}
        justifyContent={'space-between'}
        paddingTop
        paddingLeft={20}
        >
        <Container flexDirection="row"justifyContent='space-between' >
          <Container paddingTop={5}  flex={4}>
  
            <Container >
              <Text type={Text.Types.H3} textColor={'#20b787'}>
                {props.requestor.toUpperCase() || 'No name provided'}
              </Text>
            </Container>
            <Text type={Text.Types.H4} textColor={'#FFFFFF'}>
              {/* {props.subTitle && props.subTitle} */}
              Asks for permissions {"\n"}to send notifications 
            </Text>
          </Container>
          <Container flex={2}>
              <View style={{ width: 70, height: 35 ,marginLeft:10} } >
                <Logo image={props.avatar} />
              </View>
          </Container>
      
        </Container>
      </Container>
    </ImageBackground>
  )
}
DisclosureBanner.defaultProps = {
  size: 'medium',
}

export default DisclosureBanner
