import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

const InfoModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Wrapper>
      <div>
        <Icon onClick={toggleModal}>
          <FaInfoCircle size={30} />
        </Icon>
        {isOpen && (
          <Modal>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
            consectetur cupiditate deleniti dolorum iste libero magnam non odit
            officiis pariatur quidem quos repellendus rerum sit, velit veniam
            vero. A accusantium aliquam, aliquid aut autem commodi ea eaque et
            exercitationem fuga id itaque, iusto laudantium molestiae, nihil
            nobis nulla optio perspiciatis quia soluta tenetur ut velit? Ab
            accusantium amet animi assumenda corporis cum cumque doloribus earum
            eligendi eum ex facere fuga fugiat fugit ipsum, itaque minima
            molestias non numquam obcaecati officia perspiciatis possimus
            provident quaerat quas quisquam quos ratione reiciendis rem repellat
            repellendus rerum sit tempore. A aliquid amet corporis, cupiditate
            debitis deleniti esse fuga itaque iure modi molestiae non nostrum
            praesentium provident quae, recusandae unde voluptatibus? Ab
            adipisci aliquam at, consectetur cum dolorum ea error eum fuga harum
            labore maxime minima molestiae quae quasi quo quos ratione, rem
            tenetur voluptas? Amet asperiores assumenda dicta eligendi incidunt
            itaque laudantium minima, nobis non optio rerum sapiente sunt totam.
            Aliquam consequuntur corporis culpa distinctio dolorem dolores, ea
            expedita hic illo libero magnam numquam, pariatur quaerat quo
            recusandae reiciendis repellendus repudiandae sint unde voluptas.
            Est ex maxime nihil pariatur quo ratione sapiente vitae. Est
            excepturi obcaecati officiis, pariatur quibusdam quis quo! At, atque
            aut consectetur cupiditate delectus ea earum et ex expedita facilis
            illo impedit nostrum, perferendis quis quos reprehenderit soluta
            sunt tempora, totam voluptate. Debitis earum eligendi ex excepturi
            facere facilis mollitia nisi numquam officia omnis perferendis qui
            quis, quod reiciendis saepe voluptate voluptatem! Accusantium
            architecto earum eius est et in laboriosam magni minus molestias,
            natus quia quidem recusandae unde voluptatem, voluptatum. Eligendi,
            error, et! Accusamus adipisci, aperiam architecto assumenda deleniti
            dignissimos earum eius error et ex facere hic, itaque magnam magni
            maiores nulla odio pariatur perspiciatis quas qui quibusdam quis
            tempora unde voluptates voluptatum? Architecto cum necessitatibus
            nobis optio quidem quod reiciendis?
          </Modal>
        )}
      </div>
    </Wrapper>
  );
};

const Icon = styled.div`
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
`;

const Modal = styled.div`
  right: 20px;
  width: 50vw;
  max-height: 90vh;
  overflow-y: auto;
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  color: #242424;
`;

export default InfoModal;
