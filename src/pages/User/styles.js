import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    padding: 30px;
`

export const Header = styled.View`
    align-items: center;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-color: #EEE;
`

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
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

export const StarList = styled.FlatList`

`

export const Starred = styled.TouchableOpacity`
    margin-top: 10px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
`

export const RepoAvatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background: #EEE;
`

export const Info = styled.View`
    margin-left: 10px;
`

export const Title = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #333;
`

export const Author = styled.Text`
    font-size: 12px;
    margin-top: 2px;
    color: #777;
`
