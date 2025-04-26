import styled from "styled-components";
import { ItemsProps } from "../App.tsx";
import ItemCard from "./ItemCard.tsx";

interface Props {
  items: ItemsProps[];
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
  gap: 20px;
`;
export default ListItems;
