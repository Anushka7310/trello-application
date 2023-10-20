import * as React from "react";
import Modal from "@mui/material/Modal";
import Activity from "./Activity/Activity";
import Description from "./Description/Description";
import Title from "./Title/Title";
import CardLoadingSvg from "../../../Images/cardLoading.svg";
import { getCard } from "../../../Services/cardService";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Container,
  Wrapper,
  MainContainer,
  TitleContainer,
  DescriptionContainer,
  ActivityContainer,
  LoadingScreen,
  CloseIconWrapper,
} from "./styled";

export default function EditCard(props) {
  const { cardId, listId, boardId } = props.ids;
  const dispatch = useDispatch();
  const thisCard = useSelector((state) => state.card);
  React.useEffect(() => {
    if (props.open) {
      getCard(cardId, listId, boardId, dispatch);
    }
  }, [boardId, cardId, dispatch, listId, props.open]);

  return (
    <div style={{ position: "relative" }}>
      <Modal
        open={props.open}
        onClose={props.callback}
        style={{ overflow: "auto" }}
      >
        <Container>
          <TitleContainer>{!thisCard.pending && <Title />}</TitleContainer>
          <Wrapper>
            <MainContainer>
              {!thisCard.pending ? (
                <>
                  <DescriptionContainer>
                    <Description />
                  </DescriptionContainer>

                  <ActivityContainer>
                    <Activity />
                  </ActivityContainer>
                </>
              ) : (
                <LoadingScreen image={CardLoadingSvg} />
              )}
            </MainContainer>
          </Wrapper>
          <CloseIconWrapper onClick={props.callback}>
            <CloseIcon fontSize="small" color="black" />
          </CloseIconWrapper>
        </Container>
      </Modal>
    </div>
  );
}
