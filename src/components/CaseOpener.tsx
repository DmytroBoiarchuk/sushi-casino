import { motion } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import Button from "./BaseComponents/BaseButton.tsx";

type Item = {
  id: number;
  name: string;
  image: string;
};

type Props = {
  items: Item[];
  winnerIndex: number;
  onComplete: (item: Item) => void;
};

const ITEM_WIDTH = 170;
const VISIBLE_ITEMS = 5;
const duration = 5;

const CaseOpener = ({ items, winnerIndex, onComplete }: Props) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const repeatCount = items.length * 4;
  const extendedList = Array.from({ length: repeatCount }, () => items).flat();

  const CENTER_OFFSET = (ITEM_WIDTH * VISIBLE_ITEMS) / 2 - ITEM_WIDTH / 2;

  const handleStart = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const indexInList = items.length * items.length * 2 + winnerIndex;
    const distance =
      indexInList * ITEM_WIDTH - CENTER_OFFSET + (Math.random() * 50 - 25);

    setOffset(-distance);

    setTimeout(
      () => {
        onComplete(items[winnerIndex]);
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
              <Image src={item.image} alt={item.name} />
            </PrizeSlot>
          ))}
        </Slots>
        <Marker
          leftoffset={(ITEM_WIDTH * VISIBLE_ITEMS) / 2 - ITEM_WIDTH / 2 - 3}
          itemwidth={ITEM_WIDTH}
        />
      </SlotsWrapper>
      {items && items.length > 0 && (
        <Button disabled={isSpinning} onClick={handleStart}>
          Spin
        </Button>
      )}
    </Content>
  );
};

const Content = styled.div`
  padding: 20px;
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
