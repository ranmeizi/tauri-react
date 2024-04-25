import { useRxState } from "@/db/hook/useRxState";
import * as DaoAppConfig from "@/db/dao/AppConfig";
import * as C from "@/CONSTANTS";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  colors,
  keyframes,
} from "@mui/material";

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

export default function PrimaryPicker() {
  const primary = useRxState(
    DaoAppConfig.Observers.get_config(C.APP_CONFIG_STORAGE_KEY_PRIMARY)
  );

  function onChange(e: any) {
    const v = e.target.value;
    DaoAppConfig.Mutation.set_config(C.APP_CONFIG_STORAGE_KEY_PRIMARY, v);
  }

  return (
    <RadioGroup name="radio-buttons-group" onChange={onChange}>
      <Stack direction="row" flexWrap="wrap">
        {colorArr.map((item: any) => (
          <ColorPoint color={item} value={primary?.value} />
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

function ColorPoint<T extends keyof typeof colorObj>({
  color,
  value,
}: {
  color: T;
  value: T;
}) {
  return (
    <FormControlLabel
      label=""
      value={color}
      checked={color === value}
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
