/**
 * Мы создали отдельный файл, здесь мы создали запрос на получение данных из хасуры
 */

import gql from "graphql-tag";

export const getToys = gql`
  query MyQuery {
    toys {
      id
      color
      description
      height
      material
      name
      price
      type
      quantity
      image1
      image2
      image3
    }
  }
`;
