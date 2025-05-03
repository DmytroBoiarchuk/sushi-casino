import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../BaseComponents/BaseButton.tsx";
import { getWinner, ItemsInterface } from "../../api";
import WinModal from "../WinModal.tsx";
import { mockItems } from "../../pages/Home.tsx";
import {
  repeatCount,
  SPIN_ITEM_WIDTH,
  SPIN_ITEM_WIDTH_MOBILE,
  spinDuration,
  VISIBLE_ITEMS_MOBILE,
  VISIBLE_ITEMS_PC,
  VISIBLE_ITEMS_TABLET,
} from "./Constants.ts";
import { playSound } from "../../utils/utils.ts";
import { useMediaQuery } from "../../hooks/useMediaQuery.ts";

interface Props {
  items: ItemsInterface[];
}

const CaseOpener = ({ items }: Props) => {
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isLessThan540] = useMediaQuery("(max-width: 540px)");
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");

  const handleResult = () => {
    setShowWinnerModal(true);
  };
  const [winner, setWinner] = useState<ItemsInterface | undefined>();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [extendedList, setExtendedList] = useState<ItemsInterface[]>([]);
  const [animateOffset, setAnimateOffset] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useMemo(
    () => (isLessThan540 ? SPIN_ITEM_WIDTH_MOBILE : SPIN_ITEM_WIDTH),
    [isLessThan540],
  );
  const visibleItems = useMemo(
    () =>
      isLessThan540
        ? VISIBLE_ITEMS_MOBILE
        : isLessThan820
          ? VISIBLE_ITEMS_TABLET
          : VISIBLE_ITEMS_PC,
    [isLessThan540, isLessThan820],
  );

  useEffect(() => {
    if (items.length > 0) {
      setExtendedList(items);
    }
  }, [items]);

  const CENTER_OFFSET = (width * visibleItems) / 2 - width / 2;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleStart = async () => {
    if (isSpinning) return;
    setAnimateOffset(true);

    const winner: ItemsInterface | null =
      inputRef.current && (await getWinner(inputRef.current?.value));
    if (!winner) return;
    playSound("/spin.mp3");

    setWinner(winner);
    setIsSpinning(true);

    const baseList = Array.from({ length: repeatCount }, () => items).flat();

    const TARGET_INDEX = Math.floor(baseList.length / 2);
    const newList = [...baseList];
    newList[TARGET_INDEX] = winner;
    setExtendedList(newList);

    const distance =
      TARGET_INDEX * width - CENTER_OFFSET + (Math.random() * 50 - 25);

    setOffset(-distance);

    setTimeout(
      () => {
        handleResult();
        setIsSpinning(false);
        setAnimateOffset(false);
        setOffset(0);
      },
      spinDuration * 1000 + 200,
    );
  };

  return (
    <Content>
      <SlotsWrapper
        width={width * visibleItems}
        itemwidth={width}
        ref={containerRef}
      >
        {isSpinning && <ScreenOverlay width={width} />}
        <Slots
          animate={{ x: offset }}
          transition={{
            duration: animateOffset ? spinDuration : 0,
            ease: "easeOut",
          }}
        >
          {extendedList.map((item, i) => (
            <PrizeSlot key={i} itemwidth={width}>
              <Image
                src={
                  mockItems[Math.floor(Math.random() * 9)].image
                  //item.imageUrl
                }
                alt={item.name}
              />
            </PrizeSlot>
          ))}
        </Slots>
        <Marker
          leftoffset={(width * visibleItems) / 2 - width / 2 - 3}
          itemwidth={width}
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

const ScreenOverlay = styled.div<{ width: number }>`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: none;
  z-index: 105;

  mask-image: radial-gradient(
    circle ${({ width }) => `${width / 1.4}px at 50% ${width / 2.125}px`},
    transparent ${({ width }) => width / 1.3}px,
    black ${({ width }) => width / 1.3}px
  );

  // @media ${({ theme }) => theme.breakpoints.mobile} {
  //   mask-image: radial-gradient(
  //     circle 80px at 50% 60px,
  //     transparent 90px,
  //     black 90px
  //   );
  // }
`;

const Content = styled.div`
  padding: 20px;
  @media ${({ theme }) => theme.breakpoints.mobile} {
    padding: 0;
  }
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

const SlotsWrapper = styled.div<{ width: number; itemwidth?: number }>`
  overflow: hidden;
  width: ${({ width }) => width}px;
  border: 2px solid #333;
  position: relative;
  margin-top: 10px;
  @media ${({ theme }) => theme.breakpoints.mobile} {
    height: ${({ itemwidth }) => itemwidth}px;
  }
`;

const Slots = styled(motion.div)`
  display: flex;
  height: 160px;
`;

const PrizeSlot = styled.div<{ itemwidth: number }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: ${({ itemwidth }) => itemwidth}px;
  height: 160px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  padding: 3px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    height: ${({ itemwidth }) => itemwidth}px;
  }
`;

const Marker = styled.div<{ itemwidth: number; leftoffset: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ leftoffset }) => leftoffset}px;
  width: ${({ itemwidth }) => itemwidth}px;
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(50% + 2px);
    width: 2px;
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;
export default CaseOpener;
