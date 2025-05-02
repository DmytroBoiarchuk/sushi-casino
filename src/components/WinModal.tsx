import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import RedeemButton from "../components/BaseComponents/LinkButton.tsx";
import { ItemsInterface } from "../api";
import { mockItems } from "../pages/Home.tsx";

type Props = {
  item: ItemsInterface;
  onClose: () => void;
};

const WinModal = ({ item, onClose }: Props) => {
  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContent
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <Title>🎉 You won!</Title>
          <ImageWrapper>
            <img src={mockItems[0].image /*item.imageUrl */} alt={item.name} />
          </ImageWrapper>
          <ItemName>{item.name}</ItemName>
          <ButtonGroup>
            <RedeemButton
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
            >
              Redeem Prize
            </RedeemButton>
            <CloseButton onClick={onClose}>Close</CloseButton>
          </ButtonGroup>
        </ModalContent>
      </Overlay>
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px #ff8c00, 0 0 20px #ffd700; }
  50% { box-shadow: 0 0 20px #ff8c00, 0 0 30px #ffd700; }
  100% { box-shadow: 0 0 10px #ff8c00, 0 0 20px #ffd700; }
`;

const ModalContent = styled(motion.div)`
  background: #1a1a1a;
  border: 3px solid #ffd700;
  padding: 30px 40px;
  border-radius: 16px;
  text-align: center;
  color: #ffd700;
  max-width: 400px;
  width: 90%;
  animation: ${glow} 2s infinite ease-in-out;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #ffda00;
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 120px;
  margin: 0 auto 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ItemName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: 0;
  width: 40px;
`;

export default WinModal;
