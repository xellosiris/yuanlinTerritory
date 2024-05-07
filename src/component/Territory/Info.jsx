import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export const TerritoryInfo = ({ territory, onClose }) => {
  const { name, person, lastStartDate, lastEndDate, lastPeriod, category, location } = territory;

  return (
    <Dialog fullWidth open onClose={onClose}>
      <DialogTitle>區域資訊 (號碼：{name})</DialogTitle>
      {!!person && (
        <DialogContent>
          <p>委派對象：{person}</p>
          <p>工作日期：{lastPeriod}</p>
          <p>開始日期：{lastStartDate}</p>
          <p>結束日期：{lastEndDate}</p>
          <p>區域類型：{category}</p>
          <p>行政區：{location}</p>
        </DialogContent>
      )}
      {!person && (
        <DialogContent>
          <p>尚未委派！！</p>
          <p>區域類型：{category}</p>
          <p>行政區：{location}</p>
        </DialogContent>
      )}
    </Dialog>
  );
};
