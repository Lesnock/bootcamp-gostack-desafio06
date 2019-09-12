import propTypes from 'prop-types'
import React, { Component } from 'react'
import github from '../../services/github'
import { ActivityIndicator } from 'react-native'

import {
    Container, Header, Avatar, Name, Bio,
    StarList, Starred, RepoAvatar, Info, Title, Author,
} from './styles'

export default class User extends Component {
    static propTypes = {
        navigation: propTypes.shape().isRequired,
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
    })

    state = {
        stars: [],
        page: 1,
        lastPage: false,
        refreshing: false,
        error: '',
        loading: true,
    }

    user = {}

    async componentDidMount () {
        const { navigation } = this.props

        this.user = navigation.getParam('user')

        let response = null

        try {
            response = await this.loadItems()
        } catch (e) {
            this.setState({ error: `Não foi possível carregar os repositórios favoritos de ${this.user.name}` })
        }

        this.setState({ stars: response.data, loading: false })
    }

    loadItems = () => {
        const { page } = this.state

        return github.get(`/users/${this.user.login}/starred`, {
            params: {
                per_page: 10,
                page,
            },
        })
    }

    loadNextPage = async () => {
        const { page, stars, lastPage } = this.state

        if (lastPage) {
            return null
        }

        await this.setState({ page: page + 1, loading: true })

        const response = await this.loadItems()

        // There is no results
        if (response.data.length < 1) {
            return this.setState({ lastPage: true, loading: false })
        }

        return this.setState({ stars: [...stars, ...response.data], loading: false })
    }

    refreshList = async () => {
        await this.setState({ page: 1, refreshing: true })

        const response = await this.loadItems()

        return this.setState({
            stars: response.data,
            refreshing: false,
            lastPage: false,
        })
    }

    navigateToSiteView = ({ url, title }) => {
        const { navigation } = this.props

        navigation.navigate('SiteView', { url, title })
    }

    render () {
        const { stars, loading, refreshing } = this.state

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: this.user.avatar }} />
                    <Name>{this.user.name}</Name>
                    <Bio>{this.user.bio}</Bio>
                </Header>

                <StarList
                    data={stars}
                    keyExtractor={star => String(star.id)}

                    onEndReachedThreshold={0.2}
                    onEndReached={this.loadNextPage}

                    onRefresh={this.refreshList}
                    refreshing={refreshing}

                    renderItem={({ item }) => (
                        <Starred
                            onPress={() => this.navigateToSiteView({ url: item.html_url, title: item.full_name })}
                        >
                            <RepoAvatar source={{ uri: item.owner.avatar_url }} />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )}
                />

                { loading ? (
                    <ActivityIndicator />
                ) : null}

            </Container>
        )
    }
}
