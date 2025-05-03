import { motion } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import Button from "./BaseComponents/BaseButton.tsx";
import { getWinner, ItemsInterface } from "../api";
import WinModal from "./WinModal.tsx";
import { mockItems } from "../pages/Home.tsx";

interface Props {
  items: ItemsInterface[];
}

const ITEM_WIDTH = 170;
const VISIBLE_ITEMS = 5;
const duration = 5;

const CaseOpener = ({ items }: Props) => {
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const handleResult = () => {
    setShowWinnerModal(true);
  };
  const [winner, setWinner] = useState<ItemsInterface | undefined>();
  const [isSpinning, setIsSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const repeatCount = items.length * 4;
  const extendedList = Array.from({ length: repeatCount }, () => items).flat();

  const CENTER_OFFSET = (ITEM_WIDTH * VISIBLE_ITEMS) / 2 - ITEM_WIDTH / 2;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleStart = async () => {
    if (isSpinning) return;
    const winner: ItemsInterface | null =
      inputRef.current && (await getWinner(inputRef.current?.value));
    if (!winner) return;
    setWinner(winner);
    setIsSpinning(true);
    const indexInList = items.length * items.length * 2 + winner.id - 1;
    const distance =
      indexInList * ITEM_WIDTH - CENTER_OFFSET + (Math.random() * 50 - 25);

    setOffset(-distance);

    setTimeout(
      () => {
        handleResult();
      },
      duration * 1000 + 200,
    );
  };

  return (
    <Content>
      <SlotsWrapper width={ITEM_WIDTH * VISIBLE_ITEMS} ref={containerRef}>
        <Slots
          animate={{ x: offset }}
          transition={{
            duration: 5,
            ease: "easeOut",
          }}
        >
          {extendedList.map((item, i) => (
            <PrizeSlot key={i} itemwidth={ITEM_WIDTH}>
              <Image
                src={mockItems[0].image /*item.imageUrl*/}
                alt={item.name}
              />
            </PrizeSlot>
          ))}
        </Slots>
        <Marker
          leftoffset={(ITEM_WIDTH * VISIBLE_ITEMS) / 2 - ITEM_WIDTH / 2 - 3}
          itemwidth={ITEM_WIDTH}
        />
      </SlotsWrapper>
      <PromoCodeInput>
        <Input ref={inputRef} type="text" />
      </PromoCodeInput>
      {items && items.length > 0 && (
        <Button disabled={isSpinning} onClick={handleStart}>
          Spin
        </Button>
      )}
      {showWinnerModal && winner && (
        <WinModal item={winner} onClose={() => setShowWinnerModal(false)} />
      )}
    </Content>
  );
};

const Content = styled.div`
  padding: 20px;
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

const PromoCodeInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SlotsWrapper = styled.div<{ width: number }>`
  overflow: hidden;
  width: ${({ width }) => width}px;
  border: 2px solid #333;
  position: relative;
  margin-top: 10px;
`;

const Slots = styled(motion.div)`
  display: flex;
`;

const PrizeSlot = styled.div<{ itemwidth: number }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: ${({ itemwidth }) => itemwidth}px;
  height: 150px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  padding: 3px;
`;

const Marker = styled.div<{ itemwidth: number; leftoffset: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ leftoffset }) => leftoffset}px;
  width: ${({ itemwidth }) => itemwidth}px;
  border-left: 3px solid red;
  border-right: 3px solid red;
  pointer-events: none;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export default CaseOpener;
