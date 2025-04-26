import CaseOpener from "./components/CaseOpener";
import styled from "styled-components";
import WinModal from "./components/WinModal.tsx";
import { useRef, useState } from "react";
import ListItems from "./components/ListItems.tsx";
import { getItemsSet } from "./api";
import Button from "./components/BaseComponents/BaseButton.tsx";

export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythical";

export interface ItemsProps {
  id: number;
  name: string;
  image: string;
  rarity: Rarity;
  description: string;
}

const mockItems: ItemsProps[] = [
  {
    id: 8,
    name: "Common",
    image: "/sushi8.jpeg",
    rarity: "common",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    id: 7,
    name: "Common",
    image: "/sushi7.jpg",
    rarity: "common",
    description:
      "'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
  },
  {
    id: 2,
    name: "Uncommon",
    image: "/sushi2.jpeg",
    rarity: "uncommon",
    description: "'Lorem ipsum dolor sit amet",
  },
  {
    id: 6,
    name: "Uncommon",
    image: "/sushi6.jpeg",
    rarity: "uncommon",
    description: "'Lorem ipsum dolor sit amet",
  },
  {
    id: 3,
    name: "Rare",
    image: "/sushi3.jpeg",
    rarity: "rare",
    description: "'Lorem ipsum dolor sit amet",
  },
  {
    id: 1,
    name: "Rere",
    image: "/sushi1.jpeg",
    rarity: "rare",
    description: "'Lorem ipsum dolor sit amet",
  },
  {
    id: 4,
    name: "Epic",
    image: "/sushi4.jpeg",
    rarity: "epic",
    description: "'Lorem ipsum dolor sit amet",
  },
  {
    id: 5,
    name: "Legendary",
    image: "/sushi5.jpeg",
    rarity: "legendary",
    description: "'Lorem ipsum dolor sit amet",
  },
  {
    id: 9,
    name: "Mythical",
    image: "/sushi9.png",
    rarity: "mythical",
    description: "'Lorem ipsum dolor sit amet",
  },
];
const winnerIndex = 4;
function App() {
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const handleResult = () => {
    setShowWinnerModal(true);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStart = () => {
    const promoCode = inputRef.current?.value;
    if (!promoCode) return;
    console.log(
      `promoCode: ${promoCode} sent to server and got pictures for slots spinning`,
    );
    getItemsSet(promoCode).then((items) => {
      setItems(items);
    });
  };

  return (
    <Main>
      <Heading>🎰 LUCKY SUSHI</Heading>
      <CaseOpener
        items={mockItems}
        winnerIndex={winnerIndex}
        onComplete={handleResult}
      />
      <PromoCodeInput>
        <Input ref={inputRef} type="text" />
        <Button onClick={handleStart}>Get Started</Button>
      </PromoCodeInput>
      {showWinnerModal && (
        <WinModal
          item={mockItems[winnerIndex]}
          onClose={() => setShowWinnerModal(false)}
        />
      )}
      {items && <ListItems items={mockItems} />}
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  width: 80vw;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Heading = styled.h1`
  text-align: center;
`;

const PromoCodeInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-top: 15px;
  padding: 12px 20px;
  border: 2px solid #ffd700;
  border-radius: 6px;
  background: #1a1a1a;
  color: #ffd700;
  font-size: 16px;
  font-weight: bold;
  width: 260px;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff8c00;
  }
`;

export default App;
