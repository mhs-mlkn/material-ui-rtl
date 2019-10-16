import { Theme, withStyles } from "@material-ui/core/styles";
import MuiChip from "@material-ui/core/Chip";

const Chip = withStyles((theme: Theme) => ({
  root: {
    [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing()
  },
  icon: {
    margin: theme.spacing(0, 1)
  },
  deleteIcon: {
    margin: theme.spacing(0, 0.25)
  }
}))(MuiChip);

export default Chip;
