import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function SimpleError ({ error }) {
    return (
        <Text style={styles.error}>
            {error}
        </Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: '#F00',
        fontSize: 12,
    },
})
