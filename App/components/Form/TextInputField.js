import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from 'formik';

import Text from '../Text'
import TextInput from '../TextInput';
import ErrorMessage from './ErrorMessage'

export default function TextInputField({ name, style, title, styleTitle, handleChangeState = null, ...otherProps }) {
    const { handleChange, errors, setFieldTouched, touched } = useFormikContext();

    return (
        <View>
            <Text style={styleTitle}>{title}</Text>
            {
                handleChangeState !== null ?
                    <TextInput
                        {...otherProps}
                        onBlur={() => setFieldTouched(name)}
                        style={style}
                        onChangeText={e => { handleChange(name); handleChangeState(e) }} />
                    :
                    <TextInput
                        {...otherProps}
                        onBlur={() => setFieldTouched(name)}
                        style={style}
                        onChangeText={handleChange(name)} />
            }
            <ErrorMessage error={errors[name]} visible={touched[name]} />

        </View>
    )
}

const styles = StyleSheet.create({})
