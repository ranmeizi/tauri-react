import { IconButton, Stack, Switch, Typography } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useRxState } from "@/db/hook/useRxState";
import * as DaoAppConfig from "@/db/dao/AppConfig";
import * as C from "@/CONSTANTS";

type DarkModeSwitchProps = {
  component?: "button" | "switch";
};

export default function DarkModeSwitch({
  component = "button",
}: DarkModeSwitchProps) {
  const mode = useRxState(
    DaoAppConfig.Observers.get_config(C.APP_CONFIG_STORAGE_KEY_MODE)
  );

  function setMode(mode: string) {
    DaoAppConfig.Mutation.set_config(C.APP_CONFIG_STORAGE_KEY_MODE, mode);
  }

  const Comp = component === "button" ? CompButton : CompSwitch;

  return <Comp value={mode?.value} onChange={setMode} />;
}

function CompSwitch({ value, onChange }: any) {
  return (
    <Switch
      checked={value === "dark"}
      onChange={(e) => onChange(e.target.checked ? "dark" : "light")}
    />
  );
}

function CompButton({ value, onChange }: any) {
  return value === "dark" ? (
    <IconButton onClick={() => onChange("light")}>
      <Brightness7Icon />
    </IconButton>
  ) : (
    <IconButton onClick={() => onChange("dark")}>
      <Brightness4Icon />
    </IconButton>
  );
}
