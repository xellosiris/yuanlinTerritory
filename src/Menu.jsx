import ChecklistIcon from "@mui/icons-material/Checklist";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { Fragment, useState } from "react";
import TerritorySelect from "./TerritorySelect";
import MenuItem from "./component/MenuItem";

const Menu = ({ territories, selectedTerritory, onSelectedTerritory, togglePubsShow, showPubs }) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const onSelectClose = () => setSelectOpen(false);

  const onDownload = async () => {
    const canvas = await html2canvas(document.querySelector("#TerritoryMap"), {
      ignoreElements: (element) => element.classList.value?.includes("print:hidden"),
      useCORS: true,
    });
    canvas.toBlob((blob) => saveAs(blob, `區域${selectedTerritory?.name}號.png`));
  };

  return (
    <Fragment>
      <div className="absolute left-2 top-2 flex flex-col gap-2 print:hidden">
        {selectedTerritory && <MenuItem Icon={HomeIcon} tip="顯示全體區域" onClick={() => onSelectedTerritory(null)} />}
        <MenuItem Icon={ChecklistIcon} tip="選擇單獨區域" onClick={() => setSelectOpen(true)} />
        {selectedTerritory && <MenuItem Icon={FileDownloadIcon} tip="下載區域" onClick={onDownload} />}
        <MenuItem Icon={GroupsIcon} tip="顯示傳道員分佈" onClick={togglePubsShow} active={showPubs} />
      </div>
      {selectOpen && (
        <TerritorySelect
          onClose={onSelectClose}
          territories={territories}
          selected={selectedTerritory}
          onSelected={(t) => {
            onSelectedTerritory(t);
            setSelectOpen(false);
          }}
        />
      )}
    </Fragment>
  );
};

export default Menu;
