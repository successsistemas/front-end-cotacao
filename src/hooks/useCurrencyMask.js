import { useEffect, useRef } from 'react'
import Inputmask from 'inputmask'

const useInputMask = (register, options) => {
	const ref = useRef(null)

	useEffect(() => {
		if (!ref.current && !register) return

		Inputmask({
			...options,
			alias: 'currency',
			numericInput: true,
		}).mask(ref.current)

		register(ref.current)
	}, [register, options])

	return ref
}

export default useInputMask
