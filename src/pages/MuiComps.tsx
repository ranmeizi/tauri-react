import Page from '@/components/Page'
import { changeDarkMode } from '@/store/reducers/theme'
import { Box, Button, FormControlLabel, Radio, RadioGroup, Stack, SxProps, Theme, colors, keyframes, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'

const colorObj = {
    'amber': colors['amber'],
    'blue': colors['blue'],
    'blueGrey': colors['blueGrey'],
    'brown': colors['brown'],
    'cyan': colors['cyan'],
    'deepOrange': colors['deepOrange'],
    'deepPurple': colors['deepPurple'],
    'green': colors['green'],
    'grey': colors['grey'],
    'indigo': colors['indigo'],
    'lightBlue': colors['lightBlue'],
    'lightGreen': colors['lightGreen'],
    'lime': colors['lime'],
    'orange': colors['orange'],
    'pink': colors['pink'],
    'purple': colors['purple'],
    'red': colors['red'],
    'teal': colors['teal'],
    'yellow': colors['yellow']
}

const colorArr = Object.keys(colorObj)

const styleSheet: SxProps<Theme> = (theme) => ({
    '.title': {
        fontSize: '32px',
        fontWeight: 'bold',
    },
    '.content': {
        color: '#ccc'
    }
})

/** 用于埋点的 pageId (必须) */
const PAGE_ID = ''

export default function () {
    const dispatch = useDispatch()
    const theme = useTheme()

    return <Page pageId={PAGE_ID} sx={styleSheet}>
        <div className='title'>功能页</div>
        <div className='content'>内容和cssinjs</div>
        <Button variant="contained" onClick={() => {
            dispatch(changeDarkMode(true))
        }}>dark</Button>
        <Button variant="contained" onClick={() => {
            dispatch(changeDarkMode(false))
        }}>light</Button>
        <Colors />
    </Page>
}

function Colors() {
    return <RadioGroup name="radio-buttons-group">
        <Stack direction='row'>
            {colorArr.map((item: any) => <ColorPoint color={item} />)}
        </Stack>
    </RadioGroup>
}

// 创建一个 @keyframes 规则
const spin = keyframes({
    '0%': {
        height: 0,
        width: 0,
    },
    "80%": {
        height: '8px',
        width: '8px',
    },
    "100%": {
        height: '6px',
        width: '6px',
    }
})

function ColorPoint({ color }: { color: keyof typeof colorObj }) {
    return <FormControlLabel label="" value={color}
        sx={{ margin: 0 }}
        control={<Radio
            sx={(theme) => ({
                '.color-radio': {
                    height: '22px',
                    width: '22px',
                    borderRadius: '11px',
                    background: colorObj[color]['500'],
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    border: '0.2px solid #fff',
                    "&::after": {
                        position: 'absolute',
                        height: '6px',
                        width: '6px',
                        borderRadius: '6px',
                        backgroundColor: "#fff",
                        animation: `${spin} 0.1s linear `,
                    }
                }
            })}
            color="default"
            checkedIcon={<Box className='color-radio' sx={(theme) => ({
                "&::after": {
                    content: '""'
                },
                filter: `drop-shadow(1px 2px 3px ${theme.palette?.x_shadow_color?.[theme.palette.mode]})`
            })} />}
            icon={<Box className='color-radio' />}
            inputProps={{ 'aria-label': 'Checkbox demo' }}
        />} />
}

