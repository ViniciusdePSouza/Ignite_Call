import { styled } from "@ignite-ui/react";
import { Box } from "@itoddy-ui/react/dist";

export const Container = styled(Box, {
    margin: '$6 auto 8',
    padding: 8,
    display: 'grid',
    maxWidth: '100%',
    position: 'relative',

    width: 540,
    gridTemplateColumns: '1fr'
})