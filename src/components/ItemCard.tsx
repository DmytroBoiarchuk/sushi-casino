import { ItemsProps, Rarity } from "../App.tsx";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

interface Props {
  item: ItemsProps;
}

const ItemCard = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const toggleDescription = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        descriptionRef.current &&
        !descriptionRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box rarity={item.rarity}>
      <Image src={item.image} />
      <Description ref={descriptionRef}>
        <Text $isOpen={isOpen}>{item.description}</Text>
        <Button onClick={toggleDescription}>
          {isOpen ? "Hide" : "Description"}
        </Button>
      </Description>
    </Box>
  );
};

const Box = styled.div<{ rarity: Rarity }>`
  position: relative;
  width: 150px;
  height: 150px;
  border-left: 10px solid
    ${({ theme, rarity }) => theme.rarityColors[rarity] || "#fff"};
  padding: 10px;
`;

const Description = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8); /* полупрозрачный белый */
  backdrop-filter: blur(5px); /* лёгкое размытие фона */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* мягкая тень */
  padding: 3px;
  overflow: hidden;
`;

const Text = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: all 0.4s ease;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  user-select: none;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  overflow: auto;
`;
const Button = styled.button`
  color: white;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default ItemCard;
