import { styled } from '@ignite-ui/react'

import { Box, Heading, Text } from '@itoddy-ui/react'

export const Container = styled('main', {
    maxWidth: 572,
    margin: '$20 auto $4',
    padding: '0 $4'
})

export const Header = styled('div', {
    padding: '0 $6',

    [`> ${Heading}`]: {
        lineHeight: '$base'
    },

    [`> ${Text}`]: {
        lineHeight: '$base'
    }
})

export const Form = styled(Box, {
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',

    label : {
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
    }
})

export const FormValidationAdvisor = styled(Text, {
    color: '#f75a68',
})