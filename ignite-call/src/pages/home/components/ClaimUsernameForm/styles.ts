import { styled, } from '@ignite-ui/react'
import { Box, Heading, Text } from '@itoddy-ui/react'

export const Form = styled(Box, {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '$2',
    marginTop: '$4',
    padding: '$4',
    alignItems: 'center',

    '@media(max-width: 600px)': {
        gridTemplateColumns: '1fr',
    }
})

export const FormAnnotation = styled('div', {
    marginTop: '$2',

    [`> ${Text}`]: {
        color: '$gray400'
    }
})