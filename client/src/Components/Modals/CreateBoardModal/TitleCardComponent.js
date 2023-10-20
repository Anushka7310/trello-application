import React, { useEffect, useState } from "react";
import * as style from "./Styled";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";


const TitleCardComponent = (props) => {
  const { updateback } = props;
  const [title, setTitle] = useState("");

  useEffect(() => {
    updateback({
      title: title,
    });
  }, [title, updateback]);


  return (
    <style.TitleCard>
      <style.Panel>
        <style.PanelWrapper>
          <style.TitleInput
            placeholder="Add board title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <style.CloseButton>
            <CloseOutlinedIcon
              fontSize="1rem"
              onClick={() => props.callback()}
            />
          </style.CloseButton>
        </style.PanelWrapper>
      </style.Panel>
    </style.TitleCard>
  );
};

export default TitleCardComponent;
