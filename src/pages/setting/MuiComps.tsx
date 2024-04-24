import Page from "@/components/Page";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  SxProps,
  Theme,
  Typography,
  colors,
  keyframes,
  Divider,
} from "@mui/material";
import * as C from "@/CONSTANTS";
import { useRxState } from "@/db/hook/useRxState";
import * as DaoAppConfig from "@/db/dao/AppConfig";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import { getCurrent } from "@tauri-apps/api/window";

const colorObj = {
  amber: colors["amber"],
  blue: colors["blue"],
  blueGrey: colors["blueGrey"],
  brown: colors["brown"],
  cyan: colors["cyan"],
  deepOrange: colors["deepOrange"],
  deepPurple: colors["deepPurple"],
  green: colors["green"],
  grey: colors["grey"],
  indigo: colors["indigo"],
  lightBlue: colors["lightBlue"],
  lightGreen: colors["lightGreen"],
  lime: colors["lime"],
  orange: colors["orange"],
  pink: colors["pink"],
  purple: colors["purple"],
  red: colors["red"],
  teal: colors["teal"],
  yellow: colors["yellow"],
};

const colorArr = Object.keys(colorObj);

console.log(getCurrent());

const styleSheet: SxProps<Theme> = (theme) => ({
  ".header": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "12px 0",
  },
  ".header__settings": {
    position: "absolute",
    left: "24px",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "mui-config";

const is_main_window =
  window.__TAURI_METADATA__.__currentWindow.label === "main";

export default function () {
  const primary = useRxState(
    DaoAppConfig.Observers.get_config(C.APP_CONFIG_STORAGE_KEY_PRIMARY)
  );

  const navigate = useNavigate();

  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      {/* 头部 */}
      <Box className="header">
        <Typography variant="h4" component="h1">
          Theme Config
        </Typography>
        {is_main_window ? (
          <IconButton
            className="header__settings"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <IconButton
            className="header__settings"
            onClick={() => {
              window.close();
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      <Divider></Divider>
      <Button
        variant="contained"
        onClick={() => {
          DaoAppConfig.Mutation.set_config(
            C.APP_CONFIG_STORAGE_KEY_MODE,
            "dark"
          );
        }}
      >
        dark
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          DaoAppConfig.Mutation.set_config(
            C.APP_CONFIG_STORAGE_KEY_MODE,
            "light"
          );
        }}
      >
        light
      </Button>
      <Colors />
    </Page>
  );
}

function Colors() {
  function onChange(e: any) {
    const v = e.target.value;
    DaoAppConfig.Mutation.set_config(C.APP_CONFIG_STORAGE_KEY_PRIMARY, v);
  }
  return (
    <RadioGroup name="radio-buttons-group" onChange={onChange}>
      <Stack direction="row">
        {colorArr.map((item: any) => (
          <ColorPoint color={item} />
        ))}
      </Stack>
    </RadioGroup>
  );
}

// 创建一个 @keyframes 规则
const spin = keyframes({
  "0%": {
    height: 0,
    width: 0,
  },
  "80%": {
    height: "8px",
    width: "8px",
  },
  "100%": {
    height: "6px",
    width: "6px",
  },
});

function ColorPoint({ color }: { color: keyof typeof colorObj }) {
  return (
    <FormControlLabel
      label=""
      value={color}
      sx={{ margin: 0 }}
      control={
        <Radio
          sx={(theme) => ({
            ".color-radio": {
              height: "22px",
              width: "22px",
              borderRadius: "11px",
              background: colorObj[color]["500"],
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.2s",
              border: "0.2px solid #fff",
              "&::after": {
                position: "absolute",
                height: "6px",
                width: "6px",
                borderRadius: "6px",
                backgroundColor: "#fff",
                animation: `${spin} 0.1s linear `,
              },
            },
          })}
          color="default"
          checkedIcon={
            <Box
              className="color-radio"
              sx={(theme) => ({
                "&::after": {
                  content: '""',
                },
                filter: `drop-shadow(1px 2px 3px ${theme.palette?.x_shadow_color})`,
              })}
            />
          }
          icon={<Box className="color-radio" />}
          inputProps={{ "aria-label": "Checkbox demo" }}
        />
      }
    />
  );
}
