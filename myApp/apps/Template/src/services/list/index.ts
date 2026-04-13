import axios from "axios";
import { cloneDeep } from 'lodash';
import { LISTURL } from "@/apis";
import type { ListItem, CreateListItem, ListResponse, ItemResponse } from "./index.d";

const listApi = {
  /**
   * 获取列表数据
   * @returns 列表数据
   */
  getList: async (): Promise<ListResponse> => {
    const response = await axios.get(LISTURL.getList);
    return response.data;
  },

  /**
   * 创建列表项
   * @param data 列表项数据
   * @returns 创建的列表项
   */
  createItem: async (data: CreateListItem): Promise<ItemResponse> => {
    const response = await axios.post(LISTURL.createItem, data);
    return response.data;
  },

  /**
   * 获取单个列表项
   * @param id 列表项ID
   * @returns 列表项数据
   */
  getItem: async (id: number): Promise<ItemResponse> => {
    const response = await axios.get(LISTURL.getItem(id));
    return response.data;
  },

  /**
   * 更新列表项
   * @param id 列表项ID
   * @param data 列表项数据
   * @returns 更新后的列表项
   */
  updateItem: async (id: number, data: CreateListItem): Promise<ItemResponse> => {
    const response = await axios.put(LISTURL.updateItem(id), data);
    return response.data;
  },

  /**
   * 删除列表项
   * @param id 列表项ID
   * @returns 操作结果
   */
  deleteItem: async (id: number): Promise<{ code: number; message: string }> => {
    const response = await axios.delete(LISTURL.deleteItem(id));
    return response.data;
  },
};

/**
 * 获取列表数据（模拟数据）
 * @returns 列表数据
 */
export const fetchItems = async (): Promise<ListItem[]> => {
  try {
    // 模拟 API 请求
    // const response = await listApi.getList();
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

/**
 * 根据ID获取列表项
 * @param items 列表数据
 * @param id 列表项ID
 * @returns 列表项数据
 */
export const getItemById = (items: ListItem[], id: number): ListItem | undefined => {
  return cloneDeep(items.find(item => item.id === id));
};

export type { ListItem };
export default listApi;