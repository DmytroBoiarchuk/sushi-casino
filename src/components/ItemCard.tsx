import styled from "styled-components";
import { useMemo } from "react";
import { mockItems, Rarity } from "../pages/Home.tsx";
import { ItemsInterface } from "../api";

interface Props {
  item: ItemsInterface;
}

const ItemCard = ({ item }: Props) => {
  const TEMPORARY = useMemo(() => Math.floor(Math.random() * 9), []);

  return (
    <Content>
      <ImageBox rarity={item.rarity}>
        <Image src={mockItems[TEMPORARY].image /*item.imageUrl*/} />
      </ImageBox>
      <Name>{item.name}</Name>
      <Description>{item.description}</Description>
      <Probability>{item.probability}%</Probability>
    </Content>
  );
};

const Name = styled.p`
  padding-left: 5px;
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`;

const Content = styled.div`
  width: 180px;
  position: relative;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 15px;
  &:hover {
    transform: scale(1.4);
    z-index: 100;
    transition: all 0.4s ease;
  }
`;

const ImageBox = styled.div<{ rarity: Rarity }>`
  position: relative;
  width: 150px;
  height: 150px;
  border-left: 10px solid
    ${({ theme, rarity }) => theme.rarityColors[rarity] || "#fff"};
`;

const Probability = styled.div`
  width: 30px;
  text-align: center;
  position: absolute;
  right: 0;
  top: 0;
  padding: 2px;
  border-radius: 5px;
  box-shadow: 0 0 3px 1px white;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
`;

const Description = styled.p`
  max-width: 100%;
  margin: 0;
  padding: 0 0 5px 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 0 5px 0;
`;

export default ItemCard;
