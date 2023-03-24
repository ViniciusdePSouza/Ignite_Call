import { styled } from "@ignite-ui/react";
import { Box, Text } from "@itoddy-ui/react/dist";

export const Container = styled(Box, {
    margin: '$6 auto 8',
    padding: 8,
    display: 'grid',
    maxWidth: '100%',
    position: 'relative',

    variants: {
        isTimePickerOpen: {
            true: {
                gridAutoColumns: '1fr 200px',

                '@media(max-width: 988px': {
                    gridAutoColumns: '1fr'
                }

            },

            false: {
                width: 540,
                gridTemplateColumns: '1fr'
            }
        }
    },
})

export const TimePicker = styled('div', {
    borderLeft: '1px solid $gray600',
    padding: '$6 $6 8',
    overflowY: 'scroll',

    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 280
}) 

export const TimePickerHeader = styled(Text,{
    fontWeight: '$medium',

    span: {
        color: '$gray200',
    }
})

export const TimePickerList = styled('div', {
    marginTop: "$3",
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap : '$2',

    '@media(max-width:980)': {
        gridTemplateColumns: '2fr',
    }
})

export const TimePickerItem = styled('button',{
    border: 0,
    background: '$gray600',
    padding: '$2 8',
    cursor: 'pointer',
    borderRadius: '$sm',
    fontSize: '$sm',
    lineHeight: '$base',

    '&:last-child': {
        marginBottom: '$6'
    },

    '&:disabled': {
        background: 'none',
        cursor: 'default'
    },

    '&:not(:disabled):hover': {
        background: '$gray500',
    },

    '&:focus': {
        boxShadow: '0 0 0 2px $color$gray100'
    }
})