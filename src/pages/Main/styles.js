import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
    flex: 1;
    padding: 30px;
`

export const Form = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: #EEE;
    padding-bottom: 20px;
    align-items: center;
`

export const Input = styled.TextInput.attrs({ placeholderTextColor: '#999' })`
    flex: 1;
    height: 40px;
    background-color: #EEE;
    border-radius: 4px;
    border: 1px solid ${props => (props.error ? '#F00' : '#EEE')};
    padding: 0px 15px;
`

export const SubmitButton = styled(RectButton)`
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    margin-left: 10px;
    border-radius: 4px;
    background-color: #7159c1;
    opacity: ${props => (props.loading ? 0.7 : 1)};
`

export const UserList = styled.FlatList.attrs({ showsVerticalScrollIndicator: false })`
    margin-top: 20px;
`

export const User = styled.View`
    margin-bottom: 30px;
    align-items: center;
`

export const Avatar = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background: #EEE;
`

export const Name = styled.Text`
    margin-top: 5px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #333;
`

export const Bio = styled.Text.attrs({ numberOfLines: 2 })`
    text-align: center;
    line-height: 18px;
    color: #999;
`

export const ProfileButton = styled(RectButton)`
    align-self: stretch;
    justify-content: center;
    align-items: center;
    height: 36px;
    margin-top: 5px;
    border-radius: 4px;
    background: #7159c1;
`

export const ProfileButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FFF;
    text-transform: uppercase;
`
