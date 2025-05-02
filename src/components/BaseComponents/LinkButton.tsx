import styled from "styled-components";

const LinkButton = styled.a`
  text-decoration: none;
  width: 100%;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  border: none;
  padding: 12px 24px;
  font-size: 16px;
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
`;

export default LinkButton;
