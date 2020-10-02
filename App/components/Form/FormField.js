import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';

export default function FormField({ validationSchema, onSubmit, initialValues, children }) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => (
                <>
                    { children}
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({})
