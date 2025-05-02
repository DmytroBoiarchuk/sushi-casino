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
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
export default ListItems;
