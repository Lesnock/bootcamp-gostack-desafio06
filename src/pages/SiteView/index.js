import React from 'react'
import propTypes from 'prop-types'
import { WebView } from 'react-native-webview'

// Types
SiteView.propTypes = propTypes.shape({
    navigation: propTypes.shape({
        getParam: propTypes.func.isRequired,
    }).isRequired,
}).isRequired

SiteView.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
})

export default function SiteView ({ navigation }) {
    return (
        <WebView
            source={{ uri: navigation.getParam('url') }}
            style={{ flex: 1 }}
        />
    )
}
