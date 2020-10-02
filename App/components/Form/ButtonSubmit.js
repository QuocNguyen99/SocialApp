import React from 'react'
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import Button from '../Button'

export default function ButtonSubmit({ title, style }) {
    const { handleSubmit } = useFormikContext();
    return (
        <Button
            title={title}
            style={style}
            onPress={handleSubmit} />

    )
}

const styles = StyleSheet.create({})
