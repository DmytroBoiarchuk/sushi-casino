import styled from "styled-components";

const Button = styled.button`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  border: none;
  padding: 12px 30px;
  font-size: 18px;
  color: #111;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  box-shadow:
    0 0 10px #ff8c00,
    0 0 20px #ffd700;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow:
      0 0 15px #ff8c00,
      0 0 30px #ffd700;
  }

  &:disabled {
    background: #aaa;
    color: #555;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      transform: none;
    }
  }
`;

export default Button;
