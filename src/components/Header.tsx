import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Title>Lucky Sushi</Title>
      <Subtitle>Try your luck and get the rarest sushi!</Subtitle>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  padding: 20px 40px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(240, 240, 240, 0.9) 100%
  );
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.h2`
  margin: 10px 0 0;
  font-size: 16px;
  font-weight: normal;
  color: #555;
`;

export default Header;
