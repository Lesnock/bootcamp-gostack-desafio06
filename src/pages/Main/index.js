import propTypes from 'prop-types'
import React, { Component } from 'react'
import github from '../../services/github'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, Keyboard, ActivityIndicator } from 'react-native'

// Helpers
import delay from '../../helpers/delay'

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'

// Components
import SimpleError from '../../components/SimpleError'
import {
    Container,
    Form,
    Input,
    SubmitButton,
    UserList,
    User,
    Avatar,
    Bio,
    Name,
    ProfileButton,
    ProfileButtonText,
} from './styles'

export default class Main extends Component {
    static propTypes = {
        navigation: propTypes.shape({
            navigate: propTypes.func,
        }).isRequired,
    }

    static navigationOptions = { headerTitle: 'Usuários' }

    state = {
        newUser: '',
        users: [],
        error: '',
        loading: false,
    }

    async componentDidMount () {
        const users = await AsyncStorage.getItem('users')

        if (users) {
            this.setState({ users: JSON.parse(users) })
        }
    }

    componentDidUpdate (_, prevState) {
        const { users } = this.state

        if (prevState.users !== users) {
            AsyncStorage.setItem('users', JSON.stringify(users))
        }
    }

    // Submit form - add user
    submit = async () => {
        await this.setState({
            error: '', loading: true,
        })

        await delay(500)

        const { users, newUser } = this.state

        if (newUser === '') {
            return this.setState({
                error: 'Preencha um nome de usuário', loading: false,
            })
        }

        const userExists = users.filter(user => user.login.toUpperCase() === newUser.toUpperCase())

        if (userExists.length > 0) {
            return this.setState({
                error: 'Usuário já cadastrado', loading: false,
            })
        }

        let response = null

        try {
            response = await github.get(`/users/${newUser}`)
        } catch (e) {
            return this.setState({
                error: 'Usuário não encontrado', loading: false,
            })
        }

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        }

        this.setState({ users: [data, ...users], newUser: '', loading: false })

        return Keyboard.dismiss()
    }

    navigateToUser = (user) => {
        const { navigation } = this.props

        navigation.navigate('User', { user })
    }

    render () {
        const {
            users, newUser, error, loading,
        } = this.state

        return (
            <Container>
                <Form>
                    <Input
                        value={newUser}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        onChangeText={text => this.setState({ newUser: text, error: '' })}
                        returnKeyType="send"
                        onSubmitEditing={this.submit}
                        error={error}
                        editable={!loading}
                    />

                    <SubmitButton loading={loading} onPress={this.submit}>
                        { loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Icon name="add" color="#FFF" size={20} />
                        ) }
                    </SubmitButton>

                </Form>

                {error !== '' ? (
                    <SimpleError error={error} />
                ) : (
                    <Text />
                )}

                <UserList
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={({ item }) => (
                        <User>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>
                            <ProfileButton onPress={() => this.navigateToUser(item)}>
                                <ProfileButtonText>Ver Perfil</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />
            </Container>
        )
    }
}
