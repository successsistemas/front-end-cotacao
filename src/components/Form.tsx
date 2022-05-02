import { Button, ButtonProps, FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";
export const TextField = ({
	name,
	label,
	...props
}: { name: string; label?: string } & InputProps) => {
	const [field, meta] = useField(name)
	const { isSubmitting } = useFormikContext()
	return (
		<FormControl isInvalid={!!meta.error && meta.touched}>
			{label && <FormLabel>{label}</FormLabel>}
			<Input mb={3} {...field} {...props} isDisabled={isSubmitting} id={field.name} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	)
}

export const SubmitButton = (props: ButtonProps) => {
	const { isSubmitting, dirty, isValid } = useFormikContext()

	return (
		<Button
			mt={3}

			colorScheme='blue'
			type='submit'
			isDisabled={!dirty || !isValid}
			isLoading={isSubmitting}
			{...props}
		>
			{props.children}
		</Button>
	)
}