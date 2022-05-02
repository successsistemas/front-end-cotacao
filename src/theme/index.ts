import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
	components: {
		Select: {
			baseStyle: {
				backgroundColor: "red",
			}
		},
		Button: {
			baseStyle: {
				_focus: { boxShadow: 'none' }
			}
		},
		DrawerCloseButton: {
			baseStyle: {
				_focus: { boxShadow: 'none' }
			}
		},
	},
	colors: {
		azul:
		{
			50: '#e0f4ff',
			100: '#b8dcfa',
			200: '#8ec4f1',
			300: '#63ace8',
			400: '#3994e0',
			500: '#1f7bc6',
			600: '#135f9b',
			700: '#084470',
			800: '#002946',
			900: '#000f1d',
		}
	},
	// fonts: {
	// 	headings: `Roboto, ${base.fonts?.heading}`,
	// 	body: `Inter, ${base.fonts?.body}`,

	// }
});


export default theme;