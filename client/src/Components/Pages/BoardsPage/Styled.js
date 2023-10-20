import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f3f4f6;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  cursor: default;
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  width: 100%;
  margin: 2rem 0;
  color: #333;
  user-select: none;
`;

export const Wrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  overflow-y: auto;
  background-color: #f3f4f6;
`;

export const Board = styled.div`
  color: #333;
  padding: 1rem;
  margin: 1rem;
  width: 200px;
  height: 120px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: opacity 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    transition: background-color 0.3s;
    font-weight: 600;
  }
`;

export const AddBoard = styled(Board)`
  background-color: #eb5757;
  font-size: 1.2rem;
  transition: 0.5s;
  opacity: 0.9;
  text-align: center;
  font-weight: 600;

  &:hover {
    background-color: #f76b6b;
    transition: 0.4s ease-in;
  }
`;
