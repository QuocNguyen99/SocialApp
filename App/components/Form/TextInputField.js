import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { useFormikContext } from 'formik';


import TextInput from '../TextInput';
import ErrorMessage from './ErrorMessage'

export default function TextInputField({ name, style, title, styleTitle, ...otherProps }) {
    const { handleChange, errors, setFieldTouched, touched } = useFormikContext();
    return (
        <>
            <Text style={styleTitle}>{title}</Text>
            <TextInput
                {...otherProps}
                onBlur={() => setFieldTouched(name)}
                style={style}
                onChangeText={handleChange(name)} />

            <ErrorMessage error={errors[name]} visible={touched[name]} />

        </>
    )
}

const styles = StyleSheet.create({})
