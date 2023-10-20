import { xs } from "../../../BreakPoints";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  backdrop-filter: blur(5px);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(1, 1, 1, 0.45);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  ${xs({
    width: "100%",
  })}
`;

export const TitleCard = styled.div`
  min-width: 18.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Panel = styled.div`
`;

export const PanelWrapper = styled.div`
  border-radius: 12px;
  position: relative;
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-around;
`;

export const TitleInput = styled.input`
  width: 100%;
  color: white;
  padding: 1rem;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.15);
  transition: 150ms linear;
  font-weight: 700;
  border-radius: 12px;
  &::placeholder {
    font-weight: 700;
    color: rgba(244, 244, 244, 0.7);
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  height: 2rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: 150ms linear;
  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }
  &:active {
    color: rgba(255, 255, 255, 1);
  }
`;

export const CreateButton = styled.button`

  font-weight: 600;
  padding: 1rem;
  margin: 1rem;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  background-color: #2099df;
  transition: 100ms linear;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #1089cf;
  }
  &:active {
    background-color: #0079bf;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: rgba(128, 128, 128, 1);
    color: rgba(200, 200, 200, 0.5);
  }
`;
