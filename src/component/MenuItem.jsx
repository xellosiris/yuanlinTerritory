import { IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";
const MenuItem = ({ Icon, tip, onClick, active = true }) => {
  return (
    <div className={clsx("rounded-full", active ? "bg-slate-600" : "bg-slate-400")}>
      <Tooltip title={tip}>
        <IconButton onClick={onClick}>
          <Icon className="text-white" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default MenuItem;
