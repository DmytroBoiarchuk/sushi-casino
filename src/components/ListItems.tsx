import styled from "styled-components";
import ItemCard from "./ItemCard.tsx";
import { ItemsInterface } from "../api";

interface Props {
  items: ItemsInterface[];
}

const ListItems = ({ items }: Props) => {
  return (
    <Content>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </Content>
  );
};

const Content = styled.div`
  margin-top: 50px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  @media ${({ theme }) => theme.breakpoints.mobile} {
    gap: 10px;
  }
`;
export default ListItems;
