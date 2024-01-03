import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import * as DaoAppConfig from "@/db/dao/AppConfig";
import * as C from "@/CONSTANTS";
import { useRxState } from "@/db/hook/useRxState";

export default function DirectionSelector() {
  const direction =
    useRxState(
      DaoAppConfig.Observers.get_config(C.APP_CONFIG_PAGE_TRANSITION_DIRECTION)
    ) || "right";

  function onChange(v) {
    DaoAppConfig.Mutation.set_config(C.APP_CONFIG_PAGE_TRANSITION_DIRECTION, v);
  }
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Direction</FormLabel>
      <RadioGroup
        value={direction}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel value="right" control={<Radio />} label="Right" />
        <FormControlLabel value="left" control={<Radio />} label="Left" />
        <FormControlLabel value="top" control={<Radio />} label="Top" />
        <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
      </RadioGroup>
    </FormControl>
  );
}
