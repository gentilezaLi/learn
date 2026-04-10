import { cloneDeep } from 'lodash';

export interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const fetchItems = async (): Promise<Item[]> => {
  try {
    // 模拟 API 请求
    // const response = await get<Item[]>('/items');
    // return response.data;

    // 模拟数据
    return [
      {
        id: 1,
        title: 'Item 1',
        description: 'This is item 1 description',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=product%20item%201&image_size=square',
      },
      {
        id: 2,
        title: 'Item 2',
        description: 'This is item 2 description',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=product%20item%202&image_size=square',
      },
      {
        id: 3,
        title: 'Item 3',
        description: 'This is item 3 description',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=product%20item%203&image_size=square',
      },
    ];
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return [];
  }
};

export const getItemById = (items: Item[], id: number): Item | undefined => {
  return cloneDeep(items.find(item => item.id === id));
};
